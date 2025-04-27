import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

const PrivacyPolicy = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Privacy Policy</Text>

      <Text style={styles.paragraph}>
        Welcome to our thrifting app! Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your information to ensure a secure and seamless experience.
      </Text>

      <Text style={styles.subtitle}>1. Information We Collect</Text>
      <Text style={styles.paragraph}>
        We collect various types of information to provide and improve our services:
      </Text>
      <View style={styles.listGroup}>
        <Text style={styles.list}>• Personal Information: Name, email address, phone number, billing address.</Text>
        <Text style={styles.list}>• Account Information: Username, password, profile details.</Text>
        <Text style={styles.list}>• Transaction Information: Purchase history, payment details.</Text>
        <Text style={styles.list}>• Usage Data: Interactions with the app, preferences, and browsing history.</Text>
        <Text style={styles.list}>• Device and Log Information: IP address, browser type, operating system.</Text>
      </View>

      <Text style={styles.subtitle}>2. How We Use Your Information</Text>
      <View style={styles.listGroup}>
        <Text style={styles.list}>• Facilitate secure transactions and order processing.</Text>
        <Text style={styles.list}>• Enhance user experience through personalized recommendations.</Text>
        <Text style={styles.list}>• Improve customer support and respond to inquiries.</Text>
        <Text style={styles.list}>• Analyze usage patterns to enhance app performance.</Text>
        <Text style={styles.list}>• Prevent fraudulent activities and ensure security.</Text>
        <Text style={styles.list}>• Send notifications regarding updates, offers, and promotional content.</Text>
      </View>

      <Text style={styles.subtitle}>3. Data Protection</Text>
      <Text style={styles.paragraph}>
        We implement strict security measures to safeguard your personal information:
      </Text>
      <View style={styles.listGroup}>
        <Text style={styles.list}>• Encryption protocols to secure transactions.</Text>
        <Text style={styles.list}>• Regular security audits and vulnerability assessments.</Text>
        <Text style={styles.list}>• Access controls and authentication mechanisms.</Text>
        <Text style={styles.list}>• Secure data storage with limited access to authorized personnel.</Text>
      </View>
      <Text style={styles.paragraph}>
        While we strive to protect your data, no method of transmission or storage is completely secure, and we cannot guarantee absolute security.
      </Text>

      <Text style={styles.subtitle}>4. Third-Party Services</Text>
      <Text style={styles.paragraph}>
        We may integrate third-party services to enhance our app functionalities, including:
      </Text>
      <View style={styles.listGroup}>
        <Text style={styles.list}>• Payment gateways for secure transactions.</Text>
        <Text style={styles.list}>• Analytics tools to track app performance.</Text>
        <Text style={styles.list}>• Cloud storage providers for data management.</Text>
        <Text style={styles.list}>• Advertising networks for targeted promotions.</Text>
      </View>
      <Text style={styles.paragraph}>
        These third-party providers have their own privacy policies, and we encourage you to review them to understand how they handle your data.
      </Text>

      <Text style={styles.subtitle}>5. Your Rights</Text>
      <View style={styles.listGroup}>
        <Text style={styles.list}>• Access and review the personal data we store about you.</Text>
        <Text style={styles.list}>• Request corrections to inaccurate or incomplete information.</Text>
        <Text style={styles.list}>• Delete or deactivate your account upon request.</Text>
        <Text style={styles.list}>• Opt-out of marketing communications at any time.</Text>
        <Text style={styles.list}>• Restrict or object to certain data processing activities.</Text>
      </View>
      <Text style={styles.paragraph}>
        To exercise these rights, please contact our support team.
      </Text>

      <Text style={styles.subtitle}>6. Updates to This Policy</Text>
      <Text style={styles.paragraph}>
        We may update this Privacy Policy periodically to reflect changes in our practices or legal requirements. We encourage users to review this page regularly. Changes will take effect immediately upon posting.
      </Text>

      <Text style={styles.subtitle}>7. Contact Us</Text>
      <View style={styles.listGroup}>
        <Text style={styles.list}>• Email: support@thriftingapp.com</Text>
        <Text style={styles.list}>• Phone: +1-800-THRIFT-APP</Text>
        <Text style={styles.list}>• Address: 123 Thrift Street, Vintage City, USA</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 22,
    fontWeight: '600',
    marginTop: 30,
    marginBottom: 10,
  },
  paragraph: {
    fontSize: 16,
    color: '#333',
    marginBottom: 12,
    lineHeight: 24,
  },
  listGroup: {
    marginLeft: 10,
    marginBottom: 10,
  },
  list: {
    fontSize: 16,
    color: '#555',
    marginBottom: 5,
  },
});

export default PrivacyPolicy;