import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { AuthContext } from "@/context/AuthContext";
import axios from "axios";
import { goBack } from "expo-router/build/global-state/routing";
import { useNavigation } from "@react-navigation/native";

const SearchFacilities = () => {
  const { location } = useContext(AuthContext);
  const [hospitals, setHospitals] = useState([]);
  useEffect(() => {
    const getNearestFacilities = async () => {
      if (location) {
        try {
          
          const res = await axios.get(
            `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location.coords.latitude},${location.coords.longitude}&radius=1500&type=hospital&keyword=health&key=${process.env.EXPO_PUBLIC_GOOGLE_MAPS_API}`
          );
         
          if (res.data.results.length > 0) {
            setHospitals(res.data.results);
          }
        } catch (error) {
          console.log(error);
        }
      }
    };
    getNearestFacilities();
  }, []);

  const navigation = useNavigation();

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={{ flex: 1, paddingHorizontal: "5%" }}>
      <ScrollView>
        <View
          style={{
            marginTop: "5%",
            paddingHorizontal: "5%",
            maxHeight: "100%",
            
          }}
        >
          <View
            style={{
              backgroundColor: "#0A2EE2",
              height: 50,
              borderRadius: 5,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingHorizontal: "6%",
            }}
          >
            <TouchableOpacity onPress={goBack}>
              <Image
                source={require("../../assets/images/left-arrow.png")}
                height={20}
                width={20}
              />
            </TouchableOpacity>
            <Text style={{ color: "white" }}>
              Nearest Hospital Close to you
            </Text>
            <TouchableOpacity>
              <Image
                source={require("../../assets/images/location.png")}
                height={20}
                width={20}
              />
            </TouchableOpacity>
          </View>
        </View>
        {hospitals.length > 0 ? (
          hospitals.map((hospital) => (
            <View style={{ paddingHorizontal: "5%" }}>
              
              <View
                style={{
                  marginVertical: "7%",
                  // paddingHorizontal:'5%',
                  backgroundColor: "white",
                  paddingVertical: 10,
                  borderRadius: 5,
                  // shadowColor:'gray',
                  shadowColor: "#171717",
                  shadowOffset: { width: -2, height: 4 },
                  shadowOpacity: 0.2,
                  
                  shadowRadius: 3,
                  elevation: 10,
                }}
              >
                <View style={{ borderRadius: 10 }}>
                  <Image
                    source={{ uri: hospital.icon }}
                    style={{ width: "100%", }}
                    resizeMode="contain"
                  />
                </View>
                <View style={{ flexDirection: "row", alignItems:'center' }}>
                  <View
                    style={{ top: "-7%", paddingLeft: 10, gap: 2, flex: 3 }}
                  >
                    <Text
                      style={{
                        fontFamily: "Poppins",
                        fontWeight: "bold",
                        fontSize: 14,
                      }}
                    >
                      {hospital.name}
                    </Text>
                    <Text
                      style={{
                        fontFamily: "Poppins",
                        fontWeight: 400,
                        fontSize: 12,
                      }}
                    >
                      {hospital.vicinity}
                    </Text>
                  </View>
                  {/* <TouchableOpacity
                    style={{ flex: 1, marginTop:3 }}
                    onPress={() =>
                      router.push({
                        pathname: "/(routes)/map",
                        params: {
                          latitude: hospital.geometry.location.lat,
                          longitude: hospital.geometry.location.lng,
                          hospitalName: hospital.name,
                        },
                      })
                    }
                  >
                    <Image
                      source={require("../../assets/images/rightArrow.png")}
                      width={30}
                      height={30}
                    />
                  </TouchableOpacity> */}
                </View>
              </View>
            </View>
          ))
        ) : (
          <View
            
          >
            <Text style={{ marginTop: 10, textAlign: "center" }}>
              No Hospitals Found
            </Text>
          </View>
        )}

        {/* <View style={{paddingHorizontal:'5%'}}>
      <View
        style={{
          marginVertical: "7%",
          // paddingHorizontal:'5%',
          backgroundColor:'white',
          paddingBottom:10,
          borderRadius:5,
          // shadowColor:'gray',
          shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
          elevation:10
        }}
      >
        <View style={{borderRadius:10}}>
          <Image
            source={require("../../assets/images/locationImage.png")}
            style={{ width: "100%", top:'-10%' }}
            resizeMode="contain"
          />
        </View>
        <View style={{flexDirection:'row'}}>
        <View style={{top:'-7%', paddingLeft:10,gap:2, flex:3}}>
        <Text style={{fontFamily:'Poppins', fontWeight:'bold', fontSize:14}}>University Teaching Hospital</Text>
        <Text style={{fontFamily:"Poppins", fontWeight:400, fontSize:12}}>No 15, Kwara Street, Maryland, Lagos</Text>
        </View>
        <TouchableOpacity style={{flex:1}}>
          <Image source={require('../../assets/images/rightArrow.png')} width={30} height={30}/>
        </TouchableOpacity>
        </View>
        
        
      </View>
      
      </View>
      <View style={{paddingHorizontal:'5%'}}>
      <View
        style={{
          marginVertical: "7%",
          // paddingHorizontal:'5%',
          backgroundColor:'white',
          paddingBottom:10,
          borderRadius:5,
          // shadowColor:'gray',
          shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
          elevation:10
        }}
      >
        <View style={{borderRadius:10}}>
          <Image
            source={require("../../assets/images/locationImage.png")}
            style={{ width: "100%", top:'-10%' }}
            resizeMode="contain"
          />
        </View>
        <View style={{flexDirection:'row'}}>
        <View style={{top:'-7%', paddingLeft:10,gap:2, flex:3}}>
        <Text style={{fontFamily:'Poppins', fontWeight:'bold', fontSize:14}}>University Teaching Hospital</Text>
        <Text style={{fontFamily:"Poppins", fontWeight:400, fontSize:12}}>No 15, Kwara Street, Maryland, Lagos</Text>
        </View>
        <TouchableOpacity onPress={()=>router.push('beneficiary')} style={{flex:1}}>
          <Image source={require('../../assets/images/rightArrow.png')} width={30} height={30}/>
        </TouchableOpacity>
        </View>
        
        
      </View>
      
      </View> */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default SearchFacilities;

const styles = StyleSheet.create({});
