import React from "react";
import {
  Text,
  SafeAreaView,
  TextInput,
  Button,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { routes } from "../../routes/public";
import useLogin from "../../hooks/UseLogin";
import { styles } from "./style";

export default function Login() {
  const { setEmail, setPassword, login } = useLogin();

  const navigation: NavigationProp<any> = useNavigation();

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Safe map</Text>
        <TextInput style={styles.input} placeholder="Email" onChangeText={setEmail} />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          onChangeText={setPassword}
        />
        <Button title="Login" onPress={login} />
        <Button title="Register" onPress={() => navigation.navigate(routes.register)} />
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}


