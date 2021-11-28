import React, {useState} from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
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
        height={Dimensions.get('window').height - 370}
        justifyContent={'flex-end'}>
        <View style={styles.subRectangle}>
          <View>
            <Button
              icon={
                <FontAwesome5
                  name="cut"
                  size={20}
                  color="white"
                  style={{marginRight: 10}}
                />
              }
              style={styles.button}
              txtStyle={{justifyContent: 'center'}}
              title="SERVICES"
              onPress={() => navigation.navigate('Service')}
            />
            <Button
              icon={
                <Icon
                  name="sign-out"
                  size={20}
                  color="white"
                  style={{marginRight: 10}}
                />
              }
              style={styles.button}
              txtStyle={{justifyContent: 'center'}}
              title="SIGN OUT"
              onPress={toggleOverlay}
            />
          </View>
          <TouchableOpacity
            style={styles.topacity}
            onPress={() => navigation.navigate('About')}>
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
      </View>
    </Background>
  );
}

const styles = StyleSheet.create({
  rectangle: {
    width: '100%',
    borderRadius: 15,
    backgroundColor: 'white',
    alignItems: 'center',
    alignSelf: 'center',
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
  topacity: {
    alignItems: 'center',
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
    color: theme.colors.thirdColor,
  },

  subRectangle: {
    width: '80%',
    borderRadius: 15,
    backgroundColor: 'white',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 10,
    marginBottom: 10,
  },
  button: {
    marginTop: 20,
    height: 50,
    width: '80%',
    backgroundColor: theme.colors.mainColor,
    alignSelf: 'center',
  },
});
