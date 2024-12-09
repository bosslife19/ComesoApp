import React, { useContext, useEffect, useState } from "react";
import { 
  View, 
  Text, 
  TextInput, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity
} from "react-native";
import { EvilIcons, Feather, MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { AuthContext } from "@/context/AuthContext";
import axios from "axios";

const SearchScreen = () => {
  const{location} = useContext(AuthContext);
  const [searchText, setSearchText] = useState("");
  const [hospitals, setHospitals] = useState([])
  
  useEffect(()=>{
    const getNearestFacilities = async ()=>{
      
      if(location){
        try {
          const res = await axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location.coords.latitude}%2C${location.coords.longitude}&radius=1500&type=restaurant&keyword=cruise&key=${process.env.EXPO_PUBLIC_GOOGLE_MAPS_API}`)
          if(res.data.results.length > 0){
            setHospitals(res.data.results);
          }
        } catch (error) {
          console.log(error)
        }
      }
     
      
    }
    getNearestFacilities();
  }, [])

   
useEffect(()=>{
if(searchText){
  const filteredTransactions = hospitals?.filter((transaction) =>
    transaction.name.toLowerCase().includes(searchText.toLowerCase())
  );
  setHospitals(filteredTransactions);
}
}, [searchText])
  

  const renderTransactionItem = ({ item }) => (
    <View style={styles.transactionItem}>
      <View style={styles.transactionDetails}>
        <View style={{flexDirection:'row', gap:5, justifyContent:'center', alignItems:'center'}}>
          <EvilIcons name="location" size={20} color="#0A2EE2" />
          <View>
          <Text style={styles.transactionTitle}>{item.name}</Text>
          <View style={styles.transactionSubDetails}>
            
            <Text style={styles.transactionDate}>{item.vicinity}</Text>
          </View>
        </View>
        </View>
       
      </View>
     </View>
  );

 

  const renderHeader = () => (
    <>
    <View style={styles.container}>
      {/* Search Bar */}
      <Text style={styles.headerText}>Search or select from recent healthcare provider</Text>
      <View style={styles.searchContainer}>
        <MaterialIcons name="search" size={24} color="#8E949A" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          // placeholder="Search transactions"
          placeholderTextColor="#8E949A"
          value={searchText}
          onChangeText={setSearchText}
         />
      </View>
    </View>

    <TouchableOpacity style={styles.recentTransactionsContainer} onPress={()=>router.push({pathname:"search-facilities"})}>
      <EvilIcons name="location" size={24} color="white" />
      <Text style={styles.recentText}>Nearest facilities close to you</Text>
    </TouchableOpacity>
    
    </>
    
  );

  return (
    <FlatList
      ListHeaderComponent={renderHeader}
      data={hospitals}
      // ListHeaderComponent={renderRecentItem}
      renderItem={renderTransactionItem}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.scrollViewContainer}
      ListEmptyComponent={()=>(
        <View style={{top:'-5%'}}>
          <Text style={{textAlign:'center'}}>No Hospitals Found</Text>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    // paddingHorizontal: 16,
    // paddingVertical: 15,
    paddingHorizontal:'1%',
    marginTop:'8%'
    
  },
  headerText: {
    fontWeight: "400",
    fontSize: 12,
    textAlign:"center",
    lineHeight: 18,
    marginBottom: 10,
  },
  scrollViewContainer: {
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 20,
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
    // height:32,
    
   
  },
  recentTransactionsContainer: {
    backgroundColor: "#0A2EE2",
    borderRadius: 8,
    marginVertical: 19,
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
    alignItems: "center",
    top: '-10%'
  },
  recentText: {
    marginLeft: 10,
    fontSize: 14,
    color: "#fff",
  },
  transactionItem: {
    flexDirection: "row",
    alignItems: "center",
   justifyContent:"center",
   marginBottom:'5%'
   
  },
  transactionDetails: {
    flexDirection: "row",
    alignItems: "center",
       justifyContent:"center"
   },
  
  transactionTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },
  transactionSubDetails: {
    flexDirection: "row",
    justifyContent: "flex-start",
    gap: 10,
  },
  // transactionType: {
  //   fontSize: 14,
  //   color: "#8E949A",
  // },
  transactionDate: {
    fontSize: 14,
    color: "#8E949A",
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
});

export default SearchScreen;
