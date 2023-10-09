import { auth } from "../firebase.config";
import React, { useState } from "react";
import {
  Text,
  SafeAreaView,
  TextInput,
  StyleSheet,
  Button,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { signInWithEmailAndPassword, UserCredential } from "firebase/auth";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { routes } from "../Routes/public";
import { login, loginFalse } from "../../redux/Login";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../redux/Login/store";
import { firebaseServices } from "../services/firebase";
import useLogin from "../hooks/useLogin";

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    marginBottom: 24,
    fontWeight: "bold",
  },
  input: {
    width: "100%",
    padding: 10,
    marginVertical: 8,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 4,
  },
});
