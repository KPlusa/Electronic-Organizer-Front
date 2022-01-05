import React, {useState, useLayoutEffect, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  KeyboardAvoidingView,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {Overlay, Divider} from 'react-native-elements';
import Background from '../components/background';
import {theme} from '../themes/theme';
import {Agenda} from 'react-native-calendars';
import Input from '../components/input-text';
import Button from '../components/button';
import EmptyDate from '../components/empty-date';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {StartTimeValidator, EndTimeValidator} from '../helpers/date-validator';
import {EventValidator} from '../helpers/event-validator';
import SuccessfulOverlay from '../components/successful-overlay';
import {Text as Txt} from 'react-native-elements';
import GetItems from '../helpers/get-items';
import EventForm from '../components/event-form';
import RenderItem from '../components/render-item';
import {useHeaderHeight} from '@react-navigation/elements';
import {StoreData, GetData, RemoveData} from '../helpers/store-data';
import axios from 'axios';
import {config} from '../configs/config';
export default function Calendar({navigation}) {
  const windowHeight = Dimensions.get('window').height;
  const headerHeight = useHeaderHeight();
  const statusBarHeight = StatusBar.currentHeight;
  const agendaHeight =
    windowHeight -
    //   statusBarHeight -
    headerHeight -
    theme.sizes.bottomTabNavigatorHeight;
  const [currentDate, setCurrentDate] = useState(
    new Date().toISOString().split('T')[0],
  );
  const [items, setItems] = useState({});
  const [itemInfo, setItemInfo] = useState('');
  const [visibleEventForm, setVisibleEventForm] = useState(false);
  const [formType, setFormType] = useState('add');
  const [Events, setEvents] = useState({});
  const [isLoading, setLoading] = useState(true);
  const toogleEventForm = type => {
    if (type === 'add') setFormType('add');
    if (type === 'delete') setFormType('delete');
    if (type === 'edit') setFormType('edit');
    setVisibleEventForm(!visibleEventForm);
  };
  const timeToString = time => {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  };

  const SelectedEvent = childData => {
    fullHeaderOptions();
    setItemInfo(childData);
  };
  const fullHeaderOptions = () => {
    navigation.setOptions({
      headerRight: () => (
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            style={styles.headerButtons}
            onPress={() => toogleEventForm('add')}>
            <Icon name={'plus-circle'} size={25} color="white"></Icon>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.headerButtons}
            onPress={() => toogleEventForm('edit')}>
            <Icon name={'edit'} size={25} color="white"></Icon>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.headerButtons}
            onPress={() => toogleEventForm('delete')}>
            <Icon name={'trash'} size={25} color="white"></Icon>
          </TouchableOpacity>
        </View>
      ),
    });
  };

  const onlyAddHeaderOption = () => {
    setItemInfo('');
    navigation.setOptions({
      headerRight: () => (
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            style={styles.headerButtons}
            onPress={() => {
              //loadItems();
              setFormType('add');
              setVisibleEventForm(true);
            }}>
            <Icon name={'plus-circle'} size={25} color="white"></Icon>
          </TouchableOpacity>
        </View>
      ),
    });
  };
  const loadItems = day => {
    var myDate = currentDate;
    myDate = myDate.split('-');
    var newDate = new Date(myDate[0], myDate[1] - 1, myDate[2]);
    let timestamp;
    if (day !== undefined && day.timestamp !== undefined)
      timestamp = day.timestamp;
    else timestamp = newDate.getTime();
    const events = Events;
    for (let i = -30; i <= 60; i++) {
      const time = timestamp + i * 24 * 60 * 60 * 1000;
      const strTime = timeToString(time);
      if (!items[strTime]) {
        items[strTime] = [];
      }
      if (events[strTime]) {
        items[strTime] = events[strTime];
        for (var k in items[strTime]) {
          items[strTime][k].day = strTime;
        }
      }
    }
    const newItems = {};
    Object.keys(items).forEach(key => {
      newItems[key] = items[key];
    });
    setItems(newItems);
  };

  const getEvent = () => {
    GetData('token').then(token => {
      GetData('email').then(mail => {
        axios
          .post(
            `${config.api_url}/Events/list-events`,
            {
              userMail: mail,
            },
            {headers: {Authorization: `Bearer ${token}`}},
          )
          .then(response => {
            setEvents(JSON.parse(response.data.data));
          })
          .catch(error => {})
          .finally(() => {
            loadItems(currentDate);
          });
      });
    });
  };
  const reloadAgenda = () => {
    setEvents({});
    setItems({});
  };
  useEffect(() => {
    if (Object.keys(items).length === 0) {
      getEvent();
    }
    onlyAddHeaderOption();
    const unsubscribe = navigation.addListener('blur', () => {
      setCurrentDate(new Date().toISOString().split('T')[0]);
      onlyAddHeaderOption();
    });
    return unsubscribe;
  }, [navigation, items, Events]);

  return (
    <TouchableOpacity
      style={{flex: 1}}
      activeOpacity={1}
      onPressIn={onlyAddHeaderOption}>
      <View
        style={{
          height: agendaHeight,
        }}>
        <Agenda
          items={items}
          loadItemsForMonth={loadItems}
          renderItem={(item, firstItemInDay) => {
            return (
              <RenderItem
                item={item}
                firstItemInDay={firstItemInDay}
                selectedEvent={SelectedEvent}
                style={{
                  backgroundColor:
                    itemInfo.id === item.id
                      ? theme.colors.secondColor
                      : theme.colors.backgroundColor,
                }}
              />
            );
          }}
          renderEmptyDate={EmptyDate}
          pastScrollRange={3}
          futureScrollRange={6}
          selected={currentDate}
          onDayPress={day => {
            onlyAddHeaderOption();
            setCurrentDate(day.dateString);
          }}
          onDayChange={day => {
            setCurrentDate(day.dateString);
          }}
          hideKnob={false}
          showClosingKnob={true}
          theme={styles.agendaTheme}
        />

        <EventForm
          visibleEventForm={visibleEventForm}
          toogleEventForm={toogleEventForm}
          onlyAddHeaderOption={onlyAddHeaderOption}
          currentDate={currentDate}
          item={itemInfo}
          reloadAgenda={reloadAgenda}
          formType={formType}
          getEvent={getEvent}
          loadItems={loadItems}
        />
      </View>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerButtons: {
    width: 30,
    height: 35,
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  agendaTheme: {
    indicatorColor: theme.colors.mainColor,
    monthTextColor: theme.colors.mainColor,
    todayTextColor: theme.colors.thirdColor,
    dayTextColor: theme.colors.mainColor,
    selectedDayBackgroundColor: theme.colors.mainColor,
    dotColor: theme.colors.thirdColor,
    agendaDayNumColor: theme.colors.mainColor,
    agendaTodayColor: theme.colors.thirdColor,
    agendaKnobColor: theme.colors.mainColor,
  },
});
