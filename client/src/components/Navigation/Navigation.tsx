import { View } from 'react-native';
import Private from '../../navigation/Private';
import Public from '../../navigation/Public';
import { NavigationContainer } from '@react-navigation/native';
import { RootState } from '../../redux/session/store';
import { useSelector } from 'react-redux';
import { styles } from './style';

export default function Navigation() {
  const authentificated = useSelector(
    (state: RootState) => state.auth.authentificated
  );

  return (
    <View style={styles.container}>
      <NavigationContainer>
        {authentificated ? <Private /> : <Public />}
      </NavigationContainer>
    </View>
  );
}
