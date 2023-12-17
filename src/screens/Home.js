import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  Image,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import * as Icons from "react-native-heroicons/outline";
import * as IconsSolid from "react-native-heroicons/solid";
import { theme } from "../utils/theme";

const Home = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [location, setLocation] = useState([1, 2, 3]);

  const handleLocation = (loc) => {
    console.log(loc);
  };

  return (
    <View className="flex-1 relative">
      <StatusBar style="light" />
      <Image
        blurRadius={70}
        className="absolute h-full w-full"
        source={require("../../assets/bg.png")}
      />
      <SafeAreaView className="flex flex-1">
        <View style={{ height: "7%" }} className="mx-4 relative z-50">
          <View
            className="flex-row justify-end items-center rounded-full"
            style={{
              backgroundColor: showSearch ? theme.bgWhite(0.3) : "transparent",
            }}
          >
            {showSearch ? (
              <TextInput
                placeholder="Search city"
                placeholderTextColor={"lightgrey"}
                className="pl-6 h-10 pb-1 flex-1 text-base text-white"
              />
            ) : null}

            <TouchableOpacity
              onPress={() => setShowSearch(!showSearch)}
              style={{ backgroundColor: theme.bgWhite(0.2) }}
              className="rounded-full p-3 m-1"
            >
              <Icons.MagnifyingGlassIcon color="white" size="25" />
            </TouchableOpacity>
          </View>
          {location.length > 0 && showSearch && (
            <View className=" absolute w-full bg-gray-300 rounded-3xl top-16">
              {location.map((loc, index) => {
                let showBorder = index + 1 != location.length;
                let borderClass = showBorder
                  ? "border-b-2 border-b-gray-400"
                  : "";
                return (
                  <TouchableOpacity
                    key={index}
                    className={`flex-row item-center border-0 py-4 px-4 mb-1 ${borderClass}`}
                    onPress={() => handleLocation(loc)}
                  >
                    <IconsSolid.MapPinIcon color="gray" size="20" />
                    <Text className="text-black ml-2">Selangor, Malaysia</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          )}
        </View>
      </SafeAreaView>
    </View>
  );
};

export default Home;
