import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useEffect, useRef } from "react";
import { CreateReview, Home, MyReviews, RestaurantDetail, Restaurants } from "@screens/index";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

const BaseApp = ({onReady}: {onReady: VoidFunction}) => {
  const navTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: '#121212',
    },
  };
  return (
    <NavigationContainer onReady={onReady} theme={navTheme}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name={"Home"} component={Home} />
        <Stack.Screen name={"RestaurantDetail"} component={RestaurantDetail} />
        <Stack.Screen name={"CreateReview"} component={CreateReview} />
        <Stack.Screen name={"Restaurants"} component={Restaurants} />
        <Stack.Screen name={"MyReviews"} component={MyReviews} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default BaseApp;
