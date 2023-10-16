import React, {useState} from "react";
import { View } from "react-native";
import Private from "../../navigation/Private";
import Public from "../../navigation/Public";
import { NavigationContainer } from "@react-navigation/native";
import { RootState } from "../../redux/store";
import { useSelector, useDispatch } from "react-redux";
import { styles } from "./style";
import { auth } from "../../firebase.config";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { authenticate, setUserData } from "../../redux/session/index";
import { firebaseServices } from "../../services/firebase";
import Spinner from "../spinner/Spinner";

export default function Navigation() {
  const authenticated = useSelector((state: RootState) => state.auth.authenticated);
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState<boolean>(false)

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (!user) return;
      try {
        const token = await user.getIdToken();
        if (!token) return;
        const userData = await firebaseServices.getUserData(user.uid);
        if (!userData) return;
        dispatch(setUserData(userData));
        dispatch(authenticate());
      } catch (error) {
      }
    });
    setIsLoaded(true)
  }, []);

  return (
    <View style={styles.container}>
      {isLoaded ? (
      <NavigationContainer>{authenticated ? <Private /> : <Public />}</NavigationContainer>
      ): (<Spinner />)}
    </View>
  );
}
