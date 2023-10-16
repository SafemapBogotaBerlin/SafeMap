import { Button, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    justifyContent: "center",
    alignItems: "stretch",
    padding: 16,
    backgroundColor: "#F8FFFC",

  },
  header: {
    flex: 2,
  },
  logo: {
    flex: 3,
    // width: 150,
    // height: 150,
    alignSelf:'center',
    marginBottom: 40,
  },
  title: {
    flex: 1,
    marginBottom: 16,
    alignSelf:'center',
    marginTop:15,
  },
  titleText: {
    marginTop: 10,
    fontSize: 24,
    fontFamily: 'Rubik_700Bold',
    color: '#0C5A1E',
  },
  loginContainer: {
    flex: 3,
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    marginTop: 30,
    marginBottom: 30,
    height: 90,
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
    alignSelf: 'center'
  },
  buttonsContainer: {
    flex: 3,
    display: 'flex',
    height: 80,
  },
  button: {
    flex: 1,
    margin: 3,
    width: '90%',
    height: 30,
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
  footer: {
    flex: 3,
  }
});
