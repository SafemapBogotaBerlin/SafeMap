import { auth } from "../firebase.config";
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import RegisterInput from "../components/registerInput/RegisterInput";
import useRegister from "../hooks/useRegister";

export default function Register() {
  const {
    displayName,
    setDisplayName,
    email,
    setEmail,
    password,
    setPassword,
    verifyPassword,
    setVerifyPassword,
    handleRegister,
    displayNameValid,
    emailValid,
    passwordValid,
    verifyPasswordValid,
  } = useRegister();

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <RegisterInput
          value={displayName}
          onChangeText={setDisplayName}
          placeholder="Name"
          valid={displayNameValid}
          errorMessage="Invalid display name"
        />

        <RegisterInput
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          valid={emailValid}
          errorMessage="Invalid email address"
        />

        <RegisterInput
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
          valid={passwordValid}
          errorMessage="Password too short"
          secret
        />

        <RegisterInput
          value={verifyPassword}
          onChangeText={setVerifyPassword}
          placeholder="Verify Password"
          valid={verifyPasswordValid}
          errorMessage="Passwords do not match"
          secret
        />
        <Button title="Register" onPress={handleRegister} />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
    backgroundColor: "#f5f5f5",
  },
});
