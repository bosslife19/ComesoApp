import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import SectionsLogin from '@/styles/Login/Login.styles';
import HeaderM from '../TransferConfirm/HeaderM';

export default function Faileds() {
    const [buttonSpinner, setButtonSpinner] = useState(false);
    const router = useRouter();
  
    const handleContinue = () => {
      router.push("/(tabs)/home");
    };
  
    return (
      <View style={styles.container}>
        {/* Header */}
        <HeaderM />
        <Text style={styles.header}>Purchase Failed</Text>
  
        {/* Description */}
        <Text style={styles.description}>
        Your request to send voucher has failed. Transaction amount will be reversed within 24 Hours.
        </Text>
  
        {/* Box with Image and Content */}
        <View style={styles.boxContainer}>
          <Image
            source={require('../../assets/images/failed.png')}
            style={styles.absoluteImage}
            resizeMode="contain"
          />
        </View>
  
        <View>
          <TouchableOpacity
            onPress={handleContinue}
            style={[SectionsLogin.loginButtons]}
            disabled={buttonSpinner}
          >
            {buttonSpinner ? (
              <ActivityIndicator size="small" color={"white"} />
            ) : (
              <Text style={[SectionsLogin.loginButtonText, { fontFamily: 'Alata', fontWeight: "700" }]}>
               Back to Home
              </Text>
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
      fontFamily: 'Alata',
      fontSize: 30,
      lineHeight: 39.52,
      fontWeight: '400',
      textAlign: 'center',
      marginBottom: 20,
      color: '#F8332F',
    },
    description: {
      fontFamily: 'SofiaPro',
      lineHeight: 26.37,
      fontSize: 16,
      textAlign: 'center',
      marginBottom: 30,
      color: '#A4A9AE',
      paddingHorizontal: 10,
    },
    boxContainer: {
      marginVertical: "6%",
      borderRadius: 20,
      paddingVertical: 10,
       alignItems: 'center', // Ensure the image is centered
    },
    absoluteImage: {
      width: "100%",  
    },
  });