import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Dimensions,
  BackHandler,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Overlay, Divider, Text} from 'react-native-elements';
import Button from '../components/button';
import Background from '../components/background';
import {theme} from '../themes/theme';
import RenderRecognizedEvents from '../components/render-recognized-events';
import {useHeaderHeight} from '@react-navigation/elements';
import BackButton from '../components/back-button';
import {HeaderBackButton} from '@react-navigation/elements';
import EventForm from '../components/event-form';
import {StoreData, GetData, RemoveData} from '../helpers/store-data';
import axios from 'axios';
import {config} from '../configs/config';

export default function Events({navigation, route}) {
  const [isFullHeaderOptionsSelected, setFullHeaderOptionsSelected] =
    useState(false);
  const [visibleRecognizedEventsForm, setVisibleRecognizedEventsForm] =
    useState(false);
  const [recognizedEvent, setRecognizedEvent] = useState('');
  const [recognizedEvents, setRecognizedEvents] = useState(
    JSON.parse(route.params?.recEvents),
  );
  const [isLoading, setLoading] = useState(true);
  const [formType, setFormType] = useState('addRecognized');
  var isBackButtonPressed = false;
  console.log(route.params?.recEvents);

  const toogleRecognizedEventsForm = type => {
    if (type === 'add') setFormType('addRecognized');
    if (type === 'delete') setFormType('deleteRecognized');
    if (type === 'edit') setFormType('editRecognized');
    setVisibleRecognizedEventsForm(!visibleRecognizedEventsForm);
  };

  const SelectedRecognizedEvent = childData => {
    setRecognizedEvent('');
    setRecognizedEvent(childData);
  };

  console.log(recognizedEvents);
  console.log(typeof(recognizedEvents));
  const ChangeRecognizedEvent = childData => {
    setRecognizedEvents(childData);
  };
  const getRecognizedEvent = () => {
    // const res = [
    //   {
    //     Id: 0,
    //     Name: 'Coloring',
    //     StartTime: '2022-01-01T12:00:00',
    //     EndTime: '2022-01-01T12:30:00',
    //     Date: '2022-01-01T00:00:00',
    //   },
    //   {
    //     Id: 1,
    //     Name: 'Decolorization',
    //     StartTime: '2022-01-01T12:30:00',
    //     EndTime: '2022-01-01T13:00:00',
    //     Date: '2022-01-01T00:00:00',
    //   },
    //   {
    //     Id: 2,
    //     Name: 'Coloring',
    //     StartTime: '2022-01-01T13:30:00',
    //     EndTime: '2022-01-01T14:00:00',
    //     Date: '2022-01-01T00:00:00',
    //   },
    // ];
    // return res;
  };

  const fullHeaderOptions = () => {
    setFullHeaderOptionsSelected(true);
    navigation.setOptions({
      headerRight: () => (
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            style={styles.headerButtons}
            onPress={() => {
              toogleRecognizedEventsForm('add');
            }}>
            <Icon name={'plus-circle'} size={25} color="white"></Icon>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.headerButtons}
            onPress={() => {
              toogleRecognizedEventsForm('edit');
            }}>
            <Icon name={'edit'} size={25} color="white"></Icon>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.headerButtons}
            onPress={() => {
              toogleRecognizedEventsForm('delete');
            }}>
            <Icon name={'trash'} size={25} color="white"></Icon>
          </TouchableOpacity>
        </View>
      ),
    });
  };
  const windowHeight = Dimensions.get('window').height;
  const headerHeight = useHeaderHeight();
  const statusBarHeight = StatusBar.currentHeight;
  const contentHeight =
    windowHeight -
    statusBarHeight -
    headerHeight -
    theme.sizes.bottomTabNavigatorHeight -
    20;

  const onlyAddHeaderOption = () => {
    setFullHeaderOptionsSelected(false);
    navigation.setOptions({
      headerRight: () => (
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            style={styles.headerButtons}
            onPress={() => {
              setFormType('addRecognized');
              setVisibleRecognizedEventsForm(true);
            }}>
            <Icon name={'plus-circle'} size={25} color="white"></Icon>
          </TouchableOpacity>
        </View>
      ),
    });
  };
  useEffect(() => {
    //setRecognizedEvents(getRecognizedEvent());
    isBackButtonPressed = false;
    BackHandler.addEventListener('hardwareBackPress', () => {
      isBackButtonPressed = true;
    });
    navigation.setOptions({
      headerLeft: () => (
        <BackButton
          color={theme.colors.backgroundColor}
          goBack={() => {
            navigation.goBack();
            isBackButtonPressed = true;
          }}
        />
      ),
    });
    onlyAddHeaderOption();

    const unsubscribe = navigation.addListener('blur', () => {
      onlyAddHeaderOption();
      isBackButtonPressed ? null : navigation.goBack();
    });

    return unsubscribe;
  }, [navigation]);
  return (
    <Background noScrollView={true}>
      <TouchableOpacity
        style={styles.container}
        activeOpacity={1}
        onPressIn={onlyAddHeaderOption}>
        <View
          elevation={4}
          style={[styles.rectangle, {height: contentHeight}]}
          activeOpacity={1}
          onPressIn={onlyAddHeaderOption}>
          <Text h3 style={styles.title}>
            Recognized Events
          </Text>
          <RenderRecognizedEvents
            fullHeaderOptions={fullHeaderOptions}
            isFullHeaderOptionsSelected={isFullHeaderOptionsSelected}
            selectedRecognizedEvent={SelectedRecognizedEvent}
            recognizedEventsList={recognizedEvents}
            getRecognizedEvent={getRecognizedEvent}
            isLoading={isLoading}
          />
          <View style={styles.section}>
            <Button
              style={styles.overlayButton}
              titleStyle={{
                fontSize: 16,
                lineHeight: 16,
              }}
              title="Add"
              //onPress={onOKPressed}
            />
            <View style={styles.overlayDivider}></View>
            <Button
              style={styles.overlayButton}
              titleStyle={{
                fontSize: 16,
                lineHeight: 16,
              }}
              title="Cancel"
              onPress={() => {
                toogleEventForm();
                resetValues();
              }}
            />
          </View>
        </View>
        <EventForm
          visibleEventForm={visibleRecognizedEventsForm}
          toogleEventForm={toogleRecognizedEventsForm}
          onlyAddHeaderOption={onlyAddHeaderOption}
          currentDate={'2022-01-04'}
          item={recognizedEvent}
          formType={formType}
        />
      </TouchableOpacity>
    </Background>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 35,
  },
  headerButtons: {
    width: 30,
    height: 35,
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tab: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.mainColor,
  },
  rectangle: {
    width: '90%',
    borderRadius: 15,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 10,
  },
  title: {
    fontSize: 20,
    color: theme.colors.mainColor,
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  overlayButton: {
    width: 100,
    backgroundColor: theme.colors.mainColor,
  },
  overlayDivider: {
    margin: 10,
  },
});
