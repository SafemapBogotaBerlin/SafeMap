import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../screens/Login";

const Stack = createNativeStackNavigator();

export default function Public() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Login} />
    </Stack.Navigator>
  );
}
