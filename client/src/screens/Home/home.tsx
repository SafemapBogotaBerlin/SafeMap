import React, { useState, useEffect, useRef } from 'react';
import { onValue } from 'firebase/database';
import { Coordinates, DataObject } from '../../types';
import {
  Image,
  View,
  Alert,
  TouchableOpacity,
  Animated,
  Modal,
  Text
} from 'react-native';
import MapView, { LongPressEvent, Marker, Callout } from 'react-native-maps';
import { styles } from './style';
import { AppDispatch } from '../../redux/store';
import { selectPoint } from '../../redux/home';
import { hotpoints } from '../../services/pointsSubscription';
import { useDispatch } from 'react-redux';
import BottomForm from '../../components/bottomSheet/BottomForm';
import * as Location from 'expo-location';
import { geolocationHelper } from '../../helpers/geolocation';
import { formatTimeDifference } from '../../services/formatTime';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function Home() {

  const [newData, setNewData] = useState<DataObject>({});
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  //const [errorMsg, setErrorMsg] = useState(null);
  const [isPoint, setIsPoint] = useState(false);
  const dispatch: AppDispatch = useDispatch();


  const [userLocation, setUserLocation] = useState<Coordinates | null>(null);
  const [buttonOpen, setButtonOpen] = useState<boolean>(false);

  const mapRef = useRef(null);

  const [markerDescription, setMarkerDescription] = useState<string>('');

  type Region = {
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  };

  const handleMarkerClick = (point) => {
    const newDescription: string = formatTimeDifference(
      JSON.parse(point.added_dttm)
    );
    setMarkerDescription(newDescription);
  };

  useEffect(() => {
    (async () => {
      onValue(hotpoints, (snapshot) => {
        const fetchedData: DataObject = snapshot.val();
        setNewData(fetchedData);
      });
      const { status } = await Location.requestForegroundPermissionsAsync();
      Location.watchPositionAsync(
        { timeInterval: 1000, accuracy: 3 },
        (location) => {
          const userLocation: Coordinates = {
            longitude: location.coords.longitude,
            latitude: location.coords.latitude,
          };
          Object.values(newData).forEach((marker) => {

            if (
              geolocationHelper.getDistance(userLocation, marker.coordinates) <=
              100
            ) {
              console.log('danger zone!!!!!'); //TODO notify user
            }
          });
          setLocation(location);
        }
      );
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);

  const handleProfileClick = (/*event: any*/) => {
    setIsFormOpen(true);
    setIsPoint(false);
  };

  const handleMapLongPress = (event: LongPressEvent) => {
    setIsFormOpen(true);
    setIsPoint(true);
    const { latitude, longitude } = event.nativeEvent.coordinate;
    const newPoint: Coordinates = {
      latitude,
      longitude,
    };
    dispatch(selectPoint(newPoint));
  };
  const slideAnimation = useRef(new Animated.Value(500)).current;

  const handleOutsideFormPress = () => {
    setIsFormOpen(false);
    setIsPoint(false);
  };

  const getMarkerIcon = (dangerType) => {
    switch (dangerType) {
      case 'Police':
        return require('../../../assets/police-car.png');
      case 'Massshooting':
        return require('../../../assets/gun.png');
      default:
        return require('../../../assets/thief.png');
    }
  };
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
    <View style={{ flex: 1 }}>
      {location?.coords ? (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
          onLongPress={handleMapLongPress}
          onPress={handleOutsideFormPress}
          showsUserLocation={true}
          userInterfaceStyle={'dark'} //TODO need user themes

          onUserLocationChange={(event) => {
            const { latitude, longitude } = event.nativeEvent.coordinate;
            setUserLocation({ latitude, longitude });
          }}
          ref={mapRef}
        >
          {Object.values(newData).map((point, index) => (
            <Marker
              key={index}
              coordinate={point.coordinates}
              onPress={() => handleMarkerClick(point)}
            >
              <Image
                source={getMarkerIcon(point.danger_type)}
                style={{ width: 40, height: 40 }}
              />

              <Callout style={styles.calloutContainer}>
                <Text style={styles.calloutTextIncidentType}>
                  {point.danger_type}
                </Text>
                <Text>{markerDescription}</Text>
              </Callout>
            </Marker>
          ))}
        </MapView>
      ) : (
        <></>
      )}
      <View>
        {isFormOpen && (
          <Modal transparent animationType='slide'>
            <TouchableOpacity onPress={handleOutsideFormPress}>
              <Animated.View
                style={{ transform: [{ translateY: slideAnimation }] }}
              >
                {isPoint ? (
                  <BottomForm fillType={'pointadd'} />
                ) : (
                  <BottomForm fillType={'profile'} />
                )}
              </Animated.View>
            </TouchableOpacity>
          </Modal>
        )}
      </View>

      <View style={[styles.buttonContainer, { left: 0 }]}>
        <TouchableOpacity style={styles.button} onPress={handleProfileClick}>
          <Image
            source={require('../../../assets/hamburger.png')}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.nearMeContainer}>
        <TouchableOpacity onPress={handleButtonClick}>
          <View style={styles.circle}>
            {buttonOpen ? (
              <Icon name='navigation-variant' size={40} color='#2ee153' />
            ) : (
              <Icon
                name='navigation-variant-outline'
                size={40}
                color='#2ee153'
              />
            )}
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}
