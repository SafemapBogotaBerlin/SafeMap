import { useState } from "react";

import { StyleSheet, Text, View } from "react-native";
import Private from "./src/navigation/Private";
import Public from "./src/navigation/Public";
import { NavigationContainer } from "@react-navigation/native";

export default function App() {
  const [user, setUser] = useState(false);
  return (
    <View style={styles.container}>
      <NavigationContainer>{user ? <Private /> : <Public />}</NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
