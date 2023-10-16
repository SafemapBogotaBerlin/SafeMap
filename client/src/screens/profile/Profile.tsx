import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/redux/store';
import { View, Text, Image, TouchableOpacity, KeyboardAvoidingView, 
  TextInput, ScrollView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { styles } from './style';
import { updateUserName } from '../../redux/session/';
import { firebaseServices } from '../../services/firebase';

import { getTotalPointsCold } from '../../services/apiService';
import { getActivePoints } from '../../services/pointsSubscription';




export default function Profile() {

  const userData = useSelector((state: RootState) => state.auth.userData);
  const logo = require('../../../assets/logo_main.png');
  const dispatch: AppDispatch = useDispatch();
  const [name, setName] = useState<string>(userData.name);

  const [email, setEmail] = useState<string>(userData.email);
  const [totalPoints, setTotalPoints] = useState<number>(0);
  const [activePoints, setActivePoints] = useState<number>(0);

  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const total = await getTotalPointsCold();
        const active = await getActivePoints();
        setTotalPoints(total);
        setActivePoints(active); 
      } catch (error) {
        console.error('Error getting data ', error);
      }
    };

    fetchData();
  }, []);

  const handleNameChange = (newName:string) => {
    setName(newName);
  }
  //not now
 /*  const handleEmailChange = (newEmail:string) => {
    setEmail(newEmail);
  } */

  const handleUpdateProfile = () => {
    dispatch(updateUserName(name));
    //NO updating email for now
    //dispatch(updateUserEmail(email));
    firebaseServices.updateUserData(userData.id, userData); // before redux with if
  };

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      keyboardShouldPersistTaps="handled" 
    >
      <KeyboardAvoidingView
        behavior={"padding"} //- needs to be tested 
        style={{ flex: 1 }}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} >
          <View style={styles.container}>
            <Image source={logo} style={styles.logo}></Image>
            <View style={styles.profileBlock}>
              <View style={styles.userDataContainer}>
                <TextInput style={styles.userDataPlaceHolder} placeholder={`✎ ${userData.name}`} placeholderTextColor="#0C5A1E" onChangeText={handleNameChange} />
                <Text style={styles.userDataField}>{userData.email}</Text>
                <Text style={styles.userDataField}>Bogota +15km</Text>
              </View>
              <TouchableOpacity onPress={handleUpdateProfile} style={styles.button}>
                <Text style={styles.buttonText}>Update profile</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.statContainer}>
              <View style={styles.statsBlock}>
              <View>
                  <Text style={styles.statsNumber}>3</Text>
                  <Text style={styles.statsCell}>My points</Text>
                </View>
                <View style={styles.verticalLine}></View>
                <View>
                  <Text style={styles.statsNumber}>6</Text>
                  <Text style={styles.statsCell}>My dangers</Text>
                </View>
              </View>
              <View style={styles.statsBlock}>
                <View>
                  <Text style={styles.statsNumber}>{activePoints}</Text>
                  <Text style={styles.statsCell}>Active points</Text>
                </View>
                <View style={styles.verticalLine}></View>
                <View>
                  <Text style={styles.statsNumber}>0</Text>
                  <Text style={styles.statsCell}>Dangers last 24h</Text>
                </View>
                <View style={styles.verticalLine}></View>
                <View>
                  <Text style={styles.statsNumber}>{totalPoints}</Text>
                  <Text style={styles.statsCell}>Points total</Text>
                </View>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}
