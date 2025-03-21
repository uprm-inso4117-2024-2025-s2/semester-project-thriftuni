import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import LoginScreen from "../login";
import { login } from "../../../firebase/login"; // Asegúrate de que la ruta sea correcta

jest.mock("../../../firebase/login", () => ({
  login: jest.fn(),
}));

jest.mock("expo-router", () => ({
  useRouter: () => ({
    replace: jest.fn(), // Mock de router.replace()
    push: jest.fn(), // Mock de router.push()
  }),
}));

// Variables para credenciales válidas e inválidas
const VALID_EMAIL = "janjannunez777@gmail.com";
const VALID_PASSWORD = "1234567890";
const INVALID_EMAIL = "wrong@example.com";
const INVALID_PASSWORD = "wrongpassword";



describe("LoginScreen", () => {
  it("renders correctly", () => {
    const { getByPlaceholderText, getByTestId } = render(<LoginScreen />);
    expect(getByPlaceholderText("Email")).toBeTruthy();
    expect(getByPlaceholderText("Password")).toBeTruthy();
    expect(getByTestId("login-button")).toBeTruthy(); // Asegúrate de que el botón tiene testID en tu componente
  });

  it("updates input values correctly", () => {
    const { getByPlaceholderText } = render(<LoginScreen />);
    const emailInput = getByPlaceholderText("Email");
    const passwordInput = getByPlaceholderText("Password");

    fireEvent.changeText(emailInput, VALID_EMAIL);
    fireEvent.changeText(passwordInput, VALID_PASSWORD);

    expect(emailInput.props.value).toBe(VALID_EMAIL);
    expect(passwordInput.props.value).toBe(VALID_PASSWORD);
  });

  it("calls login function on button press with correct credentials", async () => {
    login.mockResolvedValue({ user: { uid: "12345" } });

    const { getByPlaceholderText, getByTestId } = render(<LoginScreen />);

    fireEvent.changeText(getByPlaceholderText("Email"), VALID_EMAIL);
    fireEvent.changeText(getByPlaceholderText("Password"), VALID_PASSWORD);
    fireEvent.press(getByTestId("login-button"));

    await waitFor(() => expect(login).toHaveBeenCalledWith(VALID_EMAIL, VALID_PASSWORD));
  });

  it("shows error message when login fails", async () => {
    login.mockResolvedValue({ error: "Invalid credentials" });

    const { getByPlaceholderText, getByTestId, findByText } = render(<LoginScreen />);

    fireEvent.changeText(getByPlaceholderText("Email"), INVALID_EMAIL);
    fireEvent.changeText(getByPlaceholderText("Password"), INVALID_PASSWORD);
    fireEvent.press(getByTestId("login-button"));

    expect(await findByText("Invalid credentials")).toBeTruthy();
  });

  it("displays a loading indicator while logging in", async () => {
    let resolveLogin;

    login.mockImplementation(() => new Promise((resolve) => {
      resolveLogin = resolve;
    }));

    const { getByPlaceholderText, getByTestId, queryByTestId } = render(<LoginScreen />);

    fireEvent.changeText(getByPlaceholderText("Email"), VALID_EMAIL);
    fireEvent.changeText(getByPlaceholderText("Password"), VALID_PASSWORD);
    fireEvent.press(getByTestId("login-button"));

    // Espera a que aparezca el loading indicator
    await waitFor(() => {
      expect(queryByTestId("loading-indicator")).toBeTruthy();
    });

    // Resuelve la promesa simulando el fin del login
    resolveLogin({ user: { uid: "12345" } });

    // Espera a que desaparezca el loading indicator
    await waitFor(() => {
      expect(queryByTestId("loading-indicator")).toBeFalsy();
    });
  });
});
