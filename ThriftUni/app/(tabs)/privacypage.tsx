import React from "react";

const PrivacyPolicy = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Privacy Policy</h1>
      <p style={styles.paragraph}>
        Welcome to our thrifting app! Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your information to ensure a secure and seamless experience.
      </p>

      <h2 style={styles.subtitle}>1. Information We Collect</h2>
      <p style={styles.paragraph}>
        We collect various types of information to provide and improve our services:
      </p>
      <ul>
        <li style={styles.list}>Personal Information: Name, email address, phone number, billing address.</li>
        <li style={styles.list}>Account Information: Username, password, profile details.</li>
        <li style={styles.list}>Transaction Information: Purchase history, payment details.</li>
        <li style={styles.list}>Usage Data: Interactions with the app, preferences, and browsing history.</li>
        <li style={styles.list}>Device and Log Information: IP address, browser type, operating system.</li>
      </ul>

      <h2 style={styles.subtitle}>2. How We Use Your Information</h2>
      <ul>
        <li style={styles.list}>Facilitate secure transactions and order processing.</li>
        <li style={styles.list}>Enhance user experience through personalized recommendations.</li>
        <li style={styles.list}>Improve customer support and respond to inquiries.</li>
        <li style={styles.list}>Analyze usage patterns to enhance app performance.</li>
        <li style={styles.list}>Prevent fraudulent activities and ensure security.</li>
        <li style={styles.list}>Send notifications regarding updates, offers, and promotional content.</li>
      </ul>

      <h2 style={styles.subtitle}>3. Data Protection</h2>
      <p style={styles.paragraph}>
        We implement strict security measures to safeguard your personal information:
      </p>
      <ul>
        <li style={styles.list}>Encryption protocols to secure transactions.</li>
        <li style={styles.list}>Regular security audits and vulnerability assessments.</li>
        <li style={styles.list}>Access controls and authentication mechanisms.</li>
        <li style={styles.list}>Secure data storage with limited access to authorized personnel.</li>
      </ul>
      <p style={styles.paragraph}>
        While we strive to protect your data, no method of transmission or storage is completely secure, and we cannot guarantee absolute security.
      </p>

      <h2 style={styles.subtitle}>4. Third-Party Services</h2>
      <p style={styles.paragraph}>
        We may integrate third-party services to enhance our app functionalities, including:
      </p>
      <ul>
        <li style={styles.list}>Payment gateways for secure transactions.</li>
        <li style={styles.list}>Analytics tools to track app performance.</li>
        <li style={styles.list}>Cloud storage providers for data management.</li>
        <li style={styles.list}>Advertising networks for targeted promotions.</li>
      </ul>
      <p style={styles.paragraph}>
        These third-party providers have their own privacy policies, and we encourage you to review them to understand how they handle your data.
      </p>

      <h2 style={styles.subtitle}>5. Your Rights</h2>
      <ul>
        <li style={styles.list}>Access and review the personal data we store about you.</li>
        <li style={styles.list}>Request corrections to inaccurate or incomplete information.</li>
        <li style={styles.list}>Delete or deactivate your account upon request.</li>
        <li style={styles.list}>Opt-out of marketing communications at any time.</li>
        <li style={styles.list}>Restrict or object to certain data processing activities.</li>
      </ul>
      <p style={styles.paragraph}>
        To exercise these rights, please contact our support team.
      </p>

      <h2 style={styles.subtitle}>6. Updates to This Policy</h2>
      <p style={styles.paragraph}>
        We may update this Privacy Policy periodically to reflect changes in our practices or legal requirements. We encourage users to review this page regularly. Changes will take effect immediately upon posting.
      </p>

      <h2 style={styles.subtitle}>7. Contact Us</h2>
      <ul>
        <li style={styles.list}>Email: support@thriftingapp.com</li>
        <li style={styles.list}>Phone: +1-800-THRIFT-APP</li>
        <li style={styles.list}>Address: 123 Thrift Street, Vintage City, USA</li>
      </ul>
    </div>
  );
};

const styles = {
  container: {
    padding: 20,
    backgroundColor: '#fff',
    maxWidth: 800,
    margin: '0 auto',
    fontFamily: 'Arial, sans-serif',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 24,
    fontWeight: '600',
    marginTop: 30,
    marginBottom: 10,
  },
  paragraph: {
    fontSize: 16,
    color: '#333',
    marginBottom: 12,
    lineHeight: 1.5,
  },
  list: {
    fontSize: 16,
    color: '#555',
    marginBottom: 8,
    marginLeft: 20,
    lineHeight: 1.4,
  },
};

export default PrivacyPolicy;
