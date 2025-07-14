import { StyleSheet } from "react-native";

 const SectionsLogin = StyleSheet.create({
    welcomeText: {
      textAlign: "center",
      fontSize: 24,
    },
    learningText: {  
      textAlign: "center",
      color: "#575757",
      fontSize: 15,
      marginTop: 5,
    },
    inputContainer: {
      marginHorizontal: 16,
      marginTop: 30,
    },
    input: {
      height: 63,
      marginHorizontal: 16,
      borderRadius: 8,
      paddingLeft: 15,
      fontSize: 14,
      backgroundColor: "#F1F2F3",
      color: "black",
    },
    inputs: {
      height: 63,
      marginHorizontal: 16,
      borderRadius: 8,
      paddingLeft: 15,
      fontSize: 14,
      backgroundColor: "#F1F2F3",
      color: " #A4A9AE",
    },
    visibleIcon: {
      position: "absolute",
      right: 30,
      top: 17,
    },
    icon2: {
      position: "absolute",
      left: 24,
      top: 17.8,
    },
    forgotSection: {
      marginHorizontal: 16,
      textAlign: "center",
      fontWeight:"400",
      lineHeight:26.37,
      fontSize: 16,
      color:'#8E949A',
      marginTop: 20,
    },
    loginButton: {
      padding: 19,
      borderRadius: 8,
      marginHorizontal: 16,
      backgroundColor: "#0A2EE2",
      marginTop: 19,
    },
    loginButtons: {
      padding: 19,
      borderRadius: 8,
      marginHorizontal: 5,
      backgroundColor: "#0A2EE2",
      marginTop: 19,
    },
    loginButtonText: {
      color: "white",
      textAlign: "center",
      fontFamily: "Raleway_700Bold",
    },
    socialLogin: {
    //   flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      paddingVertical:30,
      gap: 10,
    },
    signupRedirect: {
      flexDirection: "row",
      justifyContent: "center",
      marginTop: 20,
      marginBottom: 20,
    },
    signUpText: {
      fontSize: 18,
      fontFamily: "Raleway_600SemiBold",
      color: "#212121",
      marginLeft: 5,
    },
    errorContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginTop: 5,
      marginHorizontal: 16,
    },
  });


  export default SectionsLogin;   