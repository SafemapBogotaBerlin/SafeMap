import React, { useState, useEffect } from 'react';
import MapView, {
  LongPressEvent,
  Marker,
  Callout,
  Circle,
} from 'react-native-maps';
import { AppDispatch, RootState } from '../../redux/store';
import {
  selectPoint,
  toggleForm,
  whatShouldBeOpenedChange,
  updateUserLocation,
  setIsInfoOpened,
} from '../../redux/home';
import { Image, Text } from 'react-native';
import * as Location from 'expo-location';
import { Coordinates } from '../../types';
import { useDispatch, useSelector } from 'react-redux';
import { styles } from './style';
import { geolocationHelper } from '../../helpers/geolocation';
import { useLocationData } from '../../hooks/UseLocationData';
import { hotpoints } from '../../services/pointsSubscription';
import UseNotifications from '../../hooks/UseNotification';
import { formatTimeDifference } from '../../services/formatTime';
import Spinner from '../spinner/Spinner';
import { useMap } from '../../context/MapContext';

export default function Map() {
  const [visibleRegion, setVisibleRegion] = useState<Region | null>(null);
  const [distanceMoved, setDistanceMoved] = useState<number>(0);
  const [originalCoordinate, setOriginalCoordinate] = useState<Coordinates>({
    latitude: 0,
    longitude: 0,
  });
  const [isTimeToCheck, setIsTimeToCheck] = useState<boolean>(false);
  const [isDanger, setIsDanger] = useState<boolean>(false);
  const { newData, location } = useLocationData(hotpoints);
  const [justNotified, setJustNotified] = useState<boolean>(false);
  const { pushNotification } = UseNotifications();
  const mapRef = useMap();
  const [markerDescription, setMarkerDescription] = useState<string>('');
  const userLocation: Coordinates | null = useSelector(
    (state: RootState) => state.home.userLocation
  );

  type Region = {
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  };

  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {}, [mapRef]);

  const getMarkerIcon = (dangerType: string) => {
    switch (dangerType) {
      case 'Police':
        return require('../../../assets/police-car.png');
      case 'Massshooting':
        return require('../../../assets/gun.png');
      default:
        return require('../../../assets/thief.png');
    }
  };

  const handleMapLongPress = (event: LongPressEvent) => {
    dispatch(toggleForm(true));
    dispatch(whatShouldBeOpenedChange('pointadd'));
    const { latitude, longitude } = event.nativeEvent.coordinate;
    const newPoint: Coordinates = {
      latitude,
      longitude,
    };
    dispatch(selectPoint(newPoint));
  };
  const notify = () => {
    if (justNotified) return;
    setJustNotified(true);
    pushNotification('MapSafe', 'You are in danger zone!');
    setTimeout(() => {
      setJustNotified(false);
    }, 30000);
  };

  const handleOutsideFormPress = () => {
    dispatch(toggleForm(false));
    dispatch(whatShouldBeOpenedChange(''));
    dispatch(setIsInfoOpened(false));
  };
  const handleDeviceMoved = (event) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    dispatch(updateUserLocation({ latitude, longitude }));
    userLocation &&
      setDistanceMoved(
        geolocationHelper.getDistance(userLocation, originalCoordinate)
      );
    console.log('what distance? = ' + distanceMoved + 'check?' + isTimeToCheck);
    if (distanceMoved < 100) setIsTimeToCheck(false);
    else setIsTimeToCheck(true);

    if (isTimeToCheck) {
      handleDangerAlert();
      setIsTimeToCheck(false);
    }
  };

  const handleDangerAlert = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    Location.watchPositionAsync(
      { timeInterval: 10000, accuracy: 3 },
      (location) => {
        const userLocation: Coordinates = {
          longitude: location.coords.longitude,
          latitude: location.coords.latitude,
        };

        setOriginalCoordinate(userLocation);
        const dangerPoints = geolocationHelper.findPointsWithDanger(
          newData,
          userLocation
        );
        if (!isDanger && Object.keys(dangerPoints).length !== 0) {
          notify();
          setIsDanger(true);
          setIsTimeToCheck(false);
        } else if (isDanger && Object.keys(dangerPoints).length === 0) {
          setIsDanger(false);
          setIsTimeToCheck(false);
        } else if (isDanger && Object.keys(dangerPoints).length !== 0) {
          setIsDanger(true);
          setIsTimeToCheck(false);
        }
      }
    );

    if (status !== 'granted') {
      console.log('Permission to access location was denied');
      return;
    }
  };

  const handleMarkerClick = (point) => {
    const newDescription: string = formatTimeDifference(point.added_dttm);

    setMarkerDescription(newDescription);
  };
  return (
    <>
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
          userInterfaceStyle={'dark'}
          onUserLocationChange={(event) => handleDeviceMoved(event)}
          ref={mapRef}
          onRegionChangeComplete={(region) => setVisibleRegion(region)}
        >
          {newData &&
            Object.values(newData)
              .filter((point) =>
                geolocationHelper.isMarkerVisible(
                  point.coordinates,
                  visibleRegion
                )
              )
              .map((point, index) => (
                <React.Fragment key={index}>
                  <Marker
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
                  <Circle
                    center={point.coordinates}
                    radius={100}
                    strokeWidth={2}
                    strokeColor='#FF0000AA'
                    fillColor='rgba(255,0,0,0.2)'
                    lineDashPattern={[5, 5]}
                  />
                </React.Fragment>
              ))}
        </MapView>
      ) : (
        <>
          <Spinner />
        </>
      )}
    </>
  );
}
