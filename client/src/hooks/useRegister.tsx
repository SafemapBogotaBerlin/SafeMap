import React, { useState, useEffect } from "react";
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { auth } from "../firebase.config";

export default function useRegister() {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");

  const [displayNameValid, setDisplayNameValid] = useState(false);
  const [emailValid, setEmailValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  const [verifyPasswordValid, setVerifyPasswordValid] = useState(false);

  const handleRegister = async () => {
    if (!(displayNameValid && emailValid && passwordValid && verifyPasswordValid)) {
      alert("Missing fields!");
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
    handleShowErrors();
  }, [displayName, emailValid, passwordValid, verifyPassword]);

  return {
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
  };
}
