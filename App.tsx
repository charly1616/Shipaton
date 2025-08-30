import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from './src/navigation/AppNavigator';
import Purchases, { LOG_LEVEL } from 'react-native-purchases';
import { Platform } from 'react-native';


export default function App() {
    useEffect(() => {
      Purchases.setLogLevel(LOG_LEVEL.VERBOSE);

      if (Platform.OS === 'ios') {
        Purchases.configure({apiKey: "sk_MSeQmYWSbeNKwauPIcxuZDZuPRamn"});
      } else if (Platform.OS === 'android') {
        Purchases.configure({apiKey: "sk_MSeQmYWSbeNKwauPIcxuZDZuPRamn"});
      }

    }, []);

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

