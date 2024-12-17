import React, { useEffect, useState } from 'react';
import { Button, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Head from './Head';
import axiosClient from '../../axiosClient';
import { FontAwesome } from '@expo/vector-icons';
 const NotificationTable = () => {
  const [notifications, setNotification] = useState([]);
  useEffect(()=>{
    const getNotifications = async ()=>{
      try {
        const res = await axiosClient.get('/user/notifications');
        console.log(res.data)
      setNotification(res.data.notifications);
      console.log(res.data.notifications);
      } catch (error) {
        console.log(error)
      }
      
    }
    getNotifications();
  },[]);
    return (
        <>
        <Head/>
        <ScrollView
      
    >
       <View  style={{paddingBottom:25}}>
       {/* <View   >
          <Text style={styles.topText}>Today</Text>
        </View> */}
 
       {
        notifications.length>0? notifications.map((notification,index)=>(
          <View 
          key={index}
          style={{flexDirection:"row", borderTopWidth:1,  paddingHorizontal:20, borderColor:"#EBEBED", gap:15, paddingVertical:20,  }}
          >
          <View>
            {/* <Image
              source={require('../../assets/images/profile.png')} 
              style={styles.profileImage}
            /> */}
            <FontAwesome name="user-circle" size={40} color="black" />
            </View>
            <Text style={{fontWeight:"400", fontSize:15, lineHeight:21, fontFamily: 'SofiaPro', width:"60%"}}>
            {notification.title}
          </Text>
          {/* <TouchableOpacity style={{backgroundColor:'#456EFE', paddingVertical:10, paddingHorizontal:20,borderRadius:10}}>
            <Text style={{color:"#fff",fontFamily: 'SofiaPro', fontWeight:"600", fontSize:15, lineHeight:21}}>Pay</Text>
          </TouchableOpacity> */}
           </View>
        )):(
          <View style={{marginHorizontal:'25%'}}>
            <Text>No Notifications for you yet</Text>
            </View>
        )
       }

       

      
       {/* <View>
       <View >
          <Text style={styles.topText}>This Week</Text>
        </View>
 
        <View style={{flexDirection:"row", borderTopWidth:1,  paddingHorizontal:20, borderColor:"#EBEBED", gap:15, paddingVertical:20}}>
        <View style={styles.profileContainer}>
          <Image
            source={require('../../assets/images/profile.png')} 
            style={styles.profileImage}
          />
         </View>
        <Text style={{fontWeight:"400", fontSize:15, lineHeight:21, fontFamily: 'SofiaPro', width:"60%"}}>
        You received a payment of $560.00 
        from David John
        </Text>
        </View>
        
        <View style={{flexDirection:"row", borderTopWidth:1,  paddingHorizontal:20, borderColor:"#EBEBED", gap:15, paddingVertical:20}}>
        <View style={styles.profileContainer}>
          <Image
           
            style={{padding:24, backgroundColor:"#FFE8E8", borderRadius:30}}
          />
          
          <View style={styles.notificati}>
            <Text style={{textAlign:"center",  color:"#FF6363",backgroundColor:"#fff", borderRadius:30}}>!</Text>
          </View>
        </View>
        <Text style={{fontWeight:"400", fontSize:15, lineHeight:21, fontFamily: 'SofiaPro', width:"60%"}}>
        Your monthly expense almost break the
        budget
        </Text>
       
        </View>
       </View> */}
       

       </View>
    </ScrollView>
    </>
     );
}

const styles = StyleSheet.create({
  topBorder:{
    borderWidth:1,
    borderColor:"#EBEBED"
  },
  topText:{
color:"#23303B",
fontWeight:700,
fontSize:20,
lineHeight:20,
paddingLeft:14,
paddingBottom:10,
fontFamily: 'SofiaPro',
  },
  profileContainer: {
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 30,
  },
  bellContainer: {
    position: 'relative', // To position the notification dot relative to the bell icon
  },
  notificationDot: {
    position: 'absolute',
    top: -1,
    right: -1,
    width: 10,
    height: 10,
    borderRadius: 5, // Circular dot
    backgroundColor: '#E73726',
  },
  notificati:{
    position: 'absolute',
    top: -15,
    right: 13,
    width: 22,
    height: 22,
    borderRadius: 35,  
    borderWidth: 1,
    borderColor: '#E73726',
  }
})

export default NotificationTable;
