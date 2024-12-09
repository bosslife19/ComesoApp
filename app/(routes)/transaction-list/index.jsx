import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput } from "react-native";
import { useRouter } from "expo-router";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import CustomHeader from "../../../components/CustomHeader";
import { AuthContext } from "../../../context/AuthContext";
import axiosClient from '../../../axiosClient';
import DropDownPicker from "react-native-dropdown-picker";

const TransactionList = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [filter, setFilter] = useState("all");
  const { setUserDetails } = useContext(AuthContext);
  const [open, setOpen] = useState(false); // State to manage dropdown visibility
  const [items, setItems] = useState([
     { label: "Past 1 Month", value: "past1month" },
  ]);
  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axiosClient.get('/user');
        setUser(response.data.user);
        setTransactions(response.data.transactions || []);
        setUserDetails(response.data.user);
      } catch (error) {
        console.log(error);
      }
    };

    getUser();
  }, []);

  if (!user) {
    return null;
  }

  
  const renderTransactionItem = ({ item }) => (
    <TouchableOpacity
      style={styles.transactionItem}
      onPress={() => router.push(`/transaction-details/${item.id}`)}
    >
      <View style={styles.transactionRow}>
        <View
          style={[
            styles.transactionIcon,
            {
              backgroundColor:
                item.status === 'Received' ? '#E0F7EC' : '#FEE0E0',
            },
          ]}
        >
          <Feather
            name={item.status === 'Received' ? "arrow-down-left" : "arrow-up-right"}
            size={24}
            color={item.status === 'Received' ? '#04AD29' : '#F8332F'}
          />
        </View>
        <View style={styles.transactionDetails}>
          <Text style={styles.transactionType}>{item.type}</Text>
          <View style={styles.transactionInfo}>
            <Text
              style={[
                styles.transactionStatus,
                { color: item.status === 'Received' ? '#04AD29' : '#F8332F' },
              ]}
            >
              {item.status}
            </Text>
            <Text style={styles.transactionDate}>
              {new Date(item.created_at).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
            </Text>
          </View>
        </View>
      </View>
      <Text style={styles.transactionAmount}>${item.amount}.00 USD</Text>
    </TouchableOpacity>
  );

  return (
    <>
      <View style={{ paddingVertical: 20 }}>
        <CustomHeader text="Transactions" />
      </View>
      <View style={{ flex: 1, backgroundColor: "#F9F9FB" }}>
        <View
          style={{
            flexDirection: "row",
            marginHorizontal: 20,
            paddingHorizontal: 10,
            justifyContent: "space-between",
            paddingVertical: 20,
            marginBottom: 10,
            backgroundColor: "#fff",
          }}
        >
          <Text style={styles.totalBalanceTitle}>Total Balance</Text>
          <Text style={styles.totalBalance}>
            $5500.00 <Text style={styles.currency}>USD</Text>
          </Text>
        </View>
        <View style={styles.searchContainer}>
          <MaterialIcons name="search" size={24} color="#8E949A" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search "
            placeholderTextColor="#8E949A"
          />
        </View>
        <View style={{justifyContent:"center", marginHorizontal:"auto"}}>
        <View style={styles.filterContainer}>
        <DropDownPicker
  open={open}
  value={filter}
  items={items}
  setOpen={setOpen}
  setValue={setFilter}
  setItems={setItems}
  style={[styles.dropdown, { borderColor: "#ccc", borderWidth: 1 }]} // Dropdown styling
  placeholder="Select Filter"
  textStyle={{
    fontSize: 12, // Adjust font size
    color: "#8D8D8D", // Adjust text color
    fontWeight: "500", // Optional: Adjust font weight
  }}
  dropDownContainerStyle={{
    borderColor: "#ccc",
    backgroundColor: "#fff",
  }} // Styling dropdown container
  placeholderStyle={{
    fontSize: 14, // Font size for placeholder
    color: "#8D8D8D", // Placeholder color
  }}
  zIndex={1000}
  zIndexInverse={3000}
/>

        </View>
        </View>

       <View>
       {transactions.length === 0 ? (
          <Text style={styles.noTransactionsText}>
            No transactions found.
          </Text>
        ) : (
          <FlatList
            contentContainerStyle={styles.listContent}
            data={transactions}
            keyExtractor={(item) => item.id}
            renderItem={renderTransactionItem}
          />
        )}
       </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  totalBalanceTitle: {
    color: "#23303B",
    fontWeight: "500",
    fontSize: 18,
    lineHeight: 18,
  },
  totalBalance: {
    color: "#23303B",
    fontWeight: "500",
    fontSize: 18,
    lineHeight: 18,
  },
  currency: {
    fontSize: 12,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F1F2F3",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginHorizontal:20,
    paddingVertical: 8,
    marginVertical: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  noTransactionsText: {
    textAlign: "center",
    color: "#A4A9AE",
    fontFamily: "Poppins",
    fontSize: 14,
    marginTop: 20,
  },
  transactionItem: {
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    backgroundColor: "#f9f9f9",
    elevation: 1,
  },
  transactionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  transactionType: {
    fontSize: 14,
    fontWeight: "500",
    color: "#23303B",
  },
  transactionStatus: {
    fontSize: 12,
    fontWeight: "500",
  },
  transactionDate: {
    fontSize: 12,
    color: "#A4A9AE",
  },
  transactionAmount: {
    fontWeight: "500",
    fontSize: 15,
    lineHeight: 29.3,
    color: "#23303B",
  },
  filterContainer: {
   
    marginHorizontal: 20,
    marginBottom: 20,
    width:"40%",
    
  },
  dropdown: {
   
    margin:"auto",
    backgroundColor: "#EDEDED",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
  },
});

export default TransactionList;
