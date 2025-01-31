import icons from "@/constants/icons";
import images from "@/constants/images";
import { Image, Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { Models } from "react-native-appwrite";

interface Props {
  item: Models.Document;
  onPress?: () => void;
}

export const FeaturedCard = ({ onPress }: Props) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.featuredCard}>
      <Image source={images.japan} style={styles.image} />
      <Image source={images.cardGradient} style={styles.gradient} />

      <View style={styles.ratingContainer}>
        <Image source={icons.star} style={styles.starIcon} />
        <Text style={styles.ratingText}>4.4</Text>
      </View>

      <View style={styles.detailsContainer}>
        <Text style={styles.title} numberOfLines={1}>
          Modern Apartment
        </Text>
        <Text style={styles.address} numberOfLines={1}>
          22 W 15th St, New York
        </Text>

        <View style={styles.priceContainer}>
          <Text style={styles.price}>$2,500</Text>
          <Image source={icons.heart} style={styles.heartIcon} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export const Card = ({ item, onPress }: Props) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.ratingBadge}>
        <Image source={icons.star} style={styles.smallStarIcon} />
        <Text style={styles.smallRatingText}>{item.rating}</Text>
      </View>

      <Image source={{ uri: item.image }} style={styles.cardImage} />

      <View style={styles.cardDetails}>
        <Text style={styles.cardTitle}>{item.name}</Text>
        <Text style={styles.cardAddress}>{item.address}</Text>

        <View style={styles.cardBottomRow}>
          <Text style={styles.cardPrice}>${item.price}</Text>
          <Image source={icons.heart} style={styles.smallHeartIcon} tintColor="#191D31" />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  featuredCard: {
    flexDirection: "column",
    alignItems: "flex-start",
    width: 240,
    height: 320,
    position: "relative",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 16,
  },
  gradient: {
    width: "100%",
    height: "100%",
    borderRadius: 16,
    position: "absolute",
    bottom: 0,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 50,
    position: "absolute",
    top: 20,
    right: 20,
  },
  starIcon: {
    width: 14,
    height: 14,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#FFA500",
    marginLeft: 6,
  },
  detailsContainer: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  address: {
    fontSize: 16,
    color: "white",
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  price: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  heartIcon: {
    width: 20,
    height: 20,
  },
  card: {
    flex: 1,
    width: "100%",
    marginTop: 16,
    padding: 12,
    borderRadius: 10,
    backgroundColor: "white",
    shadowColor: "black",
    shadowOpacity: 0.7,
    shadowRadius: 10,
    elevation: 5,
    position: "relative",
  },
  ratingBadge: {
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    top: 20,
    right: 20,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    padding: 6,
    borderRadius: 50,
    zIndex: 50,
  },
  smallStarIcon: {
    width: 10,
    height: 10,
  },
  smallRatingText: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#FFA500",
    marginLeft: 4,
  },
  cardImage: {
    width: "100%",
    height: 160,
    borderRadius: 10,
  },
  cardDetails: {
    marginTop: 8,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  cardAddress: {
    fontSize: 12,
    color: "#666",
  },
  cardBottomRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 8,
  },
  cardPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFA500",
  },
  smallHeartIcon: {
    width: 18,
    height: 18,
    marginRight: 8,
  },
});
