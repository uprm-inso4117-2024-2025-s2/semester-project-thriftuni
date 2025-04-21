import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
// ⚠️ Adjust the import path if your Wishlist component lives elsewhere
import WishlistScreen from '../../app/(tabs)/WishlistPage'; // Adjust the import path as necessary

/**
 * Mutation‑oriented test‑suite for the Wishlist feature.
 * Mirrors the style of the previous Main‑Page mutation tests you provided:
 *   – Paired regex + exact string assertions
 *   – Placeholder queries
 *   – Button‑label existence checks
 *   – Pressability sanity check
 *   – Snapshot catch‑all
 * Update any text/placeholder strings to match your actual component labels.
 */

describe('Wishlist Screen', () => {
  // Unit Test: Header Text
  it('renders the header correctly', () => {
    const { getByText } = render(<WishlistScreen />);
    expect(getByText(/Wishlist/i)).toBeTruthy();   // Mutation‑safe (case‑insensitive)
    expect(getByText('My Wishlist')).toBeTruthy(); // Will fail if header text mutates
  });

  // Unit Test: Button Labels (mutation detection for renames/removals)
    // Unit Test: Key Controls (labels present)
    it('renders key controls with correct labels', () => {
        const { getByText } = render(<WishlistScreen />);
        // Header buttons
        expect(getByText('←')).toBeTruthy();   // Back arrow
        expect(getByText('Sort')).toBeTruthy();
        // Default Picker labels ensure filter/sort pickers are rendered
      });
    

  // Mutation Test: Button Interactivity
  it('sort button is pressable', () => {
    const { getByText } = render(<WishlistScreen />);
    const sortButton = getByText('Sort');
    fireEvent.press(sortButton); // Ensures pressability
    expect(sortButton).toBeTruthy();
  });

  // Mutation Test: UI Snapshot
  it('matches UI snapshot (layout, icons, styles)', () => {
    const tree = render(<WishlistScreen />).toJSON();
    expect(tree).toMatchSnapshot(); // Detects layout/style/icon mutations
  });
});
