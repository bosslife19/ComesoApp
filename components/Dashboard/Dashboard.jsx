 import { AntDesign, Feather, FontAwesome5, Ionicons } from "@expo/vector-icons";
import React, { useContext, useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image, ImageBackground, ScrollView, StyleSheet, Platform, Modal } from "react-native";
import Dashs from "../../styles/Dashboard/Dashboard.styles";
import Header from "../../screens/Dashboard/Header";
import { router } from "expo-router";
import { AuthContext } from "@/context/AuthContext";
import axiosClient from '../../axiosClient';
import AsyncStorage from "@react-native-async-storage/async-storage";

const DashboardScreen = () => {
  const [user, setUser] = useState(null);
   const [transactions, setTransactions] = useState([]);
   const {setUserDetails, userDetails,isUSno, setIsUsNo, currency} = useContext(AuthContext);

   const [modalVisible, setModalVisible] = useState(false);
   const [selectedTransaction, setSelectedTransaction] = useState(null);
   const currencySymbols = {
  USD: '$',
  NGN: '₦',
  GBP: '£',
  EUR: '€',
  INR: '₹',
  JPY: '¥',
  CNY: '¥',
  CAD: 'CA$',
  AUD: 'A$',
  GHS: '₵',     // ✅ Ghanaian Cedi
  GHC: '₵',     // Legacy code (some systems may still use GHC)
};


 
   const openModal = (transaction) => {
     setSelectedTransaction(transaction);
     setModalVisible(true);
   };

  const date = transactions?.map(item=>{
    const date = new Date(item.created_at); // Example date

    const formattedDate = new Intl.DateTimeFormat('en-US', {
      month: 'long',  // Full month name
      day: 'numeric', // Day of the month
      year: 'numeric' // Year
    }).format(date);
    
    return formattedDate;
   })

   
   
  
  

  useEffect(()=>{
    const getUser = async ()=>{
      const usCountryCodeRegex = /^\+1\s?[\d\s\-()]{10,}$/;
      try {
        
        const response = await axiosClient.get('/user');
        setUser(response.data.user);
        setTransactions(response.data.transactions);
        setUserDetails(response.data.user);
        
        setIsUsNo(usCountryCodeRegex.test(userDetails.phone));
       
        
      } catch (error) {
        console.log(error)
      }
      
    }

    getUser();
  }, [])
 
   

if(!user){
  return null;
}


  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <Header/>
   
      <View style={Dashs.container}>
        {/* Top Section: Title */}
        <View style={Dashs.board}>
          <ImageBackground
             source={require("../../assets/images/board.png")}
            style={Dashs.boardImage}
          >
            <View style={Dashs.boardContent}>
              <Text style={Dashs.balanceText}>Available Balance</Text>
              <Text style={Dashs.balanceAmount}> {currencySymbols[user?.currency || currency] || user?.currency || currency}
  {user?.balance}</Text>

              <Text style={Dashs.holderText}>Holder</Text>
              <Text style={Dashs.holderName}>{user?.name} - {user?.phone}</Text>
            </View>
          </ImageBackground>
        </View>

        {/* Middle Section: Quick Actions */}
        <View style={Dashs.quickActionsContainer}>
          <Text style={Dashs.sectionTitle}>Quick Actions</Text>
          <View style={Dashs.actionBoxesContainer}>
            <View style={Dashs.actionBoxContainer}>
              <TouchableOpacity onPress={()=>router.push('/(tabs)/send')} style={[Dashs.actionBox, {backgroundColor:"#4268ED"}]}>
                <Image source={require('../../assets/images/comesologo.png')} style={Dashs.icon} />
              </TouchableOpacity>
              <Text style={Dashs.actionBoxText}>Send Voucher</Text>
            </View>

            <View style={Dashs.actionBoxContainer}>
              <TouchableOpacity onPress={()=>router.push('/(routes)/add-money')} style={[Dashs.actionBox, {backgroundColor:"#A4A9AE26"}]}>
                <Ionicons name="add-circle-outline" size={20} color="#0A2EE2BF" />
              </TouchableOpacity>
              <Text style={Dashs.actionBoxText}>Add Voucher</Text>
            </View>

            <View style={Dashs.actionBoxContainer}>
              <TouchableOpacity style={[Dashs.actionBox, {backgroundColor:"#A4A9AE26"}]} onPress={()=>router.push('beneficiary')}>
                <FontAwesome5 name="user-circle" size={20} color="#0A2EE2BF" />
              </TouchableOpacity> 
              <Text style={Dashs.actionBoxText}>Beneficiaries</Text>
            </View>
            <View style={Dashs.actionBoxContainer}>
              <TouchableOpacity style={[Dashs.actionBox, {backgroundColor:"#A4A9AE26"}]} onPress={()=>router.push('/(routes)/setting')}>
              <AntDesign name="setting" size={20} color="#0A2EE2BF" />
              </TouchableOpacity> 
              <Text style={Dashs.actionBoxText}>Settings</Text>
            </View>
          </View>
        </View>

        {/* Bottom Section: Recent Transactions */}
        <View style={Dashs.recentTransactionsContainer}>
          <View style={Dashs.recentTransactionsHeader}>
            <Text style={Dashs.sectionTitle}>Recent Transactions</Text>
            <TouchableOpacity
              onPress={() => router.push("/(routes)/transaction-list")}
              >
              <Text style={[Dashs.actionBoxText, {lineHeight: 13}]}>View All</Text>
            </TouchableOpacity>
          </View>

          {transactions.length > 0 ? (
          transactions.map((transaction, index) => (
            <TouchableOpacity
            onPress={() => openModal(transaction)}
            // onPress={() => router.push(`/(routes)/transaction-details/${transaction.id}`)}
            key={transaction.id} style={Dashs.transactionItem}>
              <View style={Dashs.transactionRow}>
                <View
                  style={[
                    Dashs.transactionIcon,
                    { backgroundColor: transaction.status=='Received' &&'#E0F7EC'|| transaction.status=='Sent' &&'#FEE0E0' },
                  ]}
                >
                  <Feather
                    name={transaction.status =='Received'&& "arrow-down-left"|| transaction.status=='Sent'&&'arrow-up-right' }
                    size={24}
                    color={transaction.status=='Received' && '#04AD29' || transaction.status =='Sent' && '#F8332F'}
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
                    {transaction.status=='Received'&&transaction.sender||transaction.status=='Sent'&&transaction.beneficiary ||'Top Up'}
                  </Text>
                  <View style={Dashs.transactionInfo}>
                    <Text
                      style={{
                        fontFamily: "Poppins",
                        color: transaction.status=='Received'&& '#04AD29'|| transaction.status=='Sent'&&'#F8332F',
                        fontWeight: "500",
                        fontSize: 12,
                        lineHeight: 17.58,
                        marginRight:3
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
                 
                 {isUSno? '$':'₵'}{transaction.amount}.00 {isUSno? 'USD':'GHC'}
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
            No  transactions  
          </Text>
        )}
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

      </ScrollView>
   );
};
const styles = StyleSheet.create({
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
});
 



export default DashboardScreen;
