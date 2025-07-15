import {
  Entypo,
  FontAwesome,
  Fontisto,
  Ionicons,
  SimpleLineIcons,
} from "@expo/vector-icons";
import { useContext, useState } from "react";
import CountryPicker, {
  Country,
  CountryCode,
} from "react-native-country-picker-modal";
import DropDownPicker from 'react-native-dropdown-picker'
import {
  ActivityIndicator,
  Alert,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { router } from "expo-router";
import SectionsLogin from "@/styles/Login/Login.styles";
import UncommonStyles from "@/styles/Uncommon.styles";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from "@/context/AuthContext";
import Toast from "react-native-toast-message";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SignUpScreen() {
  const baseUrl = process.env.EXPO_PUBLIC_BASE_URL;
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [agreePrivacy, setAgreePrivacy] = useState(false);
  const [buttonSpinner, setButtonSpinner] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [countryCode, setCountryCode] = useState("GH"); // Default to 'US'
  const [callingCode, setCallingCode] = useState("+233"); // Default calling code for 'US'

   const [open, setOpen] = useState(false);
  const [currency, setCurrency] = useState(null);
  const [items, setItems] = useState([
    { label: 'USD - US Dollar', value: 'USD' },
    { label: 'EUR - Euro', value: 'EUR' },
    { label: 'NGN - Nigerian Naira', value: 'NGN' },
    { label: 'GBP - British Pound', value: 'GBP' },
    { label: 'GHC - Ghana Cedic', value: 'GHC' },
  ]);
  

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {setUserDetails} = useContext(AuthContext);
console.log(currency)
  // Handle phone number change, only numeric values
  const handlePhoneChange = (number) => {
    const filteredNumber = number.replace(/[^0-9]/g, ""); // Remove non-numeric characters
    setPhoneNumber(filteredNumber);
  };

  // Handle country selection from CountryPicker
  const onSelectCountry = (country) => {
    setCountryCode(country.cca2); // Set the selected country code
    setCallingCode(country.callingCode[0]); // Set the corresponding calling code
  };

  // const handlePrint = () => {
  //   router.push("/(routes)/finger-print");
  // };

  const handleSignUp = async () => {
    if (countryCode === "US") { // Check if default flag is selected
      Toast.show({
        type: "error",
        position: "top",
        text1: "Flag Required",
        text2: "Please select a country before submitting.",
      });
      return;
    }
  
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailRegex.test(email)) {
      Toast.show({
        type: "error",
        position: "top",
        text1: "Please enter a valid email address",
      });
      return;
    }
  
    if (!agreePrivacy || !agreeTerms) {
      Toast.show({
        type: "error",
        position: "top",
        text1: "Agreement Required",
        text2: "Please agree to the Terms & Privacy before continuing.",
      });
      return;
    }
  
    if (!name || !email || !password || !phoneNumber || !currency) {
      Toast.show({
        type: "error",
        position: "top",
        text1: "Missing Fields",
        text2: "Please fill all fields before submitting.",
      });
      return;
    }
  
    try {
    setButtonSpinner(true);
   await AsyncStorage.clear();
      const response = await axios.post(`${baseUrl}/api/sign-up`, {
        name,
        email,
        password,
        phone:(callingCode.startsWith("+") ? callingCode : "+" + callingCode) + phoneNumber,
        currency
      });
      
      await AsyncStorage.clear();
      setButtonSpinner(false);

      if(response.data.error){
        return Toast.show({
          type: "error",
          position: "top",
          text1: "Error",
          text2: response.data.error,
        });
      }
  
      await AsyncStorage.setItem("userDetails", JSON.stringify(response.data.user));
      // await AsyncStorage.setItem("authToken", response.data.token);
      // const tokens = await AsyncStorage.getItem("authToken");
  
      setUserDetails(response.data.user);
  
      // Show Login Successful toast
      Toast.show({
        type: "success",
        position: "top",
        text1: "Signup Successful",
        text2: "You have signed up successfully",
      });
  
      // Redirect to login page
      router.push("/(routes)/otpmain");
    } catch (error) {
      
      setButtonSpinner(false);
      Toast.show({
        type: "error",
        position: "top",
        text1: "Error",
        text2: error.response?.data?.message || "Something went wrong. Please try again.",
      });
      console.log(error);
    }
  };
  return (
    <SafeAreaView
      style={{
        justifyContent: "center",
        paddingTop: "33%",
        height: "100%",
      }}
    >
      <View>
        <Text
          style={[
            SectionsLogin.welcomeText,
            {
              fontFamily: "SofiaPro",
              color: "#0A2EE2",
              lineHeight: 43.95,
              fontWeight: "400",
              fontSize: 30,
            },
          ]}
        >
          Create Your Account
        </Text>
        <View style={SectionsLogin.inputContainer}>
          {/* Name */}
          <View>
            <TextInput
              style={[
                SectionsLogin.input,
                { fontFamily: "SofiaPro", paddingHorizontal: 0 },
                Platform.OS === "ios" && styles.iosPlaceholder, // Conditional styling for iOS
              ]}
              keyboardType="default"
              placeholderTextColor={Platform.OS === "ios" ? "#111" : undefined} 
              value={name}
              placeholder="Username"
              onChangeText={(value) => setName(value)}
            />
          </View>

          {/* Email Input */}
          <View style={{ marginTop: 20 }}>
            <TextInput
              style={[
                SectionsLogin.input,
                { fontFamily: "SofiaPro", paddingHorizontal: 0 },
                Platform.OS === "ios" && styles.iosPlaceholder, // Conditional styling for iOS
              ]}
              keyboardType="email-address"
              placeholderTextColor={Platform.OS === "ios" ? "#111" : undefined} 
              value={email}
              placeholder="email"
              onChangeText={(value) => setEmail(value)}
            />
          </View>

          {/* Phone Number Input */}
          <View style={styles.container}>
            <View style={styles.phoneContainer}>
              <TextInput value={callingCode} onChangeText={val=>setCallingCode(val)}/>
              {/* <CountryPicker withCallingCode withFilter countryCode={countryCode} onSelect={onSelectCountry} containerButtonStyle={styles.countryPicker} /> */}
              <TextInput
                style={[styles.phoneInput, Platform.OS === "ios" && styles.iosPlaceholder,]}
                placeholder={`Enter phone number (without ${callingCode})`} 
                placeholderTextColor={Platform.OS === "ios" ? "#111" : undefined} 
                value={phoneNumber}
                onChangeText={(text) => setPhoneNumber(text.replace(/[^0-9]/g, ""))}
                keyboardType="phone-pad"
              />
            </View>
 <View style={styles.dropdownContainer}>
        <DropDownPicker
          open={open}
          value={currency}
          items={items}
          setOpen={setOpen}
          setValue={setCurrency}
          setItems={setItems}
          placeholder="Select your currency"
          style={styles.dropdown}
          dropDownContainerStyle={styles.dropdownBox}
        />
      </View>
          </View>

          <View
            style={{
              marginTop: 20,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            {/* Password Input */}
            <View style={{ width: "100%" }}>
              <TextInput
                style={[SectionsLogin.input, { fontFamily: "SofiaPro" },
                  Platform.OS === "ios" && styles.iosPlaceholder
                ]}
                secureTextEntry={!isPasswordVisible}
                value={password}
                placeholderTextColor={Platform.OS === "ios" ? "#111" : undefined} 
                placeholder="password"
                onChangeText={(value) => setPassword(value)}
              />
              <TouchableOpacity
                style={SectionsLogin.visibleIcon}
                onPress={() => setPasswordVisible(!isPasswordVisible)}
              >
                {isPasswordVisible ? (
                  <Ionicons
                    name="eye-off-outline"
                    size={20}
                    color={"#747474"}
                  />
                ) : (
                  <Ionicons name="eye-outline" size={20} color={"#747474"} />
                )}
              </TouchableOpacity>
            </View>
            {/* Finger print */}
            {/* <TouchableOpacity onPress={handlePrint}>
              <Ionicons name="finger-print-outline" size={44} color="black" />
            </TouchableOpacity> */}
          </View>

          <View style={styles.checkboxContainer}>
            {/* Agree with Terms & Conditions */}
            <TouchableOpacity
              style={[styles.checkbox, agreeTerms && styles.checkboxSelected]}
              onPress={() => setAgreeTerms(!agreeTerms)}
            >
              {agreeTerms && <Text style={styles.checkmark}>✔</Text>}
            </TouchableOpacity>
            <Text style={[styles.checkboxLabel, { fontFamily: "SofiaPro" }]}>
              I agree with{" "}
            </Text>
            
            <TouchableOpacity onPress={()=> router.push("/(routes)/Terms")}>
            <Text
              style={[
                styles.checkboxLabel,
                { fontFamily: "SofiaPro", color: "#0A2EE2" },
              ]} 
            >
              Terms & Conditions
            </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.checkboxContainer}>
            {/* Agree with Privacy Policy */}
            <TouchableOpacity
              style={[styles.checkbox, agreePrivacy && styles.checkboxSelected]}
              onPress={() => setAgreePrivacy(!agreePrivacy)}
            >
              {agreePrivacy && (
                <Text style={[styles.checkmark, { fontFamily: "SofiaPro" }]}>
                  ✔
                </Text>
              )}
            </TouchableOpacity>
            <Text style={[styles.checkboxLabel, { fontFamily: "Alata" }]}>
              I agree with the{" "}
            </Text>
            <TouchableOpacity  onPress={()=> router.push("/(routes)/privacy")}>
            <Text
              style={[
                styles.checkboxLabel,
                { fontFamily: "Alata", color: "#0A2EE2" },
              ]}
            >
              {" "}
              Privacy Policy
            </Text>
            </TouchableOpacity>
          </View>

          {/* Login Button */}
          <TouchableOpacity
            style={SectionsLogin.loginButton}
            disabled={buttonSpinner}
            onPress={handleSignUp}
          >
            {buttonSpinner ? (
              <ActivityIndicator size="small" color={"white"} />
            ) : (
              <Text
                style={[
                  SectionsLogin.loginButtonText,
                  { fontFamily: "SofiaPro" },
                ]}
              >
                SignUp
              </Text>
            )}
          </TouchableOpacity>

          {/* Sign Up Redirect */}
          <View style={SectionsLogin.signupRedirect}>
            <Text
              style={{
                fontFamily: "SofiaPro",
                fontSize: 18,
                lineHeight: 26.37,
                fontWeight: "400",
                color: "#8E949A",
              }}
            >
              Already have an account?
            </Text>
            <TouchableOpacity onPress={() => router.push("/login")}>
              <Text
                style={[SectionsLogin.signUpText, { fontFamily: "SofiaPro", marginTop:Platform.OS=='ios' && 2 }]}
              >
                Login
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {/* <Toast ref={(ref) => Toast.setRef(ref)} /> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
  },
  phoneContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 16,
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "#F1F2F3",
  },
  callingCode: {
    marginRight: 10,
    fontSize: 16,
    color: "#333",
  },
  flagButton: {
    marginLeft: 8,
  },
  phoneInput: {
    width:"100%",
    height: 55,
    borderRadius: 3,
    borderLeftWidth: 1,
    borderColor: "#E9E9E9",
    paddingLeft: 15,
    fontSize: 14,
    color: "#a1a1a1",
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 20,
    marginHorizontal: 16,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: "#0A2EE2",
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 3,
    marginRight: 10,
  },
  checkboxSelected: {
    backgroundColor: "#0A2EE2",
  },
  checkmark: {
    color: "#fff",
    fontSize: 10,
  },
  checkboxLabel: {
    color: "#8E949A",
    fontSize: 15,
    fontWeight: "400",
    lineHeight: 23.44,
  },
  iosPlaceholder:{
    color:'#111'
  },
   dropdownContainer: {
    zIndex: 1000, // ensure the dropdown appears above other elements
    marginTop: 16,
  },
  dropdown: {
    borderColor: '#ccc',
    width:'90%',
    marginLeft:'5%'
  },
  dropdownBox: {
    borderColor: '#ccc',
  },
});
