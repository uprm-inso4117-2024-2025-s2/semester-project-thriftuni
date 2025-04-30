import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Modal,
  FlatList,
  Pressable,
  Text,
  TouchableOpacity,
} from "react-native";

type SelectorProps = {
  label: string;
  value: string;
  options: { label: string; value: string }[];
  onSelect: (value: string) => void;
};

export default function Selector({
  label,
  value,
  options,
  onSelect,
}: SelectorProps) {
  const [modalVisible, setModalVisible] = useState(false);

  const handleSelect = (selectedValue: string) => {
    onSelect(selectedValue);
    setModalVisible(false);
  };

  return (
    <>
      <TouchableOpacity
        style={styles.selectorContainer}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.selectorLabel}>{label}</Text>
        <Text style={styles.selectorText}>{value ? value : "Select >"}</Text>
      </TouchableOpacity>

      <Modal animationType="slide" visible={modalVisible} transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <FlatList
              data={options}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <Pressable
                  style={styles.option}
                  onPress={() => handleSelect(item.value)}
                >
                  <Text style={styles.optionText}>{item.label}</Text>
                </Pressable>
              )}
            />
            <Pressable onPress={() => setModalVisible(false)}>
              <Text style={styles.closeText}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#00000088",
  },
  modalContent: {
    backgroundColor: "#fff",
    margin: 30,
    borderRadius: 10,
    padding: 20,
  },
  selectorContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    width: "100%",
    marginBottom: 15,
  },
  selectorLabel: {
    fontSize: 16,
    color: "#333",
  },
  selectorText: {
    fontSize: 12,
    color: "#888",
  },
  option: {
    padding: 12,
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  optionText: {
    fontSize: 16,
  },
  closeText: {
    textAlign: "center",
    color: "red",
    marginTop: 10,
  },
});
