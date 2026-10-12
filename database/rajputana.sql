CREATE DATABASE IF NOT EXISTS rajputana;

USE rajputana;

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(80) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS user_sessions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    token_hash VARCHAR(64) NOT NULL UNIQUE,
    expires_at DATETIME NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS destinations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    season VARCHAR(50),
    image_url VARCHAR(500)
);

CREATE TABLE IF NOT EXISTS visited_destinations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    destination_id INT NOT NULL,
    visited_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY unique_user_destination (user_id, destination_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (destination_id) REFERENCES destinations(id) ON DELETE CASCADE
);

INSERT IGNORE INTO destinations (name, description, season) VALUES
('Jaipur', 'Explore the Pink City and its royal heritage.', 'Winter'),
('Jaisalmer', 'Discover golden forts and desert adventures.', 'Winter'),
('Udaipur', 'Experience beautiful lakes and royal palaces.', 'Winter'),
('Jodhpur', 'Visit the Blue City and Mehrangarh Fort.', 'Winter'),
('Mount Abu', 'Enjoy Rajasthan’s hill station and cool climate.', 'Summer'),
('Pushkar', 'Explore sacred ghats and the famous Brahma Temple.', 'Winter'),
('Chittorgarh', 'Discover the legendary fort and Rajput history.', 'Winter'),
('Ranthambore', 'Explore wildlife and the historic fort.', 'Winter');