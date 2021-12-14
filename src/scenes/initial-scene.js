import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {StartScene, LoginScene, RegisterScene, MainScene} from '../scenes';
import SplashScreen from 'react-native-splash-screen';
import {GetData, StoreData} from '../helpers/store-data';
import jwt_decode from 'jwt-decode';
const Stack = createStackNavigator();

export default function InitialScene({tokenStatus}) {
  useEffect(() => {
    SplashScreen.hide();
    // if (tokenStatus) {
    //   const decoded = jwt_decode(tokenStatus);
    //   StoreData('email', decoded.email);
    //   StoreData('avatar', decoded.avatar);
    //   console.log("stored");
    // }
  }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={tokenStatus === null ? 'StartScene' : 'MainScene'}
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="StartScene" component={StartScene} />
        <Stack.Screen name="LoginScene" component={LoginScene} />
        <Stack.Screen name="RegisterScene" component={RegisterScene} />
        <Stack.Screen name="MainScene" component={MainScene} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
