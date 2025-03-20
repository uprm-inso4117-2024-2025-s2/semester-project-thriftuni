import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import FilterMenu from "@/components/ListingsPage/FilterMenu";
import CategoryDropdown  from "@/components/ListingsPage/CategoryDropdown";
import { expect, test, jest, describe, it } from "@jest/globals";
import { View } from 'react-native'
import { Listings } from "@/app/(tabs)/listings";

// Mock Implementation for FontAwesome
jest.mock('@expo/vector-icons', () => {
  return {
    FontAwesome: () => "FontAwesome"
  }
}
);

// Mock setData function
const setMockData = jest.fn();

// Mock Categories for testing
const mockCategories = [
  {
    value: "Electronics",
    label: "electronics",
  },
  {
    value: "Clothing",
    label: "clothing",
  },
]

let mockListingData : Listings[] = [
  {
    id: 1,
    title: "Product Title",
    price: 10,
    img: "",
    latitude: "18.2",
    longitude: "-67.2",
    category: "electronics",
    sellerRep: 5,
  },
] // Mock data for testing

// Mock Implementation for measureInWindow
jest.spyOn(View.prototype, 'measureInWindow').mockImplementation((cb) => {
    cb(18, 113, 357, 50)
});



// Test if the sliders update the price and distance
describe("FilterMenu price and distance sliders", () => {
it("Distance Slider updates state correctly", () => {
  const { getByTestId } = render(<FilterMenu data={mockListingData} setData={setMockData} />);
  const distanceSlider = getByTestId("distance-slider");
  fireEvent(distanceSlider, 'onSlidingComplete',10);
  expect(distanceSlider.props.value).toBe(10);
}),
it("Price Slider updates state correctly", () => {
  const { getByTestId } = render(<FilterMenu data={mockListingData} setData={setMockData}/>);
  const priceSlider = getByTestId("price-slider");
  fireEvent(priceSlider, 'onSlidingComplete', 10);
  expect(priceSlider.props.value).toBe(10);
});
});

// Test if the dropdown opens and the options are displayed and a category is selected
describe("Category Dropdown", () => {
  it("should open dropdown", async () => {
    const setDataMock = jest.fn((data) => console.log(data));
    const { getByTestId } = render(<FilterMenu data={mockListingData} setData={setDataMock} />);
    fireEvent.press(getByTestId("categories-dropdown"));

    const electronicsOption = getByTestId("electronics");
    await waitFor(() => expect(electronicsOption).toBeDefined());
    
  }),
  it("should select category", async () => {
    const setMockFocus = jest.fn();
    const setMockCategory = jest.fn();
    const { getByTestId } = render(<CategoryDropdown setDropdownFocus={setMockFocus} dropdownFocus={false} setCategory={setMockCategory} category="" categories={mockCategories} />);
    fireEvent.press(getByTestId("categories-dropdown"));
    const electronicsOption = getByTestId("Electronics");
    fireEvent.press(electronicsOption);

    await waitFor(() => expect(setMockCategory).toHaveBeenCalledWith(expect.objectContaining({value: "Electronics", label: "electronics"})));    
  })
});

// Test if the apply filters and clear filters buttons call the setData function
describe("FilterMenu apply filters and clears them" , () => {
  it ("should apply filters", async () => {
    const setDataMock = jest.fn();
    const { getByTestId } = render(<FilterMenu data={mockListingData} setData={setDataMock} />);
    fireEvent.press(getByTestId("apply-filters-button"));
    await waitFor(() => expect(setDataMock).toHaveBeenCalled());
  }
  ),
  it ("should clear filters", async () => {
    const setDataMock = jest.fn();
    const { getByTestId } = render(<FilterMenu data={mockListingData} setData={setDataMock} />);
    fireEvent.press(getByTestId("clear-filters-button"));
    await waitFor(() => expect(setDataMock).toHaveBeenCalled());
  })   
});

describe("FilterMenu Ratings Component", () => {
  it("should update seller reputation when rating is changed", async () => {
    const setDataMock = jest.fn();
    const { getByText, queryByText } = render(<FilterMenu data={mockListingData} setData={setDataMock} />);
    expect(getByText("Seller Reputation")).toBeTruthy();
    const newRating = 3;
    fireEvent(getByText("Seller Reputation").parent, "onFinishRating", newRating);
    await waitFor(() => expect(queryByText("Seller Reputation")).toBeTruthy());
  });
});