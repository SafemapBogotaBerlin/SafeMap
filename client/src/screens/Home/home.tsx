import React from 'react';
import { Image, View, Alert, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { styles } from './style';

export default function Home() {
  const defaultPoints = [
    { latitude: 19.532608, longitude: -99.53209 },
    { latitude: 19.632608, longitude: -99.73209 },
    { latitude: 19.732608, longitude: -99.03 },
  ];

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 19.432608,
          longitude: -99.133209,
          latitudeDelta: 0.222,
          longitudeDelta: 0.1421,
        }}
      >
        {defaultPoints.map((point, index) => (
          <Marker
            key={index}
            coordinate={point}
            title={`Marker ${index + 1}`}
            description={`Latitude: ${point.latitude}, Longitude: ${point.longitude}`}
          />
        ))}
      </MapView>

      <View style={[styles.buttonContainer, { left: 0 }]}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => Alert.alert('Notifications Button')}
        >
          <Image
            source={require('../../../assets/hamburger.png')} // Provide the path to your PNG image
            style={styles.icon} // Set the desired width and height for your button
          />
        </TouchableOpacity>
      </View>

      <View style={[styles.buttonContainer, { right: 0 }]}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => Alert.alert('History Button')}
        >
          <Image
            source={require('../../../assets/hamburger.png')}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}
