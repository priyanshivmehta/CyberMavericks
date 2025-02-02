// // import React from "react";
// // import { Alert, Image, ImageSourcePropType, SafeAreaView, ScrollView, Text, TouchableOpacity, View, StyleSheet } from "react-native";
// // import { logout } from "@/lib/appwrite";
// // import { useGlobalContext } from "@/lib/global-provider";
// // import icons from "@/constants/icons";
// // import { settings } from "@/constants/data";

// // interface SettingsItemProp {
// //   icon: ImageSourcePropType;
// //   title: string;
// //   onPress?: () => void;
// //   textStyle?: string;
// //   showArrow?: boolean;
// // }

// // const SettingsItem = ({
// //   icon,
// //   title,
// //   onPress,
// //   textStyle,
// //   showArrow = true,
// // }: SettingsItemProp) => (
// //   <TouchableOpacity onPress={onPress} style={styles.settingsItem}>
// //     <View style={styles.iconTextContainer}>
// //       <Image source={icon} style={styles.icon} />
// //       <Text style={[styles.text, textStyle]}>{title}</Text>
// //     </View>
// //     {showArrow && <Image source={icons.rightArrow} style={styles.arrow} />}
// //   </TouchableOpacity>
// // );

// // const Profile = () => {
// //   const { user, refetch } = useGlobalContext();

// //   const handleLogout = async () => {
// //     const result = await logout();
// //     if (result) {
// //       Alert.alert("Success", "Logged out successfully");
// //       refetch();
// //     } else {
// //       Alert.alert("Error", "Failed to logout");
// //     }
// //   };

// //   return (
// //     <SafeAreaView style={styles.container}>
// //       <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollViewContent}>
// //         <View style={styles.header}>
// //           <Text style={styles.headerText}>Profile</Text>
// //           <Image source={icons.bell} style={styles.bellIcon} />
// //         </View>

// //         <View style={styles.avatarContainer}>
// //           <Image source={{ uri: user?.avatar }} style={styles.avatar} />
// //           <TouchableOpacity style={styles.editButton}>
// //             <Image source={icons.edit} style={styles.editIcon} />
// //           </TouchableOpacity>
// //           <Text style={styles.profileName}>{user?.name}</Text>
// //         </View>


// //         <View style={styles.settingsSection}>
// //           {settings.slice(2).map((item, index) => (
// //             <SettingsItem key={index} {...item} />
// //           ))}
// //         </View>

// //         <View style={styles.logoutSection}>
// //           <SettingsItem
// //             icon={icons.logout}
// //             title="Logout"
// //             textStyle={styles.logoutText}
// //             showArrow={false}
// //             onPress={handleLogout}
// //           />
// //         </View>
// //       </ScrollView>
// //     </SafeAreaView>
// //   );
// // };

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     backgroundColor: "white",
// //   },
// //   scrollViewContent: {
// //     paddingBottom: 32,
// //     paddingHorizontal: 28,
// //   },
// //   header: {
// //     flexDirection: "row",
// //     justifyContent: "space-between",
// //     marginTop: 20,
// //   },
// //   headerText: {
// //     fontSize: 24,
// //     fontWeight: "bold",
// //   },
// //   bellIcon: {
// //     width: 24,
// //     height: 24,
// //   },
// //   avatarContainer: {
// //     alignItems: "center",
// //     marginTop: 20,
// //   },
// //   avatar: {
// //     width: 120,
// //     height: 120,
// //     borderRadius: 60,
// //   },
// //   editButton: {
// //     position: "absolute",
// //     bottom: 11,
// //     right: 2,
// //   },
// //   editIcon: {
// //     width: 24,
// //     height: 24,
// //   },
// //   profileName: {
// //     fontSize: 22,
// //     fontWeight: "bold",
// //     marginTop: 10,
// //   },
// //   settingsSection: {
// //     marginTop: 20,
// //   },
// //   logoutSection: {
// //     marginTop: 20,
// //     borderTopWidth: 1,
// //     borderTopColor: "#ddd",
// //     paddingTop: 20,
// //   },
// //   settingsItem: {
// //     flexDirection: "row",
// //     justifyContent: "space-between",
// //     paddingVertical: 15,
// //   },
// //   iconTextContainer: {
// //     flexDirection: "row",
// //     alignItems: "center",
// //   },
// //   icon: {
// //     width: 24,
// //     height: 24,
// //   },
// //   text: {
// //     fontSize: 18,
// //     color: "#333",
// //   },
// //   arrow: {
// //     width: 16,
// //     height: 16,
// //   },
// //   logoutText: {
// //     color: "#d9534f",
// //   },
// // });

