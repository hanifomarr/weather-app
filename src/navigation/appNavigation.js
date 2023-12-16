import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import Home from "../screens/Home";

const AppStack = createNativeStackNavigator();

const AppNavigation = () => {
  return (
    <NavigationContainer>
      <AppStack.Navigator>
        <AppStack.Screen
          name="Home"
          options={{ headerShown: false }}
          component={Home}
        />
      </AppStack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
