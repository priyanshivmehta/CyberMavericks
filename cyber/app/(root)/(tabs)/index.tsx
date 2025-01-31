import {
      ActivityIndicator,
      FlatList,
      Image,
      Text,
      TouchableOpacity,
      View,
    } from "react-native";
    import { useEffect } from "react";
    import { router, useLocalSearchParams } from "expo-router";
    import { SafeAreaView } from "react-native-safe-area-context";
    
    import icons from "@/constants/icons";
    
    import Search from "@/components/Search";
    import Filters from "@/components/Filters";
    import NoResults from "@/components/NoResults";
    import { Card, FeaturedCard } from "@/components/Cards";
    
    import { useAppwrite } from "@/lib/useAppwrite";
    import { useGlobalContext } from "@/lib/global-provider";
    import { getLatestProperties, getProperties } from "@/lib/appwrite";
    
    const Home = () => {
      const { user } = useGlobalContext();
    
      const params = useLocalSearchParams<{ query?: string; filter?: string }>();
    
      const { data: latestProperties, loading: latestPropertiesLoading } =
        useAppwrite({
          fn: getLatestProperties,
        });
    
      const {
        data: properties,
        refetch,
        loading,
      } = useAppwrite({
        fn: getProperties,
        params: {
          filter: params.filter!,
          query: params.query!,
          limit: 6,
        },
        skip: true,
      });
    
      useEffect(() => {
        refetch({
          filter: params.filter!,
          query: params.query!,
          limit: 6,
        });
      }, [params.filter, params.query]);
    
      const handleCardPress = (id: string) => router.push(`/properties/${id}`);
    
      return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
          <FlatList
            data={properties}
            numColumns={2}
            renderItem={({ item }) => (
              <Card item={item} onPress={() => handleCardPress(item.$id)} />
            )}
            keyExtractor={(item) => item.$id}
            contentContainerStyle={{ paddingBottom: 32 }}
            columnWrapperStyle={{ flexDirection: "row", gap: 10, paddingHorizontal: 16 }}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
              loading ? (
                <ActivityIndicator size="large" color="#00A3FF" style={{ marginTop: 20 }} />
              ) : (
                <NoResults />
              )
            }
            ListHeaderComponent={() => (
              <View style={{ paddingHorizontal: 16 }}>
                <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 20 }}>
                  <View style={{ flexDirection: "row" }}>
                    <Image
                      source={{ uri: user?.avatar }}
                      style={{ width: 48, height: 48, borderRadius: 24 }}
                    />
                    <View style={{ flexDirection: "column", justifyContent: "center", marginLeft: 8 }}>
                      <Text style={{ fontSize: 12, color: "#757575" }}>Good Morning</Text>
                      <Text style={{ fontSize: 16, fontWeight: "500", color: "#4F4F4F" }}>
                        {user?.name}
                      </Text>
                    </View>
                  </View>
                  <Image source={icons.bell} style={{ width: 24, height: 24 }} />
                </View>
    
                <Search />
    
                <View style={{ marginVertical: 20 }}>
                  <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                    <Text style={{ fontSize: 20, fontWeight: "700", color: "#4F4F4F" }}>Featured</Text>
                    <TouchableOpacity>
                      <Text style={{ fontSize: 14, fontWeight: "700", color: "#00A3FF" }}>See all</Text>
                    </TouchableOpacity>
                  </View>
    
                  {latestPropertiesLoading ? (
                    <ActivityIndicator size="large" color="#00A3FF" />
                  ) : !latestProperties || latestProperties.length === 0 ? (
                    <NoResults />
                  ) : (
                    <FlatList
                      data={latestProperties}
                      renderItem={({ item }) => (
                        <FeaturedCard item={item} onPress={() => handleCardPress(item.$id)} />
                      )}
                      keyExtractor={(item) => item.$id}
                      horizontal
                      showsHorizontalScrollIndicator={false}
                      contentContainerStyle={{ flexDirection: "row", gap: 10, marginTop: 20 }}
                    />
                  )}
                </View>
    
                <View style={{ marginTop: 20 }}>
                  <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                    <Text style={{ fontSize: 20, fontWeight: "700", color: "#4F4F4F" }}>
                      Our Recommendation
                    </Text>
                    <TouchableOpacity>
                      <Text style={{ fontSize: 14, fontWeight: "700", color: "#00A3FF" }}>See all</Text>
                    </TouchableOpacity>
                  </View>
    
                  <Filters />
                </View>
              </View>
            )}
          />
        </SafeAreaView>
      );
    };
    
    export default Home;
    