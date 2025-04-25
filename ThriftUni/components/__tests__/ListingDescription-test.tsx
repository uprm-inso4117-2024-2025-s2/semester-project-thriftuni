import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { Alert } from "react-native";
import ListingDescription from "../ListingDescription";

jest.spyOn(Alert, "alert").mockImplementation(jest.fn());

describe("ListingDescription Component", () => {
  const mockSeller = {
    name: "Pepe Pepino",
    location: "Mayaguez",
    about: "Soy Pepe",
    rating: 4.8,
    onProfilePress: jest.fn(), // Mock function
  };

  const mockProps = {
    title: "Toyota Corolla 86",
    pictures: [
      "https://example.com/image1.jpg",
      "https://example.com/image2.jpg",
    ],
    description: "Toyota Corolla del 86, $5000 OMO",
    sellerDetails: mockSeller,
    longitude: -122.4194,
    latitude: 37.7749,
  };

  const mockLocation = {
    latitude: 37.7749,
    longitude: -122.4194,
  };

  it("calls alert when ContactSeller button is pressed", () => {
    const { getByText } = render(
      <ListingDescription
        description="This is a sample item"
        sellerDetails={mockSeller}
        location={mockLocation}
      />
    );

    const contactButton = getByText("Contact seller"); // Adjust depending on button text inside ContactSeller
    fireEvent.press(contactButton);

    expect(Alert.alert).toHaveBeenCalledWith("Pressed contact seller button!");
  });

  it("calls alert when WishlistItem button is pressed", () => {
    const { getByText } = render(
      <ListingDescription
        description="This is a sample item"
        sellerDetails={mockSeller}
        location={mockLocation}
      />
    );

    const wishlistButton = getByText("Wishlist Item"); // Adjust depending on button text inside WishlistItem
    fireEvent.press(wishlistButton);

    expect(Alert.alert).toHaveBeenCalledWith("Pressed wishlist item button!");
  });
});
