import React, { useRef } from 'react';
import { Image, View, TouchableOpacity, Animated, Modal } from 'react-native';
import { styles } from './style';
import { AppDispatch, RootState } from '../../redux/store';
import {
  toggleForm,
  whatShouldBeOpenedChange,
  setIsInfoOpened,
} from '../../redux/home';
import { useDispatch, useSelector } from 'react-redux';
import BottomForm from '../../components/bottomSheet/BottomForm';
import InfoBlock from '../../components/infoBlock/InfoBlock';
import Map from '../../components/map/Map';
import MenuButton from '../../components/menuButton/MenuButton';
import GoBackLocation from '../../components/goBackLocation/GoBackLocation';
import { MapProvider } from '../../context/MapContext';

export default function Home() {
  const whatShouldBeOpened: string = useSelector(
    (state: RootState) => state.home.whatShouldBeOpened
  );

  const dispatch: AppDispatch = useDispatch();

  const isFormOpen: boolean = useSelector(
    (state: RootState) => state.home.isFormOpen
  );
  const isInfoOpened: boolean = useSelector(
    (state: RootState) => state.home.isInfoOpened
  );

  const handleInfoOpen = () => {
    dispatch(setIsInfoOpened(true));
  };

  const slideAnimation = useRef(new Animated.Value(500)).current;

  const handleOutsideFormPress = () => {
    dispatch(toggleForm(false));
    dispatch(whatShouldBeOpenedChange(''));
    dispatch(setIsInfoOpened(false));
  };

  return (
    <View style={{ flex: 1 }}>
      <MapProvider>
        <Map />
        <View>
          {isFormOpen && (
            <Modal transparent animationType='slide'>
              <TouchableOpacity onPress={handleOutsideFormPress}>
                <Animated.View
                  style={{ transform: [{ translateY: slideAnimation }] }}
                >
                  {whatShouldBeOpened === 'pointadd' ? (
                    <BottomForm />
                  ) : (
                    <BottomForm />
                  )}
                </Animated.View>
              </TouchableOpacity>
            </Modal>
          )}
        </View>
        <MenuButton />
        <GoBackLocation />
      </MapProvider>

      <View>
        {isInfoOpened && (
          <Modal transparent animationType='slide'>
            <TouchableOpacity onPress={handleOutsideFormPress}>
              <Animated.View
                style={{ transform: [{ translateY: slideAnimation }] }}
              >
                <InfoBlock />
              </Animated.View>
            </TouchableOpacity>
          </Modal>
        )}
      </View>
      <View style={[styles.infoButtonContainer, { left: 0 }]}>
        <TouchableOpacity style={styles.button} onPress={handleInfoOpen}>
          <Image
            source={require('../../../assets/Minimalist_info_Icon.png')}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}
