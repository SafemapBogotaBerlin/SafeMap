import React from 'react';
import { AppDispatch } from '../../redux/store';
import { toggleForm, whatShouldBeOpenedChange } from '../../redux/home';
import { Image, View, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { styles } from './style';

export default function Map() {
  const dispatch: AppDispatch = useDispatch();
  const handleProfileClick = () => {
    dispatch(toggleForm(true));
    dispatch(whatShouldBeOpenedChange('profile'));
  };
  return (
    <View style={[styles.buttonContainer, { left: 0 }]}>
      <TouchableOpacity style={styles.button} onPress={handleProfileClick}>
        <Image
          source={require('../../../assets/hamburger.png')}
          style={styles.icon}
        />
      </TouchableOpacity>
    </View>
  );
}
