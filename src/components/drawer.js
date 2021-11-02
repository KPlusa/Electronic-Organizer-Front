import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import {theme} from '../themes/theme';

import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-community/async-storage';
import {AuthContext} from '../components/context';
import {Avatar, Text, Overlay} from 'react-native-elements';
import Button from '../components/button';

export function DrawerContent(props) {
  const [visible, setVisible] = useState(false);
  const toggleOverlay = param => {
    setVisible(!visible);
    if (param === 'yes') {
      props.navigation.reset({
        index: 0,
        routes: [{name: 'StartScene'}],
      });
    } else setVisible(!visible);
  };
  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <View style={{flexDirection: 'row', marginTop: 15}}>
              <Avatar
                rounded
                source={require('../assets/images/user.png')}
                size={50}
              />
              <View style={{marginLeft: 15, flexDirection: 'column'}}>
                <Text style={styles.title}>John Doe</Text>
              </View>
            </View>
          </View>

          <View style={styles.drawerSection}>
            <DrawerItem
              icon={({color}) => (
                <View style={{width: 25, height: 25}}>
                  <Icon name="home" color={color} size={25} />
                </View>
              )}
              label="Home"
              onPress={() => {
                props.navigation.navigate('Homets');
              }}
              inactiveTintColor={theme.colors.thirdColor}
            />
            <DrawerItem
              icon={({color, size}) => (
                <View style={{width: 25, height: 25}}>
                  <Icon name="calendar" color={color} size={20} />
                </View>
              )}
              inactiveTintColor={theme.colors.thirdColor}
              label="Calendar"
              onPress={() => {
                props.navigation.navigate('Calendarts');
              }}
            />
            <DrawerItem
              icon={({color, size}) => (
                <View style={{width: 25, height: 25}}>
                  <Icon name="camera" color={color} size={size} size={20} />
                </View>
              )}
              inactiveTintColor={theme.colors.thirdColor}
              label="Scan"
              onPress={() => {
                props.navigation.navigate('Scants');
              }}
            />
            <DrawerItem
              icon={({color}) => (
                <View style={{width: 25, height: 25}}>
                  <Icon name="user" color={color} size={25} />
                </View>
              )}
              inactiveTintColor={theme.colors.thirdColor}
              label="Profile"
              onPress={() => {
                props.navigation.navigate('Profilets');
              }}
            />
          </View>
        </View>
      </DrawerContentScrollView>
      <View style={styles.bottomDrawerSection}>
        <DrawerItem
          icon={({color, size}) => (
            <Icon name="sign-out" color={color} size={size} />
          )}
          inactiveTintColor={theme.colors.thirdColor}
          label="Sign Out"
          onPress={toggleOverlay}
        />
        <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
          <Text style={styles.overlayText}>
            Are you sure you want to log out?
          </Text>
          <View style={styles.section}>
            <Button
              style={styles.overlayButton}
              titleStyle={{
                fontSize: 16,
                lineHeight: 16,
              }}
              title="Yes"
              onPress={() => toggleOverlay('yes')}
            />
            <View style={styles.overlayDivider}></View>
            <Button
              style={styles.overlayButton}
              titleStyle={{
                fontSize: 16,
                lineHeight: 16,
              }}
              title="No"
              onPress={() => toggleOverlay('no')}
            />
          </View>
        </Overlay>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    fontSize: 18,
    marginTop: 3,
    fontWeight: 'bold',
    color: theme.colors.mainColor,
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
    justifyContent: 'center',
  },
  overlayButton: {
    width: 50,
    backgroundColor: theme.colors.thirdColor,
  },
  overlayDivider: {
    margin: 5,
  },
  drawerSection: {
    marginTop: 15,
    borderTopColor: '#f4f4f4',
    borderTopWidth: 1,
    borderBottomColor: '#f4f4f4',
    borderBottomWidth: 1,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: '#f4f4f4',
    borderTopWidth: 1,
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  overlayText: {
    fontSize: 16,
    margin: 10,
    fontWeight: 'bold',
    color: theme.colors.mainColor,
  },
});
