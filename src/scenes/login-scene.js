import React, {useState} from 'react';
import {TouchableOpacity, StyleSheet, View, TextInput} from 'react-native';
import Background from '../components/background';
import Logo from '../components/logo';
import Button from '../components/button';
import BackButton from '../components/back-button';
import Input from '../components/input-text';
import {theme} from '../themes/theme';
import {Divider, Text} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {emailValidator} from '../helpers/emailValidator';
import {passwordValidator} from '../helpers/passwordValidator';

export default function LoginScene({navigation}) {
  const [email, setEmail] = useState({value: '', error: ''});
  const [password, setPassword] = useState({value: '', error: ''});

  const onLoginPressed = () => {
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);
    if (emailError || passwordError) {
      setEmail({...email, error: emailError});
      setPassword({...password, error: passwordError});
      return;
    }
    navigation.reset({
      index: 0,
      routes: [{name: 'MainScene'}],
    });
  };

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Logo />
      <Text h3 style={[{color: theme.colors.mainColor}, {fontSize: 20}]}>
        Welcome back!
      </Text>
      <Divider orientation="horizontal" height={30} />
      <Input
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
      />

      <Input
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
