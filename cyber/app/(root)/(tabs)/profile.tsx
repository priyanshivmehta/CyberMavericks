import {
    Alert,
    Image,
    SafeAreaView,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
  } from "react-native";
  
  import icons from "@/constants/icons"; 
  
  const user = {
    name: "John Doe",
    avatar: "https://via.placeholder.com/150",
    email: "john.doe@example.com",
    phone: "+1 234 567 890",
    age: "25",
    dob: "15 June 1998",
  };
  
  const settings = [
    { icon: icons.calendar, title: "My Bookings" },
    { icon: icons.wallet, title: "Payments" },
    { icon: icons.wallet, title: "Settings" },
    { icon: icons.wallet, title: "Help & Support" },
  ];
  
  interface SettingsItemProps {
    icon: any;
    title: string;
    textStyle?: string;
  }

  const SettingsItem = ({ icon, title, textStyle }: SettingsItemProps) => (
      <TouchableOpacity className="flex flex-row items-center justify-between py-3">
        <View className="flex flex-row items-center gap-3">
          <Image source={icon} className="size-6" />
          <Text className={`text-lg font-rubik-medium text-black-300 ${textStyle}`}>{title}</Text>
        </View>
        <Image source={icons.rightArrow} className="size-5" />
      </TouchableOpacity>
    );
  
  const Profile = () => {
    return (
      <SafeAreaView className="h-full bg-white">
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerClassName="pb-32 px-7"
        >
          {/* Header */}
          <View className="flex flex-row items-center justify-between mt-5">
            <Text className="text-xl font-rubik-bold">Profile</Text>
            <Image source={icons.bell} className="size-5" />
          </View>
  
          {/* Profile Image & Name */}
          <View className="flex flex-row justify-center mt-5">
            <View className="flex flex-col items-center relative mt-5">
              <Image
                source={{ uri: user.avatar }}
                className="size-44 rounded-full"
              />
              <TouchableOpacity className="absolute bottom-11 right-2">
                <Image source={icons.edit} className="size-9" />
              </TouchableOpacity>
              <Text className="text-2xl font-rubik-bold mt-2">{user.name}</Text>
            </View>
          </View>
  
          {/* Details Card */}
          <View className="bg-white p-5 rounded-lg shadow-md mt-8">
            {(["email", "phone", "age", "dob"] as (keyof typeof user)[]).map((field, index) => (
              <View
                key={index}
                className={`flex-row justify-between items-center py-4 ${
                  index !== 3 ? "border-b border-gray-300" : ""
                }`}
              >
                <Text className="text-lg text-gray-600 capitalize font-medium">
                  {field}
                </Text>
                <View className="flex-row items-center">
                  <Text className="text-lg text-gray-900 font-semibold">
                    {user[field]}
                  </Text>
                  <TouchableOpacity className="ml-3">
                    <Image source={icons.edit} className="size-6" />
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
  
          {/* Settings Options */}
          <View className="flex flex-col mt-10">
            {settings.map((item, index) => (
              <SettingsItem key={index} {...item} />
            ))}
          </View>
  
          {/* Logout Option (Static) */}
          <View className="flex flex-col border-t mt-5 pt-5 border-primary-200">
            <SettingsItem
              icon={icons.logout}
              title="Logout"
              textStyle="text-danger"
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  };
  
  export default Profile;
  