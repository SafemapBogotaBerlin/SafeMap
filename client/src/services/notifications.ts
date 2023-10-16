import { firestore } from "../firebase.config";
import { User } from "firebase/auth";
import { RegisterInitData, UserData } from "../types/index";
import { collection, addDoc, getDocs, query, where, doc, updateDoc } from "@firebase/firestore";

const USER_DATA = collection(firestore, "userData");

export const notifications = {
  async saveToken(uid: string, notificationToken: string) {
    try {
      const q = query(USER_DATA, where("id", "==", uid));
      const querySnapshot = await getDocs(q);
      console.log(querySnapshot.docs[0].id);
      if (querySnapshot.empty) {
        console.log("User not found");
        return false;
      }
      const userDocRef = doc(USER_DATA, querySnapshot.docs[0].id);
      await updateDoc(userDocRef, { notificationToken });
      console.log("Notification saved successfully");
    } catch (error) {
      console.error("Error updating user data: ", error);
    }
  },
};
