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
  dropdownBtnStyle: {
    flex: 3,
    width: '100%',
    height: 50,
    backgroundColor: '#FFF',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    margin: 3,
    paddingLeft: 10,
  },
  dropdownBtnTxtStyle: { color: '#555', textAlign: 'left', fontSize: 16 },
  dropdownStyle: { backgroundColor: '#fafafa' },
  dropdownRowStyle: {
    backgroundColor: '#fafafa',
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
  },
  dropdownRowTxtStyle: { color: '#555', textAlign: 'left', fontSize: 16 },
  selectedRowStyle: { backgroundColor: '#e1f5fe' },
  searchInputStyle: {
    backgroundColor: '#fafafa',
    borderRadius: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingLeft: 10,
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
    color: '#F2FAF6', 
    fontSize: 30, 
    fontWeight: '600' 
  },
});