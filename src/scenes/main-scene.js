import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Button, Overlay, Divider} from 'react-native-elements';
import Background from '../components/background';
import {theme} from '../themes/theme';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {DrawerContent} from '../components/drawer';
import {BackButton} from '../components/back-button';
import jwt_decode from 'jwt-decode';
import {GetData, StoreData} from '../helpers/store-data';

import Profile from './profile-scene';
import Home from './home-scene';
import Scan from './scan-scene';
import Calendar from './calendar-scene';
import About from './about-scene';
import Service from './service-scene';
import SetPassword from './set-password-scene';

const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();
const HomeStack = createStackNavigator();
const ProfileStack = createStackNavigator();
const CalendarStack = createStackNavigator();
const ScanStack = createStackNavigator();

const MyTabs = () => (
  <Tab.Navigator
    initialRouteName="Homets"
    backBehavior="order"
    screenOptions={{
      tabBarActiveTintColor: theme.colors.mainColor,
      tabBarInactiveTintColor: theme.colors.secondColor,
      headerShown: false,
      tabBarStyle: {height: theme.sizes.bottomTabNavigatorHeight},
      tabBarLabelStyle: {
        fontSize: 12,
        marginBottom: 5,
        marginTop: -5,
      },
    }}>
    <Tab.Screen
      name="Homets"
      component={HomeStackScreen}
      options={{
        tabBarLabel: 'Home',
        tabBarIcon: ({color}) => <Icon name={'home'} size={26} color={color} />,
      }}
    />
    <Tab.Screen
      name="Calendarts"
      component={CalendarStackScreen}
      options={{
        tabBarLabel: 'Calendar',
        tabBarIcon: ({color}) => (
          <Icon name={'calendar'} size={20} color={color} />
        ),
      }}
    />
    <Tab.Screen
      name="Scants"
      component={ScanStackScreen}
      options={{
        tabBarLabel: 'Scan',
        tabBarIcon: ({color}) => (
          <Icon name={'camera'} size={20} color={color} />
        ),
      }}
    />
    <Tab.Screen
      name="Profilets"
      component={ProfileStackScreen}
      options={{
        tabBarLabel: 'Profile',
        tabBarIcon: ({color}) => <Icon name={'user'} size={24} color={color} />,
      }}
    />
  </Tab.Navigator>
);

export default function MainScene({route}) {
  const [email, setEmail] = useState();
  const [avatar, setAvatar] = useState();
  const [loaded, setLoaded] = useState(true);
  useEffect(() => {
    GetData('token').then(res => {
      const decoded = jwt_decode(res);
      StoreData('email', decoded.email);
      StoreData('avatar', decoded.avatar);
      setEmail(decoded.email);
      setAvatar(decoded.avatar);
    });
  }, []);
  return loaded ? (
    (setTimeout(() => {
      setLoaded(false);
    }, 1000),
    (
      <Background>
        <ActivityIndicator size="large" color={theme.colors.mainColor} />
      </Background>
    ))
  ) : email !== undefined ? (
    <Drawer.Navigator
      drawerContent={props => <DrawerContent {...props} email={email} />}
      screenOptions={{
        headerStyle: {backgroundColor: theme.colors.mainColor},
        headerShown: false,
        headerTintColor: 'white',
        headerTitleStyle: 'bold',
        headerTitleAlign: 'center',
      }}>
      <Drawer.Screen name="Home" component={MyTabs} />
    </Drawer.Navigator>
  ) : null;
}

const HomeStackScreen = ({navigation}) => (
  <HomeStack.Navigator
    screenOptions={{
      headerStyle: {backgroundColor: theme.colors.mainColor},
      headerTintColor: 'white',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
      headerTitleAlign: 'center',
    }}>
    <HomeStack.Screen
      name="Home"
      component={Home}
      options={{
        title: 'Home',
        headerLeft: () => (
          <TouchableOpacity
            style={styles.headerBar}
            onPress={() => navigation.openDrawer()}>
            <Icon name={'bars'} size={25} color="white"></Icon>
          </TouchableOpacity>
        ),
      }}
    />
  </HomeStack.Navigator>
);

const CalendarStackScreen = ({navigation}) => (
  <CalendarStack.Navigator
    screenOptions={{
      headerStyle: {backgroundColor: theme.colors.mainColor},
      headerTintColor: 'white',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
      headerTitleAlign: 'center',
    }}>
    <CalendarStack.Screen
      name="Calendar"
      component={Calendar}
      options={{
        headerLeft: () => (
          <TouchableOpacity
            style={styles.headerBar}
            onPress={() => navigation.openDrawer()}>
            <Icon name={'bars'} size={25} color="white"></Icon>
          </TouchableOpacity>
        ),
      }}
    />
  </CalendarStack.Navigator>
);

const ProfileStackScreen = ({navigation}) => (
  <ProfileStack.Navigator
    screenOptions={{
      headerStyle: {backgroundColor: theme.colors.mainColor},
      headerTintColor: 'white',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
      headerTitleAlign: 'center',
    }}>
    <ProfileStack.Screen
      name="Profile"
      component={Profile}
      options={{
        headerLeft: () => (
          <TouchableOpacity
            style={styles.headerBar}
            onPress={() => navigation.openDrawer()}>
            <Icon name={'bars'} size={25} color="white"></Icon>
          </TouchableOpacity>
        ),
      }}
    />
    <ProfileStack.Screen name="About" component={About} />
    <ProfileStack.Screen name="Service" component={Service} />
    <ProfileStack.Screen name="SetPassword" component={SetPassword} />
  </ProfileStack.Navigator>
);

const ScanStackScreen = ({navigation}) => (
  <ScanStack.Navigator
    screenOptions={{
      headerStyle: {backgroundColor: theme.colors.mainColor},
      headerTintColor: 'white',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
      headerTitleAlign: 'center',
    }}>
    <ScanStack.Screen
      name="Scan"
      component={Scan}
      options={{
        headerLeft: () => (
          <TouchableOpacity
            style={styles.headerBar}
            onPress={() => navigation.openDrawer()}>
            <Icon name={'bars'} size={25} color="white"></Icon>
          </TouchableOpacity>
        ),
      }}
    />
  </ScanStack.Navigator>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    maxWidth: 400,
    alignSelf: 'center',
    justifyContent: 'center',
    fontSize: 16,
  },
  tab: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.mainColor,
  },
  headerBar: {
    width: 35,
    height: 35,
    marginLeft: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
