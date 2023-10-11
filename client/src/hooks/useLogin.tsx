import React, { useState } from "react";
import { auth } from "../firebase.config";
import { firebaseServices } from "../services/firebase";
import { UserCredential, signInWithEmailAndPassword, User } from "firebase/auth";
import { UserData } from '../types/index';
import { useDispatch } from 'react-redux';
import { authenticate, setUserData } from "../redux/session";


export default function useLogin() {
  const [email, setEmail] = useState("camilomafioly@gmail.com");
  const [password, setPassword] = useState("x30011");
  const dispatch = useDispatch()
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
      if (!userIsVerified) return;



      let userData = await firebaseServices.getUserData(user.uid);
      if (!userData) {
        alert("user not found");
        return;
      }
      console.log("user data", userData as UserData);
      dispatch(setUserData(userData))
      dispatch(authenticate())
    } catch (error) {
      console.log(error);
    }
  };

  const userIsVerified = (user: User) =>{
    if (user) {
        if (user.emailVerified) {
          alert("Successfully logged in!");
        } else {
          alert("Please verify your email before logging in.");
        }
      }
  }

  return { setEmail, setPassword, login };
}
