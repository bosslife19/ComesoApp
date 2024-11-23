import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    Poppins: require('../assets/fonts/Poppins-Regular.ttf'),
    Sofia: require('../assets/fonts/Sofia Pro Regular Az.otf'),
    Alata:require('../assets/fonts/Alata-Regular.ttf'),
  }); 

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
    {/* Other Screens */}
    <Stack.Screen name="index" />
    <Stack.Screen name="(routes)/Welcome-intro/index" />
    <Stack.Screen
      name="(tabs)"
      options={{
        headerShown: false,
      }}
    />    
    {/* Add the Confirmation screen here */}
    <Stack.Screen name="(routes)/TrfConfirm/index"   />
  </Stack>
    );
  
}
