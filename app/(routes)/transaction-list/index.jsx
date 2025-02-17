import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, Platform, Modal, ActivityIndicator } from "react-native";

import { Feather, MaterialIcons } from "@expo/vector-icons";
import CustomHeader from "../../../components/CustomHeader";
import { AuthContext } from "../../../context/AuthContext";
import axiosClient from '../../../axiosClient';
import DropDownPicker from "react-native-dropdown-picker";
import Dashs from "../../../styles/Dashboard/Dashboard.styles"
const TransactionList = () => {
 
  
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [filter, setFilter] = useState("all");
  const {  isUSno } = useContext(AuthContext);
  const [user, setUser] = useState(null)
  const [open, setOpen] = useState(false); // State to manage dropdown visibility
  const [modalVisible, setModalVisible] = useState(false);
   const [selectedTransaction, setSelectedTransaction] = useState(null);
   const [searchTerm, setSearchTerm] = useState('')
   const [selectedFilter, setSelectedFilter] = useState("All");

  useEffect(() => {
     filterTransactions();
  }, [searchTerm, selectedFilter, transactions]);
  const filterTransactions = () => {
    let filtered = transactions;

    // Apply Date Filtering
    if (selectedFilter !== "All") {
      const now = new Date();
      let startDate = new Date();

      if (selectedFilter === "1 Week Ago") {
        startDate.setDate(now.getDate() - 7);
      } else if (selectedFilter === "1 Month Ago") {
        startDate.setMonth(now.getMonth() - 1);
      } else if (selectedFilter === "3 Months Ago") {
        startDate.setMonth(now.getMonth() - 3);
      }
      

      filtered = filtered.filter(item => new Date(item.created_at) >= startDate);
    }

    // Apply Search Filtering
    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.beneficiary.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.sender.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.type.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    

    setFilteredTransactions(filtered);
    
  };

   const openModal = (transaction) => {
     setSelectedTransaction(transaction);
     setModalVisible(true);
   };
   
  
  const [items, setItems] = useState([
     { label: "Past 1 Month", value: "past1month" },
  ]);
  useEffect(() => {
    const getUser = async () => {
      try {
        if (searchTerm) {
          
          setFilteredTransactions(
            transactions.filter(item => 
              item.beneficiary?.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
              item.sender?.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
              item.type?.toString().toLowerCase().includes(searchTerm.toLowerCase())
            )
          );
        } else{
          const response = await axiosClient.get('/user');
        
          setTransactions(response.data.transactions || []);
          setFilteredTransactions(transactions)
          
          setUser(response.data.user);
        }
        
        
      } catch (error) {
        console.log(error);
      }
    };

    getUser();
  }, [searchTerm]);

  





  const renderItem = ({ item }) => {
    const formattedDate = item?.created_at
      ? new Intl.DateTimeFormat('en-US', {
          month: 'long',
          day: 'numeric',
          year: 'numeric',
        }).format(new Date(item.created_at))
      : 'Unknown Date';

    return (
      <TouchableOpacity
      onPress={() => openModal(item)}
      key={item.id} style={Dashs.transactionItem}>
        <View style={Dashs.transactionRow}>
          <View
            style={[
              Dashs.transactionIcon,
              { 
                backgroundColor: item.status=='Received' &&'#E0F7EC'||item.status=='Sent' &&'#FEE0E0' },
            ]}
          >
            <Feather
              name={item.status =='Received'&& "arrow-down-left"|| item.status=='Sent'&&'arrow-up-right' }
              size={24}
              color={item.status=='Received' && '#04AD29' || item.status =='Sent' && '#F8332F'}
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
             {item.status=='Received'&&item.sender||item.status=='Sent'&&item.beneficiary ||'Top Up'}
            </Text>
            <View style={Dashs.transactionInfo}>
              <Text
                style={{
                  fontFamily: "Poppins",
                  color: item.status=='Received'&& '#04AD29'|| item.status=='Sent'&&'#F8332F',
                  fontWeight: "500",
                  fontSize: 12,
                  lineHeight: 17.58,
                  marginRight:3
                }}
              >
                {item.status}
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
                
                {formattedDate}
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
           
           {isUSno? '$':'₵'}{item.amount}.00 USD
          </Text>
        </View>
      </TouchableOpacity>
    );
  };
  if(transactions.length>0){
    return (
      <>
        <View style={{ paddingVertical: 20 }}>
          <CustomHeader text="Transactions" />
        </View>
        <View style={{ flex: 1, backgroundColor: "#F9F9FB", }}>
          <View
            style={{
              flexDirection: "row",
              marginHorizontal: 20,
              paddingHorizontal: 10,
              justifyContent: "space-between",
              paddingVertical: 20,
              marginBottom: 10,
              backgroundColor: "#fff",
              marginTop:10,
              height:'10%',
              alignItems:'center'
            }}
          >
            <Text style={styles.totalBalanceTitle}>Total Balance</Text>
            <Text style={styles.totalBalance}>
            {isUSno? '$':'₵'}{user?.balance}.00 <Text style={styles.currency}>USD</Text>
            </Text>
          </View>
          <View style={styles.searchContainer}>
            <MaterialIcons name="search" size={24} color="#8E949A" style={styles.searchIcon} />
            <TextInput
            style={[styles.searchInput,{color:Platform.OS=='ios'&&'#aaa'}]}
              placeholder="Search "
              
            onChangeText={(val)=>setSearchTerm(val)}
               placeholderTextColor={Platform.OS === "ios"?"#aaa":'#8E949A' } 
              
            />
          </View>
          <View style={{justifyContent:"center", marginHorizontal:"auto"}}>
         
          {/* <DropDownPicker
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
   /> */}
   <View style={styles.filterContainer}>
          {["All", "1 Week Ago", "1 Month Ago", "3 Months Ago"].map(filter => (
            <TouchableOpacity
              key={filter}
              style={[
                styles.filterButton,
                selectedFilter === filter ? styles.selectedFilter : {}
              ]}
              onPress={() => setSelectedFilter(filter)}
            >
              <Text style={styles.filterText}>{filter}</Text>
            </TouchableOpacity>
          ))}
        </View>
  
  
  
          </View>
  
         <View style={{paddingHorizontal:10,}}>
         
        <FlatList
          data={filteredTransactions}
          keyExtractor={(item, index) => item.id.toString()}
          renderItem={renderItem}
          ListEmptyComponent={<Text
            style={{
              textAlign: "center",
              color: "#A4A9AE",
              fontFamily: "Poppins",
              fontSize: 14,
              marginTop: 20,
            }}
          >
            No  transactions  
          </Text>}
        />
      
         </View>
         <Modal
          visible={modalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              {selectedTransaction && (
                <>
                  <Text style={styles.modalTitle}>Transaction Details</Text>
                  <Text style={styles.modalText}>
                    <Text style={styles.label}>Type: </Text>
                    {selectedTransaction.type}
                  </Text>
                  <Text style={styles.modalText}>
                    <Text style={styles.label}>Status: </Text>
                    {selectedTransaction.status}
                  </Text>
                  <Text style={styles.modalText}>
                    <Text style={styles.label}>Amount: </Text>
                    {isUSno ? "$" : "₵"}
                    {selectedTransaction.amount}.00 {isUSno ? "USD" : "GHC"}
                  </Text>
                  {selectedTransaction.sender && (
                    <Text style={styles.modalText}>
                      <Text style={styles.label}>Sender: </Text>
                      {selectedTransaction.sender}
                    </Text>
                  )}
                  {selectedTransaction.beneficiary && (
                    <Text style={styles.modalText}>
                      <Text style={styles.label}>Beneficiary: </Text>
                      {selectedTransaction.beneficiary}
                    </Text>
                  )}
                  <TouchableOpacity
                    style={styles.closeButton}
                    onPress={() => setModalVisible(false)}
                  >
                    <Text style={styles.closeButtonText}>Close</Text>
                  </TouchableOpacity>
                </>
              )}
            </View>
          </View>
        </Modal>
        </View>
      </>
    );
  }else{
    return <ActivityIndicator size={50} color='gray' style={{top:"50%"}}/>
  }

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
  // filterContainer: {
   
  //   marginHorizontal: 20,
  //   marginBottom: 20,
  //   width:"40%",
    
  // },
  transactionItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderColor: "#E5E5E5",
  },
  transactionRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  transactionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  transactionDetails: {
    flex: 1,
  },
  transactionText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#23303B",
  },
  transactionInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 3,
  },
  transactionStatus: {
    fontSize: 12,
    fontWeight: "500",
    marginRight: 5,
  },
  transactionDate: {
    fontSize: 12,
    color: "#A4A9AE",
  },
  amountText: {
    fontSize: 15,
    fontWeight: "500",
    fontFamily: "SofiaPro",
    textAlign: "right",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalText: {
    fontSize: 14,
    marginBottom: 5,
  },
  label: {
    fontWeight: "bold",
  },
  closeButton: {
    marginTop: 15,
    backgroundColor: "#F8332F",
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  scrollViewContainer: {
    flexGrow: 1,  
    backgroundColor: '#f5f5f5',  
   },
  dropdown: {
   
    margin:"auto",
    backgroundColor: "#EDEDED",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  filterContainer: { flexDirection: "row", gap:5, marginBottom: 10 },
  filterButton: { padding: 8, borderWidth: 1, borderRadius: 8, borderColor: "#aaa" },
  selectedFilter: { backgroundColor: "#007bff" },
  filterText: { color: "#000" },
});

export default TransactionList;