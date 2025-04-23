import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import ListItem from "../../app/(tabs)/ListItem";

// Optionally mock child components to isolate ListItem's behavior
jest.mock("@/components/ListAnItem/ImageUploader", () => () => null);
jest.mock("@/components/ListAnItem/Selector", () => {
  const { Text } = jest.requireActual("react-native");
  return ({
    label,
    value,
    onSelect,
  }: {
    label: string;
    value: any;
    onSelect: (value: any) => void;
  }) => <Text>{label}</Text>; // Use Text from react-native
});
jest.mock("@/components/ListAnItem/BrandInput", () => () => null);
jest.mock("@/components/ListAnItem/PriceInput", () => () => null);
jest.mock("@/components/ListAnItem/Buttons", () => () => null);

describe("ListItem", () => {
  it("renders correctly", () => {
    const { getByText, getByPlaceholderText } = render(<ListItem />);
    expect(getByText("Sell an item")).toBeTruthy();
    expect(getByPlaceholderText("Enter description ...")).toBeTruthy();
  });

  it("updates description on input", () => {
    const { getByPlaceholderText } = render(<ListItem />);
    const input = getByPlaceholderText("Enter description ...");
    fireEvent.changeText(input, "Nice used jacket");
    expect(input.props.value).toBe("Nice used jacket");
  });

  it("shows alert on back button press", () => {
    global.alert = jest.fn();
    const { getByText } = render(<ListItem />);
    const backButton = getByText("←");
    fireEvent.press(backButton);
    expect(global.alert).toHaveBeenCalledWith("Pressed on Back button.");
  });
});
