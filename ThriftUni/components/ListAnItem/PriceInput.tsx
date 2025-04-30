import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { formatCurrency } from '@/utils/lib';

interface PriceInputProps {
  price: number;
  setPrice: (value: string) => void;
}

export default function PriceInput({ price, setPrice }: PriceInputProps) {
  // Convert price to string for TextInput
  const [inputValue, setInputValue] = React.useState(price === 0 ? '' : price.toString());
  
  const handleChangeText = (text: string) => {
    // Allow empty input, digits, and one decimal point
    const validInput = text.replace(/[^0-9.]/g, '');
    
    // Ensure only one decimal point
    const parts = validInput.split('.');
    const sanitizedValue = parts.length > 2 
      ? `${parts[0]}.${parts.slice(1).join('')}`
      : validInput;
    
    setInputValue(sanitizedValue);
    setPrice(sanitizedValue);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Price</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.currencySymbol}>$</Text>
        <TextInput
          style={styles.input}
          value={inputValue}
          onChangeText={handleChangeText}
          placeholder="0.00"
          keyboardType="decimal-pad"
          testID="price-input"
        />
      </View>
      {price > 0 && (
        <Text style={styles.formattedPrice}>
          {formatCurrency(price)}
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
  currencySymbol: {
    paddingLeft: 10,
    fontSize: 16,
  },
  input: {
    flex: 1,
    height: 40,
    paddingHorizontal: 8,
  },
  formattedPrice: {
    marginTop: 5,
    color: 'gray',
  },
});
