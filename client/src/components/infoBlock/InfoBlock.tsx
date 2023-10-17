import React from 'react';
import {View, Text, Image} from 'react-native';
import { styles } from './style';

const InfoBlock = () => (
  <View style={styles.container}>
    <View style={styles.topLogo}>
      <Image source={require('../../../assets/logo_main.png')} style={{width: 200, height: 50}} />
    </View>
    <View style={styles.title}>
      <Text style={styles.titleText}>This is your safety zone.</Text>
    </View>
    <View style={styles.infoBlock}>
      <Text style={styles.infoText}>🔘 Long hold on map to add point</Text>
      <Text style={styles.infoText}>↙️ Bottom-left to see your profile</Text>
      <Text style={styles.infoText}>↘️ Bottom-right to go to your location</Text>
      <Text style={styles.infoText}>🔴 Red circles - danger</Text>
      <Text style={styles.infoText}>🔵 Small blue circle - YOU</Text>
    </View>
  </View>
);

export default InfoBlock;