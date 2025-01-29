import { Image, Text, View, StyleSheet } from "react-native";
import { Link } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import images from "@/constants/images";
import icons from "@/constants/icons";
import Search from "@/components/Search";

export default function Index() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={styles.row}>
          <View style={styles.profileContainer}>
            <Image source={images.avatar} style={styles.avatar} />
            <View style={styles.textContainer}>
              <Text style={styles.greetingText}>Hello,</Text>
              <Text style={styles.nameText}>John Doe</Text>
            </View>
            <Image source={icons.bell} style={styles.bellIcon} />
          </View>
        </View>
      </View>
      <Search />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  innerContainer: {
    paddingHorizontal: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 48, // Adjust size as needed
    height: 48, // Adjust size as needed
    borderRadius: 24, // Half of width/height for circular image
  },
  textContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginLeft: 8,
    justifyContent: 'center',
  },
  greetingText: {
    fontSize: 12, // Adjust size as needed
    fontWeight: 'bold',
    color: '#000', // Adjust color as needed
  },
  nameText: {
    fontSize: 16, // Adjust size as needed
    fontWeight: 'bold',
    color: '#000', // Adjust color as needed
  },
  bellIcon: {
    width: 24, // Adjust size as needed
    height: 24, // Adjust size as needed
  },
});