// // export default Profile;





// import React, { useState } from "react";
// import {
//   Alert,
//   Image,
//   SafeAreaView,
//   ScrollView,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
//   StyleSheet,
// } from "react-native";
// import { useGlobalContext } from "@/lib/global-provider";
// import { logout } from "@/lib/appwrite";
// import icons from "@/constants/icons";

// const MedicalReport = () => {
//   const { user, refetch } = useGlobalContext();
  
//   const [isEditing, setIsEditing] = useState(false);
//   const [modalVisible, setModalVisible] = useState(false);

//   const [userData, setUserData] = useState({
//     email: user?.email || "",
//     phone: user?.phone || "",
//     age: user?.age || "",
//     gender: user?.gender || "",
//     address: user?.address || "",
//     bloodGroup: user?.bloodGroup || "",
//     healthIssues: user?.healthIssues || "",
//     allergies: user?.allergies || "",
//     medications: user?.medications || "",
//     pastSurgeries: user?.pastSurgeries || "",
//   });

//   const handleInputChange = (field, value) => {
//     setUserData({ ...userData, [field]: value });
//   };

//   const handleSaveReport = () => {
//     setIsEditing(false);
//     Alert.alert("Success", "Your medical report has been updated.");
//     refetch(userData);
//   };

//   const handleLogout = async () => {
//     const result = await logout();
//     if (result) {
//       Alert.alert("Success", "Logged out successfully");
//       refetch({});
//     } else {
//       Alert.alert("Error", "Failed to log out");
//     }
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollViewContent}>
//         <View style={styles.header}>
//           <Text style={styles.headerText}>User Medical Report</Text>
//           <TouchableOpacity onPress={() => setIsEditing(!isEditing)}>
//             <Image source={icons.edit} style={styles.editIcon} />
//           </TouchableOpacity>
//         </View>

//         <View style={styles.profileContainer}>
//           <View style={styles.avatarContainer}>
//             <Image source={{ uri: user?.avatar }} style={styles.avatar} />
//             <Text style={styles.profileName}>{user?.name}</Text>
//           </View>
//         </View>

//         {/* Personal Details */}
//         <View style={styles.detailsContainer}>
//           <Text style={styles.sectionHeader}>Personal Details</Text>

//           {Object.entries(userData).map(([key, value]) => (
//             <View key={key} style={styles.detailsRow}>
//               <Text style={styles.label}>{key.replace(/([A-Z])/g, " $1").trim()}:</Text>
//               <TextInput
//                 style={[styles.input, isEditing ? styles.inputEditable : null]}
//                 value={value}
//                 onChangeText={(text) => handleInputChange(key, text)}
//                 editable={isEditing}
//                 multiline={key === "address" || key.includes("health")}
//               />
//             </View>
//           ))}
//         </View>

//         {isEditing && (
//           <TouchableOpacity style={styles.saveButton} onPress={handleSaveReport}>
//             <Text style={styles.saveButtonText}>Save Medical Report</Text>
//           </TouchableOpacity>
//         )}

//         {/* FAQs & Terms Section */}
//         <View style={styles.settingsContainer}>
//           <SettingsItem icon={icons.info} title="Fitness Guide" onPress={() => setModalVisible(true)} />
//           <SettingsItem icon={icons.info} title="Helpline" onPress={() => setModalVisible(true)} />
//         </View>

//         {/* Logout Section */}
//         <View style={styles.logoutContainer}>
//           <SettingsItem icon={icons.logout} title="Logout" showArrow={false} onPress={handleLogout} />
//         </View>
//       </ScrollView>

//       {/* Modal for FAQs and Terms */}
//       {modalVisible && (
//         <View style={styles.modalOverlay}>
//           <TouchableOpacity style={styles.overlayTouchable} onPress={() => setModalVisible(false)} />
//           <View style={styles.modalContent}>
//             <Text style={styles.modalHeader}>FAQs or Terms & Conditions</Text>
//             <TouchableOpacity onPress={() => setModalVisible(false)}>
//               <Text style={styles.closeText}>Close</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       )}
//     </SafeAreaView>
//   );
// };

