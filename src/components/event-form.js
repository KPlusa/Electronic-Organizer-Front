import React, {useState, useLayoutEffect, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {Overlay, Divider} from 'react-native-elements';
import {theme} from '../themes/theme';
import Input from '../components/input-text';
import Button from '../components/button';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {StartTimeValidator, EndTimeValidator} from '../helpers/date-validator';
import {EventValidator} from '../helpers/event-validator';
import SuccessfulOverlay from '../components/successful-overlay';
import SearchServices from '../components/search-services';

export default function EventForm({
  visibleEventForm,
  toogleEventForm,
  item,
  onlyAddHeaderOption,
  formType,
  currentDate,
}) {
  const [startTime, setStartTime] = useState({
    value: '',
    error: '',
  });
  const [endTime, setEndTime] = useState({value: '', error: ''});
  const [event, setEvent] = useState({value: '', error: ''});
  useEffect(() => {
    if (formType !== 'add') {
      setStartTime({
        value: item.startTime,
        error: '',
      });
      setEvent({value: item.name, error: ''});
      setEndTime({
        value: item.endTime,
        error: '',
      });
    } else {
      setStartTime({
        value: '',
        error: '',
      });
      setEvent({value: '', error: ''});
      setEndTime({
        value: '',
        error: '',
      });
    }
  }, [visibleEventForm]);

  const [isDatePickerStartTimeVisible, setDatePickerStartTimeVisibility] =
    useState(false);
  const [isDatePickerEndTimeVisible, setDatePickerEndTimeVisibility] =
    useState(false);

  const [isSuccessfulOverlayVisible, setSuccessfulOverlayVisibility] =
    useState(false);
  const toogleStartTimePicker = () => {
    setDatePickerStartTimeVisibility(!isDatePickerStartTimeVisible);
  };
  const toogleEndTimePicker = () => {
    setDatePickerEndTimeVisibility(!isDatePickerEndTimeVisible);
  };
  const handleStartTime = date => {
    toogleStartTimePicker();

    setStartTime({
      value:
        String(date.getHours()).padStart(2, '0') +
        ':' +
        String(date.getMinutes()).padStart(2, '0'),
      error: '',
    });
  };

  const handleEndTime = date => {
    toogleEndTimePicker();

    setEndTime({
      value:
        String(date.getHours()).padStart(2, '0') +
        ':' +
        String(date.getMinutes()).padStart(2, '0'),
      error: '',
    });
  };
  const SetEvent = childData => {
    setEvent(childData);
  };
  const onOKPressed = () => {
    const startTimeError = StartTimeValidator(startTime.value, endTime.value);
    const endTimeError = EndTimeValidator(startTime.value, endTime.value);
    const eventError = EventValidator(event.value, event.value);

    if (startTimeError || endTimeError || eventError) {
      setStartTime({...startTime, error: startTimeError});
      setEndTime({...endTime, error: endTimeError});
      setEvent({...event, error: eventError});
      return;
    }
    setSuccessfulOverlayVisibility(true);
    toogleEventForm();
    setTimeout(() => {
      resetValues();
    }, 1000);
  };

  const resetValues = () => {
    setSuccessfulOverlayVisibility(false);
    onlyAddHeaderOption();
  };

  return (
    <>
      <Overlay
        isVisible={visibleEventForm}
        onBackdropPress={toogleEventForm}
        overlayStyle={{height: '80%'}}>
        <ScrollView keyboardShouldPersistTaps="handled" style={{width: '85%'}}>
          <View style={{alignSelf: 'center'}}>
            <MaterialIcon
              name={
                formType === 'add'
                  ? 'event'
                  : formType === 'edit'
                  ? 'edit'
                  : 'delete'
              }
              size={40}
              color={theme.colors.mainColor}></MaterialIcon>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Input
              style={styles.inputStyle}
              inputContainerStyle={styles.inputContainerStyle}
              disabled
              label={
                formType === 'add'
                  ? 'Selected date'
                  : formType === 'edit'
                  ? 'Day of the editing event'
                  : 'Day of the deleting event'
              }
              value={formType === 'add' ? currentDate : item.day}
              leftIcon={{type: 'material-icons', name: 'today', size: 15}}
              blurOnSubmit={false}
              forwardRef={true}></Input>
          </View>
          <SearchServices
            setEvent={SetEvent}
            event={event}
            disable={formType === 'delete' ? true : false}
          />
          <View style={{flexDirection: 'row'}} behavior="height">
            <Input
              style={styles.inputStyle}
              inputContainerStyle={styles.inputContainerStyle}
              label="Start time"
              placeholder="Enter the time"
              returnKeyType="next"
              value={startTime.value}
              onChangeText={text => setStartTime({value: text, error: ''})}
              error={!!startTime.error}
              errorMessage={startTime.error}
              autoCapitalize="none"
              autoCompleteType="off"
              errorStyle={{color: theme.colors.error}}
              leftIcon={{
                type: 'material-icons',
                name: 'access-time',
                size: 15,
              }}
              rightIcon={
                formType === 'delete'
                  ? null
                  : {
                      type: 'material-icons',
                      name: 'timer',
                      size: 25,
                      color: theme.colors.mainColor,
                      onPress: toogleStartTimePicker,
                    }
              }
              disabled={formType === 'delete' ? true : false}
              blurOnSubmit={false}
              forwardRef={true}></Input>
            <DateTimePickerModal
              isVisible={isDatePickerStartTimeVisible}
              mode="time"
              is24Hour={true}
              onConfirm={handleStartTime}
              onCancel={toogleStartTimePicker}
              date={new Date()}
            />
          </View>

          <View style={{flexDirection: 'row'}} behavior="height">
            <Input
              style={styles.inputStyle}
              inputContainerStyle={styles.inputContainerStyle}
              label="End time"
              placeholder="Enter the time"
              returnKeyType="next"
              value={endTime.value}
              onChangeText={text => setEndTime({value: text, error: ''})}
              error={!!endTime.error}
              errorMessage={endTime.error}
              autoCapitalize="none"
              autoCompleteType="off"
              errorStyle={{color: theme.colors.error}}
              leftIcon={{
                type: 'material-icons',
                name: 'access-time',
                size: 15,
              }}
              disabled={formType === 'delete' ? true : false}
              blurOnSubmit={false}
              rightIcon={
                formType === 'delete'
                  ? null
                  : {
                      type: 'material-icons',
                      name: 'timer',
                      size: 25,
                      color: theme.colors.mainColor,
                      onPress: toogleEndTimePicker,
                    }
              }
              forwardRef={true}></Input>
            {formType === 'delete' ? null : (
              <DateTimePickerModal
                isVisible={isDatePickerEndTimeVisible}
                mode="time"
                is24Hour={true}
                onConfirm={handleEndTime}
                onCancel={toogleEndTimePicker}
                date={new Date()}
              />
            )}
          </View>

          <View style={styles.section}>
            <Button
              style={styles.overlayButton}
              titleStyle={{
                fontSize: 16,
                lineHeight: 16,
              }}
              title="OK"
              onPress={onOKPressed}
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
        </ScrollView>
      </Overlay>
      {isSuccessfulOverlayVisible ? <SuccessfulOverlay /> : null}
    </>
  );
}

const styles = StyleSheet.create({
  overlayText: {
    fontSize: 16,
    margin: 10,
    fontWeight: 'bold',
    color: theme.colors.thirdColor,
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
    justifyContent: 'center',
  },
  overlayButton: {
    width: 100,
    backgroundColor: theme.colors.mainColor,
  },
  overlayDivider: {
    margin: 5,
  },
  inputStyle: {},
  inputContainerStyle: {
    height: 50,
    width: '100%',
    alignSelf: 'center',
  },
});
