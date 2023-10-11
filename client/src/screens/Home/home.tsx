import React, { useState, useEffect } from "react";
import { onValue } from "firebase/database";
import { Coordinates, DataObject } from "types/point";
import { Image, View, Alert, TouchableOpacity, Animated } from "react-native";
import MapView, { Marker, Circle } from "react-native-maps";
import { styles } from "./style";
import { RootState, AppDispatch } from "../../redux/store";
import { selectPoint } from "../../redux/Home";
import { hotpoints } from '../../../services/pointsSubscription';
import { useDispatch, useSelector } from "react-redux";
import ModalForm from "../../components/addPointForm/ModalForm";
import * as Location from "expo-location";
import { coordinates } from "../../../../server/models/pointsCold";

import { geolocationHelper } from "../../helpers/geolocation";
import { Point } from "../../types";

export default function Home() {
  const [isModalVisible, setModalVisible] = useState<boolean>(false);
  const [newData, setNewData] = useState<DataObject>({})
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [heading, setHeading] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const dispatch: AppDispatch = useDispatch();


  useEffect(() => {
    (async () => {
      onValue(hotpoints, (snapshot) => {
      const fetchedData: DataObject = snapshot.val();
      setNewData(fetchedData);
      });
      let { status } = await Location.requestForegroundPermissionsAsync();
      Location.watchPositionAsync({ timeInterval: 1000, accuracy: 3 }, (location) => {
        let userLocation: Point = {
          longitude: location.coords.longitude,
          latitude: location.coords.latitude,
        };
        /*hotpoints*/Object.values(newData).forEach((marker) => {
          if (geolocationHelper.getDistance(userLocation, marker.coordinates) <= 100) {
            console.log("danger zone!!!!!"); //TODO notify user
          }
        });
        setLocation(location);
      });
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      console.log(location);
      setLocation(location);
    })();
  }, []);

  const handleMapLongPress = (event: any) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    const newPoint: Coordinates = {
      latitude,
      longitude,
    };
    setModalVisible(true);
    dispatch(selectPoint(newPoint));
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
          showsUserLocation={true}
          userInterfaceStyle={"dark"} //TODO need user themes
          onUserLocationChange={() => {}}
        >
          {/*hotpoints.map((point, index) => (
            <Marker
              key={index}
              coordinate={point}
              title={`Marker ${index + 1}`}
              description={`Latitude: ${point.latitude}, Longitude: ${point.longitude}`}
            />
          ))*/}
          {Object.values(newData).map((point, index) => (
          <Marker
            key={index}
            coordinate={point.coordinates}
            title={`Marker ${index + 1}`}
            description={`Latitude: ${point.coordinates.latitude}, Longitude: ${point.coordinates.longitude}`}
          />
        ))}
        </MapView>
      ) : (
        <></>
      )}

      <ModalForm isVisible={isModalVisible} onClose={() => setModalVisible(false)} />


      <View style={[styles.buttonContainer, { left: 0 }]}>
        <TouchableOpacity style={styles.button} onPress={() => Alert.alert("Notifications Button")}>
          <Image source={require("../../../assets/hamburger.png")} style={styles.icon} />
        </TouchableOpacity>
      </View>

      <View style={[styles.buttonContainer, { right: 0 }]}>
        <TouchableOpacity style={styles.button} onPress={() => Alert.alert("History Button")}>
          <Image source={require("../../../assets/hamburger.png")} style={styles.icon} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
