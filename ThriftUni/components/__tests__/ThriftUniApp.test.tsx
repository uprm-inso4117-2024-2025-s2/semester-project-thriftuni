import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import ThriftUniApp from '../../app/(tabs)/main_page';
import { it, expect } from '@jest/globals'; 

describe('ThriftUniApp Main Page', () => {
  // Unit Test: Header Text
  it('renders the header correctly', () => {
    const { getByText } = render(<ThriftUniApp />);
    expect(getByText(/Welcome to/i)).toBeTruthy();
    expect(getByText(/Thrift Uni/i)).toBeTruthy();
  });

  // Unit Test: Search Input
  it('renders search input with correct placeholder', () => {
    const { getByPlaceholderText } = render(<ThriftUniApp />);
    expect(getByPlaceholderText('Search Listings...')).toBeTruthy();
  });

  // Unit Test: Button Labels (Mutation tests for missing/changed buttons)
  it('renders all key buttons with correct labels', () => {
    const { getByText } = render(<ThriftUniApp />);
    expect(getByText('Post Listing')).toBeTruthy();
    expect(getByText('My Listings')).toBeTruthy();
    expect(getByText('View Wishlist')).toBeTruthy();
    expect(getByText('View My Profile')).toBeTruthy();
  });

  // Mutation Test: Button Interactivity
  it('buttons are pressable', () => {
    const { getByText } = render(<ThriftUniApp />);
    fireEvent.press(getByText('Post Listing'));
    fireEvent.press(getByText('My Listings'));
    fireEvent.press(getByText('View Wishlist'));
    fireEvent.press(getByText('View My Profile'));
  });

  // Mutation Test: UI Snapshot
  it('matches UI snapshot (layout, icons, styles)', () => {
    const tree = render(<ThriftUniApp />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  // Integration Test: Navigates to Post Listing
  it('navigates to Post Listing screen on button press', () => {
    const { getByText, queryByText } = render(<ThriftUniApp />);
    fireEvent.press(getByText('Post Listing'));
    expect(queryByText('← Back to Home')).toBeTruthy(); // Indicates screen switched
  });

  // Integration Test: Navigates to My Listings screen
  it('navigates to My Listings screen on button press', () => {
    const { getByText, queryByText } = render(<ThriftUniApp />);
    fireEvent.press(getByText('My Listings'));
    expect(queryByText('← Back to Home')).toBeTruthy();
  });

  // Integration Test: Navigates to Wishlist screen
  it('navigates to Wishlist screen on button press', () => {
    const { getByText, queryByText } = render(<ThriftUniApp />);
    fireEvent.press(getByText('View Wishlist'));
    expect(queryByText('← Back to Home')).toBeTruthy();
  });

  // Integration Test: Navigates to Profile screen
  it('navigates to Profile screen on button press', () => {
    const { getByText, queryByText } = render(<ThriftUniApp />);
    fireEvent.press(getByText('View My Profile'));
    expect(queryByText('← Back to Home')).toBeTruthy();
  });

  // Integration Test: Submitting search input triggers Browse
  it('navigates to Browse screen on search submit', () => {
    const { getByPlaceholderText, queryByText } = render(<ThriftUniApp />);
    const searchInput = getByPlaceholderText('Search Listings...');
    fireEvent.changeText(searchInput, 'Backpack');
    fireEvent(searchInput, 'submitEditing');
    expect(queryByText('← Back to Home')).toBeTruthy();
  });

  // Integration Test: Returns to Home when Back button is pressed
  it('navigates back to Home screen from any section', () => {
    const { getByText, queryByText } = render(<ThriftUniApp />);
    fireEvent.press(getByText('Post Listing'));
    fireEvent.press(getByText('← Back to Home'));
    expect(queryByText('Post Listing')).toBeTruthy(); // Confirm we're back on home screen
  });
});
