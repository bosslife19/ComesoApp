import { View, Text, StyleSheet, Image, StatusBar } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { router } from 'expo-router';
import { AuthContext } from '@/context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const OnBoardingScreen = () => {
  const { userDetails } = useContext(AuthContext);
  const [onboarding, setOnboardingVal] = useState(null); // Use `null` as the initial state to detect uninitialized state.

  // Fetch or set onboarding state
  const initializeOnboarding = async () => {
    const item = await AsyncStorage.getItem('onboarding');
    if (item === 'completed') {
      setOnboardingVal('completed');
    } else {
      await AsyncStorage.setItem('onboarding', 'started');
      setOnboardingVal('started');
    }
  };

  useEffect(() => {
    initializeOnboarding();
  }, []);

  // Handle navigation
  useEffect(() => {
    if (onboarding !== null) {
      setTimeout(() => {
        if (userDetails) {
          router.push('/(tabs)/home');
        } else if (onboarding === 'started') {
          router.push('/(routes)/Welcome-intro');
        } else if (onboarding === 'completed') {
          
          router.push('/login');
        }
      }, 2000);
    }
  }, [onboarding, userDetails]);

  return (
    <View style={styles.background}>
      <StatusBar hidden />
      <View style={{ position: 'absolute', right: '-15%', borderTopLeftRadius: 50 }}>
        <Image source={require('../../assets/images/Ellipse2.png')} style={{}} />
      </View>
      <View style={[StyleSheet.absoluteFillObject, styles.container]}>
        <Image source={require('../../assets/images/COMESO.png')} style={styles.logo} />
      </View>
      <View style={{ position: 'absolute', left: '-15%', bottom: '-15%', borderTopLeftRadius: 50 }}>
        <Image source={require('../../assets/images/Ellipse.png')} style={{}} />
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
  welcomeText: {
    textAlign: 'center',
    fontSize: 40,
    color: '#fff',
    fontWeight: '600',
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
