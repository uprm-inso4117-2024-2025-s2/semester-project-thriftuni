import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import Signup from "../signup";
import { registerUser } from "../../../firebase/signup";
import { Alert } from "react-native";

jest.mock("../../../firebase/signup", () => ({
  registerUser: jest.fn(),
}));

jest.mock("expo-router", () => ({
  router: {
    push: jest.fn(),
  },
}));

// Datos de prueba
const VALID_NAME = "Test User";
const VALID_USERNAME = "testuser";
const VALID_EMAIL = "test@example.com";
const VALID_PASSWORD = "securepassword";

// Helper para rellenar el formulario
const fillForm = (getByPlaceholderText) => {
  fireEvent.changeText(getByPlaceholderText("Name"), VALID_NAME);
  fireEvent.changeText(getByPlaceholderText("Username"), VALID_USERNAME);
  fireEvent.changeText(getByPlaceholderText("Email"), VALID_EMAIL);
  fireEvent.changeText(getByPlaceholderText("Password"), VALID_PASSWORD);
};

describe("SignupScreen", () => {
  beforeEach(() => {
    jest.clearAllMocks(); // <-- Limpia mocks entre tests
  });

  it("renders correctly", () => {
    const { getByPlaceholderText, getByTestId } = render(<Signup />);
    expect(getByPlaceholderText("Name")).toBeTruthy();
    expect(getByPlaceholderText("Username")).toBeTruthy();
    expect(getByPlaceholderText("Email")).toBeTruthy();
    expect(getByPlaceholderText("Password")).toBeTruthy();
    expect(getByTestId("signup-button")).toBeTruthy();
  });

  it("updates input values correctly", () => {
    const { getByPlaceholderText } = render(<Signup />);
    const nameInput = getByPlaceholderText("Name");
    const usernameInput = getByPlaceholderText("Username");
    const emailInput = getByPlaceholderText("Email");
    const passwordInput = getByPlaceholderText("Password");

    fireEvent.changeText(nameInput, VALID_NAME);
    fireEvent.changeText(usernameInput, VALID_USERNAME);
    fireEvent.changeText(emailInput, VALID_EMAIL);
    fireEvent.changeText(passwordInput, VALID_PASSWORD);

    expect(nameInput.props.value).toBe(VALID_NAME);
    expect(usernameInput.props.value).toBe(VALID_USERNAME);
    expect(emailInput.props.value).toBe(VALID_EMAIL);
    expect(passwordInput.props.value).toBe(VALID_PASSWORD);
  });

  it("shows alert if any field is empty", async () => {
    const alertSpy = jest.spyOn(Alert, "alert").mockImplementation(() => {});
    const { getByTestId } = render(<Signup />);

    fireEvent.press(getByTestId("signup-button"));

    await waitFor(() => {
      expect(alertSpy).toHaveBeenCalledWith(
        "Error",
        expect.stringContaining("Please fill all fields")
      );
    });

    alertSpy.mockRestore();
  });

  it("calls registerUser with correct data", async () => {
    registerUser.mockResolvedValueOnce();

    const { getByPlaceholderText, getByTestId } = render(<Signup />);
    fillForm(getByPlaceholderText);
    fireEvent.press(getByTestId("signup-button"));

    await waitFor(() => {
      expect(registerUser).toHaveBeenCalledWith(
        VALID_NAME,
        VALID_USERNAME,
        VALID_EMAIL,
        VALID_PASSWORD
      );
    });
  });

  it("navigates to login after successful signup", async () => {
    const { router } = require("expo-router");
    registerUser.mockResolvedValueOnce();

    const { getByPlaceholderText, getByTestId } = render(<Signup />);
    fillForm(getByPlaceholderText);
    fireEvent.press(getByTestId("signup-button"));

    await waitFor(() => {
      expect(router.push).toHaveBeenCalledWith("/login");
    });
  });

  it("shows alert on signup error", async () => {
    const errorMsg = "Signup failed";
    registerUser.mockRejectedValueOnce(new Error(errorMsg));

    const alertSpy = jest.spyOn(Alert, "alert").mockImplementation(() => {});
    const { getByPlaceholderText, getByTestId } = render(<Signup />);

    fillForm(getByPlaceholderText);
    fireEvent.press(getByTestId("signup-button"));

    await waitFor(() => {
      expect(alertSpy).toHaveBeenCalledWith("Error", expect.stringContaining(errorMsg));
    });

    alertSpy.mockRestore();
  });

  it("has empty initial values", () => {
    const { getByPlaceholderText } = render(<Signup />);
    expect(getByPlaceholderText("Name").props.value).toBe("");
    expect(getByPlaceholderText("Username").props.value).toBe("");
    expect(getByPlaceholderText("Email").props.value).toBe("");
    expect(getByPlaceholderText("Password").props.value).toBe("");
  });

  it("shows alert if email is missing", async () => {
    const alertSpy = jest.spyOn(Alert, "alert").mockImplementation(() => {});
    const { getByPlaceholderText, getByTestId } = render(<Signup />);
    fireEvent.changeText(getByPlaceholderText("Name"), VALID_NAME);
    fireEvent.changeText(getByPlaceholderText("Username"), VALID_USERNAME);
    fireEvent.changeText(getByPlaceholderText("Password"), VALID_PASSWORD);
    fireEvent.press(getByTestId("signup-button"));
    await waitFor(() => {
      expect(alertSpy).toHaveBeenCalledWith("Error", expect.stringContaining("Please fill all fields"));
    });
    alertSpy.mockRestore();
  });

  it("shows success alert after successful signup", async () => {
    registerUser.mockResolvedValueOnce();
    const alertSpy = jest.spyOn(Alert, "alert").mockImplementation(() => {});
    const { getByPlaceholderText, getByTestId } = render(<Signup />);
    fillForm(getByPlaceholderText);
    fireEvent.press(getByTestId("signup-button"));
    await waitFor(() => {
      expect(alertSpy).toHaveBeenCalledWith("Verification Email Sent", expect.any(String));
    });
    alertSpy.mockRestore();
  });

  it("renders with correct styles", () => {
    const { getByTestId, getAllByText, getByText } = render(<Signup />);

    const container = getByTestId("container-test");
    const title = getAllByText("Sign Up")[0]; // El primero es el título
    const buttonText = getAllByText("Sign Up")[1]; // El segundo es el botón
    const nameInput = getByTestId("name-input");
    const button = getByTestId("signup-button");
    const loginPrompt = getByTestId("have-account");
    const loginLink = getByText("Login");
    const form = getByTestId("form-test");

    const flatten = (style) =>
      Array.isArray(style) ? Object.assign({}, ...style) : style;

    expect(flatten(container.props.style)).toMatchObject({
      flex: 1,
      backgroundColor: "#F6F9FF",
      justifyContent: "center",
      alignItems: "center",
      padding: 20,
    });

    expect(flatten(title.props.style)).toMatchObject({
      fontSize: 32,
      fontWeight: "bold",
      marginBottom: 20,
      fontFamily: "Calibri",
    });

    expect(flatten(nameInput.props.style)).toMatchObject({
      width: "100%",
      padding: 10,
      marginVertical: 8,
      borderWidth: 1,
      borderColor: "black",
      borderRadius: 15,
      backgroundColor: "#F6F9FF",
      fontFamily: "Calibri",
    });

    expect(flatten(button.props.style)).toMatchObject({
      backgroundColor: "#F45D5D",
      padding: 12,
      borderRadius: 15,
      alignItems: "center",
      marginTop: 10,
    });

    expect(flatten(buttonText.props.style)).toMatchObject({
      color: "#fff",
      fontSize: 20,
      fontWeight: "bold",
    });

    expect(flatten(loginPrompt.props.style)).toMatchObject({
      marginTop: 20,
    });

    expect(flatten(loginLink.props.style)).toMatchObject({
      color: "blue",
      textDecorationLine: "underline",
    });

    expect(flatten(form.props.style)).toMatchObject({
      width: "100%",
      maxWidth: 400,
    });
  });

  it("displays login prompt text", () => {
    const { getByTestId } = render(<Signup />);
    const loginPrompt = getByTestId("have-account");
    expect(loginPrompt).toBeTruthy();
  });
  
  
});
