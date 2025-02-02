import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
  TouchableWithoutFeedback,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import * as Speech from "expo-speech"; // Import Text-to-Speech

const HelplinesPage = () => {
  const helplines = [
    { category: "Emergency Services", numbers: [
        { name: "Police", number: "100" },
        { name: "Ambulance", number: "102" },
        { name: "Fire Department", number: "101" },
      ]
    },
    { category: "Cardiologists", numbers: [
        { name: "Dr. Atul Abhyankar", number: "02612472211" },
        { name: "Hridhaan Heart Care Clinic", number: "02612473508" },
        { name: "NIHAR Hospital", number: "08320886187" },
      ]
    },
    { category: "Neurologists", numbers: [
        { name: "Dr.Haresh Parekh", number: "920394885" },
        { name: "Dr. Siddhesh Rajadhyax", number: "09742444220" },
        { name: "Dr Ravi Vatiani Neuro Clinic", number: "07778048486" },
      ]
    },
  ];

  const [selectedCategory, setSelectedCategory] = useState("All");
  const lastTap = useRef(0);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const makeCall = (number) => {
    Linking.openURL(`tel:${number}`);
  };

  const filteredHelplines =
    selectedCategory === "All"
      ? helplines
      : helplines.filter((section) => section.category === selectedCategory);

  // 🔥 Function to Handle Text-to-Speech
  const speakText = (text) => {
    Speech.speak(text, { rate: 1.0, pitch: 1.0 });
    setIsSpeaking(true);
  };

  const stopSpeech = () => {
    Speech.stop();
    setIsSpeaking(false);
  };

  // 🔥 Detect Double Tap to Start/Stop Speech
  const handleTextToSpeech = (text) => {
    const now = Date.now();
    if (now - lastTap.current < 300) {
      if (isSpeaking) {
        stopSpeech();
      } else {
        speakText(text);
      }
    }
    lastTap.current = now;
  };

  return (
    <TouchableWithoutFeedback onPress={() => handleTextToSpeech("Help Desk")}>
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={() => handleTextToSpeech("Help Desk")}>
          <Text style={styles.pageTitle}>Help Desk</Text>
        </TouchableWithoutFeedback>

        {/* Filter ScrollView */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterContainer}>
          <TouchableOpacity
            style={[styles.filterButton, selectedCategory === "All" && styles.selectedFilter]}
            onPress={() => setSelectedCategory("All")}
          >
            <Text
              style={[styles.filterText, selectedCategory === "All" && styles.selectedFilterText]}
            >
              All
            </Text>
          </TouchableOpacity>
          {helplines.map((section, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.filterButton,
                selectedCategory === section.category && styles.selectedFilter,
              ]}
              onPress={() => setSelectedCategory(section.category)}
            >
              <Text
                style={[
                  styles.filterText,
                  selectedCategory === section.category && styles.selectedFilterText,
                ]}
              >
                {section.category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Helpline List */}
        <ScrollView style={styles.listContainer} contentContainerStyle={{ flexGrow: 1 }}>
          {filteredHelplines.map((section, index) => (
            <View key={index} style={styles.section}>
              <TouchableWithoutFeedback onPress={() => handleTextToSpeech(section.category)}>
                <Text style={styles.sectionTitle}>{section.category}</Text>
              </TouchableWithoutFeedback>
              {section.numbers.map((helpline, idx) => (
                <TouchableOpacity key={idx} style={styles.helplineItem} onPress={() => makeCall(helpline.number)}>
                  <View style={styles.helplineTextContainer}>
                    <TouchableWithoutFeedback onPress={() => handleTextToSpeech(`${helpline.name}, Contact: ${helpline.number}`)}>
                      <View>
                        <Text style={styles.helplineName}>{helpline.name}</Text>
                        <Text style={styles.helplineNumber}>{helpline.number}</Text>
                      </View>
                    </TouchableWithoutFeedback>
                  </View>
                  <MaterialIcons name="phone" size={24} color="#3867a1" style={styles.phoneIcon} />
                </TouchableOpacity>
              ))}
            </View>
          ))}
        </ScrollView>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#e6f7ff", paddingHorizontal: 15 },
  pageTitle: { fontSize: 28, fontWeight: "bold", color: "#3867a1", marginVertical: 20, textAlign: "center" },

  // Filter styles
  filterContainer: { flexGrow: 0, flexDirection: "row", marginBottom: 10, paddingHorizontal: 5 },
  filterButton: {
    height: 40,
    backgroundColor: "#ffffff",
    paddingVertical: 4,
    paddingHorizontal: 15,
    paddingBottom: 6,
    borderRadius: 20,
    marginRight: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  filterText: { fontSize: 16, color: "#373F51", fontWeight: "bold", textAlign: "center" },
  selectedFilter: { backgroundColor: "#3867a1" },
  selectedFilterText: { color: "#FFF" },

  // List styles
  listContainer: { flex: 1, marginBottom: 10, marginTop: 10 },
  section: { backgroundColor: "#FFF", borderRadius: 10, padding: 15, marginBottom: 20, elevation: 3 },
  sectionTitle: { fontSize: 22, fontWeight: "600", color: "#373F51", borderBottomWidth: 1, borderBottomColor: "#EEE", paddingBottom: 5, marginBottom: 10 },
  helplineItem: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: "#EEE" },
  helplineTextContainer: { flex: 1, marginRight: 10 },
  helplineName: { fontSize: 18, fontWeight: "500", color: "#373F51" },
  helplineNumber: { fontSize: 16, color: "#555", marginTop: 2 },
  phoneIcon: { marginLeft: 10 },
});

export default HelplinesPage;
