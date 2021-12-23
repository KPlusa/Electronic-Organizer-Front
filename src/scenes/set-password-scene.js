import React, {useState, useEffect} from 'react';
import {View, StyleSheet, StatusBar, BackHandler} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Overlay, Divider, Text} from 'react-native-elements';
import Button from '../components/button';
import Background from '../components/background';
import {theme} from '../themes/theme';
import {config} from '../configs/config';
import Input from '../components/input-text';
import SuccessfulOverlay from '../components/successful-overlay';
import BackButton from '../components/back-button';
import {StoreData, GetData, RemoveData} from '../helpers/store-data';
import {
  PasswordValidator,
  ConfirmValidator,
  OldPasswordValidator,
} from '../helpers/password-validator';
import axios from 'axios';

export default function SetPassword({navigation, route}) {
  const [oldPassword, setOldPassword] = useState({value: '', error: ''});
  const [password, setPassword] = useState({value: '', error: ''});
  const [password2, setPassword2] = useState({value: '', error: ''});
  const [isBack, setBack] = useState(false);
  const [isSuccessfulOverlayVisible, setSuccessfulOverlayVisibility] =
    useState(false);
  const oldPasswordRef = React.createRef();
  const passwordRef = React.createRef();
  const password2Ref = React.createRef();
  const onOkPressed = () => {
    const oldPasswordError = OldPasswordValidator(oldPassword.value);
    const passwordError = PasswordValidator(password.value, password2.value);
    const confirmError = ConfirmValidator(password.value, password2.value);
    if (route.params?.passwordExistance) {
      if (oldPasswordError || passwordError || confirmError) {
        setOldPassword({...oldPassword, error: oldPasswordError});
        setPassword({...password, error: passwordError});
        setPassword2({...password2, error: confirmError});
        return;
      }
    } else {
      if (passwordError || confirmError) {
        setPassword({...password, error: passwordError});
        setPassword2({...password2, error: confirmError});
        return;
      }
    }
    GetData('token').then(token => {
      GetData('email').then(mail => {
        axios
          .post(
            `${config.api_url}/EndUsers/set-password`,
            {
              userMail: mail,
              oldPassword: oldPassword.value,
              password: password.value,
            },
            {
              headers: {Authorization: `Bearer ${token}`},
            },
          )
          .then(response => {
            if (response.data.status === 'Success') {
              setSuccessfulOverlayVisibility(true);
              setBack(true);
              setTimeout(() => {
                navigation.goBack();
                setSuccessfulOverlayVisibility(false);
              }, 1000);
            }
          })
          .catch(error => {
            if (!error.response) {
              setPassword2({...password2, error: 'Network error.'});
            } else {
              if (error.response.data) {
                setPassword2({
                  ...password2,
                  error: error.response.data.message,
                });
              }
            }
            return;
          });
      });
    });
  };
  useEffect(() => {
    isBackButtonPressed = false;
    BackHandler.addEventListener('hardwareBackPress', () => {
      isBackButtonPressed = true;
    });
    navigation.setOptions({
      headerLeft: () => (
        <BackButton
          color={theme.colors.backgroundColor}
          goBack={() => {
            navigation.goBack();
            isBackButtonPressed = true;
          }}
        />
      ),
    });
    if (!isBack) {
      const unsubscribe = navigation.addListener('blur', async () => {
        isBackButtonPressed ? null : navigation.goBack();
      });
      return unsubscribe;
    }
  }, [navigation, isBack]);
  return (
    <Background>
      <View elevation={4} style={styles.rectangle}>
        {route.params?.passwordExistance ? (
          <Text h3 style={styles.title}>
            New Password
          </Text>
        ) : (
          <Text h3 style={styles.title}>
            Set Password
          </Text>
        )}
        <View style={styles.subRectangle}>
          {route.params?.passwordExistance ? (
            <Input
              refs={oldPasswordRef}
              style={styles.inputStyle}
              inputContainerStyle={styles.inputContainerStyle}
              placeholder="Old password"
              returnKeyType="next"
              value={oldPassword.value}
              onChangeText={text => setOldPassword({value: text, error: ''})}
              error={!!oldPassword.error}
              errorMessage={oldPassword.error}
              secureTextEntry
              errorStyle={styles.errorStyle}
              leftIcon={{type: 'font-awesome', name: 'lock', size: 20}}
              onSubmitEditing={() => passwordRef.current.focus()}
            />
          ) : null}
          <Input
            refs={passwordRef}
            style={styles.inputStyle}
            inputContainerStyle={styles.inputContainerStyle}
            placeholder="Password"
            returnKeyType="next"
            value={password.value}
            onChangeText={text => setPassword({value: text, error: ''})}
            error={!!password.error}
            errorMessage={password.error}
            secureTextEntry
            errorStyle={styles.errorStyle}
            leftIcon={{type: 'font-awesome', name: 'lock', size: 20}}
            onSubmitEditing={() => password2Ref.current.focus()}
          />
          <Input
            refs={password2Ref}
            style={styles.inputStyle}
            inputContainerStyle={styles.inputContainerStyle}
            placeholder="Confirm password"
            returnKeyType="next"
            value={password2.value}
            onChangeText={text => setPassword2({value: text, error: ''})}
            secureTextEntry
            error={!!password2.error}
            errorMessage={password2.error}
            errorStyle={styles.errorStyle}
            leftIcon={{type: 'font-awesome', name: 'lock', size: 20}}
            onSubmitEditing={onOkPressed}
          />
        </View>
        <View style={styles.section}>
          <Button
            style={styles.overlayButton}
            titleStyle={{
              fontSize: 16,
              lineHeight: 16,
            }}
            title="OK"
            onPress={onOkPressed}
          />
          <View style={styles.overlayDivider}></View>
          <Button
            style={styles.overlayButton}
            titleStyle={{
              fontSize: 16,
              lineHeight: 16,
            }}
            title="Cancel"
            onPress={() => {
              navigation.goBack();
              isBackButtonPressed = true;
            }}
          />
        </View>
      </View>
      {isSuccessfulOverlayVisible ? <SuccessfulOverlay /> : null}
    </Background>
  );
}
const styles = StyleSheet.create({
  container: {
    width: '70%',
    height: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    color: theme.colors.mainColor,
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  rectangle: {
    width: '90%',
    height: '95%',
    borderRadius: 15,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 10,
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
  },
  section: {
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  overlayButton: {
    width: 100,
    backgroundColor: theme.colors.mainColor,
  },
  overlayDivider: {
    margin: 5,
  },
  errorStyle: {
    width: '80%',
    alignSelf: 'center',
    color: theme.colors.error,
  },
  inputStyle: {
    height: 50,
    width: '80%',
  },
  inputContainerStyle: {
    height: 50,
    width: '80%',
    alignSelf: 'center',
  },
});
