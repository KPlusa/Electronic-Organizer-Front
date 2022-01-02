import React, {useState, useEffect} from 'react';
import {View, StyleSheet, StatusBar, Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Overlay, Divider, Text, Avatar} from 'react-native-elements';
import Background from '../components/background';
import Logo from '../components/logo';
import {theme} from '../themes/theme';

export default function Home({navigation}) {
  const [currentDate, setCurrentDate] = useState('');
  useEffect(() => {
    const date = new Date();
    setCurrentDate(
      String(date.getDate()).padStart(2, '0') +
        '-' +
        String(date.getMonth() + 1).padStart(2, '0') +
        '-' +
        String(date.getFullYear()),
    );
    const unsubscribe = navigation.addListener('blur', () => {
      setCurrentDate(
        String(date.getDate()).padStart(2, '0') +
          '-' +
          String(date.getMonth() + 1).padStart(2, '0') +
          '-' +
          String(date.getFullYear()),
      );
    });

    return unsubscribe;
  }, [navigation, currentDate]);
  return (
    <Background>
      <View elevation={4} style={styles.rectangle}>
        <Logo {...{width: 150, height: 100}} />
      </View>
      <Divider orientation="horizontal" height={20} />
      <View elevation={4} style={styles.rectangle} justifyContent={'center'}>
        <View elevation={4} style={styles.subRectangle}>
          <Text h3 style={styles.header}>
            Today's date
          </Text>
          <View style={styles.subSubRectangle}>
            <Text style={styles.remainingEvents}>{currentDate}</Text>
          </View>
        </View>
        <View elevation={4} style={styles.subRectangle}>
          <Text h3 style={styles.header}>
            Upcoming Event
          </Text>
          <View style={styles.subSubRectangle}>
            <Icon
              name={'clock-o'}
              size={30}
              style={{marginTop: 10}}
              color={theme.colors.thirdColor}
            />
            <Text style={styles.time}>Starts at 17:00</Text>
            <Text style={styles.event}>Men's haircut</Text>
          </View>
        </View>
        <View elevation={4} style={[styles.subRectangle, {marginBottom: 10}]}>
          <Text h3 style={styles.header}>
            Remaining Events
          </Text>
          <View style={styles.subSubRectangle}>
            <Text style={styles.remainingEvents}>4</Text>
          </View>
        </View>
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
    width: '90%',
    borderRadius: 15,
    backgroundColor: 'white',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 10,
  },
  subRectangle: {
    width: '80%',
    borderRadius: 15,
    backgroundColor: theme.colors.mainColor,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 10,
    marginTop: 10,
  },
  subSubRectangle: {
    width: '80%',
    borderRadius: 15,
    backgroundColor: 'white',
    alignItems: 'center',
    marginBottom: 10,
  },
  header: {
    color: 'white',
    marginBottom: 10,
    marginTop: 10,
  },
  event: {
    color: theme.colors.thirdColor,
    fontSize: 20,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  time: {
    color: theme.colors.thirdColor,
    fontSize: 20,
    marginTop: 10,
    fontWeight: 'bold',
  },
  remainingEvents: {
    color: theme.colors.thirdColor,
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
  },
});
