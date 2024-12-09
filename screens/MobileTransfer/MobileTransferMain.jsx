import React, { useState, useEffect } from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import MobileTransferB from '../../components/MobilePage/MobileTransferB';
import LottieView from 'lottie-react-native';

const MobileTransferMain = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate a loading delay
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 3000); // 3 seconds loading time

    return () => clearTimeout(timeout); // Cleanup timeout on unmount
  }, []);

  if (isLoading) {
    return (
      <View style={style.loadingContainer}>
        <LottieView
          source={require('../../assets/animations/Animation - 1733645708075.json')} // Replace with the path to your Lottie file
          autoPlay
          loop 
          style={style.lottie}
        />
      </View>
    );
  }
    return (
        <>
          <MobileTransferB/>  
        </>
    );
} 

const style = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff', // Adjust background color as needed
  },
  lottie: {
    width: 200,
    height: 200, // Adjust size as needed
  },
});
export default MobileTransferMain;
