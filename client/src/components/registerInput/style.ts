import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderColor: "#dcdcdc",
    borderWidth: 1,
    paddingHorizontal: 15,
    backgroundColor: "#ffffff",
    borderRadius: 25,
    fontSize: 16,
    color: '#333',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
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