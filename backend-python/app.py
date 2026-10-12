import sqlite3
import secrets
import hashlib
from datetime import datetime, timedelta, timezone
from functools import wraps

from flask import Flask, request, jsonify, g
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash

from database import get_db_connection

app = Flask(__name__)

CORS(app, origins=[
    "http://127.0.0.1:5500",
    "http://localhost:5500"
])


def initialize_database():
    connection = get_db_connection()

    connection.executescript("""
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL UNIQUE,
            password_hash TEXT NOT NULL,
            created_at TEXT DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TABLE IF NOT EXISTS user_sessions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            token_hash TEXT NOT NULL UNIQUE,
            expires_at TEXT NOT NULL,
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        );

        CREATE TABLE IF NOT EXISTS destinations (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL UNIQUE,
            description TEXT,
            season TEXT
        );

        CREATE TABLE IF NOT EXISTS visited_destinations (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            destination_id INTEGER NOT NULL,
            visited_at TEXT DEFAULT CURRENT_TIMESTAMP,
            UNIQUE(user_id, destination_id),
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
            FOREIGN KEY (destination_id) REFERENCES destinations(id)
                ON DELETE CASCADE
        );
    """)

    destinations = [
        ("Jaipur", "Explore the Pink City and its royal heritage.", "Winter"),
        ("Jaisalmer", "Discover golden forts and desert adventures.", "Winter"),
        ("Udaipur", "Experience beautiful lakes and royal palaces.", "Winter"),
        ("Jodhpur", "Visit the Blue City and Mehrangarh Fort.", "Winter"),
        ("Mount Abu", "Enjoy Rajasthan's hill station.", "Summer"),
        ("Pushkar", "Explore sacred ghats and the Brahma Temple.", "Winter"),
        ("Chittorgarh", "Discover the legendary fort and Rajput history.", "Winter"),
        ("Ranthambore", "Explore wildlife and the historic fort.", "Winter")
    ]

    connection.executemany(
        "INSERT OR IGNORE INTO destinations (name, description, season) VALUES (?, ?, ?)",
        destinations
    )

    connection.commit()
    connection.close()


def create_session(connection, user_id):
    token = secrets.token_urlsafe(32)
    token_hash = hashlib.sha256(token.encode()).hexdigest()
    expires = datetime.now(timezone.utc) + timedelta(days=7)

    connection.execute(
        "INSERT INTO user_sessions (user_id, token_hash, expires_at) VALUES (?, ?, ?)",
        (user_id, token_hash, expires.isoformat())
    )

    return token


def login_required(function):
    @wraps(function)
    def wrapper(*args, **kwargs):
        authorization = request.headers.get("Authorization", "")
        token = authorization.removeprefix("Bearer ").strip()

        if not token or token == authorization:
            return jsonify(success=False, message="Please log in."), 401

        token_hash = hashlib.sha256(token.encode()).hexdigest()
        connection = get_db_connection()

        session = connection.execute("""
            SELECT users.id, users.name, users.email, user_sessions.expires_at
            FROM user_sessions
            JOIN users ON users.id = user_sessions.user_id
            WHERE user_sessions.token_hash = ?
        """, (token_hash,)).fetchone()

        connection.close()

        if not session:
            return jsonify(success=False, message="Invalid session."), 401

        try:
            expiry = datetime.fromisoformat(session["expires_at"])
            if expiry <= datetime.now(timezone.utc):
                return jsonify(success=False, message="Session expired."), 401
        except ValueError:
            return jsonify(success=False, message="Invalid session."), 401

        g.user = {
            "id": session["id"],
            "name": session["name"],
            "email": session["email"]
        }

        return function(*args, **kwargs)

    return wrapper


@app.get("/api/health")
def health():
    return jsonify(success=True, message="RAJPUTANA API is running!")


@app.post("/api/register")
def register():
    data = request.get_json(silent=True) or {}

    name = str(data.get("name", "")).strip()
    email = str(data.get("email", "")).strip().lower()
    password = data.get("password", "")

    if not isinstance(password, str):
        return jsonify(success=False, message="Invalid password."), 400

    if len(name) < 2 or len(name) > 80:
        return jsonify(success=False, message="Name must be 2–80 characters."), 400

    if len(email) > 255 or "@" not in email or "." not in email.split("@")[-1]:
        return jsonify(success=False, message="Enter a valid email address."), 400

    if len(password) < 8:
        return jsonify(success=False, message="Password must contain at least 8 characters."), 400

    connection = get_db_connection()

    try:
        cursor = connection.execute(
            "INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)",
            (name, email, generate_password_hash(password))
        )

        user_id = cursor.lastrowid
        token = create_session(connection, user_id)
        connection.commit()

        return jsonify(
            success=True,
            message="Account created successfully!",
            user={"id": user_id, "name": name, "email": email},
            token=token
        ), 201

    except sqlite3.IntegrityError:
        connection.rollback()
        return jsonify(success=False, message="This email is already registered."), 409

    finally:
        connection.close()


@app.post("/api/login")
def login():
    data = request.get_json(silent=True) or {}

    email = str(data.get("email", "")).strip().lower()
    password = data.get("password", "")

    if not isinstance(password, str) or not email:
        return jsonify(success=False, message="Enter your email and password."), 400

    connection = get_db_connection()

    try:
        user = connection.execute(
            "SELECT id, name, email, password_hash FROM users WHERE email = ?",
            (email,)
        ).fetchone()

        if not user or not check_password_hash(user["password_hash"], password):
            return jsonify(success=False, message="Incorrect email or password."), 401

        token = create_session(connection, user["id"])
        connection.commit()

        return jsonify(
            success=True,
            message="Login successful!",
            user={"id": user["id"], "name": user["name"], "email": user["email"]},
            token=token
        )

    finally:
        connection.close()


@app.get("/api/profile")
@login_required
def profile():
    return jsonify(success=True, user=g.user)


@app.get("/api/destinations")
def destinations():
    connection = get_db_connection()

    try:
        rows = connection.execute(
            "SELECT id, name, description, season FROM destinations ORDER BY name"
        ).fetchall()

        return jsonify(success=True, destinations=[dict(row) for row in rows])

    finally:
        connection.close()


if __name__ == "__main__":
    initialize_database()
    print("RAJPUTANA database initialized.")
    print("API running at http://127.0.0.1:5000")
    app.run(host="127.0.0.1", port=5000, debug=True)