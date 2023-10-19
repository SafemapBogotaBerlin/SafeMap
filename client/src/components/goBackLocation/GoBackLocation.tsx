import React, { useState } from 'react';
import { Coordinates } from '../../types';
import { View, TouchableOpacity } from 'react-native';
import { styles } from './style';
import { RootState } from '../../redux/store';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useMap } from '../../context/MapContext';

export default function GoBackLocation() {
  const [buttonOpen, setButtonOpen] = useState<boolean>(false);
  const userLocation: Coordinates | null = useSelector(
    (state: RootState) => state.home.userLocation
  );

  const mapRef = useMap();
  const handleButtonClick = () => {
    setButtonOpen(true);

    if (mapRef.current) {
      mapRef.current.animateToRegion(
        {
          latitude: userLocation.latitude,
          longitude: userLocation.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        },
        1500
      );
      setTimeout(() => {
        setButtonOpen(false);
      }, 1550);
    }
  };
  return (
    <View style={styles.nearMeContainer}>
      <TouchableOpacity onPress={handleButtonClick}>
        <View style={styles.circle}>
          {buttonOpen ? (
            <Icon name='navigation-variant' size={40} color='#2ee153' />
          ) : (
            <Icon name='navigation-variant-outline' size={40} color='#2ee153' />
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
}
