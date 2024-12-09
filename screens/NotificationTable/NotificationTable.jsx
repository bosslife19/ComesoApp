import React from 'react';
import { Button, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Head from './Head';
 const NotificationTable = () => {
    return (
        <>
        <Head/>
        <ScrollView
      contentContainerStyle={{
        justifyContent: "center",
        paddingTop: "33%",
        height: "100%",
      }}
    >
       <View>
       <View >
          <Text style={styles.topText}>Today</Text>
        </View>
        <View style={styles.topBorder}/>

        <View style={{flexDirection:"row", borderWidth:1,}}>
        <View style={styles.profileContainer}>
          <Image
            source={require('../../assets/images/profile.png')} 
            style={styles.profileImage}
          />
          </View>
        <Text>
        You received a payment of $560.00 
        from David John
        </Text>
        </View>
        <View style={{flexDirection:"row", borderWidth:1,}}>
        <View style={styles.profileContainer}>
          <Image
            source={require('../../assets/images/profile.png')} 
            style={styles.profileImage}
          />
          </View>
        <Text>
        You received a payment of $560.00 
        from David John
        </Text>
       <TouchableOpacity>
       <TouchableOpacity>
          <Text>Pay</Text>
          </TouchableOpacity>
       </TouchableOpacity>
        </View>
       </View>
       <View>
       <View >
          <Text style={styles.topText}>This Week</Text>
        </View>
        <View style={styles.topBorder}/>

        <View style={{flexDirection:"row", borderWidth:1,}}>
        <View style={styles.profileContainer}>
          <Image
            source={require('../../assets/images/profile.png')} 
            style={styles.profileImage}
          />
         </View>
        <Text>
        You received a payment of $560.00 
        from David John
        </Text>
        </View>
        <View style={{flexDirection:"row", borderWidth:1,}}>
        <View style={styles.profileContainer}>
          <Image
            source={require('../../assets/images/profile.png')} 
            style={styles.profileImage}
          />
        </View>
        <Text>
        You received a payment of $560.00 
        from David John
        </Text>
       <TouchableOpacity>
       <TouchableOpacity>
          <Text>Pay</Text>
          </TouchableOpacity>
       </TouchableOpacity>
        </View>
        <View style={{flexDirection:"row", borderWidth:1,}}>
        <View style={styles.profileContainer}>
          <Image
            source={require('../../assets/images/profile.png')} 
            style={styles.profileImage}
          />
           {/* Red notification dot for profile */}
          <View style={styles.notificati} />
        </View>
        <Text>
        You received a payment of $560.00 
        from David John
        </Text>
       
        </View>
       </View>
    </ScrollView>
    </>
     );
}

const styles = StyleSheet.create({
  topBorder:{
    borderWidth:1,
    borderColor:"#A4A9AE"
  },
  topText:{
color:"#23303B",
fontWeight:600,
fontSize:20,
lineHeight:20,
fontFamily: 'SofiaPro',
  },
  profileContainer: {
    position: 'relative', // To position the notification dot relative to the image
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
    top: -1,
    right: -1,
    width: 10,
    height: 10,
    borderRadius: 5,  
    borderWidth: 1,
    borderColor: '#E73726',
  }
})

export default NotificationTable;
