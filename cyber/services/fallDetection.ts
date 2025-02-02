import { Accelerometer } from "expo-sensors";
import { sendSOS } from "../services/sosService";

const FALL_THRESHOLD = 2.5; // Adjust threshold for better accuracy
let subscription: any = null;

export const startFallDetection = (callback: (fallDetected: boolean) => void) => {
  subscription = Accelerometer.addListener(({ x, y, z }) => {
    const acceleration = Math.sqrt(x * x + y * y + z * z);

    if (acceleration < FALL_THRESHOLD) {
      console.log("🚨 Fall detected! Sending SOS...");
      callback(true);
      sendSOS(); // Automatically trigger SOS
    }
  });

  // Set update interval for accelerometer readings
  Accelerometer.setUpdateInterval(500); // Adjust based on needs

  return {
    stop: () => {
      if (subscription) {
        subscription.remove();
        subscription = null;
      }
    },
  };
};