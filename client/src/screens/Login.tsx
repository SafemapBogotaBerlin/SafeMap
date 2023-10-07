import React from 'react';
import { View, Text, SafeAreaView, Button } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/Login/store';
import { login } from '../../redux/Login';

export default function Login() {
  const value = useSelector((state: RootState) => state.test.value);
  const dispatch = useDispatch();

  return (
    <SafeAreaView>
      <Text>{`Login ${value}.`}</Text>
      <Button title='Login' onPress={() => dispatch(login())}></Button>
    </SafeAreaView>
  );
}
