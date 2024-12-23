import React, { useState, useEffect, useRef, useContext, } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet, ActivityIndicator, Platform } from 'react-native';
import { Entypo, Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import axios from 'axios';
import { AuthContext } from '../../../context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function OTPMainEmail() {
  const [otp, setOtp] = useState([]);
  const [otpLength, setOtpLength] = useState(4); // Default OTP length
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [timer, setTimer] = useState(119); // Set timer to 1 minute 59 seconds
  const inputRefs = useRef([]);
  const [otpVerified, setOtpVerified] = useState(false); // Track OTP verification status
  const timerRef = useRef(null);
  const router = useRouter();
  const baseUrl = process.env.EXPO_PUBLIC_BASE_URL;
  const{userDetails} = useContext(AuthContext);

  useEffect(() => {
    fetchOtpLengthFromApi();
    startCountdown();
    return () => {
      if (timerRef.current !== null) clearInterval(timerRef.current);
    };
  }, []);

  useEffect(()=>{
    const sendOtp = async()=>{
      try {
        const res =await axios.post(`${baseUrl}/api/send-otp`,{email:userDetails.email});
        
      } catch (error) {
        console.log(error);
      }

    }
    sendOtp();
  },[])

  const fetchOtpLengthFromApi = async () => {
    const responseOtpLength = 4; // Replace with actual API response length
    setOtpLength(responseOtpLength);
    setOtp(Array(responseOtpLength).fill(''));
    inputRefs.current = Array(responseOtpLength).fill(null);
  };

  const startCountdown = () => {
    if (timerRef.current !== null) clearInterval(timerRef.current);
    setTimer(119); // Reset timer to 1 minute 59 seconds
    timerRef.current = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer <= 0) {
          if (timerRef.current !== null) clearInterval(timerRef.current);
          return 0;
        }
        return prevTimer - 1;
      });
    }, 1000);
  };

  const handleChange = (text, index) => {
    if (text.length > 1) return;

    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    if (text && index < otpLength - 1) {
      inputRefs.current[index + 1]?.focus();
    } else if (index === otpLength - 1) {
      handleSignIn(newOtp);
    }
  };

  const validateOtp = (otp) => otp.every((digit) => digit !== '');

  const handleSignIn = async (otp) => {
    if (!validateOtp(otp)) {
      setError('Please enter a valid OTP');
      return;
    }

    setIsLoading(true);
    try {
      const enteredOtp = otp.join('');
      const res = await axios.post(`${baseUrl}/api/verify-email`,{email:userDetails.email, otp_code:enteredOtp});
      if(res.data.message){
        await AsyncStorage.setItem("authToken", res.data.token);
      }
      
      router.push('/(tabs)/home');
    } catch (error) {
      console.log(error)
    }
   
    // setTimeout(() => {
    //   setIsLoading(false);
    //  
      
    //   if (enteredOtp === '1234') {
    //     setSuccessMessage('Email address verification successful.');
    //     setError('');
    //     setOtpVerified(true);
    //     router.push('/(routes)/SuccessOTP'); 
    //   } else {
        
    //     setError('Invalid Code');
    //     setSuccessMessage('');
    //     setOtpVerified(false);
    //   }
    // }, 3000);
  };

  const handleResendCode = () => {
    startCountdown();
    setOtp(Array(otpLength).fill(''));
    setError('');
    setSuccessMessage('');
    setOtpVerified(false);
  };

  const formatTime = () => {
    const minutes = Math.floor(timer / 60);
    const seconds = timer % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <View style={styles.container}>
      <View style={styles.otpContainer}>
        {otp.map((item, index) => (
          <TextInput
            key={index}
            ref={(el) => (inputRefs.current[index] = el)}
            style={[
              styles.input,
              error ? styles.inputError : null,
              otpVerified && item ? styles.inputSuccess : null,
            ]}
            value={item}
            onChangeText={(text) => handleChange(text, index)}
            maxLength={1}
            keyboardType="numeric"
            placeholderTextColor={Platform.OS === "ios"?"#aaa":'#8E949A' }
          />
        ))}
      </View>
      {error && !successMessage && (
        <View style={styles.messageContainer}>
          <Entypo name="cross" style={styles.errorIcon} size={20} />
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}
      {successMessage && !error && (
        <View style={styles.messageContainer}>
          <Ionicons name="checkmark-circle-sharp" style={styles.successIcon} size={20} />
          <Text style={styles.successText}>{successMessage}</Text>
        </View>
      )}
      {isLoading && <ActivityIndicator size="large" color="#007bff" />}
      {timer > 0 ? (
        <Text style={styles.timerText}>Get a new code in {formatTime()}</Text>
      ) : (
        <TouchableOpacity onPress={handleResendCode}>
          <Text style={styles.resendButton}>Get a new code</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  input: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    textAlign: 'center',
    fontSize: 18,
    color: '#333',
    backgroundColor: '#fff',
  },
  inputError: {
    borderColor: 'red',
  },
  inputSuccess: {
    borderColor: 'green',
  },
  messageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  errorIcon: {
    color: 'red',
    marginRight: 5,
  },
  errorText: {
    color: 'red',
    fontSize: 14,
  },
  successIcon: {
    color: '#009217',
    marginRight: 5,
  },
  successText: {
    color: '#212121',
    fontSize: 14,
  },
  timerText: {
    fontSize: 14,
    color: '#333',
    marginTop: 10,
  },
  resendButton: {
    fontSize: 14,
    color: '#DEBC8E',
    fontWeight: 'bold',
    marginTop: 10,
  },
});
