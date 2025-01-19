import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React, { useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomHeader from "../../../components/CustomHeader";
import { router } from "expo-router";
import {AuthContext} from '../../../context/AuthContext';

const Setting = () => {
  const {userDetails} = useContext(AuthContext)
  
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={{ height: "100%" }}>
        <View style={{ height: "100%" }}>
          <CustomHeader text="Setting" />
          <View
            style={{
              marginTop: "10%",
              marginBottom: "7%",
              paddingHorizontal: "5%",
            }}
          >
            <Text
              style={{ fontFamily: "Alata", fontSize: 19, fontWeight: "400" }}
            >
              My Phone Number
            </Text>
          </View>
          <View
            style={{
              shadowColor: "#171717",
              shadowOffset: { width: -2, height: 4 },
              shadowOpacity: 0.2,
              shadowRadius: 3,
              elevation: 0.5,
              height: 100,
              backgroundColor: "white",
              width: "90%",
              marginHorizontal: "auto",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingHorizontal: "3.5%",
              borderRadius: 10,
            }}
          >
            <View>
              <Text
                style={{
                  fontFamily: "Alata",
                  color: "rgba(35, 48, 59, 1)",
                  fontSize: 18,
                  fontWeight: "400",
                }}
              >
                {userDetails?.phone}
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: "Alata",
                  color: "rgba(164, 169, 174, 1)",
                  fontWeight: "400",
                }}
              >
                Comeso
              </Text>
            </View>
            <View>
              <Image
                source={require("../../../assets/images/setting-arrow.png")}
              />
            </View>
          </View>
          <View style={{ marginTop: "20%", paddingHorizontal: "5%" }}>
            <Text
              style={{
                fontFamily: "Sofia",
                fontSize: 19,
                fontWeight: "600",
                marginBottom: "5%",
              }}
            >
              Notifications
            </Text>
          </View>
          <View
            style={{
              shadowColor: "#171717",
              shadowOffset: { width: -2, height: 4 },
              shadowOpacity: 0.2,
              shadowRadius: 3,
              elevation: 0.5,
              height: 70,
              borderRadius: 6,
              backgroundColor: "white",
              width: "90%",
              marginHorizontal: "auto",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingHorizontal: "3.5%",
              //   marginVertical:"25%"
            }}
          >
            <View style={{ flexDirection: "row", gap: 10, alignItems:'center' }}>
              <View>
                <Image
                  source={require("../../../assets/images/notification-setting.png")}
                />
              </View>
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: "Sofia",
                  color: "rgba(35, 48, 59, 1)",
                  fontWeight: "500",
                }}
              >
                Pop-Up Notifications
              </Text>
            </View>
            <View>
              <View style={{width:45, height:25, borderRadius:20, backgroundColor:'rgba(10, 46, 226, 1)'}}>
                <View style={{width:20, height:20, borderRadius:10, backgroundColor:'white', marginTop:2, position:'absolute', right:2}}>

                </View>
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
              marginTop: "50%",
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
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Setting;
