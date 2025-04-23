module.exports = {
    preset: 'jest-expo',
    testEnvironment: 'node',
    transform: {
        "^.+\\.[jt]sx?$": "babel-jest"
    },
    transformIgnorePatterns: [
        'node_modules/(?!((jest-)?react-native|@react-native|@react-native/js-polyfills|@react-navigation|expo|@expo/.*))',
    ],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node']
};
