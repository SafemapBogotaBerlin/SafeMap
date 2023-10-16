import { StyleSheet, Platform } from 'react-native';
export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  buttonContainer: {
    position: 'absolute',
    top: 775,
    left: 10,
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{ scale: 0.6 }],
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
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
  button: {
    transform: [{ scale: 0.6 }],
  },
  icon: {
    width: 100,
    height: 100,
  },
  arrow: {
    width: 50,
    height: 50,
  },
  calloutContainer: {
    backgroundColor: 'white',
    padding: 5,
    borderRadius: 5,
    elevation: 4,
    width: 200,
  },
  calloutTextIncidentType: {
    fontWeight: 'bold',
  },

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
