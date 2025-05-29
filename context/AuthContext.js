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
    const [currency, setCurrency] = useState('')
   useEffect(() => {
  async function getCurrentLocation() {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setLocation(location);

    let geocode = await Location.reverseGeocodeAsync(location.coords);
    const countryCode = geocode[0]?.isoCountryCode;

    

    const countryToCurrency = {
      US: 'USD',
      NG: 'NGN',
      GB: 'GBP',
      IN: 'INR',
      DE: 'EUR',
      FR: 'EUR',
      GH:"GHC"
      // Add more as needed
    };

    const selectedCurrency = countryToCurrency[countryCode] || 'GHC';
    
    setCurrency(selectedCurrency); // optional: update UI dropdown too


   
  }

  getCurrentLocation();
}, []);

   
   AsyncStorage.getItem('authToken').then(token=>setAuthToken(token));
  

   return (
    <AuthContext.Provider value={{userDetails, authToken, setUserDetails, location, isUSno, setIsUsNo, currency, setCurrency}}>
        {children}
    </AuthContext.Provider>
   )



}