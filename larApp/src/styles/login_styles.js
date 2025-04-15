import { StyleSheet } from 'react-native';

const LoginStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#522074',
    padding: 25,
    justifyContent: 'center',
  },
  title: {
    fontSize: 40,
    color: "#B3B3B3",
    fontWeight: 'bold',
    fontFamily: "sans-serif-medium",
    textAlign: 'center',
    marginBottom: 100,
  },
  input: {
    height: 40,
    borderColor: '#999999',
    borderWidth: 2,
    marginBottom: 15,
    paddingHorizontal: 20,
    borderRadius: 25,
    backgroundColor: "white",
  },
  loginButton: {  
    backgroundColor: '#999999',
    padding: 10,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 30,
  },
  loginText: {  
    color: '#fff',
    fontWeight: 'bold',
  },
  forgotText: {
    color: '#999999',
    textAlign: 'center',
    marginTop: 90,
  },
});

export default LoginStyles;