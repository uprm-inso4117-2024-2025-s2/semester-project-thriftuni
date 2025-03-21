import { render, fireEvent } from "@testing-library/react-native";
import WishlistItem from "../../Wishlist/WishlistItem";

// Mock Data
const mockItem = {
  id: "1",
  title: "Test Item",
  price: 20.99,
  available: true,
  image: "", // No need for an actual image in the test
};

// Mock function to track remove action
const mockOnRemove = (id: string) => {
  console.log(`Item removed: ${id}`);
};

// **Basic Test: Render and Remove Button**
export function testWishlistItem() {
  const { getByText } = render(<WishlistItem item={mockItem} onRemove={mockOnRemove} />);

  console.log("Rendered item:", getByText("Test Item").props.children);
  console.log("Rendered price:", getByText("$20.99").props.children);

  fireEvent.press(getByText("Remove"));
  console.log("Remove button clicked.");
}

// Run the test
testWishlistItem();
