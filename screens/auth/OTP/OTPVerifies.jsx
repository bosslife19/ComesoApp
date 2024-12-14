import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, StyleSheet, SafeAreaView, TextInput, TouchableOpacity, Image } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Lottie from "lottie-react-native";
import OTPMainEmail from "./OTPMainEmail";
import { router } from "expo-router";

const OTPVerifies = () => {
  const [showAnimation, setShowAnimation] = useState(true);

  const handleHelp = () => {
    
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff", paddingTop: "4%" }}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        style={{ backgroundColor: "#fff" }}
        scrollEventThrottle={16}
      >
        {/* Animation Section */}
        {showAnimation && (
          <View style={styles.animationContainer}>
            <Lottie
              source={require("../../../assets/animations/emails.json")}
              autoPlay
              loop
              style={{ width: 200, height: 250 }}
            />
          </View>
        )}

        {/* Header Section with Logo */}
        <View style={styles.signs}>
          {/* <Image
            source={require("../../../assets/images/logo.png")}
            style={{ width: 150, height: 50 }}
            resizeMode="contain"
          /> */}
        </View>

        {/* Title and Instructions */}
        <View style={styles.instructions}>
          <Text style={styles.title}>Verify Your Email Address</Text>
          <Text style={styles.subtitle}>
            We sent a 4-digit code to{" "}
            <Text style={styles.phoneNumber}>matthew.c@gmail.com</Text>. Please enter it below to verify your account.
          </Text>
        </View>

        {/* OTP Input Section */}
        <View style={styles.otpSection}>
          <OTPMainEmail />
        </View>

        {/* Help Section */}
        {/* <View style={styles.helpSection}>
          <MaterialCommunityIcons name="message-question" size={24} color="#DEBC8E" />
          <Text style={styles.helpText}>Need help?</Text>
          <TouchableOpacity onPress={()=> router.push("/(routes)/")}>
            <Text style={styles.helpLink}>Go Back</Text>
          </TouchableOpacity>
        </View> */}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  animationContainer: {
    alignItems: "center",
    // marginBottom: 20,
  },
  signs: {
    alignItems: "center",
    // marginBottom: 20,
  },
  instructions: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
    fontFamily:"SofiaProBold"
  },
  subtitle: {
    fontSize: 16,
    color: "#555",
    textAlign: "center",
    
  },
  phoneNumber: {
    fontWeight: "bold",
    color: "#000",
  },
  otpSection: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  helpSection: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  helpText: {
    fontSize: 16,
    color: "#333",
    marginLeft: 10,
  },
  helpLink: {
    color: "#DEBC8E",
    fontWeight: "bold",
    marginLeft: 5,
  },
});

export default OTPVerifies;
