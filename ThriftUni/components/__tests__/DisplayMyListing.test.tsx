import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import DisplayMyListing from '../../app/(tabs)/my_listings';
import * as mockApi from '../../mock_backend/mockApi'; // Path to your mockApi

// Mocked Listings Data
const mockListings = [
  {
    id: '1',
    name: 'Test Item 1',
    details: 'Details 1',
    price: '$10.00',
    status: 'Pending',
    photos: ['https://example.com/photo1.jpg']
  },
  {
    id: '2',
    name: 'Test Item 2',
    details: 'Details 2',
    price: '$20.00',
    status: 'Sold',
    photos: ['https://example.com/photo2.jpg']
  }
];

// Mock API functions
jest.spyOn(mockApi, 'getListings').mockImplementation(async () => mockListings);
jest.spyOn(mockApi, 'deleteListing').mockImplementation(async (id) => true);
jest.spyOn(mockApi, 'updateListing').mockImplementation(async (id, updatedData) => ({
  ...updatedData,
  id
}));

test('fetches and displays listings on load', async () => {
  const { getByText, findByText } = render(<DisplayMyListing />);

  // Wait for listings to load
  const item1 = await findByText('Test Item 1');
  const item2 = await findByText('Test Item 2');

  expect(item1).toBeTruthy();
  expect(item2).toBeTruthy();
});

test('filters listings by Sold status', async () => {
  const { findByText, getByText, queryByText } = render(<DisplayMyListing />);

  await findByText('Test Item 1'); // Wait for data

  // Click filter button (initially "All")
  const filterButton = getByText('All');
  fireEvent.press(filterButton);

  // Should now be filtered to 'Sold' items
  expect(queryByText('Test Item 1')).toBeNull(); // Should be hidden
  expect(getByText('Test Item 2')).toBeTruthy(); // Still visible
});

test('deletes a listing when Delete button is pressed', async () => {
  const { findByText, getAllByText, queryByText } = render(<DisplayMyListing />);

  await findByText('Test Item 1'); // Wait for data

  const editModeButton = getAllByText('Edit')[0];
  fireEvent.press(editModeButton);

  const deleteButtons = getAllByText('Delete');
  fireEvent.press(deleteButtons[0]);

  // Wait for UI to update
  await waitFor(() => {
    expect(queryByText('Test Item 1')).toBeNull();
  }, { timeout: 3000 });
});


test('edits a listing and saves changes', async () => {
  const { findByText, getAllByText, getByPlaceholderText, getByText } = render(<DisplayMyListing />);

  await findByText('Test Item 1'); // Wait for render

  // Enter editing mode
  const editModeButton = getAllByText('Edit')[0];
  fireEvent.press(editModeButton);

  const editButtons = getAllByText('Edit');
  fireEvent.press(editButtons[1]); // Click Item 1's Edit button

  const titleInput = getByPlaceholderText('Title');
  fireEvent.changeText(titleInput, 'Updated Title');

  const saveButton = getByText('Save Changes');
  fireEvent.press(saveButton);

  await findByText('Updated Title'); // Wait for update
  expect(getByText('Updated Title')).toBeTruthy();
});
