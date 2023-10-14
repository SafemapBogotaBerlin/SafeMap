import React from 'react'
import { StyleSheet, View } from 'react-native';
import Navigation from './src/components/navigation/Navigation';
import { store } from './src/redux/store';
import { Provider } from 'react-redux';
import {useFonts, 
        Rubik_700Bold, 
        Rubik_600SemiBold, 
        Rubik_500Medium,
        Rubik_300Light,
        Rubik_400Regular
      } from '@expo-google-fonts/rubik'



export default function App() {
  let [fontsLoaded, fontError] = useFonts({
    Rubik_700Bold, 
    Rubik_600SemiBold,
    Rubik_500Medium,
    Rubik_300Light,
    Rubik_400Regular
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <Navigation />
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
