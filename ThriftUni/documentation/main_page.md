# ThriftUniApp - React Native Code Explanation

## Overview
This code defines a simple React Native application using Expo that provides a main page for a thrift marketplace called **Thrift Uni**. The app includes a header, a search bar, and four interactive buttons for various functionalities.

## Components and Structure
The front page makes use of the following core React Native components:
- `ScrollView`: Provides a scrollable container.
- `View`: Acts as a container for UI elements.
- `Text`: Displays text elements.
- `TextInput`: Allows user input in the search bar.
- `TouchableOpacity`: Provides interactive button elements.
- `StyleSheet`: Manages the styling of the application.

The code also utilizes icons from the `FontAwesome` and `Feather` libraries.

### 1. **Header**
- Displays a `Text` element welcoming users to "Thrift Uni".

### 2. **Search Bar**
- Uses `TextInput` to allow users to search for listings.
- Wrapped in a `View` styled as a search bar.

### 3. **Buttons Section**
The buttons provide functionality for different user interactions:
- **Post Listing**: Allows users to upload a new thrift listing.
- **View Drafts**: Enables users to see their saved drafts.
- **Read Your Reviews**: Directs users to reviews.
- **View Saved Posts**: Displays the posts users have saved.

Each button is defined using a reusable `Button` component:
- Accepts `icon` (FontAwesome icon name) and `text` (button label) as props.
- Styled using `TouchableOpacity` for interactivity.
- Displays an icon above a label.

## Styling
The styles are created using `StyleSheet.create` and include:
- A light gray background (`#E5E5E5`).
- A **search bar** styled with white background, padding, shadow, and rounded corners.
- A **button layout** with flex-based row alignment for proper spacing.
- Each button has a white background and rounded corners for a modern UI look.

## Dependencies
- **React Native** 
- **Expo Vector Icons**
- **React Navigation**

## Summary
This code provides a simple but functional thrift marketplace UI with:
- A welcoming **header**.
- A **search bar** for browsing listings.
- **Interactive buttons** for user actions.

It can be further extended by integrating navigation and backend services.

