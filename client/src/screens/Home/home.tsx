import React, { useState, useEffect, useRef } from "react";
import { onValue } from "firebase/database";
import { Coordinates, DataObject } from "../../types";
import { Image, View, Alert, TouchableOpacity, Animated, Modal } from "react-native";
import MapView, { Marker, Circle } from "react-native-maps";
import { styles } from "./style";
import { AppDispatch } from "../../redux/store";
import { selectPoint } from "../../redux/home";
import { hotpoints } from '../../services/pointsSubscription';
import { useDispatch } from "react-redux";
import BottomForm from "../../components/bottomSheet/BottomForm";
import * as Location from "expo-location";
import { geolocationHelper } from "../../helpers/geolocation";

export default function Home() {
  const [newData, setNewData] = useState<DataObject>({})
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [isPoint, setIsPoint] = useState(false)
  const dispatch: AppDispatch = useDispatch();
 


  useEffect(() => {
    (async () => {
      onValue(hotpoints, (snapshot) => {
      const fetchedData: DataObject = snapshot.val();
      console.log('here - use effect')
      setNewData(fetchedData);
      });
      let { status } = await Location.requestForegroundPermissionsAsync();
      Location.watchPositionAsync({ timeInterval: 1000, accuracy: 3 }, (location) => {
        let userLocation: Coordinates = {
          longitude: location.coords.longitude,
          latitude: location.coords.latitude,
        };
        Object.values(newData).forEach((marker) => {
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
      setLocation(location);
    })();
  }, []);
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);

  const handleProfileClick = (event: any) => {
    setIsFormOpen(true)
    setIsPoint(false)
  };


  const handleMapLongPress = (event: any) => {
    setIsFormOpen(true)
    setIsPoint(true)
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
    setIsPoint(false)
    }
  
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
            onLongPress={
              handleMapLongPress
              
            }
            onPress={handleOutsideFormPress}
            
            showsUserLocation={true}
            userInterfaceStyle={"dark"} //TODO need user themes
            onUserLocationChange={() => {}}
          >
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
        <View>
        {isFormOpen &&  
          <Modal transparent animationType='slide'>
            <TouchableOpacity onPress={handleOutsideFormPress}>
              <Animated.View style={{ transform: [{ translateY: slideAnimation }] }}>
                {isPoint? <BottomForm fillType={'pointadd'} /> : <BottomForm fillType={'profile'}/>}
              </Animated.View>
            </TouchableOpacity>
          </Modal>
          }
        </View>

        <View style={[styles.buttonContainer, { left: 0 }]}>
          <TouchableOpacity style={styles.button} onPress={handleProfileClick}>
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
