import React, { useState, useRef } from "react";
import {
  Alert,
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Pressable,
} from "react-native";

const symptomsList = [
  "Chest Pain",
  "Dizziness",
  "Headache",
  "Vomiting",
  "Sudden Loss of Weight",
  "Blurred Vision",
];

const CustomCheckbox = ({ isChecked, onPress }: { isChecked: boolean; onPress: () => void }) => (
  <Pressable onPress={onPress} style={styles.checkbox}>
    <Text style={styles.checkboxText}>{isChecked ? "✔" : " "}</Text>
  </Pressable>
);

const SymptomsPage = () => {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [hospitalName, setHospitalName] = useState(""); // Hospital input as TextInput
  const [appointmentDay, setAppointmentDay] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");
  const [resultVisible, setResultVisible] = useState(false);
  const [diseaseInfo, setDiseaseInfo] = useState<any>(null); // Store the disease information

  const scrollViewRef = useRef<ScrollView>(null);
  const resultRef = useRef<View>(null);

  const handleSymptomSelect = (symptom: string) => {
    setSelectedSymptoms((prevSymptoms) =>
      prevSymptoms.includes(symptom)
        ? prevSymptoms.filter((item) => item !== symptom)
        : [...prevSymptoms, symptom]
    );
  };

  const handleCheckIssue = async () => {
    if (selectedSymptoms.length > 0) {
      try {
        // Make a POST request using fetch instead of Axios
        const response = await fetch("http://localhost:8000/check_symptoms", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            symptoms: selectedSymptoms,
          }),
        });

        // Parse the JSON response
        const data = await response.json();

        // Handle if the response is not successful
        if (!response.ok) {
          throw new Error(data.message || "Error fetching disease info");
        }

        // Set the result and show it
        setDiseaseInfo(data);
        setResultVisible(true);

        // Scroll to the result
        setTimeout(() => {
          resultRef.current?.measureLayout(
            scrollViewRef.current as any,
            (_x, y) => {
              scrollViewRef.current?.scrollTo({ y, animated: true });
            }
          );
        }, 300);
      } catch (error) {
        console.error("Error fetching disease info:", error);
        Alert.alert("Error", "Unable to fetch diagnosis.");
      }
    } else {
      Alert.alert("Error", "Please select at least one symptom.");
    }
  };

  const handleBookAppointment = () => {
    if (!hospitalName || !appointmentDay || !appointmentTime) {
      Alert.alert("Error", "Please fill all appointment details.");
      return;
    }
    Alert.alert("Success", `Your appointment at ${hospitalName} has been booked.`);
    setModalVisible(false);
  };

  const renderDiseaseInfo = () => {
    if (!diseaseInfo) return null;

    return (
      <View style={styles.diseaseInfoContainer} ref={resultRef}>
        {diseaseInfo.map((info: any, index: number) => (
          <View key={index}>
            <Text style={styles.diseaseTitle}>Possible Diagnosis</Text>
            <Text style={styles.diseaseText}>Condition: {info.disease}</Text>
            <Text style={styles.cureText}>Suggested Treatment: {info.cure}</Text>
          </View>
        ))}

        <TouchableOpacity style={styles.bookButton} onPress={() => setModalVisible(true)}>
          <Text style={styles.bookButtonText}>Book Appointment</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Health Diagnosis</Text>
      </View>

      <ScrollView ref={scrollViewRef} contentContainerStyle={styles.scrollViewContent}>
        <Text style={styles.subHeader}>Select the symptoms you are experiencing:</Text>

        {symptomsList.map((symptom, index) => (
          <TouchableOpacity key={index} style={styles.symptomCard} onPress={() => handleSymptomSelect(symptom)}>
            <CustomCheckbox isChecked={selectedSymptoms.includes(symptom)} onPress={() => handleSymptomSelect(symptom)} />
            <Text style={styles.symptomText}>{symptom}</Text>
          </TouchableOpacity>
        ))}

        <TouchableOpacity style={styles.checkIssueButton} onPress={handleCheckIssue}>
          <Text style={styles.checkIssueText}>Check Health Condition</Text>
        </TouchableOpacity>

        {resultVisible && <View style={styles.resultContainer}>{renderDiseaseInfo()}</View>}
      </ScrollView>

      {/* Appointment Booking Modal */}
      <Modal visible={modalVisible} transparent={true} animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Book an Appointment</Text>

            <Text style={styles.label}>Hospital Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Hospital Name"
              value={hospitalName}
              onChangeText={setHospitalName}
            />

            <TextInput style={styles.input} placeholder="Appointment Day" value={appointmentDay} onChangeText={setAppointmentDay} />
            <TextInput style={styles.input} placeholder="Preferred Time" value={appointmentTime} onChangeText={setAppointmentTime} />

            <TouchableOpacity style={styles.bookButton} onPress={handleBookAppointment}>
              <Text style={styles.bookButtonText}>Confirm Appointment</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.closeButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  symptomText: { fontSize: 16, color: "#333" },
  checkIssueButton: { backgroundColor: "#3867a1", padding: 12, borderRadius: 8, alignItems: "center", marginTop: 20 },
  checkIssueText: { color: "white", fontSize: 16, fontWeight: "bold" },
  resultContainer: { padding: 20, backgroundColor: "#fff", borderRadius: 8, elevation: 3, marginTop: 20 },
  container: { flex: 1, backgroundColor: "#f9f9f9", paddingHorizontal: 10, marginBottom: 70 },
  header: { backgroundColor: "#3867a1", padding: 25, borderRadius: 20, alignItems: "center" },
  headerText: { fontSize: 24, fontWeight: "bold", color: "white" },
  scrollViewContent: { paddingBottom: 32 },
  subHeader: { fontSize: 18, color: "#333", marginBottom: 20, textAlign: "center", marginTop: 20 },
  symptomCard: { flexDirection: "row", alignItems: "center", backgroundColor: "#ffffff", padding: 15, marginBottom: 10, borderRadius: 8, elevation: 3 },
  input: { width: "100%", padding: 12, borderWidth: 1, borderColor: "#ccc", borderRadius: 6, marginBottom: 10 },
  bookButton: { backgroundColor: "#3867a1", padding: 12, borderRadius: 8, alignItems: "center", marginTop: 10 },
  bookButtonText: { color: "white", fontSize: 16, fontWeight: "bold" },
  closeButton: { backgroundColor: "#ccc", padding: 12, borderRadius: 8, alignItems: "center", marginTop: 10 },
  closeButtonText: { color: "black", fontSize: 16 },
  checkbox: { width: 24, height: 24, marginRight: 10, justifyContent: "center", alignItems: "center", borderWidth: 1, borderColor: "#ccc", borderRadius: 4 },
  checkboxText: { fontSize: 18 },
  diseaseInfoContainer: { backgroundColor: "#fff", padding: 20, borderRadius: 8, elevation: 3, marginTop: 20 },
  diseaseTitle: { fontSize: 20, fontWeight: "bold", color: "#333", marginBottom: 10 },
  diseaseText: { fontSize: 16, color: "#333", marginBottom: 5 },
  cureText: { fontSize: 16, color: "#333", marginBottom: 10 },
  modalOverlay: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0, 0, 0, 0.5)" },
  modalContent: { width: "90%", backgroundColor: "#fff", padding: 20, borderRadius: 10, elevation: 5 },
  modalTitle: { fontSize: 20, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
  label: { fontSize: 16, color: "#333", marginBottom: 10 },
});

export default SymptomsPage;
