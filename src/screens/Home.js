import { StatusBar } from "expo-status-bar";
import React, { useCallback, useEffect, useState } from "react";
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
import * as Progress from "react-native-progress";
import { theme } from "../utils/theme";
import { fetchForecast, fetchLocation } from "../api/weather";
import { debounce } from "lodash";
import { weatherImages } from "../utils/constant";
import { getData, storeData } from "../utils/asyncStorage";

const Home = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [locations, setLocations] = useState([]);
  const [weather, setWeather] = useState({});
  const [loading, setLoading] = useState(true);

  const handleLocation = (loc) => {
    setLocations([]);
    setLoading(true);
    fetchForecast({
      city_name: loc.name,
      num_days: 7,
    }).then((data) => {
      setShowSearch(false);
      setWeather(data);
      setLoading(false);
      storeData("city", loc.name);
    });
  };

  const handleSearch = (value) => {
    if (value.length > 2) {
      fetchLocation({ city_name: value }).then((data) => {
        setLocations(data);
      });
    }
  };

  useEffect(() => {
    fetchInitialWeatherData();
  }, []);

  const fetchInitialWeatherData = async () => {
    const city = await getData("city");
    let city_name = "malaysia";
    if (city) {
      city_name = city;
    }

    fetchForecast({
      city_name,
      num_days: 7,
    }).then((data) => {
      setWeather(data);
      setLoading(false);
    });
  };
  const handleSearchDebounce = useCallback(debounce(handleSearch, 1200), []);
  const { forecast, current, location } = weather;

  return (
    <View className="flex-1 relative">
      <StatusBar style="light" />
      <Image
        blurRadius={70}
        className="absolute h-full w-full"
        source={require("../../assets/bg.png")}
      />
      {loading ? (
        <View className="flex flex-1 justify-center items-center">
          <Progress.CircleSnail size={100} thickness={10} color="#0bb3b2" />
        </View>
      ) : (
        <SafeAreaView className="flex flex-1">
          <View style={{ height: "7%" }} className="mx-4 relative z-50">
            <View
              className="flex-row justify-end items-center rounded-full"
              style={{
                backgroundColor: showSearch
                  ? theme.bgWhite(0.3)
                  : "transparent",
              }}
            >
              {showSearch ? (
                <TextInput
                  onChangeText={handleSearchDebounce}
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
            {locations.length > 0 && showSearch && (
              <View className=" absolute w-full bg-gray-300 rounded-3xl top-16">
                {locations.map((loc, index) => {
                  let showBorder = index + 1 != locations.length;
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
                      <Text className="text-black ml-2">
                        {loc.name}, {loc.country}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            )}
          </View>

          <View className="flex justify-around items-center flex-1 mx-4 mb-2">
            <Text className="text-white font-bold text-2xl text-center">
              {location?.name},
              <Text className="text-lg font-semibold text-gray-300">
                {" " + location?.country}
              </Text>
            </Text>
            <Image
              source={weatherImages[current?.condition.code]}
              className="w-52 h-52"
            />
            <View className="space-y-2">
              <Text className="text-center text-white text-6xl font-bold ml-5">
                {current?.temp_c}&#730;
              </Text>
              <Text className="text-center text-xl text-white tracking-widest">
                {current?.condition.text}
              </Text>
            </View>

            <View className="flex-row space-x-10 mx-4">
              <View className="flex-row space-x-2 items-center">
                <Image
                  source={require("../../assets/icons/wind.png")}
                  className="h-6 w-6"
                />
                <Text className="text-white font-semibold text-base">
                  {current?.wind_kph} km
                </Text>
              </View>
              <View className="flex-row space-x-2 items-center">
                <Image
                  source={require("../../assets/icons/drop.png")}
                  className="h-6 w-6"
                />
                <Text className="text-white font-semibold text-base">
                  {current?.humidity} %
                </Text>
              </View>
              <View className="flex-row space-x-2 items-center">
                <Image
                  source={require("../../assets/icons/sun.png")}
                  className="h-6 w-6"
                />
                <Text className="text-white font-semibold text-base">
                  {current?.uv} UV
                </Text>
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
              {forecast &&
                forecast.forecastday.map((day, index) => {
                  const date = new Date(day.date);
                  let dayName = date.toLocaleDateString(`en-US`, {
                    weekday: "long",
                  });
                  dayName = dayName.split(",")[0];

                  return (
                    <View
                      key={index}
                      className="flex justify-center items-center w-24 rounded-3xl  space-y-1 py-3 mr-4"
                      style={{ backgroundColor: theme.bgWhite(0.15) }}
                    >
                      <Image
                        source={weatherImages[day.day.condition.code]}
                        className="h-11 w-11"
                      />
                      <Text className="text-white">{dayName}</Text>
                      <Text className="text-white text-xl font-semibold">
                        {day.day.avgtemp_c}&#730;
                      </Text>
                    </View>
                  );
                })}
            </ScrollView>
          </View>
        </SafeAreaView>
      )}
    </View>
  );
};

export default Home;
