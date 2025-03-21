// __tests__/components.test.tsx

import React from 'react';
import { render } from '@testing-library/react-native';
import {describe, expect, it} from "@jest/globals";

// Import all your components
import DisplayMyListing from '../../app/(tabs)/my_listings';
import ListItem from '../../app/(tabs)/ListItem';
import WishlistPage from '../../app/(tabs)/Profile';
import Profile from '../../app/(tabs)/Profile';
import ThriftUniApp from '@/app/(tabs)/main_page';

// My Listings Test
it('renders My Listings component without crashing', () => {
  const { getByText } = render(<DisplayMyListing />);
  expect(getByText('My Listing')).toBeTruthy();
});

// List Item (Post Listing) Test
it('renders ListItem component without crashing', () => {
  const { getByText } = render(<ListItem />);
  expect(getByText('Sell an item')).toBeTruthy();
});

// Wishlist Page Test
it('renders WishlistPage component without crashing', () => {
  const { getByText } = render(<WishlistPage />);
  // It may depend on what renders immediately; placeholder check:
  expect(getByText(/Your wishlist is empty|Tiffany Lamp/i)).toBeTruthy();
});

// Profile Page Test
it('renders Profile component without crashing', () => {
  const { getByText } = render(<Profile />);
  expect(getByText('HolaAdios123')).toBeTruthy();
});

// Main Page Test
it('renders Main Page component without crashing', () => {
    const { getByText } = render(<ThriftUniApp />);
    expect(getByText('Welcome to Thrift Uni')).toBeTruthy();
  });