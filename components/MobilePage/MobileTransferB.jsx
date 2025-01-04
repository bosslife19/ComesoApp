import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
   Alert,
  ActivityIndicator,
  Platform,
  Dimensions
} from "react-native";
import Toast from "react-native-toast-message";

import { MaterialIcons, Ionicons, Entypo } from "@expo/vector-icons";
import HeaderM from "../../screens/MobileTransfer/HeaderM";
 import CountryPicker from "react-native-country-picker-modal";
import SectionsLogin from "@/styles/Login/Login.styles";
import axosClient from "../../axiosClient";
import { router } from "expo-router";
import axiosClient from "../../axiosClient";

const MobileTransferB = () => {
  const [searchText, setSearchText] = useState("");
  const [buttonSpinner, setButtonSpinner] = useState(false);
  const [selectedBeneficiaryId, setSelectedBeneficiaryId] = useState(null);
  const [isFocused, setIsFocused] = useState(false); // To track focus
  const [isFocus, setIsFocus] = useState(false); // To track focus
  const [isFocuses, setIsFocuses] = useState(false); // To track focus
  const screenWidth = Dimensions.get('window').width;
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [countryCode, setCountryCode] = useState("US"); // Default to 'US'
  const [callingCode, setCallingCode] = useState("1"); // Default calling code for 'US'
  const [userInfo, setUserInfo] = useState({
    password: "",
    Name: "",
    phone: "",
  });

  const [beneficiaries, setBeneficiaries] = useState([]);
  

  const toggleSelectBeneficiary = (id, name, phone) => {
    if (selectedBeneficiaryId === id) {
      setSelectedBeneficiaryId(null); // Deselect if clicked again
      setUserInfo({
        password: "",
        Name: "",
        phone: "",
      });
      setPhoneNumber('');
    } else {
      setSelectedBeneficiaryId(id); // Select the new beneficiary
      setUserInfo({
        ...userInfo,
        Name: name
      });
      setPhoneNumber(phone);
    }
  };
  const AddBeneficiaryButton = () => {
    return (
      <TouchableOpacity 
      style={[styles.addButton, { width: screenWidth }]} 
      onPress={() => router.push('/beneficiary')}
    >
      <View style={styles.buttonContent}>
        <MaterialIcons name="person-add" size={28} color="#333" style={styles.icon} />
        <Text style={styles.text}>Add New Beneficiary</Text>
      </View>
    </TouchableOpacity>
    );
  };
  const handleContinue = async () => {
    // if (countryCode === "US") {
    //   Toast.show({
    //     type: "error",
    //     position: "top",
    //     text1: "Flag Required",
    //     text2: "Please select a country before submitting.",
    //   });
    //   return;
    // }
    if(userInfo.password ==''){
      Toast.show({
        type: "error",
        position: "top",
        text1: "All fields are required",
        text2: "Fill all fields to continue",
      });
      return;
    }

    try {
      setButtonSpinner(true)
      const response = await axiosClient.post(`/user/find`, {
        name: userInfo.Name,
      });

      if (response.data.error) {
        setButtonSpinner(false)
        
        Toast.show({
          type: "error",
          position: "top",
          text1: "Error",
          text2: response.data.error,
        });
        return;
      }


      const receiver = response.data.user;

      const res = await axiosClient.post('/user/check-password', {password:userInfo.password});
      if(res.data.status ==false){
        setButtonSpinner(false);
        Toast.show({
          type: "error",
          position: "top",
          text1: "Incorrect Password",
          text2: "The password you entered is incorrect",
        });
        return;
      
        // return Alert.alert('Incorrect password!', 'The Password you entered is incorrect')
      }

      router.push({
        pathname: "/(routes)/TrfConfirm",
        params: { name: userInfo.Name, phone: receiver.phone },
      });
    } catch (error) {
      console.log(error);
      setButtonSpinner(false);
      Toast.show({
        type: "error",
        position: "top",
        text1: "Not Found",
        text2: "User not Found!",
      });
       
    }
  };

  // const filteredBeneficiaries = beneficiaries.filter(beneficiary =>
  //     beneficiary?.first_name.toLowerCase().includes(searchText.toLowerCase())
  // );

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

  useEffect(() => {
    const getBeneficiaries = async () => {
      try {
        const res = await axosClient.get("/beneficiary");

        setBeneficiaries(res.data.beneficiaries);
      } catch (error) {
        console.log(error);
      }
    };

    getBeneficiaries();
  }, []);

  return (
    <View style={styles.container}>
      <HeaderM />

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TouchableOpacity>
          <MaterialIcons name="search" size={24} color="#8E949A" />
        </TouchableOpacity>
        <TextInput
          style={[styles.searchInput, { fontFamily: "SofiaPro" }]}
          placeholder="Search"
          placeholderTextColor={Platform.OS === "ios"?"#aaa":'#8E949A' }
          value={searchText}
          onChangeText={setSearchText}
          
        />
      </View>

      <Text style={styles.sectionTitle}>Beneficiaries</Text>

      {/* List of Beneficiaries */}
      <FlatList
        data={beneficiaries}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            key={item.id}
            onPress={() =>
              toggleSelectBeneficiary(
                item.id,
                item.name,
                
                item.phone
              )
            }
            style={[
              styles.beneficiaryItem,
              selectedBeneficiaryId === item.id && styles.selectedBeneficiary,
            ]}
          >
            <View style={styles.beneficiaryItem}>
              {/* <Image
                                source={item.img ? item.img : logo}
                                style={styles.beneficiaryImage}
                            /> */}
              <Entypo
                name="user"
                size={60}
                color="black"
                style={styles.beneficiaryImage}
              />
              <Text style={styles.beneficiaryName}>{item.name}</Text>
            </View>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
          <Text style={styles.noBeneficiariesText}>No beneficiaries found</Text>
          <AddBeneficiaryButton />
        </View>
        }
      />

      {/* Make New Transfer Form */}
      <View style={styles.formContainer}>
        <Text style={styles.formTitle}>Make new transfer</Text>
        
        {/* Name Input */}
        <TextInput 
          style={[styles.input,
            { backgroundColor: isFocuses ? "#FFFFFF" : "#A4A9AE26" },
              ]
          }
          keyboardType="default"
          value={userInfo.Name}
          placeholder="Username"
          onChangeText={(value) => setUserInfo({ ...userInfo, Name: value })}
          placeholderTextColor={Platform.OS === "ios"?"#aaa":'#8E949A' }
          onFocus={() => setIsFocuses(true)}
              onBlur={() => setIsFocuses(false)}
        />

        {/* Phone Number Input */}
        {/* <View 
              style={[
                styles.phoneContainer,
                { backgroundColor: isFocused ? "#FFFFFF" : "#A4A9AE26" },
              ]}
        
        >
        <TouchableOpacity style={styles.flagButton}>
        <CountryPicker
          countryCode={countryCode}
          withFilter
          withFlag
          withCallingCode
          withCountryNameButton={false}
          onSelect={onSelectCountry}
        />
      </TouchableOpacity>
      <Text style={styles.callingCode}>+{callingCode}</Text>
      <TextInput
        style={styles.phoneInput}
        keyboardType="phone-pad"
        value={phoneNumber}
        onChangeText={(text) => setPhoneNumber(text.replace(/[^0-9]/g, ""))}
        placeholder="Receiver’s Mobile Number"
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
        </View> */}

        {/* Password Input */}
        <View
          style={{
            marginTop: 20,
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
          }}
        >
          <View style={{ width: "100%" }}>
            <TextInput
              style={[styles.input,{ backgroundColor: isFocus ? "#FFFFFF" : "#A4A9AE26" },]}
              secureTextEntry={!isPasswordVisible}
              value={userInfo.password}
              placeholder="Input your password"
              placeholderTextColor={Platform.OS === "ios"?"#aaa":'#8E949A' }
              onChangeText={(value) =>
                setUserInfo({ ...userInfo, password: value })
              }
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
            />
            <TouchableOpacity
              style={SectionsLogin.visibleIcon}
              onPress={() => setPasswordVisible(!isPasswordVisible)}
            >
              {isPasswordVisible ? (
                <Ionicons name="eye-off-outline" size={20} color={"#747474"} />
              ) : (
                <Ionicons name="eye-outline" size={20} color={"#747474"} />
              )}
            </TouchableOpacity>
          </View>

         
        </View>

        {/* Continue Button */}
        <TouchableOpacity
          onPress={handleContinue}
          style={[SectionsLogin.loginButtons]}
          disabled={buttonSpinner}
        >
          {buttonSpinner ? (
            <ActivityIndicator size="small" color={"white"} />
          ) : (
            <Text
              style={[
                SectionsLogin.loginButtonText,
                { fontFamily: "SofiaPro", fontWeight: "700" },
              ]}
            >
              Continue
            </Text>
          )}
        </TouchableOpacity>
      </View>
      <Toast ref={(ref) => Toast.setRef(ref)} />

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop:10,
    paddingLeft:20,
    paddingRight:20,
    backgroundColor: "#fff",
  },
  sectionTitle: {
    fontFamily: "Poppins",
    fontSize: 19,
    lineHeight: 19,
    fontWeight: "700",
    color: "#23303B",
    marginBottom: 10,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F1F1F1",
    borderRadius: 8,
    padding: 5,
    marginBottom: 20,
  },
  phoneContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    // padding: 10,
    overflow: "hidden",
  },
  flagButton: {
    marginLeft: 8,
  },
  callingCode: {
    marginRight: 10,
    fontSize: 16,
    color: "#333",
  },
  phoneInput: {
   flex: 1,
    height: 55,
    borderRadius: 3,
    borderLeftWidth: 1,
    borderColor: "#E9E9E9",
    paddingLeft: 15,
     fontSize: 14,
    color: "#a1a1a1",
  },
  searchInput: {
    fontFamily: "SofiaPro",
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: "#333",
  },
  beneficiaryItem: {
    alignItems: "center",
    padding: 5,
    marginHorizontal: 5,
    borderRadius: 8,
    width: 100,
    shadowColor: "#6E758812",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 3, // Android shadow
  },
  beneficiaryImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 10,
  },
  beneficiaryName: {
    fontFamily: "SofiaPro",
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    textAlign: "center",
  },
  noBeneficiariesText: {
    fontFamily: "SofiaPro",
    fontSize: 16,
    color: "#8E949A",
    textAlign: "center",
    marginTop: 20,
  },
  formContainer: {
    marginTop: 20,
  },
  formTitle: {
    fontFamily: "SofiaPro",
    fontSize: 19,
    lineHeight: 19,
    fontWeight: "700",
    color: "#23303B",
    marginBottom: 15,
  },
  input: {
    fontFamily: "SofiaPro",
    height: 56,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingLeft: 15,
    fontSize: 16,
    color: "#333",
     marginBottom: 20,
  },
  continueButton: {
    backgroundColor: "#3498db",
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 20,
  },
  continueButtonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
  },
  selectedBeneficiary: {
    borderColor: "#0A2EE2",
    borderWidth: 2,
  },
  addButton: {
    width: '100%',
    paddingVertical: 12,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    marginVertical: 10,
    height:'100%'
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    top:'-15%',
    left:'-10%'
  },
  icon: {
    marginRight: 5,
  },
  text: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
  },
  
  
  emptyContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  noBeneficiariesText: {
    color: "#d3d3d3",
    fontSize: 16,
    marginBottom: 10,
  },
  itemText: {
    color: "#fff",
    padding: 10,
    fontSize: 16,
  },
});

export default MobileTransferB;
