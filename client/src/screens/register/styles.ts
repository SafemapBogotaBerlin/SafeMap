import { StyleSheet } from "react-native";
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
    flex: 1,
  },
  logo: {
    flex: 1,
    // width: 150,
    // height: 150,
    alignSelf:'center',
    marginBottom: 1,
  },
  title: {
    flex: 0,
  },
  titleText: {
    fontSize: 24,
    fontFamily: 'Rubik_700Bold',
    color: '#0C5A1E',
  },
  registerContainer: {
    flex: 3,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 50,
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
