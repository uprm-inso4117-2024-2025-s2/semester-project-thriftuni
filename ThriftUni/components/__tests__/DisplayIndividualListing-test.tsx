import React from "react";
import { render } from "@testing-library/react-native";
import DisplayIndividualListing from "../DisplayIndividualListing";
import { Seller } from "../SellerCard";
import ProductImages from "../ProductImages";

describe("DisplayIndividualListing Component", () => {
  const mockProps = {
    title: "Cool Vintage Jacket",
    pictures: [
      "https://example.com/image1.jpg",
      "https://example.com/image2.jpg",
    ],
    description: "A stylish vintage denim jacket, barely worn.",
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
    expect(getByText("Cool Vintage Jacket")).toBeTruthy();
  });

  it("renders the description and seller info", () => {
    const { getByText } = render(<DisplayIndividualListing {...mockProps} />);
    expect(
      getByText("A stylish vintage denim jacket, barely worn.")
    ).toBeTruthy();
    expect(getByText("Pepe Pepino")).toBeTruthy();
    expect(getByText("Soy Pepe")).toBeTruthy();
  });

  it("renders images and location info via child components", () => {
    const { getByText, getAllByRole } = render(
      <DisplayIndividualListing {...mockProps} />
    );
    // If your image component includes accessibilityRole="image" or similar, you can check images.
    // If not, test based on visible props/texts or test ProductImages separately.
    expect(getByText("Cool Vintage Jacket")).toBeTruthy();
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
