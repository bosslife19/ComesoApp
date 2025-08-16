import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Modal,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomHeader from "../../components/CustomHeader";
import { AntDesign, Entypo, EvilIcons, Feather } from "@expo/vector-icons";
import BeneficiaryModal from "../../components/BeneficiaryModal";
import AddBeneficiaryModal from "../../components/AddBeneficiaryModa";
import Confirmation1Modal from "../../components/Confirmation1Modal";
import Confirmation2Modal from "../../components/Confirmation2Modal";
import axiosClient from "../../axiosClient";

const Beneficiary = () => {
  const [beneficiaries, setBeneficiaries] = useState([]);
  const [name, setName] = useState("");

  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setemail] = useState("");
  const [modalData, setModalData] = useState({
    image: "",
  });

  const [openModal, setOpenModal] = useState(false);
  const [openAddBeneficiary, setOpenAddBeneficiary] = useState(false);
  const [openfirstConfirmation, setOpenFirstConfirmation] = useState(false);
  const [openSecondConfirmation, setOpenSecondConfirmation] = useState(false);
  const [searchTerm, setSearchterm] = useState("");
  const toggleModal = () => setOpenModal(!openModal);
  const toggleAddBenModal = () => setOpenAddBeneficiary(!setOpenAddBeneficiary);
  const toggleFirstConfirmation = () =>
    setOpenFirstConfirmation(!openfirstConfirmation);
  const toggleSecondConfirmation = () =>
    setOpenSecondConfirmation(!openSecondConfirmation);

  useEffect(() => {
    const getBeneficiaries = async () => {
      try {
        const res = await axiosClient.get("/beneficiary");

        setBeneficiaries(res.data.beneficiaries);
      } catch (error) {
        console.log(error);
      }
    };
    getBeneficiaries();
  }, []);
  const [modalVisible, setModalVisible] = useState(false);

  const onDelete = async (id) => {
    const res = await axiosClient.post("/beneficiary/delete", { id });
    if (res.data.status) {
      Alert.alert('Success', 'You have successfully deleted this beneficiary')
      setBeneficiaries( beneficiaries.filter((item) => item.id !== id))
     
    
    }
  };

  useEffect(() => {
    if (searchTerm) {
      setBeneficiaries((prev) =>
        prev.filter(
          (item) =>
            item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.phone.includes(searchTerm)
        )
      );
    }
  }, [searchTerm]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        <CustomHeader text="Beneficiary" />
        <View style={{ marginTop: "5%" }}>
          <View style={{ position: "absolute", top: "30%", left: "10%" }}>
            <EvilIcons name="search" size={24} color="gray" />
          </View>
          <TextInput
            style={{
              color:
                Platform.OS === "ios" ? "#aa" : "rgba(164, 169, 174, 0.25)",
              width: "90%",
              height: 50,
              paddingHorizontal: 50,
              alignSelf: "center",
              borderRadius: 10,
              fontSize: 18,
              backgroundColor: "rgba(164, 169, 174, 0.25)",
            }}
            placeholder="search"
            placeholderTextColor={Platform.OS === "ios" && "#aaa"}
            onChangeText={(val) => setSearchterm(val)}
          />
        </View>
         <TouchableOpacity
          style={{
            width: "80%",
            backgroundColor: "rgba(10, 46, 226, 1)",
            height: 60,
            alignSelf: "center",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 10,
            marginTop: 10,
            marginBottom: 20,
          }}
          onPress={() => setOpenAddBeneficiary(true)}
        >
          <AntDesign
            name="pluscircleo"
            size={24}
            color="white"
            style={{ position: "absolute", top: "27%", left: "18%" }}
          />
          <Text
            style={{
              color: "white",
              fontSize: 18,
              marginLeft: 10,
            }}
          >
            Add Beneficiary
          </Text>
        </TouchableOpacity>
        <View style={{ marginTop: 20 }}>
          <Text
            style={{
              fontSize: 19,
              fontWeight: "bold",
              marginBottom: 20,
              marginLeft: "5%",
            }}
          >
            {beneficiaries.length > 0 && "Beneficiaries"}
          </Text>
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              gap: "3%",
              marginHorizontal: "2%",
            }}
          >
            {beneficiaries ? (
              beneficiaries.map((item, index) => (
                <View
                  style={{
                    width: "30%",
                    backgroundColor: "white",
                    shadowColor: "#171717",
                    shadowOffset: { width: -2, height: 4 },
                    shadowOpacity: 0.2,
                    shadowRadius: 3,
                    elevation: 5,
                    marginBottom: 10,
                    borderRadius: 10,
                    padding: 12,
                    alignItems: "center",
                  }}
                >
                  {/* User Avatar or Icon */}
                  <Entypo name="user" size={60} color="black" />

                  {/* User Details */}
                  <Text
                    style={{
                      marginTop: 10,
                      textAlign: "center",
                      color: "rgba(64, 69, 74, 1)",
                      fontSize: 14,
                      fontWeight: "500",
                    }}
                  >
                    {item.name}
                  </Text>
                  <Text
                    style={{
                      textAlign: "center",
                      color: "rgba(164, 169, 174, 1)",
                      fontSize: 13,
                    }}
                  >
                    {item.phone}
                  </Text>

                  {/* Delete Button */}
                  <TouchableOpacity
                    style={{
                      marginTop: 10,
                      backgroundColor: "#FF4D4F",
                      paddingVertical: 6,
                      paddingHorizontal: 12,
                      borderRadius: 6,
                      flexDirection: "row",
                      alignItems: "center",
                      shadowColor: "#FF4D4F",
                      shadowOffset: { width: 0, height: 2 },
                      shadowOpacity: 0.3,
                      shadowRadius: 4,
                      elevation: 3,
                    }}
                    onPress={() => setModalVisible(true)}
                  >
                    <Feather name="trash-2" size={16} color="white" />
                    <Text
                      style={{ color: "white", fontSize: 13, marginLeft: 5 }}
                    >
                      Delete
                    </Text>
                  </TouchableOpacity>

                  {/* Confirmation Modal */}
                  <Modal
                    animationType="fade"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => setModalVisible(false)}
                  >
                    <View
                      style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "rgba(201, 193, 193, 0.25)",
                      }}
                    >
                      <View
                        style={{
                          width: "80%",
                          backgroundColor: "white",
                          padding: 20,
                          borderRadius: 10,
                          alignItems: "center",
                          shadowColor: "#000",
                          shadowOffset: { width: 0, height: 4 },
                          shadowOpacity: 0.3,
                          shadowRadius: 5,
                          elevation: 10,
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 16,
                            fontWeight: "600",
                            marginBottom: 10,
                          }}
                        >
                          Are you sure you want to delete this beneficiary?
                        </Text>

                        <View style={{ flexDirection: "row", marginTop: 15 }}>
                          <TouchableOpacity
                            style={{
                              backgroundColor: "#E5E7EB",
                              paddingVertical: 8,
                              paddingHorizontal: 20,
                              borderRadius: 6,
                              marginRight: 10,
                            }}
                            onPress={() => setModalVisible(false)}
                          >
                            <Text style={{ color: "#374151", fontSize: 14 }}>
                              Cancel
                            </Text>
                          </TouchableOpacity>

                          <TouchableOpacity
                            style={{
                              backgroundColor: "#FF4D4F",
                              paddingVertical: 8,
                              paddingHorizontal: 20,
                              borderRadius: 6,
                            }}
                            onPress={() => {
                              setModalVisible(false);
                              onDelete(item.id);
                            }}
                          >
                            <Text style={{ color: "white", fontSize: 14 }}>
                              Delete
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  </Modal>
                </View>
              ))
            ) : (
              <View>
                <Text>No Beneficiaries added yet</Text>
              </View>
            )}
          </View>
        </View>
       
      </ScrollView>
      {openModal && (
        <BeneficiaryModal toggleModal={toggleModal} image={modalData.image} />
      )}
      {openAddBeneficiary && (
        <AddBeneficiaryModal
          toggleModal={toggleAddBenModal}
          openFirstConfirm={toggleFirstConfirmation}
          setName={setName}
          setPhonenumber={setPhoneNumber}
          setemail={setemail}
        />
      )}
      {openfirstConfirmation && (
        <Confirmation1Modal
          toggleModal={toggleFirstConfirmation}
          // openFirst={toggleAddBenModal}
          openSecondConfirm={toggleSecondConfirmation}
          image={modalData.image}
          email={email}
          name={name}
          phone={phoneNumber}
        />
      )}
      {openSecondConfirmation && (
        <Confirmation2Modal toggleModal={toggleSecondConfirmation} />
      )}
    </SafeAreaView>
  );
};

export default Beneficiary;
