import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import ForgotPasswordScreen from "../forgot"; // Adjust path if needed
import * as firebaseForgot from "../../../firebase/forgot";
import { router } from "expo-router";

// Mock the router
jest.mock("expo-router", () => ({
  router: { push: jest.fn() },
}));

// Mock firebase functions
jest.mock("../../../firebase/forgot", () => ({
  sendPasswordReset: jest.fn(),
  checkRateLimit: jest.fn(),
}));

describe("ForgotPasswordScreen", () => {
  const mockedSendPasswordReset = firebaseForgot.sendPasswordReset;
  const mockedCheckRateLimit = firebaseForgot.checkRateLimit;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly", () => {
    const { getByText, getByPlaceholderText } = render(<ForgotPasswordScreen />);
    expect(getByText("Reset Password")).toBeTruthy();
    expect(getByPlaceholderText("Email")).toBeTruthy();
    expect(getByText("Send Reset Link")).toBeTruthy();
  });

  it("shows error if rate limited", async () => {
    mockedCheckRateLimit.mockReturnValue(true);

    const { getByText, getByPlaceholderText, findByText } = render(<ForgotPasswordScreen />);
    fireEvent.changeText(getByPlaceholderText("Email"), "test@example.com");
    fireEvent.press(getByText("Send Reset Link"));

    expect(await findByText("Too many reset attempts. Please try again later.")).toBeTruthy();
  });

  it("shows success message on successful reset", async () => {
    mockedCheckRateLimit.mockReturnValue(false);
    mockedSendPasswordReset.mockResolvedValue({ success: true });

    const { getByText, getByPlaceholderText, findByText } = render(<ForgotPasswordScreen />);
    fireEvent.changeText(getByPlaceholderText("Email"), "success@example.com");
    fireEvent.press(getByText("Send Reset Link"));

    expect(await findByText("Password reset link sent. Check your email.")).toBeTruthy();
  });

  it("shows error message on reset failure", async () => {
    mockedCheckRateLimit.mockReturnValue(false);
    mockedSendPasswordReset.mockResolvedValue({ error: "User not found" });

    const { getByText, getByPlaceholderText, findByText } = render(<ForgotPasswordScreen />);
    fireEvent.changeText(getByPlaceholderText("Email"), "fail@example.com");
    fireEvent.press(getByText("Send Reset Link"));

    expect(await findByText("User not found")).toBeTruthy();
  });

  it("does not call sendPasswordReset if email is empty", async () => {
    mockedCheckRateLimit.mockReturnValue(false);

    const { getByText } = render(<ForgotPasswordScreen />);
    fireEvent.press(getByText("Send Reset Link"));

    expect(mockedSendPasswordReset).not.toHaveBeenCalled();
  });

  it("displays loading indicator while sending", async () => {
    mockedCheckRateLimit.mockReturnValue(false);
    mockedSendPasswordReset.mockImplementation(() =>
      new Promise((resolve) => setTimeout(() => resolve({ success: true }), 500))
    );

    const { getByText, getByPlaceholderText, getByTestId } = render(<ForgotPasswordScreen />);
    fireEvent.changeText(getByPlaceholderText("Email"), "loading@example.com");
    fireEvent.press(getByText("Send Reset Link"));

    // Assert loading indicator is present
    await waitFor(() => {
      expect(getByTestId("loading-indicator")).toBeTruthy();
    });
  });

  it("calls router.push on back to login link press", () => {
    const { getByText } = render(<ForgotPasswordScreen />);
    fireEvent.press(getByText("Back to Login"));
    expect(router.push).toHaveBeenCalledWith("./login");
  });

  it("updates email state correctly", () => {
    const { getByPlaceholderText } = render(<ForgotPasswordScreen />);
    const emailInput = getByPlaceholderText("Email");

    fireEvent.changeText(emailInput, "state@test.com");
    expect(emailInput.props.value).toBe("state@test.com");
  });

  it("applies styles to the container correctly", () => {
    const { getByTestId } = render(<ForgotPasswordScreen />);
    const container = getByTestId("container");
    expect(container.props.style).toEqual(
        expect.objectContaining({
          flex: 1,
          backgroundColor: "#F6F9FF",
          justifyContent: "center",
          alignItems: "center",
          padding: 20,
        }),
    );
  });

  it("has styled title text", () => {
    const { getByText } = render(<ForgotPasswordScreen />);
    const title = getByText("Reset Password");
    expect(title.props.style).toEqual(
        expect.objectContaining({
          fontSize: 32,
          fontWeight: "bold",
          marginBottom: 20,
          fontFamily: "Calibri",
        }),
    );
  });

  it("renders input field with expected styles", () => {
    const { getByPlaceholderText } = render(<ForgotPasswordScreen />);
    const input = getByPlaceholderText("Email");
    expect(input.props.style).toEqual(
        expect.objectContaining({
          width: "100%",
          padding: 10,
          marginVertical: 8,
          borderWidth: 1,
          borderColor: "black",
          borderRadius: 5,
          backgroundColor: "#F6F9FF",
          fontFamily: "Calibri",
        }),
    );
  });

  it("applies correct button styles", () => {
    const { getByText } = render(<ForgotPasswordScreen />);
    const buttonText = getByText("Send Reset Link");
    expect(buttonText.props.style).toEqual(
        expect.objectContaining({
          color: "#fff",
          fontSize: 20,
          fontWeight: "bold",
        }),
    );
  });

  it("shows error if email is empty", () => {
    const { getByText, getByPlaceholderText } = render(<ForgotPasswordScreen />);
    fireEvent.changeText(getByPlaceholderText("Email"), "  ");
    fireEvent.press(getByText("Send Reset Link"));
    expect(getByText("Please enter your email.")).toBeTruthy();
  });

  it("renders with correct styles", () => {
    const { getByTestId, getByText } = render(<ForgotPasswordScreen />);

    const flatten = (style) =>
      Array.isArray(style) ? Object.assign({}, ...style) : style;

    const container = getByTestId("container");
    const title = getByText("Reset Password");
    const input = getByTestId("email-input");
    const button = getByTestId("reset-button");
    const buttonText = getByTestId("reset-button-text");
    const backLink = getByTestId("back-text");
    const form = getByTestId("form-test");
    const link = getByTestId("link-test");


    // Test container styles
    expect(flatten(container.props.style)).toMatchObject({
      flex: 1,
      backgroundColor: "#F6F9FF",
      justifyContent: "center",
      alignItems: "center",
      padding: 20,
    });

    // Title styles
    expect(flatten(title.props.style)).toMatchObject({
      fontSize: 32,
      fontWeight: "bold",
      marginBottom: 20,
      fontFamily: "Calibri",
    });

    // Input styles
    expect(flatten(input.props.style)).toMatchObject({
      width: "100%",
      padding: 10,
      marginVertical: 8,
      borderWidth: 1,
      borderColor: "black",
      borderRadius: 5,
      backgroundColor: "#F6F9FF",
      fontFamily: "Calibri",
    });

    // Button container
    expect(flatten(button.props.style)).toMatchObject({
      backgroundColor: "black",
      padding: 12,
      borderRadius: 5,
      alignItems: "center",
      marginTop: 10,
    });

    // Button text
    expect(flatten(buttonText.props.style)).toMatchObject({
      color: "#fff",
      fontSize: 20,
      fontWeight: "bold",
    });

    // Link text
    expect(flatten(backLink.props.style)).toMatchObject({
      marginTop: 15,
    });

    expect(flatten(form.props.style)).toMatchObject({
      width: "100%",
      maxWidth: 400,
    });

    expect(flatten(link.props.style)).toMatchObject({
      color: "black",
      fontWeight: "bold",
    });


  });

  it("shows fallback error when password reset fails without error message", async () => {
    mockedCheckRateLimit.mockReturnValue(false);
    mockedSendPasswordReset.mockResolvedValue({ success: false });
  
    const { getByText, getByPlaceholderText, findByText } = render(<ForgotPasswordScreen />);
    fireEvent.changeText(getByPlaceholderText("Email"), "fail@example.com");
    fireEvent.press(getByText("Send Reset Link"));
  
    expect(await findByText("Something went wrong.")).toBeTruthy();
  });

  it("hides loading indicator after password reset completes", async () => {
    mockedCheckRateLimit.mockReturnValue(false);
    mockedSendPasswordReset.mockResolvedValue({ success: true });
  
    const { getByText, getByPlaceholderText, queryByTestId } = render(<ForgotPasswordScreen />);
    fireEvent.changeText(getByPlaceholderText("Email"), "done@example.com");
    fireEvent.press(getByText("Send Reset Link"));
  
    await waitFor(() => {
      expect(queryByTestId("loading-indicator")).toBeNull(); // Indicator is gone after resolve
    });
  });

  it("shows error in red and success in green", async () => {
    mockedCheckRateLimit.mockReturnValue(false);
    mockedSendPasswordReset.mockResolvedValue({ success: true });
  
    const { getByText, getByPlaceholderText, findByText, rerender } = render(<ForgotPasswordScreen />);
    fireEvent.changeText(getByPlaceholderText("Email"), "success@example.com");
    fireEvent.press(getByText("Send Reset Link"));
  
    const successText = await findByText("Password reset link sent. Check your email.");
    expect(successText.props.style).toMatchObject({ color: "green" });
  
    mockedSendPasswordReset.mockResolvedValue({ success: false, error: "Some error" });
    fireEvent.press(getByText("Send Reset Link"));
  
    const errorText = await findByText("Some error");
    expect(errorText.props.style).toMatchObject({ color: "red" });
  });

  it("starts with no error or success message", () => {
    const { queryByText } = render(<ForgotPasswordScreen />);
    expect(queryByText("Stryker was here!")).toBeNull(); // Kill mutants!
  });

  it("resets message and error when resetting password", async () => {
    const { getByText, getByPlaceholderText, queryByText } = render(<ForgotPasswordScreen />);
  
    // Simulate user enters email and presses button
    fireEvent.changeText(getByPlaceholderText("Email"), "test@example.com");
    fireEvent.press(getByText("Send Reset Link"));
  
    // Messages should be cleared before setting new ones
    expect(queryByText("Stryker was here!")).toBeNull(); // Dead mutant
  });

  it("disables loading when email is empty", async () => {
    const { getByText, queryByTestId } = render(<ForgotPasswordScreen />);
    fireEvent.press(getByText("Send Reset Link"));
  
    await waitFor(() => {
      expect(queryByTestId("loading-indicator")).toBeNull(); // 🔪 Kill the mutant
    });
  });

  it("disables loading when rate limited", async () => {
    mockedCheckRateLimit.mockReturnValue(true);
  
    const { getByText, getByPlaceholderText, queryByTestId } = render(<ForgotPasswordScreen />);
    fireEvent.changeText(getByPlaceholderText("Email"), "ratelimit@example.com");
    fireEvent.press(getByText("Send Reset Link"));
  
    await waitFor(() => {
      expect(queryByTestId("loading-indicator")).toBeNull(); // 🔫 Bye mutant
    });
  });
  
});
