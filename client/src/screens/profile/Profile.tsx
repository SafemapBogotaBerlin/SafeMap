import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/redux/store';
import { View, Text, Image, TouchableOpacity, TextInput } from 'react-native';
import { styles } from './style';
import { updateUserName, updateUserEmail } from '../../redux/session/';
import { firebaseServices } from '../../services/firebase';



export default function Profile() {

  const userData = useSelector((state: RootState) => state.auth.userData);
  const logo = require('../../../assets/logo_main.png');
  const dispatch: AppDispatch = useDispatch();
  const [name, setName] = useState<string>(userData.name);
  const [email, setEmail] = useState<string>(userData.email);

  useEffect(() => {
    console.log('profile uses effect2')
  }, []);

  const handleNameChange = (newName:string) => {
    setName(newName);
  }

  const handleEmailChange = (newEmail:string) => {
    setEmail(newEmail);
  }

  const handleUpdateProfile = () => {
    dispatch(updateUserName(name));
    dispatch(updateUserEmail(email));
    firebaseServices.updateUserData(userData.id, userData);
  };

  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo}></Image>
      <View style={styles.profileBlock}>
        <View style={styles.userDataContainer}>
          <TextInput style={styles.userDataField} placeholder={userData.name} placeholderTextColor="lightgray" onChangeText={handleNameChange} />
          <TextInput style={styles.userDataField} placeholder={userData.email} placeholderTextColor="lightgray" onChangeText={handleEmailChange} />
          <Text style={styles.userDataField}>Bogota +15km</Text>
        </View>
        <TouchableOpacity onPress={handleUpdateProfile} style={styles.button}>
          <Text style={styles.buttonText}>Update profile</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.statContainer}>
        <View style={styles.statsBlock}>
          <Text></Text>
          <View style={styles.verticalLine}></View>
          <Text></Text>
        </View>
        <View style={styles.statsBlock}>
          <Text></Text>
          <View style={styles.verticalLine}></View>
          <Text></Text>
        </View>
      </View>
    </View>
  );
}
