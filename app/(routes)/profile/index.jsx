import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Platform,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomHeader from "../../../components/CustomHeader";
import CountryPicker, {
  Country,
  CountryCode,
} from "react-native-country-picker-modal";
import CustomBlueButton from "../../../components/CustomBlueButton";
import { router } from "expo-router";

const Profile = () => {
  const [countryCode, setCountryCode] = useState("US");
  const [callingCode, setCallingCode] = useState("1");
  const onSelectCountry = (country) => {
    setCountryCode(country.cca2); // Set the selected country code
    setCallingCode(country.callingCode[0]); // Set the corresponding calling code
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <CustomHeader text="Profile" />
        <View style={{ height: "100%", paddingHorizontal: "5%" }}>
          <View style={{ marginHorizontal: "auto", marginTop: "5%" }}>
            <Image
              width={90}
              height={90}
              source={require("../../../assets/images/profile.png")}
            />
          </View>
          <View>
            <Text
              style={{
                textAlign: "center",
                fontFamily: "Sofia",
                fontSize: 20,
                color: "rgba(10, 46, 226, 1)",
                fontWeight: "700",
              }}
            >
              Jonathan
            </Text>
            <Text
              style={{
                textAlign: "center",
                fontFamily: "Sofia",
                fontSize: 14,
                color: "rgba(164, 169, 174, 1)",
                fontWeight: "500",
              }}
            >
              {/* United State */}
            </Text>
          </View>

          <View style={{ gap: 10 }}>
          <Text style={{fontFamily:'Sofia',fontSize:19, fontWeight:"600", top:'4%'}}>Your Name</Text>
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
              style={{
                height: 63,
                marginHorizontal: 16,
                borderRadius: 8,
                paddingLeft: 15,
                fontSize: 14,
                // backgroundColor: "#F1F2F3",
                color: Platform.OS=='ios'?"#aaa": "#A4A9AE",
              }}
              placeholderTextColor={Platform.OS === "ios" &&"#aaa" } 
              placeholder="Jonathan" />
            </View>
            <Text style={{fontFamily:'Sofia',fontSize:19, fontWeight:"600"}}>Email</Text>
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
               style={{
                height: 63,
                marginHorizontal: 16,
                borderRadius: 8,
                paddingLeft: 15,
                fontSize: 14,
                // backgroundColor: "#F1F2F3",
                color: Platform.OS==='ios'?'#aaa':" #A4A9AE",
              }}
              placeholder="Last Name" placeholderTextColor={Platform.OS === "ios" &&"#aaa" }  />
            </View>
            <Text style={{fontFamily:'Sofia',fontSize:19, fontWeight:"600"}}>Mobile Number</Text>
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
                  style={[styles.phoneInput, {color:Platform.OS==
                    'ios'&&'#aaa'
                  }]}
                  keyboardType="key-pad"
                  // value={phoneNumber}
                  // onChangeText={handlePhoneChange}
                  placeholder="Phone number"
                  placeholderTextColor={Platform.OS === "ios" &&"#aaa" }
                />
              </View>
            </View>
            
           
            <Text style={{fontFamily:'Sofia',fontSize:19, fontWeight:"600"}}>Password</Text>
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
                  // backgroundColor: "#F1F2F3",
                  color:Platform.OS=='ios'?'#aaa': " #A4A9AE",
                }}
                placeholder="Password"
                placeholderTextColor={Platform.OS === "ios" &&"#aaa" } 
                />
              </View>
            </View>
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
              marginTop: "10%",
              marginBottom: 20,
            }}
            onPress={() => {router.push('/(routes)/profile/profile')}}
          >
            <Text
              style={{
                color: "white",
                fontSize: 18,
                marginLeft: 10,
              }}
            >
              Save
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
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
    backgroundColor: "rgba(164, 169, 174, 0.2)",
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
    height: 63,
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
