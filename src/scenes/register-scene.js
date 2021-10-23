import React, {useState} from 'react';
import {TouchableOpacity, StyleSheet, View, TextInput} from 'react-native';
import Background from '../components/background';
import Logo from '../components/logo';
import Button from '../components/button';
import BackButton from '../components/back-button';
import TxtInput from '../components/input-text';
import {theme} from '../themes/theme';
import {Divider, Text, Input} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {emailValidator} from '../helpers/emailValidator';
import {passwordValidator} from '../helpers/passwordValidator';
import {confirmValidator} from '../helpers/confirmValidator';

export default function LoginScene({navigation}) {
  const [email, setEmail] = useState({value: '', error: ''});
  const [password, setPassword] = useState({value: '', error: ''});
  const [password2, setPassword2] = useState({value: '', error: ''});

  const onSignUpPressed = () => {
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value, password2.value);
    const confirmError = confirmValidator(password.value, password2.value);
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
      <Input
        style={[{height: 50}, {width: 300}]}
        inputContainerStyle={[
          {height: 50},
          {width: 300},
          {maxWidth: 800},
          {alignSelf: 'center'},
          {borderColor: theme.colors.mainColor},
          {border: 5},
        ]}
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
      />
      <Input
        style={[{height: 50}, {width: 300}]}
        inputContainerStyle={[
          {height: 50},
          {width: 300},
          {maxWidth: 800},
          {alignSelf: 'center'},
          {borderColor: theme.colors.mainColor},
        ]}
        placeholder="Password"
        returnKeyType="next"
        value={password.value}
        onChangeText={text => setPassword({value: text, error: ''})}
        secureTextEntry
      />
      <Input
        style={[{height: 50}, {width: 300}]}
        inputContainerStyle={[
          {height: 50},
          {width: 300},
          {maxWidth: 800},
          {alignSelf: 'center'},
          {borderColor: theme.colors.mainColor},
        ]}
        placeholder="Confirm password"
        returnKeyType="done"
        value={password2.value}
        onChangeText={text => setPassword2({value: text, error: ''})}
        error={!!password.error}
        errorMessage={password.error}
        secureTextEntry
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
