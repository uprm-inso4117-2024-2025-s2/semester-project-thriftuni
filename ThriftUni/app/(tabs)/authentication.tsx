import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, FlatList, Modal } from 'react-native';

const TwoFactorAuthentication: React.FC = () => {
  const [securityQuestion, setSecurityQuestion] = useState("What was the name of your first Pet?");
  const [answer, setAnswer] = useState("");
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const securityQuestions = [
    "What was the name of your first Pet?",
    "What is your mother's maiden name?",
    "What was the name of your elementary school?",
    "What is the name of the town where you were born?",
  ];

  const handleSubmit = () => {
    console.log("Security Question:", securityQuestion);
    console.log("Answer:", answer);
    Alert.alert("Success", "Two-Factor Authentication setup complete!");
  };

  const handleSelectQuestion = (question: string) => {
    setSecurityQuestion(question);
    setDropdownVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Two Factor Authentication</Text>
        <Text style={styles.description}>
          Select a security question that will help us verify your identity should you forget your password or need to login again.
        </Text>

        {/* ✅ Custom Dropdown */}
        <Text style={styles.label}>Security Question</Text>
        <TouchableOpacity
          style={styles.dropdownButton}
          onPress={() => setDropdownVisible(true)}
        >
          <Text style={styles.dropdownText}>{securityQuestion}</Text>
        </TouchableOpacity>

        {/* ✅ Dropdown Modal */}
        <Modal
          transparent
          animationType="fade"
          visible={dropdownVisible}
          onRequestClose={() => setDropdownVisible(false)}
        >
          <TouchableOpacity
            style={styles.modalBackground}
            activeOpacity={1}
            onPressOut={() => setDropdownVisible(false)}
          >
            <View style={styles.dropdown}>
              <FlatList
                data={securityQuestions}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.dropdownItem}
                    onPress={() => handleSelectQuestion(item)}
                  >
                    <Text style={styles.dropdownItemText}>{item}</Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          </TouchableOpacity>
        </Modal>

        {/* ✅ Answer Input */}
        <Text style={styles.label}>Answer</Text>
        <TextInput
          style={styles.input}
          value={answer}
          onChangeText={setAnswer}
          placeholder="Enter your answer"
          secureTextEntry
        />

        {/* ✅ Continue Button */}
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TwoFactorAuthentication;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
  },
  card: {
    width: '90%',
    padding: 24,
    borderRadius: 16,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 16,
  },
  description: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
  },
  dropdownButton: {
    width: '100%',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#d1d5db',
    marginBottom: 16,
    backgroundColor: '#f9fafb',
  },
  dropdownText: {
    fontSize: 16,
    color: '#374151',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  dropdown: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 8,
    paddingVertical: 8,
    elevation: 5,
  },
  dropdownItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  dropdownItemText: {
    fontSize: 16,
    color: '#374151',
  },
  input: {
    width: '100%',
    padding: 8,
    borderRadius: 8,
    borderColor: '#d1d5db',
    borderWidth: 1,
    marginBottom: 16,
  },
  button: {
    width: '100%',
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#3b82f6',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
  },
});
