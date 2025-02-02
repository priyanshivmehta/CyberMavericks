import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Alert,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";

import { login } from "@/lib/appwrite";
import { Redirect } from "expo-router";
import { useGlobalContext } from "@/lib/global-provider";
import icons from "@/constants/icons";
import images from "@/constants/images";

const Auth = () => {
  const { refetch, loading, isLogged } = useGlobalContext();

  if (!loading && isLogged) return <Redirect href="/" />;

  const handleLogin = async () => {
    const result = await login();
    if (result) {
      refetch({});
    } else {
      Alert.alert("Error", "Failed to login");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Image source={images.onboarding} style={styles.image} resizeMode="contain" />

        <View style={styles.textContainer}>

          <Text style={styles.signText}>
          Ready to take the first step toward better health? 
          </Text>

          <Text style={styles.loginText}>Login to Vital Tracks with Google</Text>

          <TouchableOpacity onPress={handleLogin} style={styles.loginButton}>
            <View style={styles.buttonContent}>
              <Image source={icons.google} style={styles.googleIcon} resizeMode="contain" />
              <Text style={styles.buttonText}>Continue with Google</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#3867a1",
  },
  scrollContainer: {
    flexGrow: 1,
  },
  image: {
    width: "80%",
    height: "60%",
    marginLeft:35,
    marginTop:80,
  },
  textContainer: {
    paddingHorizontal: 40,
    alignItems: "center",
  },
  welcomeText: {
    fontSize: 16,
    textAlign: "center",
    textTransform: "uppercase",
    color: "#666",
  },
  titleText: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 40,
    color: "#DDD",
  },
  highlightText: {
    color: "#e6f7ff",
  },
  signText: {
    fontSize: 20,
    color: "#DDD",
    textAlign: "center",
    marginTop: 10,
    fontWeight: "bold",
  },
  loginText: {
    fontSize: 18,
    color: "#DDD",
    textAlign: "center",
    marginTop: 10,
  },
  loginButton: {
    backgroundColor: "white",
    elevation: 3,
    borderRadius: 50,
    width: "100%",
    paddingVertical: 12,
    marginTop: 20,
    alignItems: "center",
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  googleIcon: {
    width: 20,
    height: 20,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "500",
    color: "#333",
    marginLeft: 10,
  },
});

export default Auth;



