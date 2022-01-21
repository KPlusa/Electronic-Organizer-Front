import React from 'react';
import Background from '../components/background';
import Logo from '../components/logo';
import Button from '../components/button';
import BackButton from '../components/back-button';
import {theme} from '../themes/theme';
import {Divider, Text} from 'react-native-elements';
export default function StartScene({navigation}) {
  return (
    <Background>
      <Logo />
      <Text h3 style={[{color: theme.colors.mainColor}, {fontSize: 20}]}>
        Electronic organizer
      </Text>
      <Text style={[{color: 'black'}, {fontSize: 16}]}>Note it easier!</Text>
      <Divider orientation="horizontal" height={60} />
      <Button
        type="solid"
        style={[
          {height: 50},
          {width: 300},
          {backgroundColor: theme.colors.mainColor},
        ]}
        title="LOGIN"
        color={theme.colors.mainColor}
        onPress={() => navigation.navigate('LoginScene')}></Button>
      <Divider orientation="horizontal" height={20} />
      <Button
        type="outline"
        style={[
          {height: 50},
          {width: 300},
          {backgroundColor: theme.colors.backgroundColor},
        ]}
        txtStyle={[{color: theme.colors.mainColor}]}
        title="SIGN UP"
        onPress={() => navigation.navigate('RegisterScene')}></Button>
    </Background>
  );
}
