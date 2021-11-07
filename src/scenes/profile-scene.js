import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Overlay, Divider, Text, Avatar} from 'react-native-elements';
import Button from '../components/button';
import Background from '../components/background';
import {theme} from '../themes/theme';
import {TouchableOpacity} from 'react-native-gesture-handler';

export default function Profile({navigation}) {
  const [visible, setVisible] = useState(false);
  const toggleOverlay = param => {
    setVisible(!visible);
    if (param === 'yes') {
      navigation.reset({
        index: 0,
        routes: [{name: 'StartScene'}],
      });
    } else setVisible(!visible);
  };
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
      <View
        elevation={4}
        style={styles.rectangle}
        height={345}
        justifyContent={'flex-end'}>
        <Button
          icon={
            <Icon
              name="sign-out"
              size={20}
              color="white"
              style={{marginRight: 10}}
            />
          }
          style={[
            {height: 50},
            {width: 300},
            {backgroundColor: theme.colors.mainColor},
            {alignSelf: 'flex-start'},
          ]}
          title="SIGN OUT"
          txtStyle={{justifyContent: 'center'}}
          onPress={toggleOverlay}
        />
        <TouchableOpacity style={styles.topacity} onPress= {() => navigation.navigate('About')}>
          <Text style={{fontSize: 15}}>About app</Text>
        </TouchableOpacity>
        <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
          <Text style={styles.overlayText}>
            Are you sure you want to log out?
          </Text>
          <View style={styles.section}>
            <Button
              style={styles.overlayButton}
              titleStyle={{
                fontSize: 16,
                lineHeight: 16,
              }}
              title="Yes"
              onPress={() => toggleOverlay('yes')}
            />
            <View style={styles.overlayDivider}></View>
            <Button
              style={styles.overlayButton}
              titleStyle={{
                fontSize: 16,
                lineHeight: 16,
              }}
              title="No"
              onPress={() => toggleOverlay('no')}
            />
          </View>
        </Overlay>
      </View>
    </Background>
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
  topacity: {
    marginBottom: 10,
    marginTop: 10,
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
    justifyContent: 'center',
  },
  overlayButton: {
    width: 50,
    backgroundColor: theme.colors.thirdColor,
  },
  overlayDivider: {
    margin: 5,
  },
  overlayText: {
    fontSize: 16,
    margin: 10,
    fontWeight: 'bold',
    color: theme.colors.mainColor,
  },
});