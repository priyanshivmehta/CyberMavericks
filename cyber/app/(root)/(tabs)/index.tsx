import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  StyleSheet,
  Image,
  Alert,
  TouchableWithoutFeedback,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import * as Speech from "expo-speech"; 
import { useGlobalContext } from "@/lib/global-provider";
import * as SMS from "expo-sms";
import { Accelerometer } from "expo-sensors";

export default function HealthDashboard() {
  const { user } = useGlobalContext();
  const [heartRate, setHeartRate] = useState(72);
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const lastTap = useRef(0);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const shakeDetected = useRef(false);  
  const cancelSOS = useRef(false);  
  const bp = "120/80"; // Example value for Blood Pressure
  const spo2 = 98; // Example value for SpO2 Levels
  const stress = "Low"; // Example value for Stress Level

  useEffect(() => {
    const interval = setInterval(() => {
      setHeartRate(Math.floor(Math.random() * (100 - 60 + 1)) + 60);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  // 🔥 Function to Handle Text-to-Speech
  const speakText = (text) => {
    Speech.speak(text, { rate: 1.0, pitch: 1.0 });
    setIsSpeaking(true);
  };

  const stopSpeech = () => {
    Speech.stop();
    setIsSpeaking(false);
  };

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

  // 📩 Function to Send SOS SMS
  const sendSOS = async () => {
    if (cancelSOS.current) {
      cancelSOS.current = false;  
      return;
    }

    const phoneNumber = "+919256722068";
    const message = "Emergency Alert! Please respond immediately!";

    const isAvailable = await SMS.isAvailableAsync();
    if (!isAvailable) {
      Alert.alert("SMS service is not available on this device.");
      return;
    }

    await SMS.sendSMSAsync([phoneNumber], message);
    Alert.alert("SOS Sent", "Emergency SMS has been sent successfully!");
  };

  // 📱 Detect Phone Shake for Emergency Alert with 10-second Cooldown
  useEffect(() => {
    const THRESHOLD = 1.5;
    let lastShakeTime = 0;

    const subscription = Accelerometer.addListener((data) => {
      const { x, y, z } = data;
      const acceleration = Math.sqrt(x * x + y * y + z * z);
      const currentTime = Date.now();

      if (acceleration > THRESHOLD && !shakeDetected.current) {
        if (currentTime - lastShakeTime > 10000) {  // Cooldown of 10 seconds
          shakeDetected.current = true;
          cancelSOS.current = false;

          Alert.alert(
            "Emergency Alert",
            "Shake detected! Sending SOS in 10 seconds. Do you want to cancel?",
            [
              {
                text: "Cancel",
                onPress: () => {
                  cancelSOS.current = true;
                  Alert.alert("SOS Cancelled", "No alert has been sent.");
                },
                style: "cancel",
              },
              {
                text: "Send Now",
                onPress: sendSOS,
              },
            ]
          );

          setTimeout(() => {
            if (!cancelSOS.current) sendSOS();
            shakeDetected.current = false;  
          }, 10000);

          lastShakeTime = currentTime;
        }
      }
    });

    Accelerometer.setUpdateInterval(500);

    return () => subscription.remove();
  }, []);

  return (
    <TouchableWithoutFeedback onPress={() => handleTextToSpeech("Health Dashboard")}>
      <View style={styles.container}>
        {/* User Profile Section */}
        <View style={styles.headerRow}>
          <View style={styles.userInfo}>
            <Image
              source={{ uri: user?.avatar || "https://via.placeholder.com/48" }}
              style={styles.avatar}
            />
            <View style={styles.userTextContainer}>
              <TouchableWithoutFeedback onPress={() => handleTextToSpeech(`Good Morning, ${user?.name || "John Doe"}`)}>
                <View>
                  <Text style={styles.greetingText}>Good Morning</Text>
                  <Text style={styles.userName}>{user?.name || "John Doe"}</Text>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </View>
        </View>

        {/* Heartbeat Button with Animation */}
        <Animated.View style={[styles.heartButton, { transform: [{ scale: scaleAnim }] }]}>
          <Icon name="heart-pulse" size={50} color="white" />
          <TouchableWithoutFeedback onPress={() => handleTextToSpeech(`${heartRate} beats per minute`)}>
            <Text style={styles.heartText}>{heartRate} BPM</Text>
          </TouchableWithoutFeedback>
        </Animated.View>

        <View style={styles.grid}>
          {[
            { label: "Blood Pressure", value: bp },
            { label: "SpO2 Levels", value: `${spo2}%` },
            { label: "Stress Level", value: stress },
            { label: "ECG Data", value: "Stable" },
          ].map((item, index) => (
            <TouchableWithoutFeedback key={index} onPress={() => handleTextToSpeech(`${item.label}: ${item.value}`)}>
              <View style={styles.card}>
                <Text style={styles.cardTitle}>{item.label}</Text>
                <Text style={[styles.cardValue, { color: "#3867a1" }]}>{item.value}</Text>
              </View>
            </TouchableWithoutFeedback>
          ))}
        </View>



        {/* SOS Button */}
        <TouchableOpacity style={styles.sosButton} onPress={sendSOS}>
          <Icon name="alert-circle" size={26} color="white" />
          <Text style={styles.sosText}>SOS Emergency</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#e6f7ff",
    padding: 20,
    paddingTop: 40,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
    marginBottom: 20,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: "#007BFF",
  },
  userTextContainer: {
    marginLeft: 12,
  },
  greetingText: {
    fontSize: 14,
    color: "#333",
  },
  userName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#007BFF",
  },
  heartButton: {
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: "#3867a1",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    elevation: 10,
  },
  heartText: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 10,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 25,
    width: "100%",
  },
  card: {
    width: "45%",
    padding: 15,
    backgroundColor: "white",
    borderRadius: 12,
    elevation: 5,
    alignItems: "center",
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#042140",
  },
  cardValue: {
    fontSize: 18,
    marginTop: 10,
    fontWeight: "bold",
  },
  sosButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#3867a1",
    paddingVertical: 15,
    paddingHorizontal: 35,
    borderRadius: 12,
    marginTop: 30,
    elevation: 8,
  },
  sosText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
  },
});

export { HealthDashboard };
