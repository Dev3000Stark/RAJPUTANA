package com.rajputana;

public class Main {
    public static void main(String[] args) {
        JourneyManager manager = new JourneyManager();

        System.out.println("==================================");
        System.out.println(" RAJPUTANA TOURISM NETWORK");
        System.out.println("==================================");

        manager.displayDestinations();

        System.out.println("\nTotal destinations: "
                + manager.getAllDestinations().size());

        System.out.println("\nSummer destinations:");
        for (Destination destination :
                manager.getDestinationsBySeason("Summer")) {
            System.out.println(destination);
        }
    }
}