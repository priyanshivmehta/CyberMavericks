import { View, Text, Image, StyleSheet } from "react-native";

import images from "@/constants/images";
import icons from "@/constants/icons";
import { Models } from "react-native-appwrite";

interface Props {
  item: Models.Document;
}

const Comment = ({ item }: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={{ uri: item.avatar }} style={styles.avatar} />
        <Text style={styles.name}>{item.name}</Text>
      </View>

      <Text style={styles.review}>{item.review}</Text>

      <View style={styles.footer}>
        <View style={styles.likesContainer}>
          <Image source={icons.heart} style={styles.heartIcon} tintColor={"#0061FF"} />
          <Text style={styles.likesCount}>120</Text>
        </View>
        <Text style={styles.date}>{new Date(item.$createdAt).toDateString()}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
  },
  name: {
    fontSize: 16,
    color: "#333",
    fontWeight: "bold",
    marginLeft: 12,
  },
  review: {
    fontSize: 16,
    color: "#666",
    marginTop: 8,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginTop: 16,
  },
  likesContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  heartIcon: {
    width: 20,
    height: 20,
  },
  likesCount: {
    fontSize: 14,
    color: "#333",
    fontWeight: "500",
    marginLeft: 8,
  },
  date: {
    fontSize: 14,
    color: "#999",
  },
});

export default Comment;
