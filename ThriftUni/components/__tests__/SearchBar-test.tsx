import  SearchBar  from "@/components/ListingsPage/SearchBar";
import { expect, test, jest, describe, it } from "@jest/globals";
import {render, fireEvent, waitFor} from "@testing-library/react-native";
import {Listings} from "@/app/(tabs)/index";

let mockListingData : Listings[] = [
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
      onProfilePress: () => alert("Profile Clicked"),
    },
  },
  {
    id: 2,
    title: "Example Product",
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
      onProfilePress: () => alert("Profile Clicked"),
    },
  },
] // Mock data for testing

const setMockData = jest.fn();
// Mock Implementation for FontAwesome
jest.mock('@expo/vector-icons', () => {
  return {
    FontAwesome: () => "FontAwesome"
  }
}
);

describe("SearchBar", () => {
  it("renders correctly", () => {
    const { getByPlaceholderText } = render(
      <SearchBar setListings={setMockData} listings={mockListingData} />
    );
    const searchInput = getByPlaceholderText("Search...");
    expect(searchInput).toBeTruthy();
  });
  it("filters listings based on search input", async () => {
    const { getByPlaceholderText, getByText } = render(
      <SearchBar setListings={setMockData} listings={mockListingData} />
    );
    const searchInput = getByPlaceholderText("Search...");
    fireEvent.changeText(searchInput, "Product Title");
    await waitFor(() => {
      expect(setMockData).toHaveBeenCalledWith([
        mockListingData[0],
      ]);
    });
  });
});