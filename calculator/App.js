import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import Calculator from './components/calculator.js';
import History from './components/history.js';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Calculator" component={Calculator} />
        <Stack.Screen name="History" component={History} />
      </Stack.Navigator>
      <View>
        <StatusBar style="auto" />
      </View>
    </NavigationContainer>
  );
}

