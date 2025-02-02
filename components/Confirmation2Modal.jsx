import {
    View,
    Text,
    TouchableOpacity,
    Image,
    TextInput,
    StyleSheet,
  } from "react-native";
  import React from "react";
  import CustomHeader from "./CustomHeader";
  import { AntDesign, Feather } from "@expo/vector-icons";
  import CustomBlueButton from "./CustomBlueButton";
import { router } from "expo-router";
  
  const Confirmation2Modal = ({ toggleModal }) => {
    return (
      <>
        <View
          style={{
            flex: 1,
          position: "absolute",
          backgroundColor: "rgba(164, 169, 174, 0.6)",
          // top: "5%",
          width: "100%",
          height: "100%",
          opacity: 0.9,
          // left: "2%",
          }}
        ></View>
  
        <View
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: "white",
            opacity: 1,
            position: "absolute",
            top: "25%",
            // left: "3%",
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            // paddingHorizontal: "1%",
            paddingVertical: "5%",
          }}
        >
          <View style={{ top: "0%" }}>
            <CustomHeader text="Confirmation" />
          </View>
  
          <View style={{ marginVertical: "3%" }}>
            <Text
              style={{
                textAlign: "center",
              fontFamily: "Sofia",
              fontSize: 32,
              color: "rgba(69, 110, 254, 1)",
              fontWeight:"700",
              lineHeight:39.52
              }}
            >
              Successful!
            </Text>
            <Text
              style={{
                fontFamily: "Alata",
                fontWeight: 400,
                fontSize: 18,
                color: "rgba(164, 169, 174, 1)",
                textAlign: "center",
                lineHeight:26.37,
              marginTop:10
              }}
            >
              You have successfully added the user as a beneficiary.
            </Text>
          </View>
  
          <View style={{width:'100%', marginHorizontal:'auto'}}>
            <Image style={{ width:'100%'}} resizeMode="contain" source={require('../assets/images/successfullbg.png')}/>
          </View>
          <TouchableOpacity
        style={{
          width: "80%",
          backgroundColor: "rgba(10, 46, 226, 1)",
          height: 60,
          alignSelf: "center",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 10,
        
          marginBottom: 20,
        }}
        onPress={()=>router.push('/(tabs)/home')}
        
      >
        
        <Text
          style={{
            color: "white",
            fontSize: 18,
            marginLeft: 10,
          }}
        >
          Go back
        </Text>
      </TouchableOpacity>
        </View>
      </>
    );
  };
  
  export default Confirmation2Modal;
  