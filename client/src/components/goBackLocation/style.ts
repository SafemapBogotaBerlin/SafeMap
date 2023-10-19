import { StyleSheet, Platform } from 'react-native';
export const styles = StyleSheet.create({
  circle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'white',
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    paddingBottom: 8,
    paddingLeft: 8,
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(0, 0, 0, 0.2)',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 1,
        shadowRadius: 6,
      },
      android: {
        elevation: 6,
      },
    }),
  },

  nearMeContainer: {
    position: 'absolute',
    top: 796,
    right: 10,
  },
});
