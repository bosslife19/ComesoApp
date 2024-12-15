import Toast from "react-native-toast-message";
import {
  Entypo,
  FontAwesome,
  Fontisto,
  Ionicons,
  SimpleLineIcons,
} from "@expo/vector-icons";
import { useContext, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { router } from "expo-router";
import SectionsLogin from "@/styles/Login/Login.styles";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "@/context/AuthContext";
import * as LocalAuthentication from "expo-local-authentication";

export default function LoginScreen() {
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [buttonSpinner, setButtonSpinner] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUserDetails, userDetails } = useContext(AuthContext);
  const baseUrl = process.env.EXPO_PUBLIC_BASE_URL;
  const [authToken, setAuthToken] = useState(null);

  const handleFingerPrint = async () => {
    const isBiometricAvailable = await LocalAuthentication.hasHardwareAsync();

    if (!isBiometricAvailable) {
      Toast.show({
        type: "info",
        text1: "Biometric Not Available",
        text2: "Biometric Authentication is not supported on this device.",
      });
      return router.push("/signup");
    }

    const savedBiometrics = await LocalAuthentication.isEnrolledAsync();
    if (!savedBiometrics) {
      return Toast.show({
        type: "error",
        text1: "No Biometric Found",
        text2: "Please log in with your password.",
      });
    }

    const auth = await LocalAuthentication.authenticateAsync({
      promptMessage: "Login to Comeso with your fingerprint",
      cancelLabel: "Cancel",
      disableDeviceFallback: true,
    });

    if (auth.success) {
      const details = await AsyncStorage.getItem("userDetails");
      setUserDetails(JSON.parse(details));
      return router.push("/(tabs)/home");
    } else {
      Toast.show({
        type: "error",
        text1: "Authentication Failed",
        text2: "Fingerprint authentication was canceled or failed.",
      });
    }
  };

  const handleSignIn = async () => {
    if (!email || !password) {
      return Toast.show({
        type: "error",
        text1: "All Fields Required",
        text2: "Please fill in all the fields to continue.",
      });
    }
    setButtonSpinner(true);

    try {
      const response = await axios.post(`${baseUrl}/api/login`, {
        email,
        password,
      });

      if (response.data.status) {
        await AsyncStorage.clear();
        await AsyncStorage.setItem("authToken", response.data.token);
        setUserDetails(response.data.user);

        Toast.show({
          type: "success",
          text1: "Login Successful",
          text2: "Welcome back!",
        });
        router.push("/(tabs)/home");
      }
    } catch (error) {
      setButtonSpinner(false);
      Toast.show({
        type: "error",
        text1: "Invalid Credentials",
        text2: "Please provide the correct credentials to login.",
      });
    }
  };

  useEffect(() => {
    const getToken = async () => {
      const token = await AsyncStorage.getItem("authToken");
      setAuthToken(token);
    };
    getToken();
  }, []);

  return (
    <>
      <ScrollView
        contentContainerStyle={{
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
              },
            ]}
          >
            Login to Your Account
          </Text>
          <View style={SectionsLogin.inputContainer}>
            <View>
              <TextInput
                style={[
                  SectionsLogin.input,
                  { fontFamily: "SofiaPro", paddingHorizontal: 0 },
                ]}
                keyboardType="email-address"
                value={email}
                placeholder="email"
                onChangeText={(value) => setEmail(value)}
              />
            </View>

            <View style={{ marginTop: 15 }}>
              <TextInput
                style={[SectionsLogin.input, { fontFamily: "SofiaPro" }]}
                secureTextEntry={!isPasswordVisible}
                value={password}
                placeholder="password"
                onChangeText={(value) => setPassword(value)}
              />
              <TouchableOpacity
                style={[SectionsLogin.visibleIcon, { fontFamily: "SofiaPro" }]}
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

            <TouchableOpacity
              style={SectionsLogin.loginButton}
              onPress={handleSignIn}
              disabled={buttonSpinner}
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
                  Login
                </Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => router.push("/(routes)/forgot-password")}
            >
              <Text
                style={[
                  SectionsLogin.forgotSection,
                  { fontFamily: "SofiaPro" },
                ]}
              >
                Forget User / Forgot Password ?
              </Text>
            </TouchableOpacity>

            {authToken && (
              <TouchableOpacity
                style={SectionsLogin.socialLogin}
                onPress={handleFingerPrint}
              >
                <Ionicons name="finger-print-outline" size={44} color="black" />
              </TouchableOpacity>
            )}

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
                Don’t have an account?
              </Text>
              <TouchableOpacity onPress={() => router.push("/signup")}>
                <Text style={SectionsLogin.signUpText}>Sign up</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
      <Toast />
    </>
  );
}
 