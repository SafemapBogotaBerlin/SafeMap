import React, { useRef } from 'react';
import { View, Animated } from 'react-native';
import ModalForm from '../addPointForm/ModalForm';
import GoProfileForm from '../goProfileForm/GoProfileForm';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

const BottomForm = ({ fillType }: { fillType: string }) => {
  const slideAnimation = useRef(new Animated.Value(500)).current;
  const whatShouldBeOpened: string = useSelector(
    (state: RootState) => state.home.whatShouldBeOpened
  );

  return (
    <View>
      {whatShouldBeOpened === 'profile' ? <GoProfileForm /> : <ModalForm />}
    </View>
  );
};

export default BottomForm;
