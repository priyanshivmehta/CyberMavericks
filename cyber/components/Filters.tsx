import React, { useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { Text, ScrollView, TouchableOpacity, StyleSheet, View } from "react-native";

import { categories } from "@/constants/data";

const Filters = () => {
  const params = useLocalSearchParams<{ filter?: string }>();
  const [selectedCategory, setSelectedCategory] = useState(
    params.filter || "All"
  );

  const handleCategoryPress = (category: string) => {
    if (selectedCategory === category) {
      setSelectedCategory("");
      router.setParams({ filter: "" });
      return;
    }

    setSelectedCategory(category);
    router.setParams({ filter: category });
  };

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.scrollView}
    >
      {categories.map((item, index) => (
        <TouchableOpacity
          onPress={() => handleCategoryPress(item.category)}
          key={index}
          style={[
            styles.categoryButton,
            selectedCategory === item.category
              ? styles.selectedCategory
              : styles.unselectedCategory,
          ]}
        >
          <Text
            style={[
              styles.categoryText,
              selectedCategory === item.category
                ? styles.selectedText
                : styles.unselectedText,
            ]}
          >
            {item.title}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    marginTop: 10,
    marginBottom: 5,
  },
  categoryButton: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 10,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
  },
  selectedCategory: {
    backgroundColor: "#4A90E2",
    borderColor: "#4A90E2",
  },
  unselectedCategory: {
    backgroundColor: "#F0F0F0",
    borderColor: "#CCCCCC",
  },
  categoryText: {
    fontSize: 14,
  },
  selectedText: {
    color: "white",
    fontWeight: "bold",
  },
  unselectedText: {
    color: "#333",
  },
});

export default Filters;
