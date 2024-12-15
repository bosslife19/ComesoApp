import { View, Text, StyleSheet, Image, StatusBar } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { router } from 'expo-router';
import { AuthContext } from '@/context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
 
const  OnBoardingScreen =()=> {
        const { userDetails} = useContext(AuthContext);
        const [onboarding, setOnboardingVal] = useState();
        const setOnboarding = async ()=>{
          const item = await AsyncStorage.getItem('onboarding');
          if(item && item=='completed'){
            setOnboardingVal(item);
            return;
          }else{
            await AsyncStorage.setItem('onboarding', 'started');
            const value = await AsyncStorage.getItem('onboarding');
            setOnboardingVal(value);
          }
          
        }
       
        setOnboarding();

       
    useEffect(()=>{
      
        setTimeout(() => {
          
            if(userDetails){
              
              router.push('/(tabs)/home');
            }
            if(onboarding && onboarding =='started'){
                         router.push('/(routes)/Welcome-intro');
            }else if(onboarding && onboarding =='completed'){
              return router.push('/login');
            }
            
            

            
         }, 2000);
    },[onboarding])

  return (
    <View style={styles.background}>
           <StatusBar hidden />
      {/* <Text style={styles.welcomeText}>splashs</Text> */}
      <View
       style={{
            position:"absolute",right:"-15%",borderTopLeftRadius:50
       }}>
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
            position:"absolute",left:"-15%",bottom:"-15%",borderTopLeftRadius:50
       }}>
     <Image
      source={require('../../assets/images/Ellipse.png')}
      style={{}} 
      />
     </View>
       
    </View>
  )
}


export default OnBoardingScreen;

const styles = StyleSheet.create({
    background:{
      flex:1,
      backgroundColor:"#ffffff",
      },
    welcomeText:{
      textAlign:"center",
      fontSize:40,
      color:"#fff",
      fontWeight:"600"
    },
    container:{
        display:"flex",
         height:"100%",
        justifyContent: "center",
        alignItems:"center",
        // zIndex:1,
       },
    logo:{
       display:"flex",
      justifyContent:"center",
      alignItems:"center",
      width:"90%",
      marginBottom:"20%",
      objectFit:"contain"
    },
    
  })