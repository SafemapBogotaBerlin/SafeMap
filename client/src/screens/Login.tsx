import React from 'react';
import { View, Text, SafeAreaView, Button } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../redux/login/store';
import { login, loginFalse } from '../../redux/login';

export default function Login() {
  const value = useSelector((state: RootState) => state.test.value);
  const dispatch: AppDispatch = useDispatch();

  return (
    <SafeAreaView>
      <Text>{`Login ${value}.`}</Text>
      <Button title='Login' onPress={() => dispatch(login())}></Button>
      <Button
        title='LoginFalse'
        onPress={() => dispatch(loginFalse())}
      ></Button>
    </SafeAreaView>
  );
}
