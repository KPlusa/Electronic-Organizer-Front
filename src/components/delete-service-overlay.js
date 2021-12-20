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
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {Overlay, Divider} from 'react-native-elements';
import {theme} from '../themes/theme';
import Input from '../components/input-text';
import Button from '../components/button';
import {
  TitleValidator,
  TimeValidator,
  CodeValidator,
} from '../helpers/service-validator';
import SuccessfulOverlay from '../components/successful-overlay';
import axios from 'axios';
import {config} from '../configs/config';
import {StoreData, GetData} from '../helpers/store-data';

export default function DeleteServiceFormOverlay({
  visibleDeleteServiceForm,
  toogleDeleteServiceFormOverlay,
  service,
  onlyAddHeaderOption,
  getService,
}) {
  const [title, setTitle] = useState({value: service.name, error: ''});
  const [estimatedTime, setEstimatedTime] = useState({
    value: service.estimated_time.toString(),
    error: '',
  });
  const [code, setCode] = useState({value: service.code, error: ''});

  const [isSuccessfulOverlayVisible, setSuccessfulOverlayVisibility] =
    useState(false);

  const onOKPressed = () => {
    const titleError = TitleValidator(title.value);
    const estimatedTimeError = TimeValidator(estimatedTime.value);
    const codeError = CodeValidator(code.value);

    if (titleError || estimatedTimeError || codeError) {
      setTitle({...title, error: titleError});
      setEstimatedTime({...estimatedTime, error: estimatedTimeError});
      setCode({...code, error: codeError});
      return;
    }
    GetData('token').then(token => {
      GetData('email').then(mail => {
        axios
          .delete(`${config.api_url}/Services/${service.id}`, {
            headers: {Authorization: `Bearer ${token}`},
          })
          .then(response => {
            if (response.status === 204) {
              toogleDeleteServiceFormOverlay();
              setSuccessfulOverlayVisibility(true);
              setTimeout(() => {
                getService();
                resetValues();
              }, 1000);
            }
          })
          .catch(error => {
            if (!error.response) {
              setCode({...code, error: 'Network error.'});
            } else {
              if (error.response.data) {
                setCode({...code, error: error.response.data.message});
              }
            }
            return;
          });
      });
    });
  };

  const resetValues = () => {
    setTitle({value: service.name, error: ''});
    setEstimatedTime({value: service.estimated_time.toString(), error: ''});
    setCode({value: service.code, error: ''});
    setSuccessfulOverlayVisibility(false);
    onlyAddHeaderOption();
  };

  return (
    <>
      <Overlay
        isVisible={visibleDeleteServiceForm}
        onBackdropPress={toogleDeleteServiceFormOverlay}>
        <View style={{alignSelf: 'center'}}>
          <MaterialIcon
            name={'delete'}
            size={40}
            color={theme.colors.mainColor}
          />
        </View>
        <KeyboardAvoidingView
          style={{width: '80%', flexDirection: 'row'}}
          behavior="height">
          <Input
            style={styles.inputStyle}
            inputContainerStyle={styles.inputContainerStyle}
            label="Title of deleting service"
            placeholder="Enter the title of the service"
            returnKeyType="next"
            disabled
            value={title.value}
            onChangeText={text => setTitle({value: text, error: ''})}
            error={!!title.error}
            errorMessage={title.error}
            autoCapitalize="none"
            autoCompleteType="off"
            errorStyle={{color: theme.colors.error}}
            leftIcon={{type: 'material-icons', name: 'access-time', size: 15}}
            blurOnSubmit={false}
            forwardRef={true}></Input>
        </KeyboardAvoidingView>

        <KeyboardAvoidingView
          style={{width: '80%', flexDirection: 'row'}}
          behavior="height">
          <Input
            style={styles.inputStyle}
            inputContainerStyle={styles.inputContainerStyle}
            label="Estimated time (min)"
            placeholder="Enter the estimated time of the service"
            returnKeyType="next"
            disabled
            value={estimatedTime.value}
            onChangeText={text => setEstimatedTime({value: text, error: ''})}
            error={!!estimatedTime.error}
            errorMessage={estimatedTime.error}
            autoCapitalize="none"
            autoCompleteType="off"
            errorStyle={{color: theme.colors.error}}
            leftIcon={{type: 'material-icons', name: 'access-time', size: 15}}
            blurOnSubmit={false}
            forwardRef={true}></Input>
        </KeyboardAvoidingView>
        <KeyboardAvoidingView style={{width: '80%'}} behavior="height">
          <Input
            style={styles.inputStyle}
            inputContainerStyle={styles.inputContainerStyle}
            placeholder="Enter the code of the service"
            returnKeyType="next"
            disabled
            value={code.value}
            onChangeText={text => setCode({value: text})}
            error={!!code.error}
            errorMessage={code.error}
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
              toogleDeleteServiceFormOverlay();
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
