import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

// Remove the custom back title by disabling it for this screen
export const unstable_settings = {
  headerBackTitle: "",
  headerBackTitleVisible: false,
};


// Example data structure
const earningsData = {
  total: 26900.98,
  today: [
    { buyer: "pry12", amount: 40.4, date: "THU, 03/11" },
    { buyer: "arrozcona", amount: 6.4, date: "THU, 03/11" },
  ],
  yesterday: [
    { buyer: "yadrirr", amount: 5.49, date: "THU, 03/11" },
    { buyer: "longanizzz", amount: 9.5, date: "THU, 03/11" },
    { buyer: "hbo022", amount: 17.4, date: "THU, 03/11" },
  ],
};

// Reusable transaction item component
interface TransactionItemProps {
  buyer: string;
  amount: number;
  date: string;
}

const TransactionItem: React.FC<TransactionItemProps> = ({
  buyer,
  amount,
  date,
}) => {
  return (
    <TouchableOpacity style={styles.transactionItem}>
      <View style={styles.leftSection}>
        {/* Icon (adjust name as desired) */}
        <Ionicons
          name="receipt-outline"
          size={24}
          color="#fff"
          style={{ marginRight: 10 }}
        />
        <View>
          <Text style={styles.transactionTitle}>Sale to {buyer}</Text>
          <Text style={styles.transactionSubtitle}>Sold {date}</Text>
        </View>
      </View>

      <View style={styles.rightSection}>
        <Text style={styles.transactionAmount}>+ ${amount.toFixed(2)}</Text>
        <Ionicons name="chevron-forward" size={20} color="#fff" />
      </View>
    </TouchableOpacity>
  );
};

const Earnings: React.FC = () => {
  return (
    <View style={styles.container}>
      {/* Page Title */}
      <Text style={styles.overviewTitle}>Overview</Text>

      {/* Total Earnings */}
      <Text style={styles.earningsText}>Earnings</Text>
      <Text style={styles.earningsAmount}>
        $
        {earningsData.total.toLocaleString(undefined, {
          minimumFractionDigits: 2,
        })}
      </Text>

      {/* TODAY Section */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>TODAY</Text>
        <FlatList
          data={earningsData.today}
          keyExtractor={(item, index) => `today-${index}`}
          renderItem={({ item }) => (
            <TransactionItem
              buyer={item.buyer}
              amount={item.amount}
              date={item.date}
            />
          )}
        />
      </View>

      {/* YESTERDAY Section */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>YESTERDAY</Text>
        <FlatList
          data={earningsData.yesterday}
          keyExtractor={(item, index) => `yesterday-${index}`}
          renderItem={({ item }) => (
            <TransactionItem
              buyer={item.buyer}
              amount={item.amount}
              date={item.date}
            />
          )}
        />
      </View>
    </View>
  );
};

export default Earnings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  overviewTitle: {
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 5,
    color: "#000",
  },
  earningsText: {
    fontSize: 16,
    color: "#666",
    marginBottom: 5,
  },
  earningsAmount: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 20,
  },
  sectionContainer: {
    backgroundColor: "#e5e5e5",
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginBottom: 10,
    textTransform: "uppercase",
  },
  transactionItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#333",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    justifyContent: "space-between",
  },
  leftSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  transactionTitle: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "600",
  },
  transactionSubtitle: {
    fontSize: 12,
    color: "#aaa",
  },
  rightSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  transactionAmount: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "600",
    marginRight: 8,
  },
});
