import { View, StyleSheet, Image, StatusBar } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { router } from 'expo-router';
import { AuthContext } from '@/context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const OnBoardingScreen = () => {
  const { userDetails } = useContext(AuthContext);
  const [onboarding, setOnboarding] = useState(null);

  const checkOnboardingStatus = async () => {
    const item = await AsyncStorage.getItem('onboarding');
    if (item === 'completed') {
      setOnboarding('completed');
    } else {
      await AsyncStorage.setItem('onboarding', 'started');
      setOnboarding('started');
    }
  };

  useEffect(() => {
    // Check onboarding status when the component mounts
    checkOnboardingStatus();
  }, []);

  useEffect(() => {
    if (onboarding === null) return; // Wait until onboarding state is resolved

    const timeout = setTimeout(() => {
      if (userDetails) {
        // router.push('/(tabs)/home');
      } else if (onboarding === 'started') {
        router.replace('/(routes)/Welcome-intro');
      } else if (onboarding === 'completed') {
        router.replace('/login');
      }
    }, 2000);

    return () => clearTimeout(timeout); // Cleanup timeout on unmount
  }, [onboarding, userDetails]);

  return (
    <View style={styles.background}>
      <StatusBar hidden />
      <View
        style={{
          position: 'absolute',
          right: '-15%',
          borderTopLeftRadius: 50,
        }}
      >
        <Image
          source={require('../../assets/images/Ellipse2.png')}
          style={{}}
        />
      </View>
      <View style={[StyleSheet.absoluteFillObject, styles.container]}>
        <Image
          source={require('../../assets/images/COMESO.png')}
          style={styles.logo}
        />
      </View>
      <View
        style={{
          position: 'absolute',
          left: '-15%',
          bottom: '-15%',
          borderTopLeftRadius: 50,
        }}
      >
        <Image
          source={require('../../assets/images/Ellipse.png')}
          style={{}}
        />
      </View>
    </View>
  );
};

export default OnBoardingScreen;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  container: {
    display: 'flex',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    marginBottom: '20%',
    objectFit: 'contain',
  },
});
