import React from 'react';
import { View, Text, SafeAreaView, Button } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../redux/Login/store';
import { login, loginFalse } from '../../redux/Login';

export default function Login() {
  const value = useSelector((state: RootState) => state.auth.value);
  const dispatch: AppDispatch = useDispatch();

  return (
    <SafeAreaView>
      <Text testID='login-text'>{`Login ${value}.`}</Text>
      <Button title='Login' onPress={() => dispatch(login())}></Button>
      <Button
        title='LoginFalse'
        onPress={() => dispatch(loginFalse())}
      ></Button>
    </SafeAreaView>
  );
}
