import { View, Text, ScrollView, TextInput, StyleSheet, TouchableOpacity, Platform } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomHeader from "../../../components/CustomHeader";

const Complain = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        
          <CustomHeader text="Complain" />
          <Text
            style={{
              marginLeft: "5%",
              marginTop: "10%",
              color: "rgba(35, 48, 59, 1)",
              fontFamily: "Sofia",
              fontSize: 19,
              fontWeight: "600",
            }}
          >
            Enter your details
          </Text>
          <View style={{ gap: 10, paddingHorizontal: "5%" }}>
            <View
              style={{
                backgroundColor: "rgba(164, 169, 174, 0.2)",
                width: "100%",
                marginHorizontal: "auto",
                marginTop: 20,
                borderRadius: 10,
                paddingVertical: 5,
                paddingLeft:'3%'
              }}
            >
              <TextInput placeholder="First Name" placeholderTextColor={Platform.OS === "ios" &&"#aaa" } style={{color:Platform.OS=='ios'&&'#aaa'}} />
            </View>

            <View
              style={{
                backgroundColor: "rgba(164, 169, 174, 0.2)",
                width: "100%",
                marginHorizontal: "auto",

                borderRadius: 10,
                paddingVertical: 5,
                paddingLeft:'3%'
              }}
            >
              <TextInput placeholder="Last Name" placeholderTextColor={Platform.OS === "ios" &&"#aaa" } style={{color:Platform.OS=='ios'&&'#aaa'}} />
            </View>

            <View style={{ flexDirection: "row", gap: 5 }}>
              <View
                style={{
                  backgroundColor: "rgba(164, 169, 174, 0.2)",
                  width: "100%",
                  marginHorizontal: "auto",

                  borderRadius: 10,
                  paddingVertical: 5,
                  flex: 4,
                  paddingLeft:'3%'
                }}
              >
                <TextInput placeholder="Email Address" placeholderTextColor={Platform.OS === "ios" &&"#aaa" } style={{color:Platform.OS=='ios'&&'#aaa'}} />
              </View>
            </View>

            <View
              style={{
                backgroundColor: "rgba(164, 169, 174, 0.2)",
                width: "100%",
                marginHorizontal: "auto",

                borderRadius: 10,
                paddingVertical: 5,
                paddingLeft:'3%'
              }}
            >
              <TextInput placeholder="CNIC" placeholderTextColor={Platform.OS === "ios" &&"#aaa" } style={{color:Platform.OS=='ios'&&'#aaa'}} />
            </View>
          </View>

          <Text
            style={{
              marginLeft: "5%",
              marginTop: "10%",
              color: "rgba(35, 48, 59, 1)",
              fontFamily: "Sofia",
              fontSize: 19,
              fontWeight: "600",
            }}
          >
            Enter your Complain
          </Text>
          <View
              style={{
                backgroundColor: "rgba(164, 169, 174, 0.2)",
                width: "90%",
                marginHorizontal: "auto",
                marginTop: 20,
                borderRadius: 10,
                paddingVertical: 5,
                paddingLeft:'3%',
                height:"25%"
              }}
            >
              <TextInput placeholder="Type your message here..." placeholderTextColor={Platform.OS === "ios" &&"#aaa" } style={{color:Platform.OS=='ios'&&'#aaa'}} />
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
            marginTop: "15%",
              marginBottom: 20,
            }}
            onPress={() => {router.push('/(routes)/complain')}}
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
        
      </ScrollView>
    </SafeAreaView>
  );
};

export default Complain;

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
    height: 55,
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