// // Reusable Settings Item Component
// const SettingsItem = ({ icon, title, onPress, showArrow = true }) => (
//   <TouchableOpacity onPress={onPress} style={styles.settingsItem}>
//     <View style={styles.iconTextContainer}>
//       <Image source={icon} style={styles.icon} />
//       <Text style={styles.text}>{title}</Text>
//     </View>
//     {showArrow && <Image source={icons.rightArrow} style={styles.arrow} />}
//   </TouchableOpacity>
// );

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: "white", marginBottom: 50 },
//   scrollViewContent: { paddingBottom: 32, paddingHorizontal: 28 },
//   header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 20 },
//   headerText: { fontSize: 24, fontWeight: "bold" },
//   editIcon: { width: 24, height: 24 },
//   profileContainer: { alignItems: "center", marginTop: 20 },
//   avatar: { width: 120, height: 120, borderRadius: 60 },
//   profileName: { fontSize: 22, fontWeight: "bold", marginTop: 10 },
//   detailsContainer: { marginTop: 20 },
//   sectionHeader: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
//   detailsRow: { flexDirection: "row", alignItems: "center", marginBottom: 12 },
//   label: { fontSize: 16, fontWeight: "bold", flex: 1 },
//   input: {
//     flex: 2,
//     borderWidth: 1,
//     borderColor: "#ccc",
//     borderRadius: 5,
//     padding: 8,
//     backgroundColor: "#f0f0f0",
//   },
//   inputEditable: { backgroundColor: "#ffffff", borderColor: "#007AFF" },
//   saveButton: { backgroundColor: "#007AFF", padding: 12, borderRadius: 8, alignItems: "center", marginTop: 20 },
//   saveButtonText: { color: "white", fontSize: 16, fontWeight: "bold" },
//   settingsContainer: { marginTop: 30 },
//   logoutContainer: { marginTop: 20, paddingTop: 20, borderTopWidth: 1, borderColor: "#E0E0E0" },
//   settingsItem: { flexDirection: "row", justifyContent: "space-between", paddingVertical: 12 },
//   iconTextContainer: { flexDirection: "row", alignItems: "center", gap: 12 },
//   icon: { width: 24, height: 24 },
//   text: { fontSize: 18, fontWeight: "600", color: "#212121" },
//   arrow: { width: 20, height: 20 },
//   modalOverlay: {
//     position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
//     backgroundColor: "rgba(0,0,0,0.5)", justifyContent: "center", alignItems: "center"
//   },
//   overlayTouchable: { flex: 1 },
//   modalContent: {
//     backgroundColor: "white",
//     padding: 20,
//     borderRadius: 10,
//     width: "80%",
//   },
//   modalHeader: { fontSize: 20, fontWeight: "bold" },
//   closeText: { color: "blue", textAlign: "center", marginTop: 20 },
// });

// export default MedicalReport;





// import React, { useState } from 'react';
// import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

