import { StyleSheet, Platform } from 'react-native';
export const styles = StyleSheet.create({
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
});
