import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 20,
    display: 'flex',
    alignSelf: 'stretch',
    
    
    
  },
  input: {
    fontSize: 20,
    color: '#0C5A1E',
    padding: 5,
    borderWidth: .5,
    borderRadius: 5,
    
    borderColor: '#0C5A1E',
    backgroundColor: '#F8FFFC',
    width: '90%',
    height: 40,
    fontFamily: 'Rubik_300Light',
    alignSelf: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 1,
  },
  invalid: {
    borderColor: "#ff4757",
    shadowColor: "#ff4757",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  errorText: {
    color: "#ff4757",
    marginBottom: 5,
    fontSize: 14,
    fontWeight: '500',
  },
});