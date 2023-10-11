import React, { useRef, useState } from 'react';
import { Modal, View, TouchableOpacity, Text, Animated } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import SelectDropdown from 'react-native-select-dropdown';
import { styles } from './style';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { Coordinates, Point } from '../../../types/point';
import { addDangerPointToBothDBs } from '../../../services/apiService';

const ModalForm = ({ isVisible, onClose }) => {
  const [selectedEventType, setSelectedEventType] = useState<string | null>(
    null
  );
  const slideAnimation = useRef(new Animated.Value(500)).current;
  const dispatch: AppDispatch = useDispatch();
  const selectedPoint: Coordinates = useSelector(
    (state: RootState) => state.home.selectedPoint
  );

  const eventType = ['Robbery', 'Massshooting', 'Police', 'Scary Police'];

  const hideForm = () => {
    Animated.timing(slideAnimation, {
      toValue: 500,
      duration: 300,
      useNativeDriver: false,
    }).start(() => {
      slideAnimation.setValue(500);
      onClose();
    });
  };

  const handleFormSubmit = async () => {
    const hotpoint: Point = {
      added_dttm: JSON.stringify(Date.now()),
      coordinates: selectedPoint,
      danger_type: selectedEventType,
      user_id: 'randonUser',
    };
    await addDangerPointToBothDBs(hotpoint);
    hideForm();
  };

  return (
    <Modal visible={isVisible} transparent animationType='slide'>
      <Animated.View style={{ transform: [{ translateY: slideAnimation }] }}>
        <View style={styles.container}>
          <SelectDropdown
            data={eventType}
            onSelect={(selectedItem) => {
              setSelectedEventType(selectedItem);
            }}
            defaultButtonText={'Select event type'}
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
          <TouchableOpacity onPress={hideForm} style={styles.button}>
            <Text style={styles.buttonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </Modal>
  );
};

export default ModalForm;
