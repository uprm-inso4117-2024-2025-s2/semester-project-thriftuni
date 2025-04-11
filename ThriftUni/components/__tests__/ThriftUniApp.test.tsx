import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import ThriftUniApp from '../../app/(tabs)/main_page';

describe('ThriftUniApp Main Page', () => {
  // Unit Test: Header Text
  it('renders the header correctly', () => {
    const { getByText } = render(<ThriftUniApp />);
    expect(getByText(/Welcome to/i)).toBeTruthy();  // Mutation-safe
    expect(getByText(/Thrift Uni/i)).toBeTruthy();  // Will fail if text is mutated
  });

  // Unit Test: Search Input
  it('renders search input with correct placeholder', () => {
    const { getByPlaceholderText } = render(<ThriftUniApp />);
    expect(getByPlaceholderText('Search Listings...')).toBeTruthy();  // Mutation-safe
  });

  // Unit Test: Button Labels (Mutation tests for missing/changed buttons)
  it('renders all key buttons with correct labels', () => {
    const { getByText } = render(<ThriftUniApp />);
    expect(getByText('Post Listing')).toBeTruthy();       // Catches removal/mutation
    expect(getByText('View Drafts')).toBeTruthy();
    expect(getByText('Read Your Reviews')).toBeTruthy();
    expect(getByText('View Saved Posts')).toBeTruthy();
  });

  // Mutation Test: Button Interactivity
  it('buttons are pressable', () => {
    const { getByText } = render(<ThriftUniApp />);
    const postButton = getByText('Post Listing');
    fireEvent.press(postButton);  // Not connected to logic yet, but ensures it's pressable
    expect(postButton).toBeTruthy();
  });

  // Mutation Test: UI Snapshot
  it('matches UI snapshot (layout, icons, styles)', () => {
    const tree = render(<ThriftUniApp />).toJSON();
    expect(tree).toMatchSnapshot();  // Catches mutations in layout, styles, icons, etc.
  });
});
