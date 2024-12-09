import { View, Text,StatusBar } from 'react-native'
import React from 'react'
import OnBoardingScreen from '@/screens/onBoarding/onBoarding'

const OnBoarding =() =>{
  return (
    <>
    <StatusBar barStyle="dark-content" />
    <OnBoardingScreen/>
    </>
  )
}

export default OnBoarding;