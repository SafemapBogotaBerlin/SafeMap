import { View } from "react-native";
import Private from "../../navigation/Private";
import Public from "../../navigation/Public";
import { NavigationContainer } from "@react-navigation/native";
import { RootState } from "../../redux/session/store";
import { useSelector, useDispatch } from "react-redux";
import { styles } from "./style";
import { auth } from "../../firebase.config";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { authenticate } from "../../redux/session";

export default function Navigation() {
  const authenticated = useSelector((state: RootState) => state.auth.authenticated);
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (!user) return;
      try {
        const token = await user.getIdToken();
        if (!token) return;
        dispatch(authenticate());
      } catch (error) {}
    });
  }, []);

  return (
    <View style={styles.container}>
      <NavigationContainer>{authenticated ? <Private /> : <Public />}</NavigationContainer>
    </View>
  );
}
