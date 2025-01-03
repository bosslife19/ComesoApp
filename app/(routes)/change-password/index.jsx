import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { router, useLocalSearchParams } from "expo-router";
import Toast from "react-native-toast-message";

export default function ChangePasswordScreen() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { email } = useLocalSearchParams();
  const [loading, setLoading] = useState(false);

  const handleChangePassword = async () => {
    if (newPassword && confirmPassword) {
      if (newPassword === confirmPassword) {
        try {
            setLoading(true)
          const response = await axios.post(
            `${process.env.EXPO_PUBLIC_BASE_URL}/api/user/change-password`,
            { email, password: newPassword }
          );
          if (response.data.status) {
            setLoading(false);
            Toast.show({
              type: "success",
              text1: "Password Changed succesfully",
              text2: "Your password has been changed successfully",
            });

            Alert.alert('Success', 'Password Changed successfully');
            

            setTimeout(() => {
              router.push("/login");
            }, 2000);
          }
        } catch (error) {
            setLoading(false);
          console.log(error);
          Toast.show({
            type: "error",
            text1: "Error",
            text2:
              error.response.data.message || "Some error occured. try again",
            
          });
          Alert.alert('Error', 'Error updating password')
        }
      } else {
        Alert.alert("Error", "Passwords do not match.");
      }
    } else {
      Alert.alert("Error", "Please fill out both fields.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Change Password</Text>
        <Text style={styles.subtitle}>Enter your new password below</Text>
      </View>

      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <Ionicons
            name="lock-closed-outline"
            size={20}
            color="#6a11cb"
            style={styles.icon}
          />
          <TextInput
            style={styles.input}
            placeholder="New Password"
            placeholderTextColor="#aaa"
            secureTextEntry
            onChangeText={(text) => setNewPassword(text)}
            value={newPassword}
          />
        </View>

        <View style={styles.inputContainer}>
          <Ionicons
            name="lock-closed-outline"
            size={20}
            color="#6a11cb"
            style={styles.icon}
          />
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            placeholderTextColor="#aaa"
            secureTextEntry
            onChangeText={(text) => setConfirmPassword(text)}
            value={confirmPassword}
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleChangePassword}>
          {loading ? (
            <ActivityIndicator color="white" size={"small"} />
          ) : (
            <Text style={styles.buttonText}>Change Password</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(0, 92, 232, 1)",
  },
  header: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  subtitle: {
    fontSize: 16,
    color: "#eee",
    textAlign: "center",
    paddingHorizontal: 30,
    marginTop: 10,
  },
  formContainer: {
    flex: 2,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
    justifyContent: "center",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f7f7f7",
    borderRadius: 10,
    marginVertical: 10,
    paddingHorizontal: 15,
    height: 50,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  button: {
    backgroundColor: "rgba(0, 92, 232, 1)",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
