// mock_backend/mockApi.ts
import listingsData from './listingsData.json';

let listings = [...listingsData]; // In-memory mock database

export const getListings = async () => {
  return [...listings]; // Simulate async fetch
};

export const updateListing = async (id: string, updatedData: any) => {
  listings = listings.map(listing =>
    listing.id === id ? { ...listing, ...updatedData } : listing
  );
  return listings.find(listing => listing.id === id);
};

export const deleteListing = async (id: string) => {
  listings = listings.filter(listing => listing.id !== id);
  return true;
};
