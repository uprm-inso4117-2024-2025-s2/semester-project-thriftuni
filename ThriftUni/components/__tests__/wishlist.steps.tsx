import React from 'react';
import { render, fireEvent, waitFor, act } from '@testing-library/react-native';
import WishlistPage from '../../app/(tabs)/WishlistPage';
import { Picker } from '@react-native-picker/picker';

// Replace async timers in fetchWishlist
beforeAll(() => jest.useFakeTimers());
afterAll(() => jest.useRealTimers());

describe('WishlistPage interactions', () => {
  beforeEach(() => jest.clearAllTimers());

  it('filters available items correctly', async () => {
    const utils = render(<WishlistPage />);
    // resolve fetchWishlist timeout
    act(() => { jest.runAllTimers(); });
    // wait for data to load
    await waitFor(() => expect(utils.queryByText('Your wishlist is empty')).toBeNull());

    // filter to available
    const availabilityPicker = utils.UNSAFE_getAllByType(Picker)[0];
    fireEvent(availabilityPicker, 'valueChange', 'available');

    await waitFor(() => {
      // should hide unavailable item
      expect(utils.queryByText('Doe Blanket')).toBeNull();
      // three Remove buttons remain
      expect(utils.getAllByText('Remove').length).toBe(3);
    });
  });

  it('filters unavailable items correctly', async () => {
    const utils = render(<WishlistPage />);
    act(() => { jest.runAllTimers(); });
    await waitFor(() => expect(utils.queryByText('Your wishlist is empty')).toBeNull());

    // filter to unavailable
    const availabilityPicker = utils.UNSAFE_getAllByType(Picker)[0];
    fireEvent(availabilityPicker, 'valueChange', 'unavailable');

    await waitFor(() => {
      expect(utils.getByText('Doe Blanket')).toBeTruthy();
      expect(utils.getAllByText('Remove').length).toBe(1);
    });
  });

  it('sorts by price ascending correctly', async () => {
    const utils = render(<WishlistPage />);
    act(() => { jest.runAllTimers(); });
    await waitFor(() => expect(utils.queryByText('Your wishlist is empty')).toBeNull());

    // sort by price asc
    const sortPicker = utils.UNSAFE_getAllByType(Picker)[1];
    fireEvent(sortPicker, 'valueChange', 'asc');

    await waitFor(() => {
      const titles = utils
        .getAllByText(/Lamp|Bowl|Jewelry|Blanket/)
        .map(node => node.props.children);
      expect(titles[0]).toBe('Miffy Pottery Bowl');
      expect(titles[titles.length - 1]).toBe('Tiffany Lamp');
    });
  });
});