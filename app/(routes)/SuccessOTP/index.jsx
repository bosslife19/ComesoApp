import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import LottieView from 'lottie-react-native';
import { useNavigation } from '@react-navigation/native';
import { router } from 'expo-router';

const SuccessOTP = () => {
  const navigation = useNavigation();

  useEffect(() => {
    // Navigate to another screen or perform an action after 3 seconds
    const timeout = setTimeout(() => {
      router.push('/(routes)/login'); // Replace 'NextScreen' with your target screen name
    }, 3000);

    return () => clearTimeout(timeout); // Cleanup timeout
  }, [navigation]);

  return (
    <View style={styles.container}>
      <LottieView
        source={require("../../../assets/animations/sucessAnime.json")}
          autoPlay
        loop={false} // Since it's a success animation, no need to loop
        style={styles.lottie}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  lottie: {
    width: 300,
    height: 300,
  },
});

export default SuccessOTP;
