import React, {useState, useEffect} from 'react';
import {View, StyleSheet, StatusBar, Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Overlay, Divider, Text, Avatar} from 'react-native-elements';
import Background from '../components/background';
import Logo from '../components/logo';
import {theme} from '../themes/theme';
import axios from 'axios';
import {config} from '../configs/config';
import {StoreData, GetData} from '../helpers/store-data';

export default function Home({navigation}) {
  const [currentDate, setCurrentDate] = useState('');
  const [upcomingEvent, setUpcomingEvent] = useState('');
  const [title, setTitle] = useState('');
  const [remainingEvents, setRemainingEvents] = useState(0);

  const getUpcomingEvent = () => {
    GetData('token').then(token => {
      GetData('email').then(mail => {
        axios
          .post(
            `${config.api_url}/Events/upcoming`,
            {
              userMail: mail,
            },
            {headers: {Authorization: `Bearer ${token}`}},
          )
          .then(response => {
            if (response.status !== 204) {
              const json = JSON.parse(response.data.data);
              setTitle(json[0].title);
              setUpcomingEvent(json[0].upcomingEvent);
              setRemainingEvents(json[0].remainingEvents);
            } else {
              setTitle('');
              setUpcomingEvent('');
              setRemainingEvents(0);
            }
          })
          .catch(error => {
            console.log(error);
          });
      });
    });
  };

  useEffect(() => {
    getUpcomingEvent();
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
    const focus = navigation.addListener('focus', () => {
      getUpcomingEvent();
    });

    return unsubscribe, focus;
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
              style={{marginTop: 5}}
              color={theme.colors.thirdColor}
            />
            {upcomingEvent !== '' ? (
              <>
                <Text style={styles.time}>Starts at</Text>
                <Text style={[styles.time, {marginTop: -5}]}>
                  {upcomingEvent}
                </Text>
                <Text style={styles.event}>{title}</Text>
              </>
            ) : (
              <Text style={styles.event}>No upcoming event</Text>
            )}
          </View>
        </View>
        <View elevation={4} style={[styles.subRectangle, {marginBottom: 10}]}>
          <Text h3 style={styles.header}>
            Remaining Events
          </Text>
          <View style={styles.subSubRectangle}>
            <Text style={styles.remainingEvents}>{remainingEvents}</Text>
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
    fontSize: 16,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  time: {
    color: theme.colors.thirdColor,
    fontSize: 16,
    marginTop: 10,
    fontWeight: 'bold',
  },
  remainingEvents: {
    color: theme.colors.thirdColor,
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
  },
});
