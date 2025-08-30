import React from 'react';
import { View, Text, Button } from 'react-native';
import { styles } from './HomeScreen.styles';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to the Home Screen!</Text>
    </View>
  );
};

export default HomeScreen;
