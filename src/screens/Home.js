import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
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
                    onPress={() => handleLocation()}
                  >
                    <IconsSolid.MapPinIcon color="gray" size="20" />
                    <Text className="text-black ml-2">Selangor, Malaysia</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          )}
        </View>

        <View className="flex justify-around items-center flex-1 mx-4 mb-2">
          <Text className="text-white font-bold text-2xl text-center">
            Selangor,
            <Text className="text-lg font-semibold text-gray-300">
              Malaysia
            </Text>
          </Text>
          <Image
            source={require("../../assets/partlycloudy.png")}
            className="w-52 h-52"
          />
          <View className="space-y-2">
            <Text className="text-center text-white text-6xl font-bold ml-5">
              24&#730;
            </Text>
            <Text className="text-center text-xl text-white tracking-widest">
              Partly Cloudy
            </Text>
          </View>

          <View className="flex-row space-x-10 mx-4">
            <View className="flex-row space-x-2 items-center">
              <Image
                source={require("../../assets/icons/sun.png")}
                className="h-6 w-6"
              />
              <Text className="text-white font-semibold text-base">22 Km</Text>
            </View>
            <View className="flex-row space-x-2 items-center">
              <Image
                source={require("../../assets/icons/drop.png")}
                className="h-6 w-6"
              />
              <Text className="text-white font-semibold text-base">22 Km</Text>
            </View>
            <View className="flex-row space-x-2 items-center">
              <Image
                source={require("../../assets/icons/sun.png")}
                className="h-6 w-6"
              />
              <Text className="text-white font-semibold text-base">22 Km</Text>
            </View>
          </View>
        </View>

        <View className="mb-4 space-y-3">
          <View className="flex-row items-center mx-5 space-x-2">
            <Icons.CalendarIcon color="white" size="22" />
            <Text className="text-base text-white">Daily Forecast</Text>
          </View>
          <ScrollView
            horizontal
            contentContainerStyle={{ paddingHorizontal: 15 }}
            showsHorizontalScrollIndicator={false}
          >
            <View
              className="flex justify-center items-center w-24 rounded-3xl  space-y-1 py-3 mr-4"
              style={{ backgroundColor: theme.bgWhite(0.15) }}
            >
              <Image
                source={require("../../assets/partlycloudy.png")}
                className="h-11 w-11"
              />
              <Text className="text-white">Monday</Text>
              <Text className="text-white text-xl font-semibold">16&#730;</Text>
            </View>
            <View
              className="flex justify-center items-center w-24 rounded-3xl  space-y-1 py-3 mr-4"
              style={{ backgroundColor: theme.bgWhite(0.15) }}
            >
              <Image
                source={require("../../assets/partlycloudy.png")}
                className="h-11 w-11"
              />
              <Text className="text-white">Monday</Text>
              <Text className="text-white text-xl font-semibold">16&#730;</Text>
            </View>
            <View
              className="flex justify-center items-center w-24 rounded-3xl  space-y-1 py-3 mr-4"
              style={{ backgroundColor: theme.bgWhite(0.15) }}
            >
              <Image
                source={require("../../assets/partlycloudy.png")}
                className="h-11 w-11"
              />
              <Text className="text-white">Monday</Text>
              <Text className="text-white text-xl font-semibold">16&#730;</Text>
            </View>
            <View
              className="flex justify-center items-center w-24 rounded-3xl  space-y-1 py-3 mr-4"
              style={{ backgroundColor: theme.bgWhite(0.15) }}
            >
              <Image
                source={require("../../assets/partlycloudy.png")}
                className="h-11 w-11"
              />
              <Text className="text-white">Monday</Text>
              <Text className="text-white text-xl font-semibold">16&#730;</Text>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default Home;
