import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgb(43,87,42)',
    flex: 1,
    justifyContent: 'space-around',
    
  },
  profileBlock: {
    flex:5,
  },
  statContainer: {
    flex: 5,
  },

  logo: {
    flex: 2,
    width: '100%',
    height: 80,    
    
    alignItems: 'center',
    justifyContent: 'center',

  },
  userDataContainer: {
    flex: 6,
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    margin: 30,
  },
  userDataField: {
    fontSize: 20,
    color: 'lightgray',
    padding: 5,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'white',
    backgroundColor: 'gray',
    width: '85%',
    height: 40,
  },
  button: {
    flex: 1,
    margin: 3,
    width: '70%',
    padding: 10,
    backgroundColor: 'rgb(47,224,83)',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  buttonText: { color: 'white' },
  statsBlock: {
    margin: 30,
    flex: 3,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 35,
    flexDirection: 'row',  
    justifyContent: 'center', 
    alignItems: 'center',  
    paddingHorizontal: 30
  },
  verticalLine: {
    width: 1,  
    height: '80%',  
    backgroundColor: 'white', 
  }

});
