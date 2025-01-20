import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect } from "react";
import { createContext } from "react"
import * as Location from 'expo-location';

export const AuthContext = createContext(null);

export const AuthProvider = ({children})=>{
    const [userDetails, setUserDetails] = useState(null);
    const [authToken, setAuthToken] = useState("");
    const [location, setLocation] = useState(null)
    const [errorMsg, setErrorMsg] = useState(null);
    const [isUSno, setIsUsNo] = useState(false);
    useEffect(() => {
        async function getCurrentLocation() {
          
          let { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            return;
          }
    
          let location = await Location.getCurrentPositionAsync({});
          
          setLocation(location);
        }
    
        getCurrentLocation();
      }, []);
   
   AsyncStorage.getItem('authToken').then(token=>setAuthToken(token));
  

   return (
    <AuthContext.Provider value={{userDetails, authToken, setUserDetails, location, isUSno, setIsUsNo}}>
        {children}
    </AuthContext.Provider>
   )



}