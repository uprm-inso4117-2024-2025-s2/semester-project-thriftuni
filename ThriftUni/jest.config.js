module.exports = {
    preset: 'jest-expo',
    testEnvironment: 'node',
    transformIgnorePatterns: [
      "node_modules/(?!((expo-font)|(@expo/vector-icons)|(firebase)|(@firebase)|(@react-native|react-native|expo|expo-file-system|expo-constants)))"
    ],
    moduleNameMapper: {
      '^@/(.*)$': '<rootDir>/$1',
    },
    // setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  };
  