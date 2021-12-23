import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Dimensions, ActivityIndicator} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {Overlay, Divider, Text, Avatar} from 'react-native-elements';
import Button from '../components/button';
import Background from '../components/background';
import {theme} from '../themes/theme';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {StoreData, GetData, RemoveData} from '../helpers/store-data';
import ImagePickerOverlay from '../components/image-picker-overlay';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import axios from 'axios';
import {config} from '../configs/config';

export default function Profile({navigation}) {
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState();
  const [avatar, setAvatar] = useState();
  const [image, setImage] = useState(avatar);
  const [visiblePicker, setVisiblePicker] = useState(false);
  const [passwordExistance, setPasswordExistance] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const tooglePicker = () => {
    setVisiblePicker(!visiblePicker);
  };
  const SelectedImage = childData => {
    setImage(avatar);
    setAvatar(childData);
  };
  const PasswordExistance = childData => {
    setPasswordExistance(childData);
  };
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
      navigation.reset({
        index: 0,
        routes: [{name: 'StartScene'}],
      });
    } else setVisible(!visible);
  };
  useEffect(() => {
    GetData('avatar').then(res => {
      setAvatar(res);
    });
    GoogleSignin.configure({
      webClientId: config.google_id,
    });

    const unsubscribe = navigation.addListener('focus', () => {
      GetData('token').then(token => {
        GetData('email').then(mail => {
          setEmail(mail);
          axios
            .post(
              `${config.api_url}/EndUsers`,
              {
                userMail: mail,
              },
              {headers: {Authorization: `Bearer ${token}`}},
            )
            .then(response => {
              if (response.status === 200) setPasswordExistance(true);
              else setPasswordExistance(false);
            })
            .catch(error => {})
            .finally(() => setLoading(false));
        });
      });
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);
  return (
    <Background>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <>
          <View elevation={4} style={styles.rectangle}>
            <Text h3 style={styles.header}>
              Welcome
            </Text>
            <TouchableOpacity onPress={tooglePicker}>
              {avatar ? (
                <Avatar
                  rounded
                  source={{uri: avatar}}
                  size={70}
                  avatarStyle={{alignItems: 'flex-start'}}
                />
              ) : null}
            </TouchableOpacity>
            {image !== avatar && image ? (
              <View style={{flexDirection: 'row'}}>
                <TouchableOpacity
                  onPress={() => {
                    setAvatar(image);
                  }}
                  style={{marginTop: 10}}>
                  <Icon name="undo" size={20} color={theme.colors.mainColor} />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setAvatar(image);
                  }}
                  style={{marginTop: 10, marginLeft: 10}}>
                  <Icon name="check" size={20} color={theme.colors.mainColor} />
                </TouchableOpacity>
              </View>
            ) : null}
            {email ? <Text style={styles.user}>{email}</Text> : null}
          </View>
          <Divider orientation="horizontal" height={20} />
          <ImagePickerOverlay
            visiblePicker={visiblePicker}
            tooglePicker={tooglePicker}
            selectedImage={SelectedImage}
          />
          <View
            elevation={4}
            style={styles.rectangle}
            height={Dimensions.get('window').height - 370}
            justifyContent={'flex-end'}>
            <View style={styles.subRectangle}>
              <View>
                <Button
                  icon={
                    <FontAwesome5
                      name="cut"
                      size={20}
                      color="white"
                      style={{marginRight: 10}}
                    />
                  }
                  style={styles.button}
                  title="SERVICES"
                  onPress={() => navigation.navigate('Service')}
                />
                <Button
                  icon={
                    <Ionicons
                      name="key"
                      size={20}
                      color="white"
                      style={{marginRight: 10}}
                    />
                  }
                  style={styles.button}
                  txtStyle={passwordExistance ? {fontSize: 10} : {fontSize: 12}}
                  title={passwordExistance ? 'CHANGE PASSWORD' : 'SET PASSWORD'}
                  onPress={() =>
                    navigation.navigate({
                      name: 'SetPassword',
                      params: {passwordExistance: passwordExistance},
                    })
                  }
                />
                <Button
                  icon={
                    <Icon
                      name="sign-out"
                      size={20}
                      color="white"
                      style={{marginRight: 10}}
                    />
                  }
                  style={styles.button}
                  title="SIGN OUT"
                  onPress={toggleOverlay}
                />
              </View>
              <TouchableOpacity
                style={styles.topacity}
                onPress={() => navigation.navigate('About')}>
                <Text style={{fontSize: 15}}>About app</Text>
              </TouchableOpacity>

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
        </>
      )}
    </Background>
  );
}

const styles = StyleSheet.create({
  rectangle: {
    width: '90%',
    borderRadius: 15,
    backgroundColor: 'white',
    alignItems: 'center',
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 10,
  },
  header: {
    color: theme.colors.mainColor,
    marginBottom: 10,
  },
  user: {
    color: theme.colors.mainColor,
    marginBottom: 10,
    fontSize: 16,
  },
  topacity: {
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 10,
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
  overlayText: {
    fontSize: 16,
    margin: 10,
    fontWeight: 'bold',
    color: theme.colors.thirdColor,
  },

  subRectangle: {
    width: '80%',
    borderRadius: 15,
    backgroundColor: 'white',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 10,
    marginBottom: 10,
  },
  button: {
    marginTop: 20,
    height: 50,
    backgroundColor: theme.colors.mainColor,
    alignSelf: 'center',
    justifyContent: 'flex-start',
  },
});
