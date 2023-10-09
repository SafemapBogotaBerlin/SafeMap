import React, { useState } from 'react';
import { Image, View, Alert, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { styles } from './style';
import { RootState, AppDispatch } from '../../redux/store';
import { addPoint } from '../../redux/Home';
import { useDispatch, useSelector } from 'react-redux';
import ModalForm from '../../components/addPointForm/ModalForm'; // Import the ModalForm component

export default function Home() {
  const [isModalVisible, setModalVisible] = useState(false);
  const [formData, setFormData] = useState({ latitude: 0, longitude: 0 });

  const handleMapLongPress = (event) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    const newPoint: { latitude: number; longitude: number } = {
      latitude,
      longitude,
    };
    setModalVisible(true);
    dispatch(addPoint(newPoint));
  };
  const handleSubmit = () => {
    // Perform form validation if needed
    // Call the onSubmit function with form data
    // For example, onSubmit(latitude, longitude);
  };

  const hotpoints = useSelector((state: RootState) => state.home.hotpoints);
  const dispatch: AppDispatch = useDispatch();

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
        onLongPress={handleMapLongPress}
      >
        {hotpoints.map((point, index) => (
          <Marker
            key={index}
            coordinate={point}
            title={`Marker ${index + 1}`}
            description={`Latitude: ${point.latitude}, Longitude: ${point.longitude}`}
          />
        ))}
      </MapView>
      <ModalForm
        isVisible={isModalVisible}
        onClose={() => setModalVisible(false)}
        onSubmit={() => handleSubmit()}
      />

      <View style={[styles.buttonContainer, { left: 0 }]}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => Alert.alert('Notifications Button')}
        >
          <Image
            source={require('../../../assets/hamburger.png')}
            style={styles.icon}
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
