import React, {useState} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Button, Overlay, Divider} from 'react-native-elements';
import Background from '../components/background';
import {theme} from '../themes/theme';

function Home() {
  return (
    <Background>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <View>
          <Text style={styles.signUp}>Home</Text>
        </View>
      </View>
    </Background>
  );
}
function Calendar() {
  return (
    <Background>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={styles.signUp}>Calendar</Text>
      </View>
    </Background>
  );
}

function Scan() {
  return (
    <Background>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={styles.signUp}>Scan</Text>
      </View>
    </Background>
  );
}

function Logout({navigation}) {
  const set = true;
  const [visible, setVisible] = useState(true);
  console.log('set: ' + visible);
  const toggleOverlay = param => {
    if (param === 'yes') {
      navigation.reset({
        index: 0,
        routes: [{name: 'StartScene'}],
      });
    } else setVisible(false);
  };
  return (
    <Overlay isVisible={visible} onBackdropPress={() => toggleOverlay('no')}>
      <Text style={styles.signUp}>Are you sure you want to log out?</Text>
      <View style={styles.row}>
        <Button title="Yes" onPress={() => toggleOverlay('yes')} />

        <Button title="No" onPress={() => toggleOverlay('no')} />
      </View>
    </Overlay>
  );
  setVisible(true);
}

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: theme.colors.mainColor,
        tabBarInactiveTintColor: theme.colors.secondColor,
        headerShown: false,
        tabBarStyle: {height: 50},
        tabBarLabelStyle: {
          fontSize: 12,
          marginBottom: 5,
          marginTop: -5,
        },
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color}) => (
            <Icon name={'home'} size={26} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Calendar"
        component={Calendar}
        options={{
          tabBarLabel: 'Calendar',
          tabBarIcon: ({color}) => (
            <Icon name={'calendar'} size={20} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Scan"
        component={Scan}
        options={{
          tabBarLabel: 'Scan',
          tabBarIcon: ({color}) => (
            <Icon name={'camera'} size={20} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Logout"
        component={Logout}
        options={{
          tabBarLabel: 'Logout',
          tabBarIcon: ({color}) => (
            <Icon name={'sign-out'} size={24} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function MainScene() {
  return <MyTabs />;
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    maxWidth: 800,
    alignSelf: 'center',
    justifyContent: 'center',
    fontSize: 16,
  },
  signUp: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.mainColor,
  },
});
