import React from "react";
import { Tabs } from "expo-router";
import { Image, ImageSourcePropType, Text, View, TouchableOpacity } from "react-native";
import icons from "@/constants/icons"; // Ensure you have the updated icons file

const TabIcon = ({
  focused,
  icon,
  title,
  isChatbot = false,
  onPress,
}: {
  focused: boolean;
  icon: ImageSourcePropType;
  title: string;
  isChatbot?: boolean;
  onPress?: () => void;
}) => (
  <View style={{ flex: 1, marginTop: isChatbot ? -10 : 3, alignItems: "center", width: 70 }}>
    {isChatbot ? (
      <TouchableOpacity onPress={onPress} style={styles.chatbotButton}>
        <Image source={icon} style={styles.chatbotIcon} />
      </TouchableOpacity>
    ) : (
      <>
        <Image
          source={icon}
          tintColor={focused ? "#3867a1" : "#666876"}
          resizeMode="contain"
          style={{ width: 26, height: 26 }}
        />
        <Text
          style={{
            color: focused ? "#3867a1" : "#666876",
            fontSize: 11,
            textAlign: "center",
            marginTop: 4,
            fontFamily: focused ? "Rubik-Medium" : "Rubik-Regular",
            width: "100%",
          }}
        >
          {title}
        </Text>
      </>
    )}
  </View>
);

const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "white",
          position: "absolute",
          borderTopColor: "#0061FF1A",
          borderTopWidth: 1,
          minHeight: 65,
          paddingBottom: 5,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ focused }) => <TabIcon focused={focused} icon={icons.home} title="Home" />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Health",
          headerShown: false,
          tabBarIcon: ({ focused }) => <TabIcon focused={focused} icon={icons.search} title="Health" />,
        }}
      />
      <Tabs.Screen
        name="more"
        options={{
          title: "Maps",
          headerShown: false,
          tabBarIcon: ({ focused }) => <TabIcon focused={focused} icon={icons.location} title="Maps" />,
        }}
      />
      <Tabs.Screen
        name="Chatbot"
        options={{
          title: "Chatbot",
          headerShown: false,
          tabBarIcon: ({ focused }) => <TabIcon focused={focused} icon={icons.chat} title="Chatbot" />,
        }}
      />
      <Tabs.Screen
        name="Helpline"
        options={{
          title: "Helpline",
          headerShown: false,
          tabBarIcon: ({ focused }) => <TabIcon focused={focused} icon={icons.info} title="Helpline" />, // Updated to use call icon
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ focused }) => <TabIcon focused={focused} icon={icons.person} title="Profile" />,
        }}
      />
    </Tabs>
  );
};

const styles = {
  chatbotButton: {
    width: 55,
    height: 55,
    backgroundColor: "#0061FF",
    borderRadius: 30,
    alignItems: "center" as "center",
    justifyContent: "center" as "center",
    shadowColor: "black",
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  chatbotIcon: {
    width: 28,
    height: 28,
    tintColor: "white",
  },
};

export default TabsLayout;
