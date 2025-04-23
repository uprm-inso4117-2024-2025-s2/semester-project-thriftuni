import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

interface TitleInputProps {
  title: string;
  setTitle: (value: string) => void;
}

export default function TitleInput({ title, setTitle }: TitleInputProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Title</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={title === "0" ? "" : title}
          onChangeText={setTitle}
          placeholder="Enter item title..."
          placeholderTextColor="#999"
          maxLength={50}
          testID="title-input"
        />
      </View>
      {title && title !== "0" && (
        <Text style={styles.charCount}>
          {title.length}/50 characters
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    padding: 5,
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#E4AAAA',
    borderRadius: 5,
  },
  input: {
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
  },
  charCount: {
    marginTop: 5,
    textAlign: 'right',
    color: 'gray',
    fontSize: 12,
  },
});
