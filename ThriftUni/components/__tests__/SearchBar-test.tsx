import React, { useState } from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import SearchBar from '@/components/ListingsPage/SearchBar';


// Mock FontAwesome component to avoid issues with vector icons in tests
jest.mock('@expo/vector-icons', () => ({
  FontAwesome: () => 'FontAwesomeMock',
}));

describe('SearchBar Component', () => {
  // Mock data for testing
  const mockListings = [
    {
      id: 1,
      title: "Product Title",
      price: 10,
      category: "electronics",
    },
    {
      id: 2,
      title: "Example Product",
      price: 20,
      category: "clothing",
    },
    {
      id: 3,
      title: "Another Item",
      price: 15,
      category: "books",
    }
  ];

  const setListingsMock = jest.fn();

  beforeEach(() => {
    // Reset mock before each test
    setListingsMock.mockClear();
  });

  it('renders correctly with search input and icon', () => {
    const { getByPlaceholderText, getByText } = render(
      <SearchBar setListings={setListingsMock} listings={mockListings} />
    );
    
    const searchInput = getByPlaceholderText("Search...");
    
    expect(searchInput).toBeTruthy();
  });

  it('filters listings when search text is entered and submitted', async () => {
    const { getByPlaceholderText } = render(
      <SearchBar setListings={setListingsMock} listings={mockListings} />
    );
    
    const searchInput = getByPlaceholderText("Search...");
    
    // Input search text and trigger submit
    fireEvent.changeText(searchInput, "Product Title");
    fireEvent(searchInput, 'onEndEditing');
    
    await waitFor(() => {
      // Check if setListings was called with filtered results
      expect(setListingsMock).toHaveBeenCalledWith([mockListings[0]]);
    });
  });
  
  it('handles partial text matches correctly', async () => {
    const { getByPlaceholderText } = render(
      <SearchBar setListings={setListingsMock} listings={mockListings} />
    );
    
    const searchInput = getByPlaceholderText("Search...");
    
    // Input partial search text
    fireEvent.changeText(searchInput, "product");
    fireEvent(searchInput, 'onEndEditing');
    
    await waitFor(() => {
      // Should match both "Product Title" and "Example Product"
      expect(setListingsMock).toHaveBeenCalledWith([mockListings[0], mockListings[1]]);
    });
  });
  
  it('handles case-insensitive search correctly', async () => {
    const { getByPlaceholderText } = render(
      <SearchBar setListings={setListingsMock} listings={mockListings} />
    );
    
    const searchInput = getByPlaceholderText("Search...");
    
    // Input search text with different case
    fireEvent.changeText(searchInput, "PRODUCT");
    fireEvent(searchInput, 'onEndEditing');
    
    await waitFor(() => {
      // Should match both items with "product" in the title regardless of case
      expect(setListingsMock).toHaveBeenCalledWith([mockListings[0], mockListings[1]]);
    });
  });
  
  it('returns all listings when search text is empty', async () => {
    const { getByPlaceholderText } = render(
      <SearchBar setListings={setListingsMock} listings={mockListings} />
    );
    
    const searchInput = getByPlaceholderText("Search...");
    
    // First filter to something
    fireEvent.changeText(searchInput, "Product");
    fireEvent(searchInput, 'onEndEditing');
    
    // Clear search and submit
    fireEvent.changeText(searchInput, "");
    fireEvent(searchInput, 'onEndEditing');
    
    await waitFor(() => {
      // The second call should reset to original listings
      expect(setListingsMock).toHaveBeenLastCalledWith(mockListings);
    });
  });
  
  it('returns no results when no matches are found', async () => {
    const { getByPlaceholderText } = render(
      <SearchBar setListings={setListingsMock} listings={mockListings} />
    );
    
    const searchInput = getByPlaceholderText("Search...");
    
    // Input search text with no matches
    fireEvent.changeText(searchInput, "XYZ123");
    fireEvent(searchInput, 'onEndEditing');
    
    await waitFor(() => {
      // Should return empty array when no matches
      expect(setListingsMock).toHaveBeenCalledWith([]);
    });
  });
  
  it('maintains the original listings for future searches', async () => {
    const { getByPlaceholderText } = render(
      <SearchBar setListings={setListingsMock} listings={mockListings} />
    );
    
    const searchInput = getByPlaceholderText("Search...");
    
    // Search with one term
    fireEvent.changeText(searchInput, "Product");
    fireEvent(searchInput, 'onEndEditing');
    
    // Search with different term
    fireEvent.changeText(searchInput, "Another");
    fireEvent(searchInput, 'onEndEditing');
    
    await waitFor(() => {
      // Should show the third item only
      expect(setListingsMock).toHaveBeenLastCalledWith([mockListings[2]]);
    });
    
    // Clear search to verify original list is preserved
    fireEvent.changeText(searchInput, "");
    fireEvent(searchInput, 'onEndEditing');
    
    await waitFor(() => {
      expect(setListingsMock).toHaveBeenLastCalledWith(mockListings);
    });
  });
});