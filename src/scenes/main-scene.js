import React from 'react';
import Background from '../components/background';
import Logo from '../components/logo';
import Button from '../components/button';
import BackButton from '../components/back-button';
import {theme} from '../themes/theme';
import {Divider, Text} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Input} from 'react-native-elements';
export default function MainScene({navigation}) {
  return (
    <Background>
      <Text style={[{color: 'black'}, {fontSize: 16}]}>MainScene</Text>
      <Divider orientation="horizontal" height={60} />
      <Button
        type="solid"
        style={[
          {height: 50},
          {width: 300},
          {backgroundColor: theme.colors.mainColor},
        ]}
        title="LOGOUT"
        color={theme.colors.mainColor}
        onPress={() => navigation.reset({
            index: 0,
            routes: [{ name: 'StartScene' }],
          })}></Button>
      <Divider orientation="horizontal" height={20} />
    </Background>
  );
}
