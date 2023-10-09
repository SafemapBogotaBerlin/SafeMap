import { auth } from "@/firebase.config";
import { firebaseServices } from "@/services/firebase";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { UserCredential, signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";

export default function useLogin() {
  const [email, setEmail] = useState("camilomafioly@gmail.com");
  const [password, setPassword] = useState("x30011");

  const verifyFields = () => {
    if (!/^\w+[\+\.\w-]*@([\w-]+\.)*\w+[\w-]*\.([a-z]{2,4}|\d+)$/i.test(email)) {
      alert("not a valid Email");
      return false;
    }
    if (password === "") {
      alert("password field is empty");
      return false;
    }
    return true;
  };

  const login = async () => {
    try {
      if (!verifyFields()) {
        return;
      }
      const userCredential: UserCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      if (user) {
        if (user.emailVerified) {
          alert("Successfully logged in!");
        } else {
          alert("Please verify your email before logging in.");
        }
      }

      let userData = await firebaseServices.getUserData(user.uid);
      if (!userData) {
        alert("user not found");
        return;
      }
      console.log("user data", userData);
      //Todo set redux user data
    } catch (error) {
      console.log(error);
    }
  };

  return { setEmail, setPassword, login };
}
