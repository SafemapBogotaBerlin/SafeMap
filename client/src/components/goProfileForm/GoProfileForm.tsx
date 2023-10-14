import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { styles } from './style';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../redux/store';
import { useNavigation } from '@react-navigation/native';
import { toggleForm, whatShouldBeOpenedChange } from '../../redux/home';

const GoProfileForm = () => {
  const userData = useSelector((state: RootState) => state.auth.userData);
  const navigation = useNavigation();
  const dispatch: AppDispatch = useDispatch();

  const handleGotoSubmit = async () => {
    dispatch(toggleForm(false));
    dispatch(whatShouldBeOpenedChange(''));

    navigation.navigate('Profile');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.userInfoText}>{userData.name}</Text>
      <Text style={styles.userInfoText}>{userData.email}</Text>
      <TouchableOpacity onPress={handleGotoSubmit} style={styles.button}>
        <Text style={styles.buttonText}>Profile and statistics</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Log-out</Text>
      </TouchableOpacity>
    </View>
  );
};

export default GoProfileForm;
