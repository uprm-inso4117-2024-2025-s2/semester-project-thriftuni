import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import FilterMenu from "@/components/ListingsPage/FilterMenu";
import CategoryDropdown from "@/components/ListingsPage/CategoryDropdown";
import { expect, jest, describe, it } from "@jest/globals";
import { View } from 'react-native'
import { Listings } from "@/app/(tabs)/index";

// Mock FontAwesome component to avoid issues with vector icons in tests
jest.mock('@expo/vector-icons', () => ({
  FontAwesome: () => 'FontAwesomeMock',
}));

// Mock Rating component
jest.mock('react-native-ratings', () => {
  const { View } = require('react-native');
  const React = require('react');
  
  return {
    Rating: (props :any) => {
      return React.createElement(
        View, 
        {
          ...props,
          testID: "mock-rating",
          // Forward the onFinishRating callback when parent component interacts with this mock
          onFinishRating: (rating : any) => props.onFinishRating && props.onFinishRating(rating)
        }, 
        props.children
      );
    }
  };
});

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
];

let mockListingData: Listings[] = [
  {
    id: 1,
    title: "Product Title",
    price: 10,
    description: "This is a description for a product.",
    pictures: [
      "https://picsum.photos/200?random=1",
      "https://picsum.photos/200?random=2",
      "https://picsum.photos/200?random=3",
    ],
    img: "",
    latitude: 18.2,
    longitude: -67.2,
    category: "electronics",
    sellerInfo: {
      name: "Pepe",
      location: "Mayaguez, Puerto Rico",
      about: "I'm Pepe",
      rating: 4.5,
      onProfilePress: () => alert("Profile Clicked"),
    },
  },
  {
    id: 2,
    title: "Product Title 2",
    price: 20,
    description: "This is a description for a product.",
    pictures: [
      "https://picsum.photos/200?random=1",
      "https://picsum.photos/200?random=2",
      "https://picsum.photos/200?random=3",
    ],
    img: "",
    latitude: 18.2,
    longitude: -67.2,
    category: "clothing",
    sellerInfo: {
      name: "Pepe",
      location: "Mayaguez, Puerto Rico",
      about: "I'm Pepe",
      rating: 3.5,
      onProfilePress: () => alert("Profile Clicked"),
    },
  },
]; // Mock data for testing

// Mock Implementation for measureInWindow
jest.spyOn(View.prototype, 'measureInWindow').mockImplementation((cb) => {
  cb(18, 113, 357, 50);
});

describe("FilterMenu Component", () => {
  // Test if the sliders update the price and distance
  describe("Price and Distance Sliders", () => {
    it("should update distance value when slider is moved", () => {
      const setDataMock = jest.fn();
      const { getByTestId } = render(<FilterMenu data={mockListingData} setData={setDataMock} />);
      const distanceSlider = getByTestId("distance-slider");
      fireEvent(distanceSlider, 'onSlidingComplete', 10);
      expect(distanceSlider.props.value).toBe(10);
    });

    it("should update price value when slider is moved", () => {
      const setDataMock = jest.fn();
      const { getByTestId } = render(<FilterMenu data={mockListingData} setData={setDataMock} />);
      const priceSlider = getByTestId("price-slider");
      fireEvent(priceSlider, 'onSlidingComplete', 10);
      expect(priceSlider.props.value).toBe(10);
    });
  });

  // Test Category Dropdown functionality
  describe("Category Dropdown", () => {
    it("should open dropdown and show options", async () => {
      const setDataMock = jest.fn();
      const { getByTestId } = render(<FilterMenu data={mockListingData} setData={setDataMock} />);
      fireEvent.press(getByTestId("categories-dropdown"));

      const electronicsOption = getByTestId("electronics");
      await waitFor(() => expect(electronicsOption).toBeDefined());
    });

    it("should select a category when an option is pressed", async () => {
      const setMockFocus = jest.fn();
      const setMockCategory = jest.fn();
      const { getByTestId } = render(
        <CategoryDropdown 
          setDropdownFocus={setMockFocus} 
          dropdownFocus={false} 
          setCategory={setMockCategory} 
          category="" 
          categories={mockCategories} 
        />
      );
      
      fireEvent.press(getByTestId("categories-dropdown"));
      const electronicsOption = getByTestId("Electronics");
      fireEvent.press(electronicsOption);

      await waitFor(() => 
        expect(setMockCategory).toHaveBeenCalledWith(
          expect.objectContaining({value: "Electronics", label: "electronics"})
        )
      );
    });
  });

  // Test filter application and clearing
  describe("Apply and Clear Filters", () => {
    it("should apply filters and update listings", async () => {
      const setDataMock = jest.fn();
      const { getByTestId } = render(<FilterMenu data={mockListingData} setData={setDataMock} />);
      
      // Set price filter to only show items under $15
      const priceSlider = getByTestId("price-slider");
      fireEvent(priceSlider, 'onSlidingComplete', 15);
      
      // Apply filters
      fireEvent.press(getByTestId("apply-filters-button"));
      
      await waitFor(() => {
        expect(setDataMock).toHaveBeenCalled();
        expect(setDataMock).toHaveBeenCalledTimes(1);
        // expect(setDataMock).toHaveBeenLastCalledWith(
        //   expect.arrayContaining([
        //     expect.objectContaining({ price: 10 }),
        //   ])
        // );
      });
    });
    
    it("should clear filters and reset to original data", async () => {
      const setDataMock = jest.fn();
      const { getByTestId } = render(<FilterMenu data={mockListingData} setData={setDataMock} />);
      
      // First apply a filter
      const priceSlider = getByTestId("price-slider");
      fireEvent(priceSlider, 'onSlidingComplete', 15);
      fireEvent.press(getByTestId("apply-filters-button"));
      
      // Then clear filters
      fireEvent.press(getByTestId("clear-filters-button"));
      
      await waitFor(() => {
        // Check the last call to setDataMock was with the original data
        expect(setDataMock).toHaveBeenLastCalledWith(mockListingData);
      });
    });
  });

  // Test seller reputation filter
  describe("Seller Reputation Filter", () => {
    it("should update seller reputation filter and filter listings", async () => {
      const setDataMock = jest.fn();
      const { getByTestId } = render(<FilterMenu data={mockListingData} setData={setDataMock} />);
      
      // Find the rating component by its testID
      const ratingComponent = getByTestId("mock-rating");
      
      // Directly trigger the rating callback with value 4
      fireEvent(ratingComponent, "onFinishRating", 4);
      
      // Apply filters
      fireEvent.press(getByTestId("apply-filters-button"));
      
      await waitFor(() => {
        // The setDataMock should have been called with an array containing only
        // the item with the seller rating ≥ 4
        expect(setDataMock).toHaveBeenCalledWith([
          expect.objectContaining({ 
            id: 1,
            sellerInfo: expect.objectContaining({ rating: 4.5 })
          })
        ]);
        
        // Alternative more flexible approach - check that the filtered results
        // include the high-rated seller but not the low-rated one
        const lastCallArg : any= setDataMock.mock.calls[setDataMock.mock.calls.length - 1][0];
        expect(lastCallArg.length).toBe(1);
        expect(lastCallArg[0].id).toBe(1);
        expect(lastCallArg.some((item : any) => item.id === 2)).toBe(false);
      });
    });
  });
});