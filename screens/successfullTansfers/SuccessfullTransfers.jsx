import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router'; // Assuming you're using Expo Router
import SectionsLogin from '@/styles/Login/Login.styles';
import HeaderM from '../TransferConfirm/HeaderM';

const SuccessfullTransfers = () => {
  const [buttonSpinner, setButtonSpinner] = useState(false);
  const router = useRouter();

  const handleContinue = () => {
    router.push("/(routes)/failed");
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <HeaderM />
      <Text style={styles.header}>Transfer Successful</Text>

      {/* Description */}
      <Text style={styles.description}>
        Your voucher has been transferred successfully.
      </Text>

      {/* Box with Image and Content */}
      <View style={styles.boxContainer}>
        <Image
          source={require('../../assets/images/successfullbg.png')}
          style={styles.absoluteImage}
          resizeMode="contain"
        />
      </View>

      <View>
        <TouchableOpacity
          onPress={()=>router.push('/(tabs)/home')}
          style={[SectionsLogin.loginButtons]}
          disabled={buttonSpinner}
        >
          {buttonSpinner ? (
            <ActivityIndicator size="small" color={"white"} />
          ) : (
            <Text style={[SectionsLogin.loginButtonText, { fontFamily: 'Alata', fontWeight: "700" }]}>
              Go back
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
    color: '#456EFE',
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

export default SuccessfullTransfers;
