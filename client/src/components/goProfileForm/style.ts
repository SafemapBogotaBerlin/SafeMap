import { StyleSheet, Platform } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 20,
    height: '70%',
    margin: 10,
    borderRadius: 20,
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(0, 0, 0, 0.4)',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 3,
        shadowRadius: 8,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  dropdownBtnStyle: {
    width: '100%',
    height: 50,
    backgroundColor: '#FFF',
    borderRadius: 8,
    borderWidth: 0,
    borderColor: '#444',
  },
  dropdownBtnTxtStyle: { color: '#444', textAlign: 'left' },
  dropdownStyle: { backgroundColor: '#EFEFEF' },
  dropdownRowStyle: {
    backgroundColor: '#EFEFEF',
    borderBottomColor: '#C5C5C5',
  },
  dropdownRowTxtStyle: { color: '#444', textAlign: 'left' },
  selectedRowStyle: { backgroundColor: 'rgba(0,0,0,0.1)' },
  searchInputStyle: {
    backgroundColor: '#EFEFEF',
    borderRadius: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#444',
  },
  button: {
    flex: 1,
    margin: 3,
    width: '100%',
    padding: 10,
    backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  buttonText: { color: 'white' },

});
