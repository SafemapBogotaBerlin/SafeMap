import React, { useRef } from 'react';
import {
  Modal,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Animated,
} from 'react-native';

const ModalForm = ({ isVisible, onClose, onSubmit }) => {
  const slideAnimation = useRef(new Animated.Value(500)).current;

  const showForm = () => {
    Animated.timing(slideAnimation, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

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

  const handleFormSubmit = () => {
    hideForm();
  };

  return (
    <Modal visible={isVisible} transparent animationType='slide'>
      <Animated.View style={{ transform: [{ translateY: slideAnimation }] }}>
        <View style={{ backgroundColor: 'white', padding: 20 }}>
          <TextInput
            placeholder='Latitude'
            style={{ marginBottom: 10, padding: 10, borderWidth: 1 }}
          />
          <TextInput
            placeholder='Longitude'
            style={{ marginBottom: 10, padding: 10, borderWidth: 1 }}
          />
          <TouchableOpacity
            onPress={handleFormSubmit}
            style={{
              padding: 10,
              backgroundColor: 'blue',
              alignItems: 'center',
              borderRadius: 5,
            }}
          >
            <Text style={{ color: 'white' }}>Submit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={hideForm}
            style={{
              marginTop: 10,
              padding: 10,
              backgroundColor: 'red',
              alignItems: 'center',
              borderRadius: 5,
            }}
          >
            <Text style={{ color: 'white' }}>Close</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </Modal>
  );
};

export default ModalForm;
