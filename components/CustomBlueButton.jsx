import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";

const CustomBlueButton = ({ text, onPress, toggleModal, buttonSpinner, }) => {
  return (
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
      onPress={() => {
        // toggleModal();
        onPress();
      }}
    >
     {
      buttonSpinner? (
        <ActivityIndicator size='small' color='white'/>
      ):(
        <>
        <AntDesign
        name="pluscircleo"
        size={24}
        color="white"
        style={{ position: "absolute", top: "27%", left: "10%" }}
      />
      <Text
        style={{
          color: "white",
          fontSize: 18,
          marginLeft: 10,
        }}
      >
        {text}
      </Text>
        </>
      )
     }
    </TouchableOpacity>
  );
};

export default CustomBlueButton;
