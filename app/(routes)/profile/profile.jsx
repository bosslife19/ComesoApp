import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomHeader from "../../../components/CustomHeader";
import CountryPicker, {
  Country,
  CountryCode,
} from "react-native-country-picker-modal";
import { router } from "expo-router";
import axiosClient from "../../../axiosClient";
import { Feather, FontAwesome, MaterialIcons } from "@expo/vector-icons";
import Dashs from "../../../styles/Dashboard/Dashboard.styles";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axiosClient.get("/user");

        setUser(res.data.user);
        setTransactions(res.data.transactions);
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, []);

  const date = transactions?.map((item) => {
    const date = new Date(item.created_at); // Example date

    const formattedDate = new Intl.DateTimeFormat("en-US", {
      month: "long", // Full month name
      day: "numeric", // Day of the month
      year: "numeric", // Year
    }).format(date);

    return formattedDate;
  });

  const handleLogout = async () => {
    try {
      await axiosClient.post('/user/logout');
      await AsyncStorage.removeItem("authToken");
     
      router.push('/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <CustomHeader text="Profile" />
        <View style={{ height: "100%", paddingHorizontal: "5%" }}>
          <View style={{ marginHorizontal: "auto", marginTop: "5%" }}>
            <FontAwesome
              style={{ marginHorizontal: "auto", left: "35%" }}
              name="user-circle"
              size={90}
              color="black"
            />
          </View>
          <View>
            <Text
              style={{
                textAlign: "center",
                fontFamily: "Sofia",
                fontSize: 20,
                color: "#000",
                fontWeight: "700",
              }}
            >
              {user?.name}
            </Text>
            <Text
              style={{
                textAlign: "center",
                fontFamily: "Sofia",
                fontSize: 14,
                color: "rgba(164, 169, 174, 1)",
                fontWeight: "500",
              }}
            ></Text>
          </View>

          <View
            style={{
              shadowColor: "#171717",
              shadowOffset: { width: -2, height: 4 },
              shadowOpacity: 0.2,
              shadowRadius: 3,
              elevation: 0.5,
              width: "100%",
              height: 80,
              backgroundColor: "white",
              marginHorizontal: "auto",
              marginTop: "7%",
              borderRadius: 5,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingHorizontal: "3%",
            }}
          >
            <Text
              style={{ fontSize: 18, fontFamily: "Sofia", fontWeight: "500" }}
            >
              Total Balance
            </Text>
            <Text
              style={{
                fontSize: 24,
                fontFamily: "Sofia",
                fontWeight: "500",
                flexDirection: "row",
              }}
            >
              ${user?.balance}.00
              <Text style={{ fontSize: 8 }}>USD</Text>
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginVertical: "8%",
            }}
          >
            <Text
              style={{ fontFamily: "Sora", fontWeight: "600", fontSize: 19 }}
            >
              Recent Transactions
            </Text>
          </View>

          {transactions.length > 0 ? (
            transactions.map((transaction, index) => (
              <TouchableOpacity
                key={transaction.id}
                style={Dashs.transactionItem}
              >
                <View style={Dashs.transactionRow}>
                  <View
                    style={[
                      Dashs.transactionIcon,
                      {
                        backgroundColor:
                          (transaction.status == "Received" && "#E0F7EC") ||
                          (transaction.status == "Sent" && "#FEE0E0"),
                      },
                    ]}
                  >
                    <Feather
                      name={
                        (transaction.status == "Received" &&
                          "arrow-down-left") ||
                        (transaction.status == "Sent" && "arrow-up-right")
                      }
                      size={24}
                      color={
                        (transaction.status == "Received" && "#04AD29") ||
                        (transaction.status == "Sent" && "#F8332F")
                      }
                    />
                  </View>
                  <View style={Dashs.transactionDetails}>
                    <Text
                      style={{
                        fontFamily: "Poppins",
                        fontWeight: "500",
                        fontSize: 14,
                        lineHeight: 20.51,
                        color: "#23303B",
                      }}
                    >
                      {transaction.type}
                    </Text>
                    <View style={Dashs.transactionInfo}>
                      <Text
                        style={{
                          fontFamily: "Poppins",
                          color:
                            (transaction.status == "Received" && "#04AD29") ||
                            (transaction.status == "Sent" && "#F8332F"),
                          fontWeight: "500",
                          fontSize: 12,
                          lineHeight: 17.58,
                          marginRight: 3,
                        }}
                      >
                        {transaction.status}
                      </Text>
                      <Text
                        style={{
                          fontFamily: "Poppins",
                          color: "#A4A9AE",
                          fontWeight: "400",
                          fontSize: 12,
                          lineHeight: 17.58,
                        }}
                      >
                        {date[index]}
                      </Text>
                    </View>
                  </View>
                </View>
                <View>
                  <Text
                    style={{
                      fontWeight: "500",
                      fontSize: 15,
                      lineHeight: 29.3,
                      fontFamily: "SofiaPro",
                    }}
                  >
                    ${transaction.amount}.00 USD
                  </Text>
                </View>
              </TouchableOpacity>
            ))
          ) : (
            <Text
              style={{
                textAlign: "center",
                color: "#A4A9AE",
                fontFamily: "Poppins",
                fontSize: 14,
                marginTop: 20,
              }}
            >
              No transactions
            </Text>
          )}

          <TouchableOpacity
            onPress={handleLogout}
            style={styles.logoutButton}
          >
            <MaterialIcons name="logout" size={24} color="#fff" />
            <Text style={styles.logoutButtonText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;

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
    width: "100%",
    left: "-5%",
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
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F8332F",
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 20,
    marginBottom: 30,
  },
  logoutButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 8,
  },
});
