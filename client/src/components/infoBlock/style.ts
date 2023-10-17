import { StyleSheet, Platform } from 'react-native';


export const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f8f8f8',
    padding: 20,
    height: '70%',
    borderRadius: 20,
    margin: 10,
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(0, 0, 0, 0.1)',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 1,
        shadowRadius: 8,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  topLogo: {
    flex: 1,
  },
  title: {
    flex: 1,
  },
  titleText: {
    fontFamily: 'Rubik_600SemiBold',
  },
  infoBlock: {
    flex: 3,
  },
  infoText: {
    fontFamily: 'Rubik_300Light',
  }
  
});