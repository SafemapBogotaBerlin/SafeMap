import React from 'react'
import { StyleSheet, View } from 'react-native';
import Navigation from './src/components/navigation/Navigation';
import { store } from './src/redux/store';
import { Provider } from 'react-redux';
import { useFonts } from 'expo-font';

export default function App() {
  const [fontsLoaded] = useFonts({
    'EncodeSansExpanded-Regular': require('./assets/fonts/EncodeSansExpanded-Regular.ttf'),
    'EncodeSansExpanded-Black': require('./assets/fonts/EncodeSansExpanded-Black.ttf'),
    'EncodeSansExpanded-ExtraBold': require('./assets/fonts/EncodeSansExpanded-ExtraBold.ttf'),
    'EncodeSansExpanded-ExtraLight': require('./assets/fonts/EncodeSansExpanded-ExtraLight.ttf'),
    'EncodeSansExpanded-Light': require('./assets/fonts/EncodeSansExpanded-Light.ttf'),
    'EncodeSansExpanded-Medium': require('./assets/fonts/EncodeSansExpanded-Medium.ttf'),
    'EncodeSansExpanded-Bold': require('./assets/fonts/EncodeSansExpanded-Bold.ttf'),
    'EncodeSansExpanded-SemiBold': require('./assets/fonts/EncodeSansExpanded-SemiBold.ttf'),
    'EncodeSansExpanded-Thin': require('./assets/fonts/EncodeSansExpanded-Thin.ttf'),
  });

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
