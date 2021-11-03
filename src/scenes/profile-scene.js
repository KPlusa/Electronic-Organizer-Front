import React, {useState} from 'react';
import {View, StyleSheet, StatusBar} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Overlay, Divider, Text, Avatar} from 'react-native-elements';
import Button from '../components/background';
import Background from '../components/background';
import {theme} from '../themes/theme';
import {TouchableOpacity} from 'react-native-gesture-handler';

export default function Profile({navigation}) {
  return (
    <Background>
      <View elevation={4} style={styles.rectangle}>
        <Text h3 style={styles.header}>
          Welcome
        </Text>

        <Avatar
          rounded
          source={require('../assets/images/user.png')}
          size={70}
          avatarStyle={{alignItems: 'flex-start'}}
        />

        <Text style={styles.user}>user@example.com</Text>
      </View>
      <Divider orientation="horizontal" height={20} />
      <View elevation={4} style={styles.rectangle} height={350} justifyContent= {'flex-end'} >
        <TouchableOpacity style={styles.topacity} >
          <Text style={{fontSize:20}}>SIGN OUT</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.topacity} >
          <Text style={{fontSize:15}}>About app</Text>
        </TouchableOpacity>
      </View>
    </Background>
  );
}
function OverlayComp({navigation}) {
  const [visible, setVisible] = useState(true);
  const toggleOverlay = param => {
    setVisible(true);
    if (param === 'yes') {
      navigation.reset({
        index: 0,
        routes: [{name: 'StartScene'}],
      });
    } else setVisible(false);
  };
  return (
    <Overlay isVisible={visible} onBackdropPress={() => toggleOverlay('no')}>
      <Text style={styles.tab}>Are you sure you want to log out?</Text>
      <View style={styles.row}>
        <Button title="Yes" onPress={() => toggleOverlay('yes')} />

        <Button title="No" onPress={() => toggleOverlay('no')} />
      </View>
    </Overlay>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rectangle: {
    width: '100%',
    borderRadius: 15,
    backgroundColor: 'white',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 10,
  },
  header: {
    color: theme.colors.mainColor,
    marginBottom: 10,
  },
  user: {
    color: theme.colors.mainColor,
    marginBottom: 10,
    fontSize: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    maxWidth: 400,
    alignSelf: 'center',
    justifyContent: 'center',
    fontSize: 16,
  },
  tab: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.mainColor,
  },
  topacity:{
    marginBottom:10
  }
});
