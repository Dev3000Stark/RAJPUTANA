package com.rajputana;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class JourneyManager {
    private final List<Destination> destinations = new ArrayList<>();

    public JourneyManager() {
        destinations.add(new Destination(
            "Jaipur", "Explore Hawa Mahal and Amber Fort", "Winter"));
        destinations.add(new Destination(
            "Jaisalmer", "Discover the golden fort and sand dunes", "Winter"));
        destinations.add(new Destination(
            "Udaipur", "Experience lakes and royal palaces", "Winter"));
        destinations.add(new Destination(
            "Jodhpur", "Visit Mehrangarh Fort and the Blue City", "Winter"));
        destinations.add(new Destination(
            "Mount Abu", "Enjoy Rajasthan's hill station", "Summer"));
        destinations.add(new Destination(
            "Pushkar", "Explore Pushkar Lake and Brahma Temple", "Winter"));
        destinations.add(new Destination(
            "Chittorgarh", "Discover the historic fort", "Winter"));
        destinations.add(new Destination(
            "Ranthambore", "Explore wildlife and Ranthambore Fort", "Winter"));
    }

    public List<Destination> getAllDestinations() {
        return Collections.unmodifiableList(destinations);
    }

    public List<Destination> getDestinationsBySeason(String season) {
        List<Destination> result = new ArrayList<>();

        for (Destination destination : destinations) {
            if (destination.getSeason().equalsIgnoreCase(season)) {
                result.add(destination);
            }
        }

        return result;
    }

    public void displayDestinations() {
        for (Destination destination : destinations) {
            System.out.println(destination);
        }
    }
}