// const exercises = [
//   { id: '1', name: 'Cat-Cow Stretch', issue: 'Lower Back Pain - for 60 sec', imageUrl: 'https://www.verywellfit.com/thmb/fs76ElRyXEifvR6wLcdmKS6MEgs=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/About-A3-CatCow-019-570d44f83df78c7d9e3c571e.jpg' },
//   { id: '2', name: 'Child’s Pose', issue: 'Lower Back Pain - for 60 sec', imageUrl: 'https://www.theyogacollective.com/wp-content/uploads/2019/10/4143473057707883372_IMG_8546-2-1200x800.jpg' },
//   { id: '3', name: 'Hamstring Stretch', issue: 'Knee Pain - for 30 sec', imageUrl: 'https://www.verywellfit.com/thmb/CYtzFo979FjpW5-wz0V8Hge29xQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/7-downdog-56f98e3d3df78c7841935724.jpg' },
//   { id: '4', name: 'Step-Ups', issue: 'Knee Pain', imageUrl: 'https://tse1.mm.bing.net/th?id=OIP.c7FSYvl4nwjlTyATIXStpAHaHa&pid=Api' },
//   { id: '5', name: 'Bridge Exercise', issue: 'Flexibility & Strength', imageUrl: 'https://tse3.mm.bing.net/th?id=OIP.T4NkyGYRMa2Kk4YTSVM3kAHaEJ&pid=Api' },
//   { id: '6', name: 'Quadriceps Stretch', issue: 'Knee Pain', imageUrl: 'https://www.verywellfit.com/thmb/ZhebQCbptSAeqWEms7TEzve85dY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Verywell-30-2696366-StandingStretch-2106-5993552eb501e800127d38d3.jpg' },
//   { id: '7', name: 'Quad sets', issue: 'Knee Pain', imageUrl: 'https://menskool-site.s3.ap-south-1.amazonaws.com/short_arc_a64053fe3f.gif' },
//   { id: '8', name: 'Hip Flexor Stretch', issue: 'Flexibility & Strength', imageUrl: 'https://app-media.fitbod.me/v2/485/images/landscape/0_960x540.jpg' },
//   { id: '9', name: 'Plank', issue: 'Flexibility & Strength', imageUrl: 'https://www.shape.com/thmb/T2GyvzFah3XYR8_L8W16ANWBTXs=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/low-plank-hold-b8a63da1ef844f00b6f6a21141ba1d87.jpg' },
//   { id: '10', name: 'Bodyweight Squats', issue: 'Flexibility & Strength', imageUrl: 'https://hips.hearstapps.com/hmg-prod/images/man-exercising-at-home-royalty-free-image-1645047847.jpg' },
//   { id: '11', name: 'Knee-to-chest Stretch', issue: 'Lower Back Pain', imageUrl: 'https://d20bb9v528piij.cloudfront.net/14.3/en-us/abo6363/SD/abo6363_1280x720.jpg' },
//   { id: '12', name: 'Pelvic Tilt', issue: 'Lower Back Pain', imageUrl: 'https://cdn-prod.medicalnewstoday.com/content/images/articles/322/322684/sit-up.gif' },
//   { id: '13', name: 'Calf Stretch', issue: 'Calf Pain', imageUrl: 'https://media.istockphoto.com/id/847138096/photo/strong-man-stretching-calf-and-leaning-on-wall.jpg?s=612x612&w=0&k=20&c=nvne2lJhp9P4uc6yfkjoIy-TDc0i3N-ohpm7vJJm8Fg=' },
//   { id: '14', name: 'Seated Calf Stretch', issue: 'Calf Pain', imageUrl: 'https://www.bodybuildingindia.com/cdn/shop/articles/seated-calf-stretch.jpg?v=1633697064' },
//   { id: '15', name: 'Jump Rope', issue: 'Calf Pain', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRej6WrqLcCzg2eL1QaqVnyVU3x1gb-gtd3bVk24BrxZIAj_UuAl1hsR3v1AxCGquOHJXE&usqp=CAU' },
//   { id: '16', name: 'Calf Press on Leg Press Machine', issue: 'Calf Pain', imageUrl: 'https://www.puregym.com/media/25lfd3ff/thumbnail_leg-press-calf-raise.jpg?quality=80' },
// ];

// export default function ExerciseRecommendation() {
//   const [selectedIssue, setSelectedIssue] = useState<string | null>(null);

//   const filteredExercises = selectedIssue
//     ? exercises.filter(exercise => exercise.issue.includes(selectedIssue))
//     : exercises;

//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <Text style={styles.headerText}>Fitness Guide 🏋🏻</Text>
//       </View>
      
//       {/* Filter Section */}
//       <View style={styles.filterWrapper}>
//         <ScrollView 
//           horizontal
//           contentContainerStyle={styles.filterContainer} 
//           showsHorizontalScrollIndicator={false}
//         >
//           {['All', 'Lower Back Pain', 'Knee Pain', 'Flexibility & Strength', 'Calf Pain'].map(issue => (
//             <TouchableOpacity
//               key={issue}
//               style={[styles.filterButton, selectedIssue === issue ? styles.activeFilter : null]}
//               onPress={() => setSelectedIssue(issue === 'All' ? null : issue)}
//             >
//               <Text style={styles.filterText}>{issue}</Text>
//             </TouchableOpacity>
//           ))}
//         </ScrollView>
//       </View>

