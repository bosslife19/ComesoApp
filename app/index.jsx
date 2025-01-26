 import { Redirect } from 'expo-router';
 import React from 'react'
 import registerNNPushToken from 'native-notify';
 export default function index() {
    registerNNPushToken(26812, 'YbFosVTb3J7wbRaVwDsjuW');
    return <Redirect href={"/(routes)/onboarding"} />;
}