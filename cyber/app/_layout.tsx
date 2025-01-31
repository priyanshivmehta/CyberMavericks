import { useEffect } from "react";
import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";


import GlobalProvider from "@/lib/global-provider";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    "Rubik-Bold": require("../assets/fonts/Rubik-Bold.ttf"),
    "Rubik-ExtraBold": require("../assets/fonts/Rubik-ExtraBold.ttf"),
    "Rubik-Light": require("../assets/fonts/Rubik-Light.ttf"),
    "Rubik-Medium": require("../assets/fonts/Rubik-Medium.ttf"),
    "Rubik-Regular": require("../assets/fonts/Rubik-Regular.ttf"),
    "Rubik-SemiBold": require("../assets/fonts/Rubik-SemiBold.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <GlobalProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </GlobalProvider>
  );
}





// import { Stack, useRouter } from "expo-router";
// import { useFonts } from "expo-font";
// import { useEffect, useState } from "react";
// import * as SplashScreen from "expo-splash-screen";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// SplashScreen.preventAutoHideAsync();

// export default function RootLayout() {
//   const [fontsLoaded] = useFonts({
//     "Rubik-Bold": require("../assets/fonts/Rubik-Bold.ttf"),
//     "Rubik-ExtraBold": require("../assets/fonts/Rubik-ExtraBold.ttf"),
//     "Rubik-Light": require("../assets/fonts/Rubik-Light.ttf"),
//     "Rubik-Medium": require("../assets/fonts/Rubik-Medium.ttf"),
//     "Rubik-Regular": require("../assets/fonts/Rubik-Regular.ttf"),
//     "Rubik-SemiBold": require("../assets/fonts/Rubik-SemiBold.ttf"),
//   });

//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const router = useRouter();

//   useEffect(() => {
//     const checkAuth = async () => {
//       const userToken = await AsyncStorage.getItem("userToken");
//       setIsAuthenticated(!!userToken);
//     };

//     if (fontsLoaded) {
//       checkAuth().finally(() => {
//         SplashScreen.hideAsync();
//         router.replace(isAuthenticated ? "/(root)/(tabs)" : "/sign-in");
//       });
//     }
//   }, [fontsLoaded, isAuthenticated]);

//   if (!fontsLoaded) {
//     return null;
//   }

//   return <Stack screenOptions={{ headerShown: false }} />;
// }