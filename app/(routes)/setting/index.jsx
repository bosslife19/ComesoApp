import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomHeader from "../../../components/CustomHeader";
import axiosClient from "../../../axiosClient";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";

const Settings = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await axiosClient.get("/user");
        setUser(res.data.user);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleEditProfile = () => {
    router.push("/edit-profile"); // Replace with your edit profile route
  };

  const handleContactSupport = () => {
    router.push("/contact-support"); // Replace with your contact support route
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor:'white' }}>
      <ScrollView>
        <CustomHeader text="Settings" />
        <View style={styles.container}>
          <View style={styles.userSection}>
            <FontAwesome name="user-circle" size={90} color="black" />
            <Text style={styles.userName}>{user?.name || "User Name"}</Text>
            <Text style={styles.userEmail}>{user?.email || "User Email"}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>User Information</Text>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Name:</Text>
              <Text style={styles.infoValue}>{user?.name || "N/A"}</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Email:</Text>
              <Text style={styles.infoValue}>{user?.email || "N/A"}</Text>
            </View>
            {/* <TouchableOpacity style={styles.editButton} onPress={handleEditProfile}>
              <MaterialIcons name="edit" size={20} color="#fff" />
              <Text style={styles.editButtonText}>Edit Profile</Text>
            </TouchableOpacity> */}
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Contact Support</Text>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Email:</Text>
              <Text style={styles.infoValue}>support@mycomeso.com</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Phone number</Text>
              <Text style={styles.infoValue}>+2349066487638</Text>
            </View>
            <TouchableOpacity style={styles.editButton} onPress={()=>router.push('/(routes)/complain')}>
            <MaterialIcons name="support-agent" size={24} color="white" />
              <Text style={styles.editButtonText}>Contact support</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
  },
  userSection: {
    alignItems: "center",
    marginBottom: 30,
  },
  userName: {
    fontSize: 20,
    fontWeight: "700",
    marginVertical: 5,
    color: "#000",
  },
  userEmail: {
    fontSize: 16,
    color: "gray",
  },
  section: {
    backgroundColor: "#f9f9f9",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
    color: "#000",
  },
  infoItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
  },
  infoValue: {
    fontSize: 16,
    color: "#555",
  },
  editButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#0A2EE2",
    padding: 10,
    borderRadius: 8,
    marginTop: 15,
  },
  editButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 5,
  },
  supportButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F8332F",
    padding: 12,
    borderRadius: 8,
  },
  supportButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 5,
  },
});
