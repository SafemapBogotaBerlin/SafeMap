import React, { useRef, useState } from 'react';
import { Modal, View, TouchableOpacity, Text, Animated } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import SelectDropdown from 'react-native-select-dropdown';
import { styles } from './style';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { Coordinates, Point } from '../../types/index';
import { addDangerPointToBothDBs } from '../../services/apiService';

const ModalForm = () => {
  const [selectedEventType, setSelectedEventType] = useState<string | null>(
    null
  );
  const [selectedTime, setSelectedTime] = useState<string>(null);
  //const slideAnimation = useRef(new Animated.Value(500)).current;
  //const dispatch: AppDispatch = useDispatch();
  const selectedPoint: Coordinates = useSelector(
    (state: RootState) => state.home.selectedPoint
  );

  const eventType = ['Robbery', 'Massshooting', 'Police', 'Scary Police'];
  const times = [
    'Now',
    '15 minures ago',
    '30 minutes ago',
    '1 hour ago',
    '3 hours ago',
    'earlier',
  ];

  const timesToTimestamp = (timeString) => {
    switch (timeString) {
      case 'Now':
        return Date.now();
      case '15 minures ago':
        return Date.now() - 15 * 60 * 1000;
      case '30 minutes ago':
        return Date.now() - 30 * 60 * 1000;
      case '1 hour ago':
        return Date.now() - 60 * 60 * 1000;
      case '3 hours ago':
        return Date.now() - 180 * 60 * 1000;
      default:
        return Date.now() - 240 * 60 * 1000;
    }
  };
  /* const hideForm = () => {
    Animated.timing(slideAnimation, {
      toValue: 500,
      duration: 300,
      useNativeDriver: false,
    }).start(() => {
      slideAnimation.setValue(500);
      onClose();
    });
  };  */

  const handleFormSubmit = async () => {
    const hotpoint: Point = {
      added_dttm: JSON.stringify(timesToTimestamp(selectedTime)),
      coordinates: selectedPoint,
      danger_type: selectedEventType,
      user_id: 'randonUser',
    };
    await addDangerPointToBothDBs(hotpoint);
    //hideForm();
  };

  return (
    <View style={styles.container}>
      <SelectDropdown
        data={eventType}
        onSelect={(selectedItem) => {
          setSelectedEventType(selectedItem);
        }}
        defaultButtonText={'Select event type'}
        buttonTextAfterSelection={(selectedItem) => {
          return selectedItem;
        }}
        rowTextForSelection={(item) => {
          return item;
        }}
        buttonStyle={styles.dropdownBtnStyle}
        buttonTextStyle={styles.dropdownBtnTxtStyle}
        renderDropdownIcon={(isOpened) => {
          return (
            <FontAwesome
              name={isOpened ? 'chevron-up' : 'chevron-down'}
              color={'#444'}
              size={18}
            />
          );
        }}
        dropdownIconPosition={'right'}
        dropdownStyle={styles.dropdownStyle}
        rowStyle={styles.dropdownRowStyle}
        rowTextStyle={styles.dropdownRowTxtStyle}
        selectedRowStyle={styles.selectedRowStyle}
        searchInputStyle={styles.searchInputStyle}
        searchPlaceHolder={'Search here'}
        searchPlaceHolderColor={'darkgrey'}
        renderSearchInputLeftIcon={() => {
          return <FontAwesome name={'search'} color={'#444'} size={18} />;
        }}
      />
      <SelectDropdown
        data={times}
        onSelect={(selectedItem) => {
          setSelectedEventType(selectedItem);
        }}
        defaultButtonText={'When?'}
        buttonTextAfterSelection={(selectedItem, index) => {
          return selectedItem;
        }}
        rowTextForSelection={(item, index) => {
          return item;
        }}
        buttonStyle={styles.dropdownBtnStyle}
        buttonTextStyle={styles.dropdownBtnTxtStyle}
        renderDropdownIcon={(isOpened) => {
          return (
            <FontAwesome
              name={isOpened ? 'chevron-up' : 'chevron-down'}
              color={'#444'}
              size={18}
            />
          );
        }}
        dropdownIconPosition={'right'}
        dropdownStyle={styles.dropdownStyle}
        rowStyle={styles.dropdownRowStyle}
        rowTextStyle={styles.dropdownRowTxtStyle}
        selectedRowStyle={styles.selectedRowStyle}
        searchInputStyle={styles.searchInputStyle}
        searchPlaceHolder={'Search here'}
        searchPlaceHolderColor={'darkgrey'}
        renderSearchInputLeftIcon={() => {
          return <FontAwesome name={'search'} color={'#444'} size={18} />;
        }}
      />

      <TouchableOpacity onPress={handleFormSubmit} style={styles.button}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ModalForm;
