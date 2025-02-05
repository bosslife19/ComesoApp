import {
    View,
    Text,
    Image,
    TouchableOpacity,
    TextInput,
    StyleSheet,
    Alert,
    Platform,
  } from "react-native";
  import Toast from "react-native-toast-message";

  import React, { useState } from "react";
  import { AntDesign } from "@expo/vector-icons";
  import CountryPicker, {
    Country,
    CountryCode,
  } from "react-native-country-picker-modal";
  import CustomBlueButton from "./CustomBlueButton";
import axiosClient from "../axiosClient";
  import SectionsLogin from "../styles/Login/Login.styles"
import { addNotificationResponseClearedListener } from "expo-notifications";
  const AddBeneficiaryModal = ({ toggleModal, setPhonenumber, setName,setemail, openFirstConfirm}) => {
    const[name, setname] = useState('')
    
    const [phone, setPhone] = useState("")
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
    const [countryCode, setCountryCode] = useState("US");
    const [callingCode, setCallingCode] = useState("1");
    const [buttonSpinner, setButtonSpinner] = useState(false);
    const onSelectCountry = (country) => {
      setCountryCode(country.cca2); // Set the selected country code
      setCallingCode(country.callingCode[0]); // Set the corresponding calling code
    };
    
    const handleAddBeneficiary = async ()=>{
      if(!name){
        return Toast.show({
          type: "error",
          text1: "username is required",
          text2: "Enter beneficiary username to continue",
        });
       }
       
 
      setPhonenumber(phone);
      setName(name);
      
      setemail(email);
      try {
        
        setButtonSpinner(true);
        const response = await axiosClient.post('/user/find', {name, phone: phone});
       
      if(response.data.error == 'User not found!'){
        
        setButtonSpinner(false);
        openFirstConfirm();
      }
      if(response.data.beneficiary){
        setButtonSpinner(false)
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'Beneficiary already exists',
          position: 'top', // Can be 'top', 'bottom', or 'center'
          visibilityTime: 4000, // Duration the toast is visible
        });
        return;
      }
      else if(response.data.error !='User not found!'){
        setButtonSpinner(false)
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: response.data.error || 'An unexpected error occurred.',
          position: 'top', // Can be 'top', 'bottom', or 'center'
          visibilityTime: 4000, // Duration the toast is visible
        });
        return;
      }
      setButtonSpinner(false);
      openFirstConfirm();
      } catch (error) {
        console.log(error);
        setButtonSpinner(false);
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: error.response.data.message || 'An unexpected error occurred.',
          position: 'top', // Can be 'top', 'bottom', or 'center'
          visibilityTime: 4000, // Duration the toast is visible
        });
       
      }
    
      // const res = await axiosClient.post('/user/check-password', {password});
      
      // if(res.data.status ==false){
      //   setButtonSpinner(false);
      //   return Toast.show({
      //     type: "error",
      //     text1: "Incorrect password",
      //     text2: "The password you entered is incorrect",
      //   });
      //  }

      
      
    }
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
           
            left:0,
          }}
        ></View>
  
        <View
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: "white",
            opacity: 1,
            position: "absolute",
            top: "27%",
            // right: "0%",
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            paddingHorizontal: "5%",
            paddingVertical: "5%",
            
          }}
        >
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text style={{ fontFamily: "Sofia", fontSize: 19 }}>
              Add Beneficiary
            </Text>
            <TouchableOpacity onPress={toggleModal}>
              <AntDesign name="close" size={20} color="black" />
            </TouchableOpacity>
          </View>
          
  
          <View style={{ gap: 10, marginTop:23}}>
            <View
              style={{
                backgroundColor: "rgba(164, 169, 174, 0.2)",
                width: "100%",
                marginHorizontal: "auto",
                marginTop: 20,
                borderRadius: 10,
                // paddingVertical: 5,
              }}
            >
              <TextInput  
              style={[SectionsLogin.input, { fontFamily: "SofiaPro" }]}
               placeholder="Input beneficiary's name or username" onChangeText={(val)=>setname(val)}
                 placeholderTextColor={Platform.OS === "ios"?"#aaa":'#8E949A' }
               />
            </View>
            <View
              style={{
                backgroundColor: "rgba(164, 169, 174, 0.2)",
                width: "100%",
                marginHorizontal: "auto",
                marginTop: 20,
                borderRadius: 10,
                // paddingVertical: 5,
              }}
            >
              <TextInput  
              style={[SectionsLogin.input, { fontFamily: "SofiaPro", fontSize:13 }]}
              
              
               placeholder="Beneficiary's phone number (e.g.+23361***)" onChangeText={(val)=>setPhone(val)}
                 placeholderTextColor={Platform.OS === "ios"?"#aaa":'#8E949A' }
               />
            </View>
            {/* <View
              style={{
                backgroundColor: "rgba(164, 169, 174, 0.2)",
                width: "100%",
                marginHorizontal: "auto",
  
                borderRadius: 10,
                paddingVertical: 5,
              }}
            >
              <TextInput placeholder="Last Name" onChangeText={(val)=>setLastName(val)} />
            </View> */}
            <View
              style={{
                //   backgroundColor: "white",
                width: "100%",
                marginHorizontal: "auto",
  
                borderRadius: 10,
                // paddingVertical: 5,
              }}
            >
              {/* <View style={styles.phoneContainer}>
                <CountryPicker
                  countryCode={countryCode}
                  withFilter
                  withFlag
                  withCallingCode
                  withCountryNameButton={false}
                  onSelect={onSelectCountry}
                  containerButtonStyle={styles.flagButton}
                />
                <Text style={styles.callingCode}>+{callingCode}</Text>
                <TextInput
                  style={styles.phoneInput}
                  keyboardType="number-pad"
                  value={phone}
                  onChangeText={(val)=>setPhone(val)}
                  placeholder="Phone number"
                />
              </View> */}
            </View>
            {/* <View
              style={{
                backgroundColor: "rgba(164, 169, 174, 0.2)",
                width: "100%",
                marginHorizontal: "auto",
  
                borderRadius: 10,
                
              }}
            >
              <TextInput 
              style={[SectionsLogin.input, { fontFamily: "SofiaPro", }]}
              placeholder="Email" onChangeText={(val)=>setEmail(val)} />
            </View> */}
            <View style={{ flexDirection: "row", gap: 5, marginVertical:10 }}>
              {/* <View
                style={{
                  backgroundColor: "rgba(164, 169, 174, 0.2)",
                  width: "100%",
                  marginHorizontal: "auto",
  
                  borderRadius: 10,
                  
                }}
              >
                <TextInput 
                 style={[SectionsLogin.input, { fontFamily: "SofiaPro" }]}
                placeholder="Enter your password" onChangeText={(val)=>setPassword(val)} secureTextEntry={true}
                placeholderTextColor={Platform.OS === "ios"?"#aaa":'#8E949A' }
                />
              </View> */}
            </View>
          </View>
          <View style={{top:'-5%'}}>
          <CustomBlueButton text='Add Beneficiary' onPress={handleAddBeneficiary} toggleModal={toggleModal} buttonSpinner={buttonSpinner} setButtonSpinner={setButtonSpinner}/>
          </View>
          
        </View>
        <Toast />
      </>
    );
  };
  
  export default AddBeneficiaryModal
  
  const styles = StyleSheet.create({
    container: {
      marginTop: 16,
    },
    phoneContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginHorizontal: 16,
      borderRadius: 10,
      overflow: "hidden",
      backgroundColor: "#F1F2F3",
      width: "100%",
      left: "-5%",
    },
    callingCode: {
      marginRight: 10,
      fontSize: 16,
      color: "#333",
    },
    flagButton: {
      marginLeft: 8,
    },
    phoneInput: {
      width:"100%",
      height: 65,
      borderRadius: 3,
      borderLeftWidth: 1,
      borderColor: "#E9E9E9",
      paddingLeft: 15,
      fontSize: 14,
      color: "#a1a1a1",
    },
    checkboxContainer: {
      flexDirection: "row",
      alignItems: "center",
      paddingTop: 20,
      marginHorizontal: 16,
    },
    checkbox: {
      width: 20,
      height: 20,
      borderWidth: 1,
      borderColor: "#0A2EE2",
      backgroundColor: "#fff",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 3,
      marginRight: 10,
    },
    checkboxSelected: {
      backgroundColor: "#0A2EE2",
    },
    checkmark: {
      color: "#fff",
      fontSize: 10,
    },
    checkboxLabel: {
      color: "#8E949A",
      fontSize: 15,
      fontWeight: "400",
      lineHeight: 23.44,
    },
  });
  