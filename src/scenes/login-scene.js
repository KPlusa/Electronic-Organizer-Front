import React, {useState, useEffect} from 'react';
import {TouchableOpacity, StyleSheet, View, TextInput} from 'react-native';
import Background from '../components/background';
import Logo from '../components/logo';
import Button from '../components/button';
import BackButton from '../components/back-button';
import Input from '../components/input-text';
import {theme} from '../themes/theme';
import {config} from '../configs/config';
import {Divider, Text, SocialIcon} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {EmailValidator} from '../helpers/email-validator';
import {PasswordValidator} from '../helpers/password-validator';
import axios from 'axios';
import {StoreData, GetData} from '../helpers/store-data';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';

export default function LoginScene({navigation}) {

  GoogleSignin.configure({
  scopes: ['https://www.googleapis.com/auth/drive.readonly'], // [Android] what API you want to access on behalf of the user, default is email and profile
  webClientId: config.google_id, // client ID of type WEB for your server (needed to verify user ID and offline access)
  offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
});
  const [email, setEmail] = useState({value: '', error: ''});
  const [password, setPassword] = useState({value: '', error: ''});
  const [userinfo, setUserInfo] = useState();
  signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      setUserInfo(userInfo);
      console.log(userInfo);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log("cancelled");
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
        console.log("in progress");
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
        console.log("service not available");
      } else {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    // GoogleSignin.configure({
    //   webClientId: config.google_id,
    // });
  }, []);
  const onLoginPressed = () => {
    resetValues();
    const emailError = EmailValidator(email.value);
    const passwordError = PasswordValidator(password.value);

    if (emailError || passwordError) {
      setEmail({...email, error: emailError});
      setPassword({...password, error: passwordError});
      return;
    }
    axios
      .post(`${config.api_url}/Authentication/login`, {
        email: email.value,
        password: password.value,
      })
      .then(response => {
        //console.log(response.data);
        if (response.data.status === 'Success') {
          //console.log(response.data.token);
          StoreData('token', response.data.token);
          navigation.reset({
            index: 0,
            routes: [{name: 'MainScene'}],
          });
        }
      })
      .catch(error => {
        console.log(error);
        if (!error.response) {
          setPassword({...password, error: 'Network error.'});
        } else {
          if (error.response.data) {
            setEmail({...email, error: error.response.data.message});
          }
        }

        return;
      });
  };
  const resetValues = () => {
    setEmail({...email, error: ''});
    setPassword({...password, error: ''});
  };

  const emailRef = React.createRef();
  const passwordRef = React.createRef();

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Logo />
      <Text h3 style={[{color: theme.colors.mainColor}, {fontSize: 20}]}>
        Welcome back!
      </Text>
      <Divider orientation="horizontal" height={30} />
      <Input
        refs={emailRef}
        style={{height: 50, width: 300}}
        inputContainerStyle={{
          height: 50,
          width: 300,
          alignSelf: 'center',
          maxWidth: 800,
        }}
        placeholder="Email"
        returnKeyType="next"
        value={email.value}
        onChangeText={text => setEmail({value: text, error: ''})}
        error={!!email.error}
        errorMessage={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
        errorStyle={styles.errorStyle}
        leftIcon={{type: 'font-awesome', name: 'envelope', size: 15}}
        onSubmitEditing={() => passwordRef.current.focus()}
        blurOnSubmit={false}
        forwardRef={true}
      />

      <Input
        refs={passwordRef}
        style={{height: 50, width: 300}}
        inputContainerStyle={{
          height: 50,
          width: 300,
          alignSelf: 'center',
          maxWidth: 800,
        }}
        placeholder="Password"
        returnKeyType="next"
        value={password.value}
        onChangeText={text => setPassword({value: text, error: ''})}
        error={!!password.error}
        errorMessage={password.error}
        secureTextEntry
        errorStyle={styles.errorStyle}
        leftIcon={{type: 'font-awesome', name: 'lock', size: 20}}
        onSubmitEditing={onLoginPressed}
      />
      <Divider orientation="horizontal" height={10} />
      <Button
        type="solid"
        style={[
          {height: 50},
          {width: 300},
          {backgroundColor: theme.colors.mainColor},
        ]}
        title="LOGIN"
        color={theme.colors.mainColor}
        onPress={onLoginPressed}></Button>

      <View style={styles.row}>
        <Text style={{color: 'gray'}}>Don’t have an account? </Text>
        <TouchableOpacity onPress={() => navigation.replace('RegisterScene')}>
          <Text style={styles.signUp}>Sign up</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.column}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            width: 300,
            marginTop: 20,
            marginBottom: 10,
          }}>
          <View style={[styles.lineStyle, {marginRight: 10}]} />
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{color: 'gray'}}>Or Login with</Text>
          </View>
          <View style={[styles.lineStyle, {marginLeft: 10}]} />
        </View>

        <SocialIcon
          type="google"
          underlayColor="gray"
          style={{backgroundColor: 'white'}}
          iconColor="#b70000"
          onPress={signIn}
          //disabled={isSigninInProgress}
        />
        {/* <GoogleSigninButton
          style={{
            width: 48,
            height: 48,
            borderRadius: 20,
            backgroundColor: 'blue',
          }}
          size={GoogleSigninButton.Size.Icon}
          // onPress={this._signIn}
          // disabled={this.state.isSigninInProgress}
        /> */}
      </View>
    </Background>
  );
}
const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    alignSelf: 'center',
    justifyContent: 'center',
    fontSize: 16,
  },
  column: {
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    alignSelf: 'center',
    justifyContent: 'center',
    fontSize: 16,
  },
  signUp: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.mainColor,
  },
  errorStyle: {
    width: 300,
    alignSelf: 'center',
    color: theme.colors.error,
  },
  lineStyle: {
    flex: 1,
    height: 1,
    backgroundColor: 'gray',
  },
});
