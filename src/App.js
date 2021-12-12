import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {StartScene, LoginScene,RegisterScene, MainScene} from './scenes';
import SplashScreen from 'react-native-splash-screen';
const Stack = createStackNavigator();
export default function App() {
  useEffect(() => {
    SplashScreen.hide();
  });
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
          <Stack.Screen name="MainScene" component={MainScene} />
        </Stack.Navigator>
      </NavigationContainer>
    );
    
  }
 
