import { Tabs } from 'expo-router';
import React from 'react';
import { Image, Platform, StyleSheet, Text, View } from 'react-native';

 import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import {icons} from '../../constants';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const TabIcon = ({ icon, color, name, focused})=>{
    return (
        <View style={[{
          alignItems:'center',
          justifyContent:'center',
          gap:2,
          height:50,
          width:50,
          borderRadius:25,
          marginTop:'30%',
        }, focused && {backgroundColor:'#0A2EE2'} ] }>
            <Image
            source={icon} 
            resizeMode='contain'
            //  tintColor={!focused && '#F1F2F3'}
            style={{width:'70%', height:'70%', marginTop: '40%'}}
            
            />
            <Text style={{
                color: '#F1F2F3'
            }}>{name}</Text>
        </View>
    )
}

  return (
     <Tabs
     screenOptions={{
       tabBarStyle: styles.container,
       tabBarItemStyle: styles.tabItem,
       tabBarActiveTintColor: Colors['light'].tint, 
       tabBarInactiveTintColor: "#A4A4A4",
       tabBarLabelStyle: styles.label,
       headerShown: false,
     }}
   >
     <Tabs.Screen
       name="home/index"
       options={{ 
         title: '',
         tabBarIcon: ({ color, focused }) => (
          //  <MaterialIcons name="home-filled" size={24} color={color} />
          <TabIcon icon={icons.home} color={color} name='' focused={focused}/>
          
          ),
       }}
     />
     <Tabs.Screen
       name="send/index"
       options={{
         title: '',
         tabBarIcon: ({ color, focused }) => (
          <TabIcon icon={icons.sendIcon} color={color} name='' focused={focused}/>
         ),
       }}
     />

<Tabs.Screen
       name="search/index"
       options={{
         title: '',
         tabBarIcon: ({ color, focused }) => (
          <TabIcon icon={icons.searchIcon} color={color} name='' focused={focused}/>
         ),
       }}
     />
     
       
     
   </Tabs>
  );
}


const styles = StyleSheet.create({
  tabItem: {
    paddingVertical: 12,
  },
  container: {
    padding: 80,
    backgroundColor: "#F1F2F3",
    borderRadius: 12,
    width:'60%',
    marginHorizontal:'auto',
    height:'8%',
    marginVertical: '5%',
    borderBottomEndRadius:30,
    borderTopEndRadius:30,
    borderTopStartRadius:30,
    borderTopLeftRadius:30,
    borderTopRightRadius:30,
    borderBottomLeftRadius:30,
    top:'-3%'
    
  },
  label: {
    textTransform: 'capitalize',
    fontSize: 12,
    marginBottom: 7,
  },
  featherIcon: {
    borderWidth: 1.7,   // Adjust border width if necessary
     textAlign:"center",
     paddingTop:1.4,
    borderRadius: 9,    // Adjust border radius if needed
  }
});
