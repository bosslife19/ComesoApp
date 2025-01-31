import React, { useEffect } from 'react';
import { View, Image, Animated } from 'react-native';

const Loadingscreen = () => {
  const rotateValue = new Animated.Value(0); // Initial value of rotation

  useEffect(() => {
    // Start the animation on component mount
    Animated.loop(
      Animated.timing(rotateValue, {
        toValue: 1, // Spin to 360 degrees
        duration: 2000, // Duration of one full spin (in ms)
        useNativeDriver: true, // Use native driver for better performance
      })
    ).start();
  }, []);

  // Interpolate the rotation value to get a rotation degree
  const rotation = rotateValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'], // Rotate from 0deg to 360deg
  });

  return (
    <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
      <Animated.Image
source={require('../assets/images/comesologo.png')} // Your PNG logo
        style={{
          width: 100, // Set the width of the logo
          height: 100, // Set the height of the logo
          transform: [{ rotate: rotation }], // Apply the rotation
        }}
      />
    </View>
  );
};

export default Loadingscreen;
