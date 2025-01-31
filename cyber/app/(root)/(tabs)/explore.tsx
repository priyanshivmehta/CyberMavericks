import {
    ActivityIndicator,
    FlatList,
    Image,
    SafeAreaView,
    Text,
    TouchableOpacity,
    View,
    StyleSheet,
  } from "react-native";
  import { useEffect } from "react";
  import { router, useLocalSearchParams } from "expo-router";
  
  import icons from "@/constants/icons";
  import Search from "@/components/Search";
  import { Card } from "@/components/Cards";
  import Filters from "@/components/Filters";
  import NoResults from "@/components/NoResults";
  
  import { getProperties } from "@/lib/appwrite";
  import { useAppwrite } from "@/lib/useAppwrite";
  
  const Explore = () => {
    const params = useLocalSearchParams<{ query?: string; filter?: string }>();
  
    const {
      data: properties,
      refetch,
      loading,
    } = useAppwrite({
      fn: getProperties,
      params: {
        filter: params.filter!,
        query: params.query!,
      },
      skip: true,
    });
  
    useEffect(() => {
      refetch({
        filter: params.filter!,
        query: params.query!,
      });
    }, [params.filter, params.query]);
  
    const handleCardPress = (id: string) => router.push(`/properties/${id}`);
  
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          data={properties}
          numColumns={2}
          renderItem={({ item }) => (
            <Card item={item} onPress={() => handleCardPress(item.$id)} />
          )}
          keyExtractor={(item) => item.$id}
          contentContainerStyle={styles.flatListContent}
          columnWrapperStyle={styles.columnWrapper}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            loading ? (
              <ActivityIndicator size="large" color="#4A90E2" style={styles.loader} />
            ) : (
              <NoResults />
            )
          }
          ListHeaderComponent={() => (
            <View style={styles.headerContainer}>
              <View style={styles.headerTop}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                  <Image source={icons.backArrow} style={styles.icon} />
                </TouchableOpacity>
  
                <Text style={styles.headerTitle}>Search for Your Ideal Home</Text>
                <Image source={icons.bell} style={styles.bellIcon} />
              </View>
  
              <Search />
  
              <View style={styles.filterContainer}>
                <Filters />
                <Text style={styles.propertyCount}>Found {properties?.length} Properties</Text>
              </View>
            </View>
          )}
        />
      </SafeAreaView>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#FFFFFF",
    },
    flatListContent: {
      paddingBottom: 32,
    },
    columnWrapper: {
      gap: 10,
      paddingHorizontal: 10,
    },
    loader: {
      marginTop: 20,
    },
    headerContainer: {
      paddingHorizontal: 20,
    },
    headerTop: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginTop: 20,
    },
    backButton: {
      flexDirection: "row",
      backgroundColor: "#E1E8F0",
      borderRadius: 50,
      width: 44,
      height: 44,
      alignItems: "center",
      justifyContent: "center",
    },
    icon: {
      width: 20,
      height: 20,
    },
    headerTitle: {
      fontSize: 16,
      fontWeight: "600",
      color: "#333333",
      textAlign: "center",
      flex: 1,
      marginRight: 20,
    },
    bellIcon: {
      width: 24,
      height: 24,
    },
    filterContainer: {
      marginTop: 20,
    },
    propertyCount: {
      fontSize: 20,
      fontWeight: "bold",
      color: "#333333",
      marginTop: 10,
    },
  });
  
  export default Explore;