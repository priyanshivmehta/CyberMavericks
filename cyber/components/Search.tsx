import React, { useState } from "react";
import { View, TouchableOpacity, Image, TextInput, StyleSheet } from "react-native";
import { useDebouncedCallback } from "use-debounce";
import icons from "@/constants/icons";
import { useLocalSearchParams, router, usePathname } from "expo-router";

const Search = () => {
  const path = usePathname();
  const params = useLocalSearchParams<{ query?: string }>();
  const [search, setSearch] = useState(params.query || '');

  const debouncedSearch = useDebouncedCallback((text: string) => {
    router.setParams({ query: text });
  }, 500);

  const handleSearch = (text: string) => {
    setSearch(text);
    debouncedSearch(text);
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Image source={icons.search} style={styles.icon} />
        <TextInput
          value={search}
          onChangeText={handleSearch}
          placeholder="Search for anything"
          style={styles.textInput}
        />
      </View>

      <TouchableOpacity>
        <Image source={icons.filter} style={styles.icon} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 16, // Adjust padding as needed
    borderRadius: 8, // Adjust border radius as needed
    backgroundColor: '#F0F0F0', // Replace with your accent color
    borderColor: '#D1D1D1', // Replace with your primary color
    borderWidth: 1,
    marginTop: 20, // Adjust margin as needed
    paddingVertical: 8, // Adjust vertical padding as needed
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    zIndex: 50,
  },
  icon: {
    width: 20, // Adjust size as needed
    height: 20, // Adjust size as needed
  },
  textInput: {
    marginLeft: 8, // Adjust margin as needed
    flex: 1,
    fontSize: 14, // Adjust font size as needed
    color: '#333', // Replace with your text color
  },
});

export default Search;