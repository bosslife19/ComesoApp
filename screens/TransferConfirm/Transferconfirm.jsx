import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
 import logo from '../../assets/images/logo.png';
import SectionsLogin from "@/styles/Login/Login.styles";
import HeaderM from './HeaderM';
import { router, useLocalSearchParams } from 'expo-router';
import axiosClient from '../../axiosClient';
import {AuthContext} from '@/context/AuthContext'
import { Entypo } from '@expo/vector-icons';

const ConfirmTransfer = () => {
  const [buttonSpinner, setButtonSpinner] = useState(false);
  const {amount, name, phone} = useLocalSearchParams();
  const {userDetails, setUserDetails, isUSno} = useContext(AuthContext)


  const handleContinue = async() => {
    try {
      setButtonSpinner(true);
      const res = await axiosClient.post('/user/transfer-voucher', {
        receiver:name, amount
      })
      if(res.data.status){
        
       setButtonSpinner(false);
        setUserDetails(prev=>({
          ...prev,
          balance: prev.balance - amount
        }));
        
      router.push("/(routes)/successfull-transfer")
      }else if(res.data.error){
        return Alert.alert('Error', res.data.error);
      }
    } catch (error) {
      setButtonSpinner(false)
      router.push('/(routes)/failed');
      
    }
    

    
 };
  return ( 
    <View style={styles.container}>
      {/* Header */}
      <HeaderM />
      <Text style={styles.header}>Are you sure?</Text>

      {/* Description */}
      <Text style={styles.description}>
        We care about your privacy. Please make sure that you want to transfer money.
      </Text>

      {/* Box with Image and Content */}
      <View style={styles.boxContainer}>
      {/* <Image source={logo} style={styles.absoluteImage} /> */}
      <Entypo
                name="user"
                size={60}
                color="black"
                style={styles.absoluteImage}
              />

        
        <View style={styles.textContainer}>
          <Text style={styles.boxTexts}>{name}</Text>
          <Text style={styles.boxText}>{phone}</Text>
          <View style={styles.boxBoard}>
          <Text style={styles.boxTex}>Transactions Status:</Text>
          <Text style={[styles.boxTex, {fontWeight:"700"}]}> Pending</Text>
          </View>
        
         <View style={{flexDirection:'row', alignItems:"center",justifyContent:"center",paddingVertical:10}}>
         <Text style={styles.currencyText}>{isUSno? '$':'₵'}{amount}.00</Text>
         <Text style={styles.currency}>{isUSno?'USD':"GHC"}</Text>
         </View>
         <View style={{flexDirection:'row',gap:15,alignItems:"center",justifyContent:"center"}}>
         {/* <Text style={styles.TrfText}>Transfer fee</Text>
         <Text style={styles.amounts}>${1/100 * amount}<Text style={{fontSize:9}}>USD</Text></Text> */}
         </View>
        </View>

        {/* Row of Texts */}
        <View style={styles.rowContainer}>
          {/* <Text style={styles.rowTexts}>Converted Amount</Text>
          <Text style={styles.rowText}>E230.00 <Text style={{fontSize:9}}>EUR</Text></Text> */}
        </View>


        
      </View>
      <View>
      <TouchableOpacity
                onPress={handleContinue}
            style={[SectionsLogin.loginButtons,  ]}
            disabled={buttonSpinner}
          >
            {buttonSpinner ? (
              <ActivityIndicator size="small" color={"white"} />
            ) : (
              <Text style={[SectionsLogin.loginButtonText,{fontFamily: 'Alata',fontWeight:"700"}]}>Send Voucher</Text>
            )}
          </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F9F9F9',
  },
  header: {
     fontFamily: 'SofiaPro',
    fontSize: 32,
    lineHeight:39.52,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 20,
    color: '#456EFE',
  }, 
  description: {
    fontFamily: 'SofiaPro',
    lineHeight:26.37,
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
    color: '#A4A9AE',
    paddingHorizontal: 10,
  },
  boxContainer: {
    marginVertical:"6%",
    backgroundColor: '#A4A9AE26',
    borderRadius: 20,
    paddingVertical: 40,
    paddingHorizontal:20,
    shadowColor: '#A4A9AE26',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    textAlign:"center",
    elevation: 5,
    position: 'relative',
  },
  absoluteImage: {
    position: 'absolute',
    top: -30,
    left: '45%',
    width: 70,
    objectFit:"cover",
    height: 70,
    borderRadius: 30,
    paddingVertical:"3%",
    borderWidth:2,
    borderColor:"#F4F6FC"
  },
  textContainer: {
     marginBottom: 20,
  },
  boxTexts: {
    fontFamily: 'SofiaPro',
    paddingTop:5,
    fontSize: 26,
    textAlign:"center",
    fontWeight: '600',
    lineHeight:38,
    color: '#23303B',
    marginBottom: 10,
  },
  boxBoard:{
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"center",
     borderRadius:10,
    backgroundColor:"#f3dddd",
    paddingVertical:"3.7%",
    paddingHorizontal:"1%",
    marginBottom: 10,
  },
  boxTex: {
    fontSize: 16,
    fontFamily: 'SofiaPro',
    textAlign:"center",
    lineHeight:23.44,
    fontWeight: '500',
    color: '#FF6363',
   },
  boxText: {
    fontSize: 16,
    fontFamily: 'SofiaPro',
    lineHeight:23.44,
    textAlign:"center",
    fontWeight: '500',
    color: '#8E949A',
    marginBottom: 10,
  },
  currencyText: {
    fontFamily: 'SofiaPro',
    fontSize: 36,
    lineHeight:36,
    textAlign:"center",
    fontWeight: '600',
    color: '#23303B',
    marginBottom: 10,
  },
  currency: {
    fontFamily: 'SofiaPro',
    fontSize: 20,
    lineHeight:20,
    textAlign:"center",
    fontWeight: '600',
    color: '#8e949a',
    marginBottom: 10,
  },
  amounts:{
    fontFamily: 'Alata',
    fontSize: 14,
    lineHeight:20.51,
    letterSpacing:1,
    textAlign:"center",
    fontWeight: '400',
    color: '#23303B',
    marginBottom: 10,
  },
  TrfText:{
    fontFamily: 'Alata',
    fontSize: 14,
    lineHeight:20.51,
    textAlign:"center",
    fontWeight: '400',
    color: '#8e949a',
    marginBottom: 10,
  },
  rowContainer: {
    
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
  },
  rowTexts: {
    fontFamily: 'Alata',
    fontSize: 18,
    lineHeight:26.37,
    fontWeight: '400',
    color: '#8E949A',
  },
  rowText: {
    fontFamily: 'Alata',
    fontSize: 18,
    lineHeight:26.37,
    letterSpacing:1,
    fontWeight: '400',
    color: '#23303B',
  },
});

export default ConfirmTransfer;
