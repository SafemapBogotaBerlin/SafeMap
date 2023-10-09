import { StyleSheet, View } from 'react-native';
import Navigation from './src/components/Navigation/Navigation';
import { store } from './src/redux/session/store';
import { Provider } from 'react-redux';

export default function App() {
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
