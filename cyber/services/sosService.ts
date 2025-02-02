import * as SMS from "expo-sms";
import { Linking, Platform } from "react-native";
import * as IntentLauncher from "expo-intent-launcher";

const emergencyNumber: string = "+919256722068"; // Replace with actual emergency contact number

export const sendSOS = async () => {
  try {
    // Check if SMS is available
    const isAvailable = await SMS.isAvailableAsync();
    if (!isAvailable) {
      console.log("SMS service is not available on this device.");
      return;
    }

    // Send SMS alert
    const { result } = await SMS.sendSMSAsync(
      [emergencyNumber],
      "🚨 Emergency Alert! A possible fall was detected. Please respond immediately!"
    );

    if (result === "sent") {
      console.log("SMS sent successfully");
    } else {
      console.log("SMS sending failed");
    }

    // 📞 Wait for 7 seconds before making the call (Android only)
    setTimeout(async () => {
      if (Platform.OS === "android") {
        const phoneCallUrl = `tel:${emergencyNumber}`;
        
        try {
          // Android-specific intent for making calls
          await IntentLauncher.startActivityAsync(IntentLauncher.ACTION_DIAL, {
            data: phoneCallUrl,
          });
          console.log("Emergency call placed");
        } catch (error) {
          console.log("Error placing emergency call:", error);
        }
      }
    }, 7000); // Wait 7 seconds before making the call
  } catch (error) {
    console.log("Error sending SOS:", error);
  }
};
