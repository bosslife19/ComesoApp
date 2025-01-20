import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Modal,
  TextInput,
  Alert,
  ActivityIndicator
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomHeader from "../../../components/CustomHeader";
import axiosClient from "../../../axiosClient";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import {AuthContext} from '../../../context/AuthContext';

const Settings = () => {
  const [user, setUser] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const {userDetails} = useContext(AuthContext);
  const [loading, setLoading] = useState(false)

  const [formValues, setFormValues] = useState({
    name: userDetails.name,
    email: userDetails.email,
    phone: userDetails.phone,
  });

  const handleEditProfile = () => {
    setModalVisible(true);
  };

  const handleSave = async () => {
    try {
      // Send updated data to the server
      
      if(!formValues.name||!formValues.email || !formValues.phone){
        return Alert.alert('All fields are required', 'Fill in all the fields to continue');
      }
      setLoading(true);
      await axiosClient.put("/user", formValues);
      setLoading(false)
      setUser(formValues); // Update the local state with new values
      Alert.alert('Profile updated successfully', 'Your profile details have been updated successfully')
      setModalVisible(false); // Close the modal
    } catch (error) {
      setLoading(false);
      console.error("Failed to update profile:", error);
    }
  };


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
  }, [user]);

  const handleInputChange = (key, value) => {
    setFormValues((prevState) => ({ ...prevState, [key]: value }));
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
              <Text style={styles.infoLabel}>Username:</Text>
              <Text style={styles.infoValue}>{user?.name || "N/A"}</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Email:</Text>
              <Text style={styles.infoValue}>{user?.email || "N/A"}</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Phone number:</Text>
              <Text style={styles.infoValue}>{user?.phone || "N/A"}</Text>
            </View>
            <TouchableOpacity style={styles.editButton} onPress={handleEditProfile}>
              <MaterialIcons name="edit" size={20} color="#fff" />
              <Text style={styles.editButtonText}>Edit Profile</Text>
            </TouchableOpacity>
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
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Edit Profile</Text>

            <TextInput
              style={styles.input}
              placeholder="Name"
              value={formValues.name}
              onChangeText={(text) => handleInputChange("name", text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={formValues.email}
              onChangeText={(text) => handleInputChange("email", text)}
              keyboardType="email-address"
            />
            <TextInput
              style={styles.input}
              placeholder="Phone"
              value={formValues.phone}
              onChangeText={(text) => handleInputChange("phone", text)}
              keyboardType="phone-pad"
            />

            <View style={styles.modalButtons}>

              <TouchableOpacity
                style={styles.saveButton}
                onPress={handleSave}
              >
                {loading? <><ActivityIndicator size='small' color='white'/></>:<Text style={styles.saveButtonText}>Save</Text>}
                
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: "90%",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginVertical: 10,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 20,
  },
  saveButton: {
    backgroundColor: "#0A2EE2",
    padding: 10,
    borderRadius: 8,
    flex: 1,
    marginRight: 10,
    alignItems: "center",
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  cancelButton: {
    backgroundColor: "#F8332F",
    padding: 10,
    borderRadius: 8,
    flex: 1,
    marginLeft: 10,
    alignItems: "center",
  },
  cancelButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
