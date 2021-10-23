import React from 'react';
import Background from '../components/background';
import Logo from '../components/logo';
import Button from '../components/button';
import {Divider, Text} from 'react-native-elements';
export default function StartScene({navigation}) {
  return (
    <Background>
      <Logo />
      <Text h3 style={[{color: '#3b6ea5'}, {fontSize: 20}]}>
        Electronic organizer
      </Text>

      <Text style={[{color: 'black'}, {fontSize: 16}]}>Note it easier!</Text>
      <Divider orientation="horizontal" height={60} />
      <Button
        type="solid"
        style={[{height: 50}, {width: 300}, {backgroundColor: '#3b6ea5'}]}
        title="LOGIN"
        color="#3b6ea5"
        onPress={() => navigation.navigate('login-scene')}>
        </Button>
      <Divider orientation="horizontal" height={20} />
      <Button
        type="outline"
        style={[{height: 50}, {width: 300}, {backgroundColor: 'white'}]}
        txtStyle={[{color: '#3b6ea5'}]}
        title="SIGN UP">
        </Button>

    </Background>
  );
}
