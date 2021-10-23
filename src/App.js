import React from 'react';
import {StyleSheet, Text, View, Button, Platform, Image} from 'react-native';
import { Provider } from 'react-native-paper'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import {
  StartScene
} from './scenes'
const Stack = createStackNavigator()
export default function App() {
  if (Platform.OS === 'android') {
    return (
       <NavigationContainer>
        <Stack.Navigator
          initialRouteName="StartScene"
          screenOptions={{
            headerShown: false,
          }}
        >
         <Stack.Screen name="StartScene" component={StartScene} />
          </Stack.Navigator>
 </NavigationContainer>
    );
  } else {
    return (
      <View style={styles.web}>
        <View style={styles.web_left}>
          <Text>Z tego nic nie bedzie choc powstanietaskss</Text>
          
        </View>
        <Button title="Zaloguj" />
        <Button title="PSk" />
        <View style={styles.web_right}>
          <Text>Windows</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      ios: {
        backgroundColor: 'red',
      },
      android: {
        backgroundColor: 'green',
      },
      default: {
        backgroundColor: 'white',
      },
    }),
  },

  web: {
    flex: 1,
    alignItems: 'flex-end',
  },
  web_left: {
    alignSelf: 'flex-start',
  },
  web_right: {
    flexDirection: 'row',

    alignSelf: 'flex-end',
    justifyContent: 'flex-end',
  },
});
