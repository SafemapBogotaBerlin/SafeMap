import React from "react";
import {
  Text,
  SafeAreaView,
  TextInput,
  Button,
  Keyboard,
  TouchableWithoutFeedback,
  Image
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { routes } from "../../routes/public";
import useLogin from "../../hooks/UseLogin";
import { styles } from "./style";
import { NavigationProp } from '../../types/index';


export default function Login() {
  const { setEmail, setPassword, login } = useLogin();

  const navigation:NavigationProp  = useNavigation();

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={styles.container}>
        <Image source={require('../../../assets/safemapLogo.png')} style={styles.logo} />
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


