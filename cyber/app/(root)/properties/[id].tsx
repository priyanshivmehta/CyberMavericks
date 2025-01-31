import {
    FlatList,
    Image,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
    Dimensions,
    Platform,
    StyleSheet,
  } from "react-native";
  import { router, useLocalSearchParams } from "expo-router";
  
  import icons from "@/constants/icons";
  import images from "@/constants/images";
  import Comment from "@/components/Comment";
  import { facilities } from "@/constants/data";
  
  import { useAppwrite } from "@/lib/useAppwrite";
  import { getPropertyById } from "@/lib/appwrite";
  
  const Property = () => {
    const { id } = useLocalSearchParams<{ id?: string }>();
    const windowHeight = Dimensions.get("window").height;
  
    const { data: property } = useAppwrite({
      fn: getPropertyById,
      params: {
        id: id!,
      },
    });
  
    return (
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
          <View style={[styles.imageContainer, { height: windowHeight / 2 }]}>
            <Image source={{ uri: property?.image }} style={styles.image} resizeMode="cover" />
            <Image source={images.whiteGradient} style={styles.gradientImage} />
  
            <View style={[styles.header, { top: Platform.OS === "ios" ? 70 : 20 }]}>
              <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                <Image source={icons.backArrow} style={styles.icon} />
              </TouchableOpacity>
              <View style={styles.iconRow}>
                <Image source={icons.heart} style={styles.icon} />
                <Image source={icons.send} style={styles.icon} />
              </View>
            </View>
          </View>
  
          <View style={styles.contentContainer}>
            <Text style={styles.title}>{property?.name}</Text>
            <View style={styles.typeRow}>
              <View style={styles.typeBadge}>
                <Text style={styles.typeText}>{property?.type}</Text>
              </View>
              <View style={styles.ratingRow}>
                <Image source={icons.star} style={styles.icon} />
                <Text style={styles.ratingText}>{property?.rating} ({property?.reviews.length} reviews)</Text>
              </View>
            </View>
  
            <View style={styles.infoRow}>
              <View style={styles.infoItem}>
                <Image source={icons.bed} style={styles.infoIcon} />
                <Text style={styles.infoText}>{property?.bedrooms} Beds</Text>
              </View>
              <View style={styles.infoItem}>
                <Image source={icons.bath} style={styles.infoIcon} />
                <Text style={styles.infoText}>{property?.bathrooms} Baths</Text>
              </View>
              <View style={styles.infoItem}>
                <Image source={icons.area} style={styles.infoIcon} />
                <Text style={styles.infoText}>{property?.area} sqft</Text>
              </View>
            </View>
  
            <Text style={styles.sectionTitle}>Overview</Text>
            <Text style={styles.description}>{property?.description}</Text>
          </View>
        </ScrollView>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "white",
    },
    scrollContainer: {
      paddingBottom: 32,
    },
    imageContainer: {
      position: "relative",
      width: "100%",
    },
    image: {
      width: "100%",
      height: "100%",
    },
    gradientImage: {
      position: "absolute",
      top: 0,
      width: "100%",
      zIndex: 40,
    },
    header: {
      position: "absolute",
      left: 20,
      right: 20,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      zIndex: 50,
    },
    backButton: {
      backgroundColor: "#E3E3E3",
      borderRadius: 50,
      width: 44,
      height: 44,
      alignItems: "center",
      justifyContent: "center",
    },
    icon: {
      width: 24,
      height: 24,
    },
    iconRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
    },
    contentContainer: {
      paddingHorizontal: 20,
      marginTop: 20,
    },
    title: {
      fontSize: 24,
      fontWeight: "bold",
    },
    typeRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
      marginTop: 10,
    },
    typeBadge: {
      backgroundColor: "#E3E3E3",
      paddingVertical: 5,
      paddingHorizontal: 15,
      borderRadius: 20,
    },
    typeText: {
      fontSize: 12,
      fontWeight: "bold",
      color: "#555",
    },
    ratingRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 5,
    },
    ratingText: {
      fontSize: 14,
      color: "#333",
    },
    infoRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 20,
    },
    infoItem: {
      flexDirection: "row",
      alignItems: "center",
      gap: 5,
    },
    infoIcon: {
      width: 20,
      height: 20,
    },
    infoText: {
      fontSize: 14,
      color: "#333",
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: "bold",
      marginTop: 20,
    },
    description: {
      fontSize: 14,
      color: "#666",
      marginTop: 5,
    },
  });
  
  export default Property;
  