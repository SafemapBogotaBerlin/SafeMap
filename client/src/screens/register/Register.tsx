import React from 'react';
import {
  View,
  KeyboardAvoidingView,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';
import RegisterInput from '../../components/registerInput/RegisterInput';
import useRegister from '../../hooks/UseRegister';
import { styles } from './styles';

export default function Register() {
  const {
    displayName,
    setDisplayName,
    email,
    setEmail,
    password,
    setPassword,
    verifyPassword,
    setVerifyPassword,
    handleRegister,
    displayNameValid,
    emailValid,
    passwordValid,
    verifyPasswordValid,
  } = useRegister();

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      keyboardShouldPersistTaps='handled'
    >
      <KeyboardAvoidingView behavior={'padding'} style={{ flex: 1 }}>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={styles.container}>
            <View style={styles.header}></View>
            <View style={styles.logo}>
              <Image source={require('../../../assets/logoSafeMap.png')} />
            </View>
            <View style={styles.title}>
              <Text style={styles.titleText}></Text>
            </View>
            <View style={styles.registerContainer}>
              <RegisterInput
                value={displayName}
                onChangeText={setDisplayName}
                placeholder='Name'
                valid={displayNameValid}
                errorMessage='Invalid display name'
              />

              <RegisterInput
                value={email}
                onChangeText={setEmail}
                placeholder='Email'
                valid={emailValid}
                errorMessage='Invalid email address'
              />

              <RegisterInput
                value={password}
                onChangeText={setPassword}
                placeholder='Password'
                valid={passwordValid}
                errorMessage='Password too short'
                secret
              />

              <RegisterInput
                value={verifyPassword}
                onChangeText={setVerifyPassword}
                placeholder='Verify Password'
                valid={verifyPasswordValid}
                errorMessage='Passwords do not match'
                secret
              />
            </View>
            <TouchableOpacity onPress={handleRegister} style={styles.button}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <View style={styles.footer}></View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}
