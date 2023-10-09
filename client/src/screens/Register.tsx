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

export default function Register() {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");

  const [displayNameValid, setDisplayNameValid] = useState(false);
  const [emailValid, setEmailValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  const [verifyPasswordValid, setVerifyPasswordValid] = useState(false);


  const handleRegister = async () => {
    if (!(displayNameValid && emailValid && passwordValid && verifyPasswordValid)){
        alert('Missing fields!')
        return;
    }
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        //TODO create userData in collection
        if (user) {
          await sendEmailVerification(user);
          alert("Verification email sent!");
        }
      } catch (error) {
        console.log(error);
      }


  };


  const handleShowErrors = () => {
    setDisplayNameValid(displayName.length > 2);
    setEmailValid(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email));
    setPasswordValid(password.length >= 6);
    setVerifyPasswordValid(password === verifyPassword);
  };

  useEffect(() => {
    handleShowErrors()
  }, [displayName, emailValid, passwordValid, verifyPassword])


  return (
    <TouchableWithoutFeedback onPress={()=>Keyboard.dismiss()}>
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
