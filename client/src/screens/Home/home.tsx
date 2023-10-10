import React, { useState, useEffect } from "react";
import { Image, View, Alert, TouchableOpacity } from "react-native";
import MapView, { Marker, Circle } from "react-native-maps";
import { styles } from "./style";
import { RootState, AppDispatch } from "../../redux/store";
import { selectPoint } from "../../redux/Home";
import { useDispatch, useSelector } from "react-redux";
import ModalForm from "../../components/addPointForm/ModalForm";
import * as Location from "expo-location";
import { coordinates } from '../../../../server/models/pointsCold';

type LatLng = {
  latitude: Number,
  longitude: Number,
}


export default function Home() {
  const [isModalVisible, setModalVisible] = useState<boolean>(false);

  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [heading, setHeading] = useState(null)
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      Location.watchPositionAsync({timeInterval:1000, accuracy:3, },(location)=>{
        setLocation(location);

      });
      // Location.watchHeadingAsync((head)=>{
      //   console.log(head)
      //   setHeading(head);
      // })
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
    const newPoint: { latitude: number; longitude: number } = {
      latitude,
      longitude,
    };
    setModalVisible(true);
    dispatch(selectPoint(newPoint));
  };
  const hotpoints = useSelector((state: RootState) => state.home.hotpoints);
  const dispatch: AppDispatch = useDispatch();

  return (
    <View style={{ flex: 1 }}>
      {location?.coords ?
      <MapView
      style={styles.map}
      initialRegion={{
        latitude:location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }
      }
      onLongPress={handleMapLongPress}
      showsUserLocation={true}
      userInterfaceStyle={'dark'} //need user themes
      onUserLocationChange={()=>{}}

    >


      {hotpoints.map((point, index) => (
        <Marker
          key={index}
          coordinate={point}
          title={`Marker ${index + 1}`}
          description={`Latitude: ${point.latitude}, Longitude: ${point.longitude}`}
        />
      ))}
    </MapView>:<></>}

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
