import React, {useState, useLayoutEffect, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  KeyboardAvoidingView,
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

export default function EditFormOverlay({
  visibleEditForm,
  toogleEditFormOverlay,
  item,
  onlyAddHeaderOption,
}) {
  const [startTime, setStartTime] = useState({
    value: item.startTime,
    error: '',
  });
  const [endTime, setEndTime] = useState({value: item.endTime, error: ''});
  const [event, setEvent] = useState({value: item.name, error: ''});
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

    toogleEditFormOverlay();
    setSuccessfulOverlayVisibility(true);
    setTimeout(() => {
      resetValues();
    }, 1000);
  };

  const resetValues = () => {
    onlyAddHeaderOption();
  };

  return (
    <>
      <Overlay
        isVisible={visibleEditForm}
        onBackdropPress={toogleEditFormOverlay}>
        <View style={{alignSelf: 'center'}}>
          <MaterialIcon
            name={'edit'}
            size={40}
            color={theme.colors.mainColor}></MaterialIcon>
        </View>
        <KeyboardAvoidingView style={{width: '80%', flexDirection: 'row'}}>
          <Input
            style={styles.inputStyle}
            inputContainerStyle={styles.inputContainerStyle}
            disabled
            label="Day of the editing event"
            value={item.day}
            leftIcon={{type: 'material-icons', name: 'today', size: 15}}
            blurOnSubmit={false}
            forwardRef={true}></Input>
        </KeyboardAvoidingView>
        <KeyboardAvoidingView
          style={{width: '80%', flexDirection: 'row'}}
          behavior="height">
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
            leftIcon={{type: 'material-icons', name: 'access-time', size: 15}}
            blurOnSubmit={false}
            forwardRef={true}></Input>

          <TouchableOpacity
            style={{color: theme.colors.mainColor, justifyContent: 'center'}}
            onPress={toogleStartTimePicker}>
            <MaterialIcon
              name={'timer'}
              size={25}
              color={theme.colors.mainColor}></MaterialIcon>
          </TouchableOpacity>
          <DateTimePickerModal
            isVisible={isDatePickerStartTimeVisible}
            mode="time"
            is24Hour={true}
            onConfirm={handleStartTime}
            onCancel={toogleStartTimePicker}
            date={new Date()}
          />
        </KeyboardAvoidingView>

        <KeyboardAvoidingView
          style={{width: '80%', flexDirection: 'row'}}
          behavior="height">
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
            leftIcon={{type: 'material-icons', name: 'access-time', size: 15}}
            blurOnSubmit={false}
            forwardRef={true}></Input>
          <TouchableOpacity
            style={{color: theme.colors.mainColor, justifyContent: 'center'}}
            onPress={toogleEndTimePicker}>
            <MaterialIcon
              name={'timer'}
              size={25}
              color={theme.colors.mainColor}></MaterialIcon>
          </TouchableOpacity>
          <DateTimePickerModal
            isVisible={isDatePickerEndTimeVisible}
            mode="time"
            is24Hour={true}
            onConfirm={handleEndTime}
            onCancel={toogleEndTimePicker}
            date={new Date()}
          />
        </KeyboardAvoidingView>
        <KeyboardAvoidingView style={{width: '80%'}} behavior="height">
          <Input
            style={styles.inputStyle}
            inputContainerStyle={styles.inputContainerStyle}
            placeholder="Enter the event you want to add"
            returnKeyType="next"
            value={event.value}
            onChangeText={text => setEvent({value: text})}
            error={!!event.error}
            errorMessage={event.error}
            autoCapitalize="none"
            autoCompleteType="off"
            errorStyle={{color: theme.colors.error}}
            leftIcon={{type: 'material-icons', name: 'event-note', size: 15}}
            blurOnSubmit={false}
            forwardRef={true}></Input>
        </KeyboardAvoidingView>
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
              toogleEditFormOverlay();
              resetValues();
            }}
          />
        </View>
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
  inputStyle: {
    height: 50,
    width: '100%',
  },
  inputContainerStyle: {
    height: 50,
    width: '100%',
    alignSelf: 'center',
  },
});
