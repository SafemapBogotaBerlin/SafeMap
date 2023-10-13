import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { styles } from './style';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { useNavigation } from '@react-navigation/native';


const GoProfileForm = () => {
  const userData = useSelector((state: RootState) => state.auth.userData);
  const navigation = useNavigation();

  const handleGotoSubmit = async () => {
    
    navigation.navigate('Profile');

  };

  return (
    <View style={styles.container}>
      <Text style={styles.userInfoText}>{userData.name}</Text>
      <Text style={styles.userInfoText}>{userData.email}</Text>
      <TouchableOpacity onPress={handleGotoSubmit} style={styles.button}>
        <Text style={styles.buttonText}>Profile and statistics</Text>
      </TouchableOpacity>
    </View>
  );
};

export default GoProfileForm;