//       {/* Exercises List */}
//       <View style={styles.listWrapper}>
//         <FlatList
//           data={filteredExercises}
//           keyExtractor={item => item.id}
//           renderItem={({ item }) => (
//             <View style={styles.card}>
//               <Image source={{ uri: item.imageUrl }} style={styles.image} />
//               <Text style={styles.exerciseName}>{item.name}</Text>
//               <Text style={styles.exerciseIssue}>{item.issue}</Text>
//             </View>
//           )}
//           showsVerticalScrollIndicator={false}
//         />
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 10, backgroundColor: '#f0f8ff' },
//   header: {
//     backgroundColor: "#3867a1",
//     padding: 23,
//     alignItems: "center",
//     flexDirection: "row",
//     justifyContent: "center",
//     borderBottomLeftRadius: 20,
//     borderBottomRightRadius: 20,
//     shadowColor: "#000",
//   },
//   headerText: { fontSize: 20, fontWeight: "bold", color: "white" },
//   filterWrapper: { height: 50, justifyContent: 'center' }, // Ensures filter section is fixed
//   filterContainer: { flexDirection: 'row', alignItems: 'center' },
//   filterButton: { paddingVertical: 8, paddingHorizontal: 15, marginHorizontal: 5, backgroundColor: '#ccc', borderRadius: 10 },
//   activeFilter: { backgroundColor: '#3867a1' },
//   filterText: { color: 'white', fontWeight: 'bold' },
//   listWrapper: { flex: 1, marginTop: 10 }, // Separates filter from list
//   card: { backgroundColor: 'white', padding: 10, borderRadius: 10, marginBottom: 10, alignItems: 'center', width: '100%' },
//   image: { width: '100%', height: 150, borderRadius: 10 },
//   exerciseName: { fontSize: 18, fontWeight: 'bold', marginTop: 5 },
//   exerciseIssue: { fontSize: 14, color: 'gray' },
// });


import React, { useState } from "react";
import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import * as Speech from "expo-speech"; // Import Text-to-Speech
import { useGlobalContext } from "@/lib/global-provider";
import { logout } from "@/lib/appwrite";
import icons from "@/constants/icons";

