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
import AddFormOverlay from '../components/add-form-overlay';
import EditFormOverlay from '../components/edit-form-overlay';
import DeleteFormOverlay from '../components/delete-form-overlay';
import RenderItem from '../components/render-item';
import {useHeaderHeight} from '@react-navigation/elements';
export default function Calendar({navigation}) {
  const windowHeight = Dimensions.get('window').height;
  const headerHeight = useHeaderHeight();
  const statusBarHeight = StatusBar.currentHeight;
  const agendaHeight =
    windowHeight -
    statusBarHeight -
    headerHeight -
    theme.sizes.bottomTabNavigatorHeight;
  const currdate = new Date();
  const [currentDate, setCurrentDate] = useState(
    currdate.toISOString().split('T')[0],
  );
  const [items, setItems] = useState({});
  const [itemInfo, setItemInfo] = useState(null);
  const [visibleAddForm, setVisibleAddForm] = useState(false);
  const [visibleEditForm, setVisibleEditForm] = useState(false);
  const [visibleDeleteForm, setVisibleDeleteForm] = useState(false);
  const [visibleEditButton, setVisibleEditButton] = useState(true);
  const [visibleDeleteButton, setVisibleDeleteButton] = useState(false);
  const [isFullHeaderOptionsSelected, setFullHeaderOptionsSelected] =
    useState(false);

  const toogleAddFormOverlay = () => {
    setVisibleAddForm(!visibleAddForm);
  };
  const toogleEditFormOverlay = () => {
    setVisibleEditForm(!visibleEditForm);
  };

  const toogleEditButton = () => {
    setVisibleEditButton(!visibleEditButton);
  };
  const toogleDeleteButton = () => {
    setVisibleDeleteButton(!visibleDeleteButton);
  };

  const toogleDeleteFormOverlay = () => {
    setVisibleDeleteForm(!visibleDeleteForm);
  };

  const timeToString = time => {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  };

  const SelectedEvent = childData => {
    setItemInfo(childData);
    console.log('Log: ' + childData.day);
  };

  const fullHeaderOptions = () => {
    setFullHeaderOptionsSelected(true);
    navigation.setOptions({
      headerRight: () => (
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            style={styles.headerButtons}
            onPress={toogleAddFormOverlay}>
            <Icon name={'plus-circle'} size={25} color="white"></Icon>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.headerButtons}
            onPress={toogleEditFormOverlay}>
            <Icon name={'edit'} size={25} color="white"></Icon>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.headerButtons}
            onPress={toogleDeleteFormOverlay}>
            <Icon name={'trash'} size={25} color="white"></Icon>
          </TouchableOpacity>
        </View>
      ),
    });
  };

  const onlyAddHeaderOption = () => {
    setFullHeaderOptionsSelected(false);

    navigation.setOptions({
      headerRight: () => (
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            style={styles.headerButtons}
            onPress={toogleAddFormOverlay}>
            <Icon name={'plus-circle'} size={25} color="white"></Icon>
          </TouchableOpacity>
        </View>
      ),
    });
  };

  const loadItems = day => {
    setTimeout(() => {
      const events = GetItems();
      for (let i = -15; i < 85; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = timeToString(time);
        if (!items[strTime]) {
          items[strTime] = [];
        }
        if (events[strTime]) {
          items[strTime] = events[strTime];
          for (var k in items[strTime]) {
            items[strTime][k].day = strTime;
            items[strTime][k].color = 'white';
          }
        }
      }
      const newItems = {};
      Object.keys(items).forEach(key => {
        newItems[key] = items[key];
      });
      setItems(newItems);
    }, 500);
  };
  useEffect(() => {
    onlyAddHeaderOption();
    const unsubscribe = navigation.addListener('blur', () => {
      setCurrentDate(currdate.toISOString().split('T')[0]);
      onlyAddHeaderOption();
    });

    return unsubscribe;
  }, [navigation]);

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
                fullHeaderOptions={fullHeaderOptions}
                onlyAddHeaderOption={onlyAddHeaderOption}
                isFullHeaderOptionsSelected={isFullHeaderOptionsSelected}
                selectedEvent={SelectedEvent}
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
          hideKnob={false}
          showClosingKnob={true}
          theme={styles.agendaTheme}
        />

        <AddFormOverlay
          visibleAddForm={visibleAddForm}
          toogleAddFormOverlay={toogleAddFormOverlay}
          currentDate={currentDate}
        />
        {itemInfo ? (
          <>
          <EditFormOverlay
            visibleEditForm={visibleEditForm}
            toogleEditFormOverlay={toogleEditFormOverlay}
            item={itemInfo}
            onlyAddHeaderOption={onlyAddHeaderOption}
          />
          <DeleteFormOverlay
            visibleDeleteForm={visibleDeleteForm}
            toogleDeleteFormOverlay={toogleDeleteFormOverlay}
            item={itemInfo}
            onlyAddHeaderOption={onlyAddHeaderOption}
          />
          </>
        ) : null}
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
