import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Platform,
} from "react-native";
import SectionsLogin from "../styles/Login/Login.styles"
import React, { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import CountryPicker, {
  Country,
  CountryCode,
} from "react-native-country-picker-modal";
import CustomBlueButton from "./CustomBlueButton";

const BeneficiaryModal = ({ toggleModal, image }) => {
  const [countryCode, setCountryCode] = useState("US");
  const [callingCode, setCallingCode] = useState("1");
  const onSelectCountry = (country) => {
    setCountryCode(country.cca2); // Set the selected country code
    setCallingCode(country.callingCode[0]); // Set the corresponding calling code
  };
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
            top: "18%",
            // left: "3%",
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            // paddingHorizontal: "1%",
            paddingVertical: "5%",
        }}
      >
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingHorizontal:20,
          }}
        >
          <Text style={{ fontFamily: "Sofia", fontSize: 19 }}>
            Edit Beneficiary
          </Text>
          <TouchableOpacity onPress={toggleModal}>
            <AntDesign name="close" size={20} color="black" />
          </TouchableOpacity>
        </View>
        <View style={{ marginHorizontal: "auto", marginTop: "10%", }}>
          <Image
            source={image}
            style={{ width: 80, height: 80 }}
            resizeMode="contain"
          />
        </View>

        <View style={{ gap: 10, paddingHorizontal:20, }}>
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
            placeholder="First Name"  placeholderTextColor={Platform.OS === "ios"?"#aaa":'#8E949A' }/>
          </View>
          <View
            style={{
              backgroundColor: "rgba(164, 169, 174, 0.2)",
              width: "100%",
              marginHorizontal: "auto",

              borderRadius: 10,
              // paddingVertical: 5,
            }}
          >
            <TextInput
             style={[SectionsLogin.input, { fontFamily: "SofiaPro" }]}
            placeholder="Last Name" placeholderTextColor={Platform.OS === "ios"?"#aaa":'#8E949A' } />
          </View>
          <View
            style={{
              //   backgroundColor: "white",
              width: "100%",
              marginHorizontal: "auto",

              borderRadius: 10,
              // paddingVertical: 5,
            }}
          >
            <View style={styles.phoneContainer}>
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
                keyboardType="phone-pad"
                // value={phoneNumber}
                // onChangeText={handlePhoneChange}
                placeholder="Phone number"
                placeholderTextColor={Platform.OS === "ios"?"#aaa":'#8E949A' }
              />
            </View>
          </View>
          <View
            style={{
              backgroundColor: "rgba(164, 169, 174, 0.2)",
              width: "100%",
              marginHorizontal: "auto",

              borderRadius: 10,
             }}
          >
            <TextInput
             style={[SectionsLogin.input, { fontFamily: "SofiaPro" }]}
            placeholder="Email" placeholderTextColor={Platform.OS === "ios"?"#aaa":'#8E949A' } />
          </View>
          <View style={{ flexDirection: "row", gap: 5 }}>
            <View
              style={{
                backgroundColor: "rgba(164, 169, 174, 0.2)",
                width: "100%",
                marginHorizontal: "auto",

                borderRadius: 10,
                // paddingVertical: 5,
                flex: 4,
              }}
            >
              <TextInput
              style={{
                height: 63,
      marginHorizontal: 16,
      borderRadius: 8,
      paddingLeft: 15,
      fontSize: 14,
      backgroundColor: "#F1F2F3",
      color: " #A4A9AE",

              }}
              //  style={[SectionsLogin.input, { fontFamily: "SofiaPro" }]}
              placeholder="Password" placeholderTextColor={Platform.OS === "ios"?"#aaa":'#8E949A' }/>
            </View>
            <View
              style={{
                backgroundColor: "rgba(164, 169, 174, 0.2)",
                flex: 1,
                borderRadius: 5,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image source={require("../assets/images/fingerprint.png")} />
            </View>
          </View>
        </View>
        <CustomBlueButton text='Edit Beneficiary' toggleModal={toggleModal} onPress={()=>{}}/>
      </View>
    </>
  );
};

export default BeneficiaryModal;

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
