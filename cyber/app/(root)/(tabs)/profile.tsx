import React, { useState, useRef } from "react";
import {
  Alert,
  Image,
  ImageSourcePropType,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Modal,
  Animated,
  Dimensions,
} from "react-native";
import { logout } from "@/lib/appwrite";
import { useGlobalContext } from "@/lib/global-provider";
import icons from "@/constants/icons";
import { settings } from "@/constants/data";

const SCREEN_WIDTH = Dimensions.get("window").width;

interface SettingsItemProps {
  icon: ImageSourcePropType;
  title: string;
  onPress: () => void;
  textStyle?: object;
  showArrow?: boolean;
}

const SettingsItem: React.FC<SettingsItemProps> = ({ icon, title, onPress, textStyle, showArrow = true }) => (
  <TouchableOpacity onPress={onPress} style={styles.settingsItem}>
    <View style={styles.iconTextContainer}>
      <Image source={icon} style={styles.icon} />
      <Text style={[styles.text, textStyle]}>{title}</Text>
    </View>
    {showArrow && <Image source={icons.rightArrow} style={styles.arrow} />}
  </TouchableOpacity>
);

const Profile = () => {
  const { user, refetch } = useGlobalContext();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedSetting, setSelectedSetting] = useState<string | null>(null);
  const translateX = useRef(new Animated.Value(SCREEN_WIDTH)).current; // Start offscreen (right side)

  const handleLogout = async () => {
    const result = await logout();
    if (result) {
      Alert.alert("Success", "Logged out successfully");
      refetch({});
    } else {
      Alert.alert("Error", "Failed to logout");
    }
  };

  const openSlide = (setting: string) => {
    setSelectedSetting(setting);
    setModalVisible(true);
    Animated.timing(translateX, {
      toValue: 0, // Bring modal to screen
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const closeSlide = () => {
    Animated.timing(translateX, {
      toValue: SCREEN_WIDTH, // Move modal back to right side
      duration: 300,
      useNativeDriver: true,
    }).start(() => setModalVisible(false)); // Close modal after animation
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Profile</Text>
          <Image source={icons.bell} style={styles.bellIcon} />
        </View>

        <View style={styles.profileContainer}>
          <View style={styles.avatarContainer}>
            <Image source={{ uri: user?.avatar }} style={styles.avatar} />
            <TouchableOpacity style={styles.editButton}>
              <Image source={icons.edit} style={styles.editIcon} />
            </TouchableOpacity>
            <Text style={styles.profileName}>{user?.name}</Text>
          </View>
        </View>

        <View style={styles.settingsContainer}>
          <SettingsItem icon={icons.calendar} title="My Bookings" onPress={() => openSlide("My Bookings")} />
          <SettingsItem icon={icons.wallet} title="Payments" onPress={() => openSlide("Payments")} />
        </View>

        <View style={styles.additionalSettingsContainer}>
          {settings.slice(2).map((item, index) => (
            <SettingsItem key={index} {...item} onPress={() => openSlide(item.title)} />
          ))}
        </View>

        <View style={styles.logoutContainer}>
          <SettingsItem
            icon={icons.logout}
            title="Logout"
            textStyle={styles.logoutText}
            showArrow={false}
            onPress={handleLogout}
          />
        </View>
      </ScrollView>

      {/* Slide Modal */}
      {modalVisible && (
        <View style={styles.modalOverlay}>
          <TouchableOpacity style={styles.overlayTouchable} onPress={closeSlide} />
          <Animated.View style={[styles.modalContent, { transform: [{ translateX }] }]}>
            <Text style={styles.modalHeader}>{selectedSetting}</Text>
            <TouchableOpacity onPress={closeSlide}>
              <Text style={styles.closeText}>Close</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white" },
  scrollViewContent: { paddingBottom: 32, paddingHorizontal: 28 },
  header: { flexDirection: "row", justifyContent: "space-between", marginTop: 20 },
  headerText: { fontSize: 24, fontFamily: "Rubik-Bold" },
  bellIcon: { width: 20, height: 20 },
  profileContainer: { flexDirection: "row", justifyContent: "center", marginTop: 20 },
  avatarContainer: { flexDirection: "column", alignItems: "center", marginTop: 20, position: "relative" },
  avatar: { width: 176, height: 176, borderRadius: 88 },
  editButton: { position: "absolute", bottom: 44, right: 8 },
  editIcon: { width: 36, height: 36 },
  profileName: { fontSize: 24, fontFamily: "Rubik-Bold", marginTop: 10 },
  settingsContainer: { flexDirection: "column", marginTop: 40 },
  additionalSettingsContainer: { flexDirection: "column", marginTop: 20, borderTopWidth: 1, paddingTop: 20, borderColor: "#E0E0E0" },
  logoutContainer: { flexDirection: "column", marginTop: 20, paddingTop: 20, borderTopWidth: 1, borderColor: "#E0E0E0", marginBottom: 50 },
  settingsItem: { flexDirection: "row", justifyContent: "space-between", paddingVertical: 12 },
  iconTextContainer: { flexDirection: "row", alignItems: "center", gap: 12 },
  icon: { width: 24, height: 24 },
  text: { fontSize: 18, fontFamily: "Rubik-Medium", color: "#212121" },
  arrow: { width: 20, height: 20 },
  logoutText: { color: "red" },

  modalOverlay: { 
    position: "absolute", top: 0, left: 0, right: 0, bottom: 0, 
    backgroundColor: "rgba(0,0,0,0.5)", 
    flexDirection: "row", 
    justifyContent: "flex-end" 
  },
  overlayTouchable: { flex: 1 }, // Close modal when tapping outside
  modalContent: { 
    width: "80%", 
    height: "100%", 
    backgroundColor: "white", 
    padding: 20, 
    borderTopLeftRadius: 20, 
    borderBottomLeftRadius: 20 
  },
  modalHeader: { fontSize: 20, fontFamily: "Rubik-Bold", marginBottom: 10 },
  closeText: { color: "blue", textAlign: "center", marginTop: 20 },
});

export default Profile;