const MedicalReport = () => {
  const { user, refetch } = useGlobalContext();
  const [isEditing, setIsEditing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [speechActive, setSpeechActive] = useState(false); // Track speech state
  let lastTap = 0;

  const [userData, setUserData] = useState({
    email: user?.email || "",
    phone: user?.phone || "",
    age: user?.age || "",
    gender: user?.gender || "",
    address: user?.address || "",
    bloodGroup: user?.bloodGroup || "",
    healthIssues: user?.healthIssues || "",
    allergies: user?.allergies || "",
    medications: user?.medications || "",
    pastSurgeries: user?.pastSurgeries || "",
  });

  const handleInputChange = (field, value) => {
    setUserData({ ...userData, [field]: value });
  };

  const handleSaveReport = () => {
    setIsEditing(false);
    Alert.alert("Success", "Your medical report has been updated.");
    refetch(userData);
  };

  const handleLogout = async () => {
    const result = await logout();
    if (result) {
      Alert.alert("Success", "Logged out successfully");
      refetch({});
    } else {
      Alert.alert("Error", "Failed to log out");
    }
  };

  // 🔥 Text-to-Speech Function
  const readMedicalReport = () => {
    const reportText = `
      User Medical Report for ${user?.name}. 
      Email: ${userData.email}. 
      Phone: ${userData.phone}. 
      Age: ${userData.age}. 
      Gender: ${userData.gender}. 
      Address: ${userData.address}. 
      Blood Group: ${userData.bloodGroup}. 
      Health Issues: ${userData.healthIssues}. 
      Allergies: ${userData.allergies}. 
      Medications: ${userData.medications}. 
      Past Surgeries: ${userData.pastSurgeries}.
    `;

    if (speechActive) {
      Speech.stop();
      setSpeechActive(false);
    } else {
      Speech.speak(reportText, { rate: 1.0, pitch: 1.0 });
      setSpeechActive(true);
    }
  };

  // 🔥 Detect Double Tap to Start/Stop Speech
  const handleDoubleTap = () => {
    const now = Date.now();
    if (now - lastTap < 300) {
      // If tapped twice within 300ms
      readMedicalReport();
    }
    lastTap = now;
  };

  return (
    <TouchableWithoutFeedback onPress={handleDoubleTap}>
      <SafeAreaView style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollViewContent}>
          <View style={styles.header}>
            <Text style={styles.headerText}>User Medical Report</Text>
            <TouchableOpacity onPress={() => setIsEditing(!isEditing)}>
              <Image source={icons.edit} style={styles.editIcon} />
            </TouchableOpacity>
          </View>

          <View style={styles.profileContainer}>
            <View style={styles.avatarContainer}>
              <Image source={{ uri: user?.avatar }} style={styles.avatar} />
              <Text style={styles.profileName}>{user?.name}</Text>
            </View>
          </View>

          {/* Personal Details */}
          <View style={styles.detailsContainer}>
            <Text style={styles.sectionHeader}>Personal Details</Text>

            {Object.entries(userData).map(([key, value]) => (
              <View key={key} style={styles.detailsRow}>
                <Text style={styles.label}>{key.replace(/([A-Z])/g, " $1").trim()}:</Text>
                <TextInput
                  style={[styles.input, isEditing ? styles.inputEditable : null]}
                  value={value}
                  onChangeText={(text) => handleInputChange(key, text)}
                  editable={isEditing}
                  multiline={key === "address" || key.includes("health")}
                />
              </View>
            ))}
          </View>

          {isEditing && (
            <TouchableOpacity style={styles.saveButton} onPress={handleSaveReport}>
              <Text style={styles.saveButtonText}>Save Medical Report</Text>
            </TouchableOpacity>
          )}

          {/* Logout Section */}
          <View style={styles.logoutContainer}>
            <SettingsItem icon={icons.logout} title="Logout" showArrow={false} onPress={handleLogout} />
          </View>
        </ScrollView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

// Reusable Settings Item Component
interface SettingsItemProps {
  icon: ImageSourcePropType;
  title: string;
  onPress?: () => void;
  showArrow?: boolean;
}

const SettingsItem: React.FC<SettingsItemProps> = ({ icon, title, onPress, showArrow = true }) => (
  <TouchableOpacity onPress={onPress} style={styles.settingsItem}>
    <View style={styles.iconTextContainer}>
      <Image source={icon} style={styles.icon} />
      <Text style={styles.text}>{title}</Text>
    </View>
    {showArrow && <Image source={icons.rightArrow} style={styles.arrow} />}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white", marginBottom: 50 },
  scrollViewContent: { paddingBottom: 32, paddingHorizontal: 28 },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 20 },
  headerText: { fontSize: 24, fontWeight: "bold" },
  editIcon: { width: 24, height: 24 },
  profileContainer: { alignItems: "center", marginTop: 20 },
  avatar: { width: 120, height: 120, borderRadius: 60 },
  profileName: { fontSize: 22, fontWeight: "bold", marginTop: 10 },
  detailsContainer: { marginTop: 20 },
  sectionHeader: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
  detailsRow: { flexDirection: "row", alignItems: "center", marginBottom: 12 },
  label: { fontSize: 16, fontWeight: "bold", flex: 1 },
  input: {
    flex: 2,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 8,
  },
  logoutText: { color: "red" },
  settingsItem: { flexDirection: "row", justifyContent: "space-between", paddingVertical: 12 },
  iconTextContainer: { flexDirection: "row", alignItems: "center", gap: 12 },
  icon: { width: 24, height: 24 },
  text: { fontSize: 18, fontWeight: "600", color: "#212121" },
  arrow: { width: 20, height: 20 },
  inputEditable: { backgroundColor: "#ffffff", borderColor: "#007AFF" },
  saveButton: { backgroundColor: "#007AFF", padding: 12, borderRadius: 8, alignItems: "center", marginTop: 20 },
  saveButtonText: { color: "white", fontSize: 16, fontWeight: "bold" },
  settingsContainer: { marginTop: 30 },
  logoutContainer: { flexDirection: "column", marginTop: 20, paddingTop: 20, borderTopWidth: 1, borderColor: "#E0E0E0", marginBottom: 50 },
  logoutText: { color: "red" },
});

export default MedicalReport;
