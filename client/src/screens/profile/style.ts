import { StyleSheet, TextInput } from "react-native";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F8FFFC',
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
    color: '#0C5A1E',
    padding: 5,
    borderWidth: .2,
    borderRadius: 2,
    borderColor: '#0C5A1E',
    backgroundColor: '#F8FFFC',
    height: 40,
    width: '100%',
    fontFamily: 'Rubik_400Regular'
  },
  userDataPlaceHolder: {
    fontSize: 20,
    color: '#0C5A1E',
    padding: 5,
    borderWidth: .5,
    borderRadius: 5,
    borderColor: '#0C5A1E',
    backgroundColor: '#F8FFFC',
    width: '100%',
    height: 40,
    fontFamily: 'Rubik_300Light'
  },
  
  button: {
    flex: 1,
    margin: 3,
    width: '70%',
    padding: 10,
    backgroundColor: '#0C5A1E',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  buttonText: { 
    color: '#F8FFFC',
    fontFamily: 'Rubik_600SemiBold',
    fontSize: 20,
   },
  statsBlock: {
    margin: 30,
    flex: 3,
    borderWidth: 1,
    borderColor: '#0C5A1E',
    borderRadius: 35,
    flexDirection: 'row',  
    justifyContent: 'space-around', 
    alignItems: 'center',  
    paddingHorizontal: 30
  },
  verticalLine: {
    width: 1,  
    height: '80%',  
    backgroundColor: '#0C5A1E',
    margin: 40, 
  },
  statsCell: {
    color: '#0C5A1E',
    alignSelf: 'center',
    fontFamily: 'Rubik_400Regular',
    marginLeft: 25,
    marginRight: 25,
  },
  statsNumber: {
    color: '#0C5A1E',
    fontSize: 35,
    fontWeight: 'bold',
    alignSelf: 'center',
    fontFamily: 'Rubik_500Medium',
  }
});
