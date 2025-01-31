// import { Image, Text, View, StyleSheet, TouchableOpacity } from "react-native";
// import { Link } from 'expo-router';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import images from "@/constants/images";
// import icons from "@/constants/icons";
// import Search from "@/components/Search";
// import {Card, FeaturedCard} from "@/components/Cards";

// export default function Index() {
//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.innerContainer}>
//         <View style={styles.row}>
//           <View style={styles.profileContainer}>
//             <Image source={images.avatar} style={styles.avatar} />
//             <View style={styles.textContainer}>
//               <Text style={styles.greetingText}>Hello,</Text>
//               <Text style={styles.nameText}>John Doe</Text>
//             </View>
//             <Image source={icons.bell} style={styles.bellIcon} />
//           </View>
//         </View>
//         <Search />
//         <View style={styles.my5}>
//           <View style={styles.flexRow}>
//             <Text style={styles.featuredText}>Featured</Text>
//             <TouchableOpacity>
//               <Text style={styles.viewAllText}>View All</Text>
//             </TouchableOpacity>
//           </View>
//         </View>

//       <FeaturedCard />
//       <Card />
//       </View>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: 'white',
//     flex: 1,
//   },
//   innerContainer: {
//     paddingHorizontal: 20,
//   },
//   row: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     marginTop: 20,
//   },
//   profileContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   avatar: {
//     width: 48, // Adjust size as needed
//     height: 48, // Adjust size as needed
//     borderRadius: 24, // Half of width/height for circular image
//   },
//   textContainer: {
//     flexDirection: 'column',
//     alignItems: 'flex-start',
//     marginLeft: 8,
//     justifyContent: 'center',
//   },
//   greetingText: {
//     fontSize: 12, // Adjust size as needed
//     fontWeight: 'bold',
//     color: '#000', // Adjust color as needed
//   },
//   nameText: {
//     fontSize: 16, // Adjust size as needed
//     fontWeight: 'bold',
//     color: '#000', // Adjust color as needed
//   },
//   bellIcon: {
//     width: 24, // Adjust size as needed
//     height: 24, // Adjust size as needed
//   },
//   my5: {
//     marginVertical: 20,
//   },
//   flexRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   featuredText: {
//     fontSize: 20, // Adjust size as needed
//     fontWeight: 'bold',
//     color: '#000', // Adjust color as needed
//   },
//   viewAllText: {
//     fontSize: 14, // Adjust size as needed
//     color: '#007BFF', // Adjust color as needed for the link style
//   },
// });

import { View, Text} from 'react-native'
import React from 'react'

const Explore = () => {
    return (
        <View>
            <Text>Explore</Text>
        </View>
    )
}
export default Explore;

