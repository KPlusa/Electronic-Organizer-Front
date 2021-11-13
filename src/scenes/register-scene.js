import React, {useState} from 'react';
import {TouchableOpacity, StyleSheet, View} from 'react-native';
import Background from '../components/background';
import Logo from '../components/logo';
import Button from '../components/button';
import BackButton from '../components/back-button';
import Input from '../components/input-text';
import {theme} from '../themes/theme';
import {Divider, Text} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {EmailValidator} from '../helpers/email-validator';
import {
  PasswordValidator,
  ConfirmValidator,
} from '../helpers/password-validator';

export default function LoginScene({navigation}) {
  const [email, setEmail] = useState({value: '', error: ''});
  const [password, setPassword] = useState({value: '', error: ''});
  const [password2, setPassword2] = useState({value: '', error: ''});
  const emailRef = React.createRef();
  const passwordRef = React.createRef();
  const password2Ref = React.createRef();
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
    navigation.reset({
      index: 0,
      routes: [{name: 'StartScene'}],
    });
  };

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Logo />
      <Text h3 style={[{color: theme.colors.mainColor}, {fontSize: 20}]}>
        Create an account!
      </Text>
      <Divider orientation="horizontal" height={20} />
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
        errorStyle={{color: theme.colors.error}}
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
        errorStyle={{color: theme.colors.error}}
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
        errorStyle={{color: theme.colors.error}}
        leftIcon={{type: 'font-awesome', name: 'lock', size: 20}}
        onSubmitEditing={onSignUpPressed}
      />
      <Divider orientation="horizontal" height={10} />
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
});
