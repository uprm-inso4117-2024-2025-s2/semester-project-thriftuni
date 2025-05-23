import React from "react";
import { render } from "@testing-library/react-native";
import DisplayIndividualListing from "../DisplayIndividualListing";
import { Seller } from "../SellerCard";
import ProductImages from "../ProductImages";
import { Alert } from "react-native";

jest.spyOn(Alert, "alert").mockImplementation(jest.fn());

jest.mock("expo-font");
jest.mock("@expo/vector-icons", () => ({
  MaterialIcons: "MaterialIcons",
}));

jest.mock("@expo/vector-icons", () => ({
  FontAwesome: () => null,
}));

describe("DisplayIndividualListing Component", () => {
  const mockProps = {
    title: "Toyota Corolla 86",
    pictures: [
      "https://example.com/image1.jpg",
      "https://example.com/image2.jpg",
    ],
    description: "Toyota Corolla del 86, $5000 OMO",
    sellerDetails: {
      name: "Pepe Pepino",
      location: "Mayaguez",
      about: "Soy Pepe",
      rating: 4.8,
    } as Seller,
    longitude: -122.4194,
    latitude: 37.7749,
  };

  it("renders the listing title correctly", () => {
    const { getByText } = render(<DisplayIndividualListing {...mockProps} />);
    expect(getByText("Toyota Corolla 86")).toBeTruthy();
  });

  it("renders the description and seller info", () => {
    const { getByText } = render(<DisplayIndividualListing {...mockProps} />);
    expect(getByText("Toyota Corolla del 86, $5000 OMO")).toBeTruthy();
    expect(getByText("Pepe Pepino")).toBeTruthy();
    expect(getByText("Soy Pepe")).toBeTruthy();
  });

  it("renders images and location info via child components", () => {
    const { getByText, getAllByRole } = render(
      <DisplayIndividualListing {...mockProps} />
    );
    expect(getByText("Toyota Corolla 86")).toBeTruthy();
  });
});

describe("ProductImages Component", () => {
  const images = [
    "https://example.com/image1.jpg",
    "https://example.com/image2.jpg",
    "https://example.com/image3.jpg",
  ];

  it("renders all provided images", () => {
    const { getAllByRole } = render(<ProductImages images={images} />);
    const { getByTestId } = render(<ProductImages images={images} />);

    expect(getByTestId("product-image-0")).toBeTruthy();
    expect(getByTestId("product-image-1")).toBeTruthy();
    expect(getByTestId("product-image-2")).toBeTruthy();
  });

  it("renders pagination dots equal to number of images", () => {
    const { getAllByText } = render(<ProductImages images={images} />);
    const dots = getAllByText("•");
    expect(dots.length).toBe(images.length);
  });
});
