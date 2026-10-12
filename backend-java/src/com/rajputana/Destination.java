package com.rajputana;

public class Destination {
    private final String name;
    private final String description;
    private final String season;

    public Destination(String name, String description, String season) {
        this.name = name;
        this.description = description;
        this.season = season;
    }

    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
    }

    public String getSeason() {
        return season;
    }

    @Override
    public String toString() {
        return name + " - " + description + " (Best season: " + season + ")";
    }
}
