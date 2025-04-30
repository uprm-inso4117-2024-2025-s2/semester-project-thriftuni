import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,         // ✅ Hide header entirely
          title: "",                  // ✅ Prevent showing folder name
          headerBackVisible: false,   // ✅ Hide back button specifically
        }}
      />
      <Stack.Screen name="login" options={{ title: "Login" }} />
      <Stack.Screen name="signup" options={{ title: "Sign Up" }} />
    </Stack>
  );
}