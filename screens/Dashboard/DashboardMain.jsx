import React, { useEffect }  from 'react';
 
import DashboardScreen from '../../components/Dashboard/Dashboard';
import axiosClient from '@/axiosClient';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DashboardMain = () => {

  useEffect(()=>{
    const sendPushToken = async ()=>{
      const token = await AsyncStorage.getItem('pushToken');
      if(!token){
        return;
      }
     const res =  await axiosClient.post('/user-push-token', {token});
     if(res.data.status){
      await AsyncStorage.removeItem('pushToken');
     }
    }
    sendPushToken();
  }, [])
 

  return (
    <>
    
      <DashboardScreen />
    </>
  );
};

export default DashboardMain;
