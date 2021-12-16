import React, {useState} from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  View,
  ScrollView,
  TextInput,
} from 'react-native';
import Background from '../components/background';
import Logo from '../components/logo';
import Button from '../components/button';
import BackButton from '../components/back-button';
import Input from '../components/input-text';
import {theme} from '../themes/theme';
import {Divider, Text, Avatar} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {EmailValidator} from '../helpers/email-validator';
import ImagePickerOverlay from '../components/image-picker-overlay';
import {config} from '../configs/config';
import SuccessfulOverlay from '../components/successful-overlay';
import {
  PasswordValidator,
  ConfirmValidator,
} from '../helpers/password-validator';
import axios from 'axios';

export default function RegisterScene({navigation}) {
  const [email, setEmail] = useState({value: '', error: ''});
  const [password, setPassword] = useState({value: '', error: ''});
  const [password2, setPassword2] = useState({value: '', error: ''});
  const [visiblePicker, setVisiblePicker] = useState(false);
  const [image, setImage] = useState(theme.sources.defaultAvatar);
  const [isSuccessfulOverlayVisible, setSuccessfulOverlayVisibility] =
    useState(false);
  const tooglePicker = () => {
    setVisiblePicker(!visiblePicker);
  };
  const emailRef = React.createRef();
  const passwordRef = React.createRef();
  const password2Ref = React.createRef();

  const SelectedImage = childData => {
    setImage(childData);
    console.log('Log: ' + childData);
  };

  const onSignUpPressed = () => {
    const emailError = EmailValidator(email.value);
    const passwordError = PasswordValidator(password.value, password2.value);
    const confirmError = ConfirmValidator(password.value, password2.value);
    if (emailError || passwordError || confirmError) {
      setEmail({...email, error: emailError});
      setPassword({...password, error: passwordError});
      setPassword2({...password2, error: confirmError});
      return;
    }
    axios
      .post(`${config.api_url}/Authentication/register`, {
        email: email.value,
        password: password.value,
        avatar: image,
      })
      .then(response => {
        if (response.data.status === 'Success') {
          setSuccessfulOverlayVisibility(true);
          setTimeout(() => {
            navigation.reset({
              index: 0,
              routes: [{name: 'LoginScene'}],
            });
          }, 1000);
        }
      })
      .catch(error => {
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

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Logo />
      <Text h3 style={[{color: theme.colors.mainColor}, {fontSize: 20}]}>
        Create an account!
      </Text>
      <View
        style={{
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          paddingTop: 10,
        }}>
        <View>
          <Text style={{color: theme.colors.secondColor, fontSize: 20}}>
            Avatar
          </Text>
        </View>
        <TouchableOpacity onPress={tooglePicker}>
          <Avatar
            rounded
            source={{uri: image}}
            size={100}
            avatarStyle={{borderColor: theme.colors.thirdColor}}
          />
        </TouchableOpacity>
        {image !== theme.sources.defaultAvatar ? (
          <TouchableOpacity
            onPress={() => {
              setImage(theme.sources.defaultAvatar);
            }}
            style={{marginTop: 10}}>
            <Icon name="undo" size={20} color={theme.colors.mainColor} />
          </TouchableOpacity>
        ) : null}
      </View>
      <ImagePickerOverlay
        visiblePicker={visiblePicker}
        tooglePicker={tooglePicker}
        selectedImage={SelectedImage}
      />
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
        onSubmitEditing={() => password2Ref.current.focus()}
      />
      <Input
        refs={password2Ref}
        style={{height: 50, width: 300}}
        inputContainerStyle={{
          height: 50,
          width: 300,
          alignSelf: 'center',
          maxWidth: 800,
        }}
        placeholder="Confirm password"
        returnKeyType="next"
        value={password2.value}
        onChangeText={text => setPassword2({value: text, error: ''})}
        secureTextEntry
        error={!!password2.error}
        errorMessage={password2.error}
        errorStyle={styles.errorStyle}
        leftIcon={{type: 'font-awesome', name: 'lock', size: 20}}
        onSubmitEditing={onSignUpPressed}
      />
      <Button
        type="solid"
        style={[
          {height: 50},
          {width: 300},
          {backgroundColor: theme.colors.mainColor},
        ]}
        title="SIGN UP"
        color={theme.colors.mainColor}
        onPress={onSignUpPressed}></Button>
      <View style={styles.row}>
        <Text>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.replace('LoginScene')}>
          <Text style={styles.signUp}>Login</Text>
        </TouchableOpacity>
      </View>
      {isSuccessfulOverlayVisible ? <SuccessfulOverlay /> : null}
    </Background>
  );
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
  buttonBottom: {
    height: 30,
    width: '20%',
    backgroundColor: theme.colors.mainColor,
    alignSelf: 'center',
  },
  errorStyle: {
    width: 300,
    alignSelf: 'center',
    color: theme.colors.error,
  },
});
