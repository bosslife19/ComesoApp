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
import CustomBlueButton from "../../../components/CustomBlueButton";
import { router } from "expo-router";
import axiosClient from "../../../axiosClient";
import { Feather, FontAwesome } from "@expo/vector-icons";

const Profile = () => {
  // const transactions = [
  //   {
  //     id: 1,
  //     type: "Account Top-up",
  //     status: "Received",
  //     date: "Feb 25, 2022",
  //     amount: "$5.00 USD",
  //     icon: "arrow-down-left",
  //     iconColor: "#04AD29",
  //     backgroundColor: "#E0F7EC",
  //     textColor: "#04AD29",
  //   },
  //   {
  //     id: 2,
  //     type: "Transfer Out",
  //     status: "Sent",
  //     date: "Feb 26, 2022",
  //     amount: "$10.00 USD",
  //     icon: "arrow-up-right",
  //     iconColor: "#F8332F",
  //     backgroundColor: "#FEE0E0",
  //     textColor: "#F8332F",
  //   },
  //   {
  //     id: 3,
  //     type: "Purchase",
  //     status: "Completed",
  //     date: "Feb 27, 2022",
  //     amount: "$20.00 USD",
  //     icon: "arrow-up-right",
  //     iconColor: "#F8332F",
  //     backgroundColor: "#FEE0E0",
  //     textColor: "#F8332F",
  //   },
  //   {
  //     id: 3,
  //     type: "Purchase",
  //     status: "Completed",
  //     date: "Feb 27, 2022",
  //     amount: "$20.00 USD",
  //     icon: "arrow-up-right",
  //     iconColor: "#F8332F",
  //     backgroundColor: "#FEE0E0",
  //     textColor: "#F8332F",
  //   },
  // ];
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
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <CustomHeader text="Profile" />
        <View style={{ height: "100%", paddingHorizontal: "5%" }}>
          <View style={{ marginHorizontal: "auto", marginTop: "5%" }}>
           
            <FontAwesome style={{marginHorizontal:'auto', left:'35%'}}name="user-circle" size={90} color="black" />
          </View>
          <View>
            <Text
              style={{
                textAlign: "center",
                fontFamily: "Sofia",
                fontSize: 20,
                color: "rgba(10, 46, 226, 1)",
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
            >
              {/* United State */}
            </Text>
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
            <TouchableOpacity onPress={() => router.push("(routes)/setting")}>
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: "Sora",
                  fontWeight: "500",
                  color: "rgba(164, 169, 174, 1)",
                }}
              >
                View all
              </Text>
            </TouchableOpacity>
          </View>

          {transactions.map((transaction, index) => (
            <View
              style={{
                shadowColor: "#171717",
                shadowOffset: { width: -2, height: 4 },
                shadowOpacity: 0.2,
                shadowRadius: 3,
                elevation: 5,
                width: "100%",
                height: 80,
                backgroundColor: "white",
                marginHorizontal: "auto",
                marginBottom: 15,
                borderRadius: 5,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                // paddingHorizontal: "3%",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  //   gap: 3,
                  alignItems: "center",
                  left: "-7%",
                  top: "5%",
                  alignSelf: "center",
                }}
              >
                <View
                  style={{
                    backgroundColor:
                      (transaction.status == "Received" && "#E0F7EC") ||
                      (transaction.status == "Sent" && "#FEE0E0"),
                  }}
                >
                  {/* <Image
                    source={require("../../../assets/images/downtransaction.png")}
                    width={51}
                    height={51}
                    resizeMode="contain"
                  /> */}
                  <Feather
                    name={
                      (transaction.status == "Received" && "arrow-down-left") ||
                      (transaction.status == "Sent" && "arrow-up-right")
                    }
                    size={24}
                    color={
                      (transaction.status == "Received" && "#04AD29") ||
                      (transaction.status == "Sent" && "#F8332F")
                    }
                  />
                </View>
                <View style={{ left: "-18%", top: "-3%" }}>
                  <Text style={{ fontSize: 14 }}>{transaction.type}</Text>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 5,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 12,
                        color:
                          (transaction.status == "Received" && "#04AD29") ||
                          (transaction.status == "Sent" && "#F8332F"),
                      }}
                    >
                      {transaction.status}
                    </Text>
                    <Text
                      style={{ fontSize: 12, color: "rgba(164, 169, 174, 1)" }}
                    >
                      {date[index]}
                    </Text>
                  </View>
                </View>
              </View>
              <View style={{ left: "-4%" }}>
                <Text
                  style={{
                    fontSize: 20,
                    fontFamily: "Sofia",
                    fontWeight: "500",
                    flexDirection: "row",
                  }}
                >
                  ${transaction.amount}.00
                  <Text style={{ fontSize: 8 }}>USD</Text>
                </Text>
              </View>
            </View>
          ))}
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
});
