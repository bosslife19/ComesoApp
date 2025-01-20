import {
  View,
  Text,
  ScrollView,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomHeader from "../../../components/CustomHeader";
import axiosClient from "../../../axiosClient";
import Toast from "react-native-toast-message";

const Complain = () => {
  const [isFocuses, setIsFocuses] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [complain, setComplain] = useState("");
  const [loading, setLoading] = useState(false);

  const handleComplain = async () => {
    if (!firstName || !lastName || !email || !complain) {
      return Alert.alert(
        "All fields are required",
        "Please fill in all the fields to continue"
      );
    }
    setLoading(true);
    try {
      const res = await axiosClient.post("/user/complain", {
        name: `${firstName} ${lastName}`,
        email,
        complain,
      });
      if (res.data.status) {
        setLoading(false);
        Alert.alert('Complaint logged successfully', 'Your complaint has been sent successfully. We will get back to you within 48 hours')
        
        setLastName("");
        setFirstName("");
        setEmail("");
        setComplain("");
      }
    } catch (error) {
      console.log(error);
    }
  };

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
        <KeyboardAvoidingView>
          <View style={{ gap: 10, paddingHorizontal: "5%" }}>
            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: isFocuses ? "#FFFFFF" : "#A4A9AE26",
                  marginVertical: 10,
                },
              ]}
              keyboardType="default"
              value={firstName}
              placeholder="First name"
              onChangeText={(value) => {
                setFirstName(value);
              }}
              placeholderTextColor={Platform.OS === "ios" ? "#aaa" : "#8E949A"}
              onFocus={() => setIsFocuses(true)}
              onBlur={() => setIsFocuses(false)}
            />
            <TextInput
              style={[
                styles.input,
                { backgroundColor: isFocuses ? "#FFFFFF" : "#A4A9AE26" },
              ]}
              keyboardType="default"
              value={lastName}
              placeholder="Last name"
              onChangeText={(value) => {
                setLastName(value);
              }}
              placeholderTextColor={Platform.OS === "ios" ? "#aaa" : "#8E949A"}
              onFocus={() => setIsFocuses(true)}
              onBlur={() => setIsFocuses(false)}
            />
            <TextInput
              style={[
                styles.input,
                { backgroundColor: isFocuses ? "#FFFFFF" : "#A4A9AE26" },
              ]}
              keyboardType="default"
              placeholder="Email Address"
              value={email}
              onChangeText={(value) => {
                setEmail(value);
              }}
              placeholderTextColor={Platform.OS === "ios" ? "#aaa" : "#8E949A"}
              onFocus={() => setIsFocuses(true)}
              onBlur={() => setIsFocuses(false)}
            />
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
              paddingLeft: "3%",
              height: "25%",
            }}
          >
            <TextInput
              placeholder="Type your message here..."
              placeholderTextColor={Platform.OS === "ios" && "#aaa"}
              style={{ color: Platform.OS == "ios" && "#aaa" }}
              value={complain}
              onChangeText={(val) => setComplain(val)}
            />
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
            onPress={handleComplain}
          >
            {loading ? (
              <ActivityIndicator color="white" size="small" />
            ) : (
              <Text
                style={{
                  color: "white",
                  fontSize: 18,
                  marginLeft: 10,
                }}
              >
                Save
              </Text>
            )}
          </TouchableOpacity>
        </KeyboardAvoidingView>
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
  input: {
    fontFamily: "SofiaPro",
    height: 56,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingLeft: 15,
    fontSize: 16,
    color: "#333",
    marginBottom: 20,
  },
});
