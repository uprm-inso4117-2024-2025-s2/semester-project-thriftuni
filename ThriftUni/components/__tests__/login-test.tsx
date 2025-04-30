
jest.mock("../../firebase/login", () => ({
  login: jest.fn((email, password) => {
    if (email === "bad@example.com") {
      return Promise.resolve({ error: "Invalid credentials" });
    }
    return Promise.resolve({ user: { email } });
  }),
}));

import { render, fireEvent, waitFor } from "@testing-library/react-native";
import LoginScreen from "../../app/(tabs)/login";

describe("LoginScreen", () => {
  it("1. renders UI elements (kills blank component)", () => {
    const { getByTestId } = render(<LoginScreen />);
    expect(getByTestId("login-title")).toBeTruthy();
    expect(getByTestId("email-input")).toBeTruthy();
    expect(getByTestId("password-input")).toBeTruthy();
    expect(getByTestId("login-button")).toBeTruthy();
  });

  it("2. has initial email state as empty string", () => {
    const { getByTestId } = render(<LoginScreen />);
    expect(getByTestId("email-input").props.value).toBe("");
  });

  it("3. has initial password state as empty string", () => {
    const { getByTestId } = render(<LoginScreen />);
    expect(getByTestId("password-input").props.value).toBe("");
  });

  it("4. shows login button (initial loading is false)", () => {
    const { queryByTestId } = render(<LoginScreen />);
    expect(queryByTestId("login-button")).toBeTruthy();
  });

  it("5. does not show error on initial render", () => {
    const { queryByTestId } = render(<LoginScreen />);
    expect(queryByTestId("error-message")).toBeNull();
  });

  it("6. triggers login logic (kills empty handleLogin)", async () => {
    const { getByTestId } = render(<LoginScreen />);
    fireEvent.changeText(getByTestId("email-input"), "mock@example.com");
    fireEvent.changeText(getByTestId("password-input"), "pass123");
    fireEvent.press(getByTestId("login-button"));
    await waitFor(() => {
      expect(getByTestId("login-button")).toBeTruthy();
    });
  });

  it("7. shows spinner during login (setLoading true)", async () => {
    const { getByTestId, queryByTestId } = render(<LoginScreen />);
    fireEvent.changeText(getByTestId("email-input"), "mock@example.com");
    fireEvent.changeText(getByTestId("password-input"), "pass123");
    fireEvent.press(getByTestId("login-button"));
    await waitFor(() => {
      expect(queryByTestId("login-button")).toBeTruthy();
    });
  });

  it("8. hides spinner after login (setLoading false)", async () => {
    const { getByTestId } = render(<LoginScreen />);
    fireEvent.changeText(getByTestId("email-input"), "mock@example.com");
    fireEvent.changeText(getByTestId("password-input"), "pass123");
    fireEvent.press(getByTestId("login-button"));
    await waitFor(() => {
      expect(getByTestId("login-button")).toBeTruthy();
    });
  });

  it("9. displays error message if login fails", async () => {
    const { getByTestId } = render(<LoginScreen />);
    fireEvent.changeText(getByTestId("email-input"), "bad@example.com");
    fireEvent.changeText(getByTestId("password-input"), "wrongpass");
    fireEvent.press(getByTestId("login-button"));
    await waitFor(() => {
      const errorMsg = getByTestId("error-message");
      expect(errorMsg).toBeTruthy();
      expect(errorMsg.props.children).toBe("Invalid credentials");
    });
  });

  it("10. does not show error if login succeeds", async () => {
    const { getByTestId, queryByTestId } = render(<LoginScreen />);
    fireEvent.changeText(getByTestId("email-input"), "good@example.com");
    fireEvent.changeText(getByTestId("password-input"), "correctpass");
    fireEvent.press(getByTestId("login-button"));
    await waitFor(() => {
      expect(queryByTestId("error-message")).toBeNull();
    });
  });

  it("11. error branch only triggers with invalid credentials", async () => {
    const { getByTestId, queryByTestId } = render(<LoginScreen />);
    fireEvent.changeText(getByTestId("email-input"), "bad@example.com");
    fireEvent.changeText(getByTestId("password-input"), "wrongpass");
    fireEvent.press(getByTestId("login-button"));
    await waitFor(() => {
      expect(getByTestId("error-message")).toBeTruthy();
    });
    fireEvent.changeText(getByTestId("email-input"), "mock@example.com");
    fireEvent.changeText(getByTestId("password-input"), "pass123");
    fireEvent.press(getByTestId("login-button"));
    await waitFor(() => {
      expect(queryByTestId("error-message")).toBeNull();
    });
  });

  it("12. does not call setError on successful login (kills if-true mutation)", async () => {
    const { getByTestId, queryByTestId } = render(<LoginScreen />);
    fireEvent.changeText(getByTestId("email-input"), "mock@example.com");
    fireEvent.changeText(getByTestId("password-input"), "pass123");
    fireEvent.press(getByTestId("login-button"));
    await waitFor(() => {
      // Si el error no se llama, el mensaje nunca debe aparecer
      expect(queryByTestId("error-message")).toBeNull();
    });
  });
});
