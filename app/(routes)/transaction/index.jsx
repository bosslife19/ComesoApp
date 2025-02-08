import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomHeader from "../../../components/CustomHeader";
import { EvilIcons } from "@expo/vector-icons";
import { router } from "expo-router";

const Transactions = () => {
  const transactions = [
    {
      id: 1,
      type: "Account Top-up",
      status: "Received",
      date: "Feb 25, 2022",
      amount: "$5.00 USD",
      icon: "arrow-down-left",
      iconColor: "#04AD29",
      backgroundColor: "#E0F7EC",
      textColor: "#04AD29",
    },
    {
      id: 2,
      type: "Transfer Out",
      status: "Sent",
      date: "Feb 26, 2022",
      amount: "$10.00 USD",
      icon: "arrow-up-right",
      iconColor: "#F8332F",
      backgroundColor: "#FEE0E0",
      textColor: "#F8332F",
    },
    {
      id: 3,
      type: "Purchase",
      status: "Completed",
      date: "Feb 27, 2022",
      amount: "$20.00 USD",
      icon: "arrow-up-right",
      iconColor: "#F8332F",
      backgroundColor: "#FEE0E0",
      textColor: "#F8332F",
    },
        {
      id: 3,
      type: "Purchase",
      status: "Completed",
      date: "Feb 27, 2022",
      amount: "$20.00 USD",
      icon: "arrow-up-right",
      iconColor: "#F8332F",
      backgroundColor: "#FEE0E0",
      textColor: "#F8332F",
    },
  ];
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <CustomHeader text="Transactions" />

        <View
          style={{
            shadowColor: "#171717",
            shadowOffset: { width: -2, height: 4 },
            shadowOpacity: 0.2,
            shadowRadius: 3,
            elevation: 0.5,
            width: "85%",
            height: 80,
            backgroundColor: "white",
            marginHorizontal: "auto",
            marginTop: "7%",
            borderRadius: 5,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingHorizontal: "3%",
          }}
        >
          <Text
            style={{ fontSize: 18, fontFamily: "Sofia", fontWeight: "500" }}
          >
            Total Balance
          </Text>
          <Text
            style={{
              fontSize: 24,
              fontFamily: "Sofia",
              fontWeight: "500",
              flexDirection: "row",
            }}
          >
            $5500.00
            <Text style={{ fontSize: 8 }}>USD</Text>
          </Text>
        </View>

        <View
          style={{
            width: "85%",
            height: 43,
            backgroundColor: "rgba(163, 168, 172, 0.3)",
            marginTop: "5%",
            marginHorizontal: "auto",
            borderRadius: 10,
            paddingHorizontal: "12%",
            justifyContent: "center",
          }}
        >
          <TextInput
            placeholder="Search"
            style={{ fontSize: 18, fontFamily: "Sofia",color:Platform.OS=='ios'&&'#aaa' }}
            placeholderTextColor={Platform.OS === "ios" &&"#aaa" } 
          />
          <View style={{ position: "absolute", top: "30%", left: "6%" }}>
            <EvilIcons name="search" size={24} color="rgba(142, 148, 154, 1)" />
          </View>
        </View>
        <TouchableOpacity
        onPress={()=>router.push('/(routes)/profile')}
          style={{
            width: "35%",
            height: 42,
            marginHorizontal: "auto",
            marginTop:14,
             marginBottom:20,
            backgroundColor: "rgba(163, 168, 172, 0.3)",
            borderRadius: 5,
            flexDirection: "row",
            gap: 4,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              fontSize: 14,
              fontFamily: "Alata",
              color: "rgba(141, 141, 141, 1)",
              left: "-4%",
            }}
          >
            Past 1 Month
          </Text>
          <View style={{ width: 16, height: 16 }}>
            <Image
              source={require("../../../assets/images/select-arrow.png")}
              style={{ width: "100%", height: "100%" }}
              resizeMode="contain"
            />
          </View>
        </TouchableOpacity>

{
 transactions.slice().reverse().map(item=>(
        <View
          style={{
            shadowColor: "#171717",
            shadowOffset: { width: -2, height: 4 },
            shadowOpacity: 0.2,
            shadowRadius: 3,
            elevation: 5,
            width: "85%",
            height: 80,
            backgroundColor: "white",
            marginHorizontal: "auto",
            marginBottom: 15,
            borderRadius: 5,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            // paddingHorizontal: "3%",
          }}
        >
          <View
            style={{
              flexDirection: "row",
            //   gap: 3,
              alignItems:'center',
              left:'-7%',
              top:'5%',
              alignSelf:'center',
              
            }}
          >
            <View>
              <Image
                source={require("../../../assets/images/downtransaction.png")}
                width={51}
                height={51}
                resizeMode="contain"
              />
            </View>
            <View style={{left:'-18%', top:'-3%'}}>
                <Text style={{fontSize:14}}>Account Top-up</Text>
                <View style={{flexDirection:'row', alignItems:'center', gap:5}}>
                    <Text style={{fontSize:12, color:"rgba(4, 173, 41, 1)"}}>Received</Text>
                    <Text style={{fontSize:12, color:"rgba(164, 169, 174, 1)"}}>Feb 25,</Text>
                </View>
            </View>
          </View>
          <View style={{left:'-10%'}}>
          <Text
            style={{
              fontSize: 20,
              fontFamily: "Sofia",
              fontWeight: "500",
              flexDirection: "row",
            }}
          >
            $5.00
            <Text style={{ fontSize: 8 }}>USD</Text>
          </Text>
          </View>
        </View>
    ))
}

        
      </ScrollView>
    </SafeAreaView>
  );
};

export default Transactions;

const styles = StyleSheet.create({});
