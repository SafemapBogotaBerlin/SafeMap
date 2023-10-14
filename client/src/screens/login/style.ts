import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#F8FFFC",
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    fontWeight: "bold",
    color: '#0C5A1E',
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  loginContainer: {
    flex: 6,
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    margin: 30,
  },
  input: {
    fontSize: 20,
    color: '#0C5A1E',
    padding: 5,
    borderWidth: .5,
    borderRadius: 5,
    borderColor: '#0C5A1E',
    backgroundColor: '#F8FFFC',
    width: '85%',
    height: 40,
    fontFamily: 'Rubik_300Light'
  },
  buttonsContainer: {
    display: 'flex',
  },
  button: {
    flex: 1,
    margin: 3,
    width: '70%',
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
});
