import React from "react";
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
  TextStyle,
} from "react-native";

import { logout } from "@/lib/appwrite";
import { useGlobalContext } from "@/lib/global-provider";

import icons from "@/constants/icons";
import { settings } from "@/constants/data";

interface SettingsItemProp {
  icon: ImageSourcePropType;
  title: string;
  onPress?: () => void;
  textStyle?: TextStyle;
  showArrow?: boolean;
}

const SettingsItem = ({
  icon,
  title,
  onPress,
  textStyle,
  showArrow = true,
}: SettingsItemProp) => (
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

  const handleLogout = async () => {
    const result = await logout();
    if (result) {
      Alert.alert("Success", "Logged out successfully");
      refetch({});
    } else {
      Alert.alert("Error", "Failed to logout");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContent}
      >
        <View style={styles.header}>
          <Text style={styles.headerText}>Profile</Text>
          <Image source={icons.bell} style={styles.bellIcon} />
        </View>

        <View style={styles.profileContainer}>
          <View style={styles.avatarContainer}>
            <Image
              source={{ uri: user?.avatar }}
              style={styles.avatar}
            />
            <TouchableOpacity style={styles.editButton}>
              <Image source={icons.edit} style={styles.editIcon} />
            </TouchableOpacity>

            <Text style={styles.profileName}>{user?.name}</Text>
          </View>
        </View>

        <View style={styles.settingsContainer}>
          <SettingsItem icon={icons.calendar} title="My Bookings" />
          <SettingsItem icon={icons.wallet} title="Payments" />
        </View>

        <View style={styles.additionalSettingsContainer}>
          {settings.slice(2).map((item, index) => (
            <SettingsItem key={index} {...item} />
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  scrollViewContent: {
    paddingBottom: 32,
    paddingHorizontal: 28,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  headerText: {
    fontSize: 24,
    fontFamily: "Rubik-Bold",
  },
  bellIcon: {
    width: 20,
    height: 20,
  },
  profileContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  avatarContainer: {
    flexDirection: "column",
    alignItems: "center",
    marginTop: 20,
    position: "relative",
  },
  avatar: {
    width: 176,
    height: 176,
    borderRadius: 88,
  },
  editButton: {
    position: "absolute",
    bottom: 44,
    right: 8,
  },
  editIcon: {
    width: 36,
    height: 36,
  },
  profileName: {
    fontSize: 24,
    fontFamily: "Rubik-Bold",
    marginTop: 10,
  },
  settingsContainer: {
    flexDirection: "column",
    marginTop: 40,
  },
  additionalSettingsContainer: {
    flexDirection: "column",
    marginTop: 20,
    borderTopWidth: 1,
    paddingTop: 20,
    borderColor: "#E0E0E0",
  },
  logoutContainer: {
    flexDirection: "column",
    marginTop: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderColor: "#E0E0E0",
    marginBottom:50,
  },
  settingsItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
  },
  iconTextContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  icon: {
    width: 24,
    height: 24,
  },
  text: {
    fontSize: 18,
    fontFamily: "Rubik-Medium",
    color: "#212121",
  },
  arrow: {
    width: 20,
    height: 20,
  },
  logoutText: {
    color: "red",
  },
});

export default Profile;
