import React, { useRef } from 'react'; 
import { View, Animated } from 'react-native';
import ModalForm from '../addPointForm/ModalForm'
import GoProfileForm from '../goProfileForm/GoProfileForm';

const BottomForm = ({ fillType }) => {

  const slideAnimation = useRef(new Animated.Value(500)).current;
  
  return (    
        <View>
          {(fillType === 'profile') ? <GoProfileForm /> : <ModalForm />}
        </View>
  );
};

export default BottomForm;
