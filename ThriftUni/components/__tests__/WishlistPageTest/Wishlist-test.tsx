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
const mockOnRemove = jest.fn();

describe("WishlistItem Component", () => {
  it("renders correctly", () => {
    const { getByText } = render(<WishlistItem item={mockItem} onRemove={mockOnRemove} />);

    expect(getByText("Test Item")).toBeTruthy();
    expect(getByText("$20.99")).toBeTruthy();
  });

  it("calls onRemove when remove button is pressed", () => {
    const { getByText } = render(<WishlistItem item={mockItem} onRemove={mockOnRemove} />);

    fireEvent.press(getByText("Remove"));

    expect(mockOnRemove).toHaveBeenCalledTimes(1);
    expect(mockOnRemove).toHaveBeenCalledWith("1");
  });
});
