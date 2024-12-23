import { View, Text, TextInput, Platform } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomHeader from "../../../components/CustomHeader";

const Call = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <CustomHeader text='Contact' />

      <View style={{gap:10}}>
      <Text style={{fontFamily:'Sofia',fontSize:19, fontWeight:"600", top:'4%'}}>Your Name</Text>
            <View
              style={{
                backgroundColor: "rgba(164, 169, 174, 0.2)",
                width: "100%",
                marginHorizontal: "auto",
                marginTop: 20,
                borderRadius: 10,
                paddingVertical: 5,
              }}
            >
              
              <TextInput placeholder="Jonathan" placeholderTextColor={Platform.OS === "ios" &&"#aaa" } style={{color:Platform.OS=='ios'&&'#aaa'}} />
            </View>
            <Text style={{fontFamily:'Sofia',fontSize:19, fontWeight:"600"}}>Email</Text>
            <View
              style={{
                backgroundColor: "rgba(164, 169, 174, 0.2)",
                width: "100%",
                marginHorizontal: "auto",

                borderRadius: 10,
                paddingVertical: 5,
              }}
            >
              <TextInput placeholder="Last Name" placeholderTextColor={Platform.OS === "ios" &&"#aaa" } style={{color:Platform.OS=='ios'&&'#aaa'}}  />
            </View>
      </View>
    </SafeAreaView>
  );
};

export default Call;
