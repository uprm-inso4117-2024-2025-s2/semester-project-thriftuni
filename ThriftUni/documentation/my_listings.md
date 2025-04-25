# My Listings Component - README

## File: `my_listings.tsx`

## Description:
`DisplayMyListing` is a **React Native component** that displays a user's listings. It allows filtering between "All" and "Sold" listings, toggling edit mode for deletion, and presents listings in a scrollable card layout.

## Features:
- Displays user listings with images, details, price, and status
- Filter functionality ("All" or "Sold")
- Edit mode for deleting listings
- Efficient rendering with `FlatList`
- Placeholder image support

## Props:
| Prop       | Type        | Required | Description                                            |
|----------- |------------ |--------- |--------------------------------------------------------|
| `goBack`   | `() => void` | No      | Optional callback to navigate back to the previous screen |

## Component Structure:
- **Header**: Displays "My Listing"
- **Filter & Edit Toggle Buttons**
- **FlatList**: Renders listing cards
- **Delete Button**: Appears in edit mode
- **Placeholder Image**: For each listing item

## Example Usage:
```tsx
import DisplayMyListing from './my_listings';

<DisplayMyListing />
```

## Future Improvements:
- Integrate `goBack` prop support fully
- Connect to backend/Firebase for dynamic data
- Enable editing listings (not just deleting)
- Add "Add New Listing" feature
- Implement pull-to-refresh

## Dependencies / Components:
- **React Native**: `FlatList`, `Pressable`, `Image`, `StyleSheet`
- **React Hooks**: `useState`
- **Icons**: Optional (can integrate icon libraries)
- **Images**: Placeholder image URLs used

## Suggested File Location:
```
/components/Listings/my_listings.tsx
```

## Author Notes:
The component is modular and ready to be plugged into your screen navigation. It can serve as a standalone screen or section within any profile or dashboard page.

Consider connecting it to a backend for real-time updates and making the edit mode more robust with item updates.