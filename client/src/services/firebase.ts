import { firestore } from "../firebase.config";
import { User } from "firebase/auth";
import { RegisterInitData, UserData } from "../types/index";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  doc,
  updateDoc
} from "@firebase/firestore";

const USER_DATA = collection(firestore, "userData");

export const firebaseServices = {
  async initUser(user: User, registerFields: RegisterInitData) {
    try {
      const userData = {
        id: user.uid,
        email: user.email,
        created: user.metadata.creationTime,
        name: registerFields.displayName,
      };
      await addDoc(USER_DATA, userData);
    } catch (error) {
      console.log(error);
    }
  },

  async getUserData(uid: string) {
    try {
      const q = query(USER_DATA, where("id", "==", uid));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        console.log("user not found");
        return;
      }
        const userDoc = querySnapshot.docs[0];
        return userDoc.data();
    } catch (error) {
      console.log(error);
      return;
    }
  },

  async updateUserData(uid: string, newData: UserData) {
    try {
      const q = query(USER_DATA, where("id", "==", uid));
      const querySnapshot = await getDocs(q);
      console.log(querySnapshot.docs[0].id)
      if (!querySnapshot.empty) {
        const userDocRef = doc(USER_DATA, querySnapshot.docs[0].id); 
        await updateDoc(userDocRef, newData);
        console.log("User data updated successfully");
      } else {
        console.log('User not found');
      }
    } catch (error) {
      console.error("Error updating user data: ", error);
    }
  }
};
