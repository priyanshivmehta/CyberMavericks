import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Alert,
  Image,
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

      <View style={styles.contentContainer}>
        <Text style={styles.welcomeText}>Welcome To Real Scout</Text>

        <Text style={styles.titleText}>
          Let's Get You Closer To {"\n"}
          <Text style={styles.highlightText}>Your Ideal Home</Text>
        </Text>

        <Text style={styles.loginText}>Login to Real Scout with Google</Text>

        <TouchableOpacity onPress={handleLogin} style={styles.button}>
          <View style={styles.buttonContent}>
            <Image source={icons.google} style={styles.icon} resizeMode="contain" />
            <Text style={styles.buttonText}>Continue with Google</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  image: {
    width: "100%",
    height: "40%",
  },
  contentContainer: {
    width: "100%",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  welcomeText: {
    fontSize: 14,
    textAlign: "center",
    textTransform: "uppercase",
    color: "#6B7280",
  },
  titleText: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 10,
    color: "#374151",
  },
  highlightText: {
    color: "#1E40AF",
  },
  loginText: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
    color: "#6B7280",
  },
  button: {
    backgroundColor: "white",
    elevation: 3,
    borderRadius: 50,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 20,
    width: "80%",
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    width: 20,
    height: 20,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#374151",
    marginLeft: 8,
  },
});

export default Auth;
