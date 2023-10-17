import React, { useState, useEffect, useRef } from "react";
import { Coordinates, DataObject } from "../../types";
import { Image, View, TouchableOpacity, Animated, Modal, Text } from "react-native";
import MapView, { LongPressEvent, Marker, Callout, Circle } from "react-native-maps";
import { styles } from "./style";
import { AppDispatch, RootState } from "../../redux/store";
import { selectPoint, toggleForm, whatShouldBeOpenedChange } from "../../redux/home";
import { hotpoints } from "../../services/pointsSubscription";
import { useDispatch, useSelector } from "react-redux";
import BottomForm from "../../components/bottomSheet/BottomForm";
import Spinner from "../../components/spinner/Spinner";
import InfoBlock from "../../components/infoBlock/InfoBlock";
import * as Location from "expo-location";
import { geolocationHelper } from "../../helpers/geolocation";
import { formatTimeDifference } from "../../services/formatTime";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import UseNotifications from "../../hooks/UseNotification";
import { useLocationData } from "../../hooks/UseLocationData";

export default function Home() {
  const { newData, location } = useLocationData(hotpoints);

  const whatShouldBeOpened: string = useSelector(
    (state: RootState) => state.home.whatShouldBeOpened
  );

  const dispatch: AppDispatch = useDispatch();

  const [userLocation, setUserLocation] = useState<Coordinates | null>(null);
  const [buttonOpen, setButtonOpen] = useState<boolean>(false);
  const mapRef = useRef(null);
  const [visibleRegion, setVisibleRegion] = useState<Region | null>(null);

  const [distanceMoved, setDistanceMoved] = useState<number>(0);
  const [originalCoordinate, setOriginalCoordinate] = useState<Coordinates>({
    latitude: 0,
    longitude: 0,
  });
  const [isDanger, setIsDanger] = useState<boolean>(false);
  const [isTimeToCheck, setIsTimeToCheck] = useState<boolean>(false);

  const [isInfoOpened, setIsInfoOpened] = useState<boolean>(true);

  const [markerDescription, setMarkerDescription] = useState<string>("");
  const [justNotified, setJustNotified] = useState<boolean>(false);
  const { pushNotification } = UseNotifications();

  type Region = {
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  };

  const isFormOpen: boolean = useSelector((state: RootState) => state.home.isFormOpen);

  const handleMarkerClick = (point) => {
    const newDescription: string = formatTimeDifference(point.added_dttm);

    setMarkerDescription(newDescription);
  };

  const notify = () => {
    if (justNotified) return;
    setJustNotified(true);
    pushNotification("MapSafe", "You are in danger zone!");
    setTimeout(() => {
      setJustNotified(false);
    }, 30000);
  };

  const handleDeviceMoved = (event) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setUserLocation({ latitude, longitude });
    userLocation &&
      setDistanceMoved(geolocationHelper.getDistance(userLocation, originalCoordinate));
    console.log("what distance? = " + distanceMoved + "check?" + isTimeToCheck);
    if (distanceMoved < 100) setIsTimeToCheck(false);
    else setIsTimeToCheck(true);

    if (isTimeToCheck) {
      handleDangerAlert();
      setIsTimeToCheck(false);
    }
  };

  const handleDangerAlert = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    Location.watchPositionAsync({ timeInterval: 10000, accuracy: 3 }, (location) => {
      const userLocation: Coordinates = {
        longitude: location.coords.longitude,
        latitude: location.coords.latitude,
      };

      setOriginalCoordinate(userLocation);
      const dangerPoints = geolocationHelper.findPointsWithDanger(newData, userLocation);
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
    });

    if (status !== "granted") {
      console.log("Permission to access location was denied");
      return;
    }
  };

  const handleInfoOpen = () => {
    setIsInfoOpened(true);
  };

  const handleProfileClick = () => {
    dispatch(toggleForm(true));
    dispatch(whatShouldBeOpenedChange("profile"));
  };

  const handleMapLongPress = (event: LongPressEvent) => {
    dispatch(toggleForm(true));
    dispatch(whatShouldBeOpenedChange("pointadd"));
    const { latitude, longitude } = event.nativeEvent.coordinate;
    const newPoint: Coordinates = {
      latitude,
      longitude,
    };
    dispatch(selectPoint(newPoint));
  };
  const slideAnimation = useRef(new Animated.Value(500)).current;

  const handleOutsideFormPress = () => {
    dispatch(toggleForm(false));
    dispatch(whatShouldBeOpenedChange(""));
    setIsInfoOpened(false);
  };

  const getMarkerIcon = (dangerType) => {
    switch (dangerType) {
      case "Police":
        return require("../../../assets/police-car.png");
      case "Massshooting":
        return require("../../../assets/gun.png");
      default:
        return require("../../../assets/thief.png");
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
          userInterfaceStyle={"dark"}
          onUserLocationChange={(event) => handleDeviceMoved(event)}
          ref={mapRef}
          onRegionChangeComplete={(region) => setVisibleRegion(region)}
        >
          {newData &&
            Object.values(newData)
              .filter((point) =>
                geolocationHelper.isMarkerVisible(point.coordinates, visibleRegion)
              )
              .map((point, index) => (
                <React.Fragment key={index}>
                  <Marker coordinate={point.coordinates} onPress={() => handleMarkerClick(point)}>
                    <Image
                      source={getMarkerIcon(point.danger_type)}
                      style={{ width: 40, height: 40 }}
                    />

                    <Callout style={styles.calloutContainer}>
                      <Text style={styles.calloutTextIncidentType}>{point.danger_type}</Text>
                      <Text>{markerDescription}</Text>
                    </Callout>
                  </Marker>
                  <Circle
                    center={point.coordinates}
                    radius={100}
                    strokeWidth={2}
                    strokeColor="#FF0000AA"
                    fillColor="rgba(255,0,0,0.2)"
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
      <View>
        {isFormOpen && (
          <Modal transparent animationType="slide">
            <TouchableOpacity onPress={handleOutsideFormPress}>
              <Animated.View style={{ transform: [{ translateY: slideAnimation }] }}>
                {whatShouldBeOpened === "pointadd" ? <BottomForm /> : <BottomForm />}
              </Animated.View>
            </TouchableOpacity>
          </Modal>
        )}
      </View>

      <View style={[styles.buttonContainer, { left: 0 }]}>
        <TouchableOpacity style={styles.button} onPress={handleProfileClick}>
          <Image source={require("../../../assets/hamburger.png")} style={styles.icon} />
        </TouchableOpacity>
      </View>
      <View style={styles.nearMeContainer}>
        <TouchableOpacity onPress={handleButtonClick}>
          <View style={styles.circle}>
            {buttonOpen ? (
              <Icon name="navigation-variant" size={40} color="#2ee153" />
            ) : (
              <Icon name="navigation-variant-outline" size={40} color="#2ee153" />
            )}
          </View>
        </TouchableOpacity>
      </View>

      <View>
        {isInfoOpened && (
          <Modal transparent animationType="slide">
            <TouchableOpacity onPress={handleOutsideFormPress}>
              <Animated.View style={{ transform: [{ translateY: slideAnimation }] }}>
                <InfoBlock />
              </Animated.View>
            </TouchableOpacity>
          </Modal>
        )}
      </View>
      <View style={[styles.infoButtonContainer, { left: 0 }]}>
        <TouchableOpacity style={styles.button} onPress={handleInfoOpen}>
          <Image source={require("../../../assets/Minimalist_info_Icon.png")} style={styles.icon} />
        </TouchableOpacity>
      </View>
    </View>
  );
}