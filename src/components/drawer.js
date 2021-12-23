import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItem,
  useDrawerStatus,
} from '@react-navigation/drawer';
import {theme} from '../themes/theme';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Avatar, Text, Overlay} from 'react-native-elements';
import Button from '../components/button';
import {StoreData, GetData, RemoveData} from '../helpers/store-data';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {config} from '../configs/config';

export function DrawerContent(props, {email}) {
  const [visible, setVisible] = useState(false);
  const [avatar, setAvatar] = useState();
  const isDrawerOpen = useDrawerStatus() === 'open';
  if (isDrawerOpen) {
    GetData('avatar').then(res => {
      setAvatar(res);
    });
  }
  const toggleOverlay = param => {
    setVisible(!visible);
    if (param === 'yes') {
      RemoveData('token');
      RemoveData('email');
      RemoveData('avatar');

      GetData('googleAccount').then(async res => {
        if (res === 'true') {
          await GoogleSignin.signOut();
        }
      });
      props.navigation.reset({
        index: 0,
        routes: [{name: 'StartScene'}],
      });
    } else setVisible(!visible);
  };
  useEffect(() => {
    GoogleSignin.configure({
      webClientId: config.google_id,
    });
  }, []);
  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <View style={{flexDirection: 'row', marginTop: 15}}>
              {avatar ? (
                <Avatar rounded source={{uri: avatar}} size={50} />
              ) : null}
              <View
                style={{
                  marginLeft: 15,
                  flexDirection: 'column',
                  justifyContent: 'center',
                }}>
                {props.email ? (
                  <Text style={styles.title}>{props.email}</Text>
                ) : null}
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
              inactiveTintColor={theme.colors.mainColor}
            />
            <DrawerItem
              icon={({color, size}) => (
                <View style={{width: 25, height: 25}}>
                  <Icon name="calendar" color={color} size={20} />
                </View>
              )}
              inactiveTintColor={theme.colors.mainColor}
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
              inactiveTintColor={theme.colors.mainColor}
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
              inactiveTintColor={theme.colors.mainColor}
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
    fontSize: 16,
    marginTop: 3,
    fontWeight: 'bold',
    color: theme.colors.thirdColor,
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
    color: theme.colors.thirdColor,
  },
});
