import { StyleSheet, Platform } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F8FFFC',
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
  userInfoText: {
    flex: 3,
    fontSize: 25,
    textAlign: 'justify',
    fontFamily: 'Rubik_500Medium',
    color: '#0C5A1E',
    marginLeft: 15,
  },
  button: {
    flex: 4,
    margin: 3,
    width: '100%',
    padding: 10,
    backgroundColor: '#0C5A1E',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  buttonText: { 
    color: '#F8FFFC', 
    fontSize: 20, 
    fontWeight: '600',
    fontFamily: 'Rubik_600SemiBold',
   },
});