import React from 'react';
import {StyleSheet, Text, View, Button, Platform, Image} from 'react-native';
import {Provider} from 'react-native-paper';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {StartScene, LoginScene,RegisterScene} from './scenes';
const Stack = createStackNavigator();
export default function App() {
    return (
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="StartScene"
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="StartScene" component={StartScene} />
          <Stack.Screen name="LoginScene" component={LoginScene} />
          <Stack.Screen name="RegisterScene" component={RegisterScene} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
 
