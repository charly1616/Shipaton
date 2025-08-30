import React from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { styles } from './LoginScreen.styles';
import { presentPaywall } from '../../RevenuePaywall';

import RevenueCatUI from 'react-native-purchases-ui';



export const LoginScreen = ({ navigation }: { navigation: any }) => {
  const handleLogin = () => {
    navigation.navigate('Home');
  };


  const handleSignUp = async () => {
    const success = await RevenueCatUI.presentPaywall();
    if (success) {
      alert("🎉 Thanks for subscribing!");
    } else {
      alert("❌ Purchase not completed.");
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>Welcome back 👋</Text>
      <Text style={styles.subGreeting}>Sign in to continue</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
      />

      <TouchableOpacity style={styles.signInButton} onPress={handleLogin}>
        <Text style={styles.signInButtonText}>Sign In</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.footer} onPress={handleSignUp}>
        <Text style={styles.footerText}>
          Don't have an account? <Text style={styles.footerLink}>Sign Up</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};

