import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { AntDesign, FontAwesome, Fontisto } from '@expo/vector-icons';
import { AuthContext } from '@/context/AuthContext';
import { router } from 'expo-router';
import axiosClient from '@/axiosClient';
import { responsiveWidth } from 'react-native-responsive-dimensions';

const Header = ()=> {
  const {userDetails} = useContext(AuthContext);
  const user = userDetails
  
  const notification = async () =>{
   
       await axiosClient.put('/user/notifications/set-opened',{status:true});
      router.push("/(routes)/notifications")
   
   
   
  }

  const profile = () =>{
    router.push("/(routes)/profile/profile")
  }
const [notifications, setNotifications] = useState([])
const [unread, setUnread] = useState(false)
  useEffect(()=>{
    const getNotifications = async ()=>{
      const res = await axiosClient.get('/user/notifications');
      setNotifications(res.data.notifications);
      const unread = res.data.notifications.some((notification) => notification.opened === false);
      setUnread(unread)
      
    }
    getNotifications();
  },[])
  
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <TouchableOpacity onPress={()=> profile()} style={styles.profileContainer}>
          {/* <Image 
            source={require('../../assets/images/profile.png')} 
            style={styles.profileImage}
          /> */}
          <FontAwesome name="user-circle" size={40} color="black" />
           {/* Red notification dot for profile */}
           
          {/* <View style={styles.notificationDot} /> */}
        </TouchableOpacity>

        <View style={styles.greetingContainer}>
          <Text style={styles.greetingText}>Hi, {user?.name}</Text>
        </View>
        <TouchableOpacity onPress={()=> notification()}>
        <View style={styles.bellContainer}>
          <Fontisto name="bell" size={24} color="black" />
          {/* Red notification dot for bell */}
          {
            unread && <View style={styles.notificationDot} />
           }
         
        </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default Header;
const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    paddingHorizontal:23,
     
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    
    alignItems: 'center',
  },
  profileContainer: {
    position: 'relative', // To position the notification dot relative to the image
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 30,
  },
  greetingContainer: {
    flex: 1, // To push bell icon to the right side
    alignItems: 'center',
  },
  greetingText: {
     fontFamily: 'Sora',
    fontSize: 22,
    fontWeight: '600',
    lineHeight:27.72
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
});
