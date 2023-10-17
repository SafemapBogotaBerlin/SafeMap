import React from 'react';
import {
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  Image,
  View,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { routes } from '../../routes/public';
import useLogin from '../../hooks/UseLogin';
import { styles } from './style';
import { NavigationProp } from '../../types/index';

export default function Login() {
  const { setEmail, setPassword, login } = useLogin();

  const navigation: NavigationProp = useNavigation();

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      keyboardShouldPersistTaps='handled'
    >
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <SafeAreaView style={styles.container}>
          <View style={styles.header}></View>
          <View style={styles.logo}>
            <Image source={require('../../../assets/safemapLogo.png')} />
          </View>
          <View style={styles.title}>
            <Text testID='MapSafe-Header' style={styles.titleText}>
              Mapsafe.
            </Text>
          </View>
          <View style={styles.loginContainer}>
            <TextInput
              testID='Email'
              style={styles.input}
              placeholder='Email'
              onChangeText={setEmail}
            />
            <TextInput
              style={styles.input}
              placeholder='Password'
              secureTextEntry
              onChangeText={setPassword}
            />
          </View>
          <View style={styles.buttonsContainer}>
            <TouchableOpacity onPress={login} style={styles.button}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate(routes.register)}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.footer}></View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </ScrollView>
  );
}
