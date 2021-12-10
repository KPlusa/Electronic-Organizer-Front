import React, {useState} from 'react';
import {TouchableOpacity, StyleSheet, View, TextInput} from 'react-native';
import Background from '../components/background';
import Logo from '../components/logo';
import Button from '../components/button';
import BackButton from '../components/back-button';
import Input from '../components/input-text';
import {theme} from '../themes/theme';
import {config} from '../configs/config';
import {Divider, Text} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {EmailValidator} from '../helpers/email-validator';
import {PasswordValidator} from '../helpers/password-validator';
import axios from 'axios';

export default function LoginScene({navigation}) {
  const [email, setEmail] = useState({value: '', error: ''});
  const [password, setPassword] = useState({value: '', error: ''});

  const onLoginPressed = () => {
    const emailError = EmailValidator(email.value);
    const passwordError = PasswordValidator(password.value);
    
    if (emailError || passwordError) {
      setEmail({...email, error: emailError});
      setPassword({...password, error: passwordError});
      return;
    }
    console.log('email: ', email.value);
    axios.post(`${config.api_url}/Authentication/login`,{
      
        email: email.value,
        password: password.value
      
    },)
    .then((response) => {
       console.log(response.data);
    })
    .catch((error) => {
      console.log(error);
       return;
    });
    // navigation.reset({
    //   index: 0,
    //   routes: [{name: 'MainScene'}],
    // });
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
        <Text>Don’t have an account? </Text>
        <TouchableOpacity onPress={() => navigation.replace('RegisterScene')}>
          <Text style={styles.signUp}>Sign up</Text>
        </TouchableOpacity>
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
});
