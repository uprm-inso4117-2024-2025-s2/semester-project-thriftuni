import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import ListItem from "../ListAnItem/ListItem";

describe("ListItem Component", () => {
  it("renders the Sell an Item screen correctly", async () => {
    const { getByText, getByPlaceholderText } = render(<ListItem />);

    expect(getByText("Sell an item")).toBeTruthy();
    expect(getByText("Description")).toBeTruthy();
    expect(getByPlaceholderText("Enter description ...")).toBeTruthy();
  });

  it("updates the description input when typing", async () => {
    const { getByPlaceholderText } = render(<ListItem />);
    const input = getByPlaceholderText("Enter description ...");

    fireEvent.changeText(input, "Test description");
    expect(input.props.value).toBe("Test description");
  });

  it("renders Save to Draft and Post Listing buttons", async () => {
    const { getByText } = render(<ListItem />);
    expect(getByText("Save to drafts")).toBeTruthy();
    expect(getByText("Post listing")).toBeTruthy();
  });
});
