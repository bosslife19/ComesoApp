import { View, Text, Image, TouchableOpacity, TextInput, Alert, StyleSheet, ScrollView, Platform, KeyboardAvoidingView, ActivityIndicator, Modal, Button} from "react-native";
import React, { useContext, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Paystack, paystackProps } from "react-native-paystack-webview";
import { WebView } from "react-native-webview";

import CustomHeader from "../../../components/CustomHeader";
import { Fontisto } from "@expo/vector-icons";
import { AuthContext } from "@/context/AuthContext";
import axiosClient from "../../../axiosClient";
import { router } from "expo-router";
import axios from "axios";

const AddMoney = () => {
  const { userDetails, setUserDetails, isUSno } = useContext(AuthContext);
  const paystackWebViewRef = useRef(paystackProps.PayStackRef);
  const [amount, setAmount] = useState(0);
  const [paymentUrl, setPaymentUrl] = useState('')
  const [loading, setLoading] = useState(false);
  const [modalVisible,setModalVisible] = useState(false)
  const callback_url = 'https://mycomeso.com';
  const cancel_url = "https://google.com";
  const notification = () =>{
    router.push("/(routes)/notifications")
  }
  const initializeTransaction = async () => {
     if (amount == 0) {
              return Alert.alert('Amount Required', 'Please enter amount of voucher you want to add');
            }
    try {
      setLoading(true);
      const response = await axios.post(
        'https://api.paystack.co/transaction/initialize',
        {
          email: userDetails.email,
          amount: amount *100,
          callback_url, 
          metadata: { cancel_action: "https://paystack.com/docs/api/" }
          
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.EXPO_PUBLIC_PAYSTACK_SECRET}`,
            'Content-Type': 'application/json',
          },
        }
      );
      
      
      setPaymentUrl(response.data.data.authorization_url);

      
      setLoading(false);
      setModalVisible(true)
      
    } catch (error) {
      setLoading(false);
      console.error('Error initializing transaction:', error.response?.data || error.message);
    }
  };
  const handleWebViewNavigation = (navState) => {
    const { url } = navState;

    // Paystack redirects to this URL on success
    if (url.includes(callback_url)) {
      
      setModalVisible(false); // Close the WebView
      Alert.alert('Success', 'Payment Successful');
      axiosClient.post('/user/top-up', {amount}).then(res=>{
        setUserDetails(prev=>({
          ...prev,
          balance: prev.balance + amount
        }))
        router.push('/(tabs)/home');
      }).catch(e=>console.log(e));
    }
    if(url.includes('https://paystack.com/docs/api/')){
      
      setModalVisible(false);
      Alert.alert('Payment Canceled', 'You have canceled this payment');
    }
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
       <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} 
        style={{ flex: 1 }}>
          {loading && <ActivityIndicator size="large" color="#0000ff" />}
      <View style={styles.container}>
      <View style={styles.row}>
        <TouchableOpacity onPress={()=>router.back()} style={styles.profileContainer}>
          <Image 
            source={require('../../../assets/images/headerback.png')} 
            width={30}
            height={30}
            resizeMode='contain'
            style={styles.profileImage}
          />
          
          
        </TouchableOpacity>

        <View style={styles.greetingContainer}>
          <Text style={styles.greetingText}>Add Voucher</Text>
        </View>

        <TouchableOpacity onPress={notification} style={styles.bellContainer}>
        {/* <Image 
            source={require('../../../assets/images/notificationIcon.png')} 
            style={styles.profileImage}
            width={30}
            height={30}
            resizeMode='contain'
          /> */}
          <Fontisto name="bell" size={30} color="black" />
          
        </TouchableOpacity>
      </View>
    </View>
    <Paystack
        paystackKey={process.env.EXPO_PUBLIC_PAYSTACK_PUBLIC}
        billingEmail={userDetails.email}
        amount={amount}
        billingName={userDetails.name}
        currency="GHS"
        onCancel={(e) => {
          // handle response here
        }}
        onSuccess={(res) => {
          // handle response here
           axiosClient.post('/user/top-up', {amount}).then(res=>{
            setUserDetails(prev=>({
              ...prev,
              balance: prev.balance + amount
            }))
            router.push('/(tabs)/home');
          }).catch(e=>console.log(e));
        }}
        ref={paystackWebViewRef}
      />

<View
      style={{
        marginTop: "10%",
        height: "25%",
        width: "90%",
        marginHorizontal: "5%",
        backgroundColor: "#F8FAFC",
        borderRadius: 12,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 5,
        padding: 16,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Header */}
      <View
        style={{
          height: "25%",
          width: "100%",
          backgroundColor: "#E0ECFF",
          paddingHorizontal: "5%",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,
          paddingVertical: 10,
        }}
      >
        <Text
          style={{
            fontSize: 16,
            fontFamily: "Poppins-Medium",
            color: "#1E3A8A",
          }}
        >
          Your Balance
        </Text>
        {/* <Feather name="arrow-up-right" size={20} color="#4A5568" /> */}
      </View>

      {/* Balance Section */}
      <View style={{ marginTop: "5%" }}>
        <Text
          style={{ fontSize: 36, fontWeight: "600", color: "#1E40AF" }}
        >
          {isUSno ? "$" : "₵"}
          {userDetails.balance}
        </Text>
      </View>
    </View>
      {/* <View>
        <View style={{ paddingHorizontal: "5%", marginTop: "4%" }}>
          <Text
            style={{
              fontSize: 14,
              fontWeight: 300,
              color: "rgba(51, 51, 51, 0.7)",
            }}
          >
            Copy or share your wallet account number and send any amount of your
            choice into it to top up account.
          </Text>
        </View>
      </View> */}

      <View style={{ paddingHorizontal: "5%", marginTop: "10%" }}>
        <Text style={{ fontFamily: "Alata", fontWeight: "400", fontSize: 19 }}>
          Top up your COMESO
        </Text>
      </View>
     <View
      style={{
        backgroundColor: "rgba(164, 169, 174, 0.2)",
        width: "90%",
        marginHorizontal: "auto",
        marginTop: 20,
        borderRadius: 10,
        paddingVertical: 5,
        flexDirection: 'row', // Align currency symbol and input side by side
        alignItems: 'center', // Vertically align the content
      }}
    >
      <Text style={{ fontSize: 18, paddingLeft: 10, color: "#333" }}>{isUSno? '$':'₵'}</Text>  
      
      <TextInput
        placeholder="Amount"
        keyboardType="numeric"
        style={{
          flex: 1, // Allow the input to take remaining space
          paddingLeft: 10,
          fontSize: 16,
          color: "#333",
          color:Platform.OS=='ios'&&'#aaa'
        }}
        placeholderTextColor={Platform.OS === "ios" &&"#aaa" } 
        value={amount}
        onChangeText={(val) => setAmount(val)}
      />
    </View>
      <View>
      <Text style={{ fontFamily: "Alata", fontWeight: "400", fontSize: 19 ,paddingHorizontal: "5%",marginTop:10}}>
        Select Payment
        </Text>
        <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false} // Hide the horizontal scroll indicator
      contentContainerStyle={{
        marginTop: "5%",
        paddingHorizontal: "5%",
      }}
    >
      {/* Wrap the TouchableOpacity components in the ScrollView */}
      {[...Array(1)].map((_, index) => (
        <TouchableOpacity
          key={index}
          style={{
            backgroundColor: "white",
            borderRadius: 10,
            paddingHorizontal: 10,
            paddingVertical: 0,
            alignItems: "center",
            justifyContent: "center",
            marginRight: "3%", // Add space between items
          }}
          onPress={() => {
            // if (amount == 0) {
            //   return Alert.alert('Amount Required', 'Please enter amount of voucher you want to add');
            // }
            // paystackWebViewRef.current.startTransaction();
            initializeTransaction();
          }}
        >
          <Image
            resizeMode="contain"
            source={require("../../../assets/images/paystacklogo.png")}
            style={styles.beneficiaryImage}
          />
        </TouchableOpacity>
      ))}
    </ScrollView>
    {/* <Text style={{ fontWeight: "300", fontSize: 14 ,paddingHorizontal: "5%",marginTop:10,color:"#333333B2",lineHeight:20.3,}}>
      Selecting any of the provided banks automatically opens the app for you to transfer money into your wallet.
        </Text> */}
      </View>
      <Modal visible={modalVisible} animationType="slide">
        <WebView 
          source={{ uri: paymentUrl }} 
          onNavigationStateChange={handleWebViewNavigation} 
        />
        {/* <TouchableOpacity activeOpacity={1} style={{position:'absolute', backgroundColor:'white', width:'50%', left:'30%', top:'40%', height:100}}>
          <Text>Cancel</Text>
        </TouchableOpacity> */}
        <Button  title="Cancel" onPress={() => setModalVisible(false)} />
      </Modal>
        </KeyboardAvoidingView>


    </SafeAreaView>
  );
};

export default AddMoney;

const styles = StyleSheet.create({
  container: {
     paddingHorizontal:23,
     
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    
    alignItems: 'center',
  },
  profileContainer: {
    position: 'relative', // To position the notification dot relative to the image
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 30,
  },
  greetingContainer: {
    flex: 1, // To push bell icon to the right side
    alignItems: 'center',
  },
  greetingText: {
    fontSize: 22,
    fontWeight: '600',
    lineHeight:27.72,
    fontFamily:'Sora'
  },
  bellContainer: {
    position: 'relative', // To position the notification dot relative to the bell icon
  },
  notificationDot: {
    position: 'absolute',
    top: -1,
    right: -1,
    width: 10,
    height: 10,
    borderRadius: 5, // Circular dot
    backgroundColor: '#E73726',
  },
  beneficiaryItem: {
    alignItems: "center",
    padding: 5,
    marginHorizontal: 5,
    borderRadius: 8,
    width: 100,
    shadowColor: "#6E758812",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 3, // Android shadow
  },
  beneficiaryImage: {
    width: 80,
    height: 60,
    },
});