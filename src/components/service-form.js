import React, {useState, useLayoutEffect, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {Overlay, Divider} from 'react-native-elements';
import {theme} from '../themes/theme';
import Input from '../components/input-text';
import Button from '../components/button';
import axios from 'axios';
import {config} from '../configs/config';
import {StoreData, GetData} from '../helpers/store-data';
import {
  TitleValidator,
  TimeValidator,
  CodeValidator,
} from '../helpers/service-validator';
import SuccessfulOverlay from '../components/successful-overlay';

export default function ServiceForm({
  visibleServiceForm,
  toogleServiceForm,
  service,
  onlyAddHeaderOption,
  getService,
  formType,
}) {
  const [title, setTitle] = useState({value: '', error: ''});
  const [estimatedTime, setEstimatedTime] = useState({
    value: '',
    error: '',
  });
  const [code, setCode] = useState({value: '', error: ''});
  const [isSuccessfulOverlayVisible, setSuccessfulOverlayVisibility] =
    useState(false);

  useEffect(() => {
    if (formType !== 'add') {
      setTitle({value: service.name, error: ''});
      setEstimatedTime({
        value:
          service.estimated_time !== undefined
            ? service.estimated_time.toString()
            : '',
        error: '',
      });
      setCode({
        value: service.code !== undefined ? service.code.toString() : '',
        error: '',
      });
    } else {
      setTitle({value: '', error: ''});
      setEstimatedTime({
        value: '',
        error: '',
      });
      setCode({value: '', error: ''});
    }
  }, [visibleServiceForm]);
  const onOKPressed = () => {
    const titleError = TitleValidator(title.value);
    const estimatedTimeError = TimeValidator(estimatedTime.value);
    const codeError = CodeValidator(code.value);
    if (formType !== 'delete') {
      if (titleError || estimatedTimeError || codeError) {
        setTitle({...title, error: titleError});
        setEstimatedTime({...estimatedTime, error: estimatedTimeError});
        setCode({...code, error: codeError});
        return;
      }
    }
    GetData('token').then(token => {
      GetData('email').then(mail => {
        if (formType === 'add') {
          axios
            .post(
              `${config.api_url}/Services`,
              {
                userMail: mail,
                title: title.value,
                estimatedTime: estimatedTime.value,
                serviceCode: code.value,
              },
              {headers: {Authorization: `Bearer ${token}`}},
            )
            .then(response => {
              if (response.data.status === 'Success') {
                resposeBehaviour();
              }
            })
            .catch(error => {
              errorBehaviour(error);
            });
        }
        if (formType === 'edit') {
          axios
            .put(
              `${config.api_url}/Services`,
              {
                userMail: mail,
                title: title.value,
                estimatedTime: estimatedTime.value,
                serviceCode: code.value,
                serviceId: service.id,
              },
              {
                headers: {Authorization: `Bearer ${token}`},
              },
            )
            .then(response => {
              if (response.data.status === 'Success') {
                resposeBehaviour();
              }
            })
            .catch(error => {
              errorBehaviour(error);
            });
        }
        if (formType === 'delete') {
          axios
            .delete(`${config.api_url}/Services/${service.id}`, {
              headers: {Authorization: `Bearer ${token}`},
            })
            .then(response => {
              if (response.status === 204) {
                resposeBehaviour();
              }
            })
            .catch(error => {
              errorBehaviour(error);
            });
        }
      });
    });
  };

  const resposeBehaviour = () => {
    toogleServiceForm();
    setSuccessfulOverlayVisibility(true);
    setTimeout(() => {
      getService();
      resetValues();
    }, 1000);
  };
  const errorBehaviour = error => {
    if (!error.response) {
      setCode({...code, error: 'Network error.'});
    } else {
      if (error.response.data) {
        setCode({...code, error: error.response.data.message});
      }
    }
    return;
  };
  const resetValues = () => {
    setSuccessfulOverlayVisibility(false);
    onlyAddHeaderOption();
  };

  return (
    <ScrollView keyboardShouldPersistTaps="handled">
      <Overlay
        isVisible={visibleServiceForm}
        onBackdropPress={toogleServiceForm}>
        <View style={{alignSelf: 'center'}}>
          {formType !== 'add' ? (
            <MaterialIcon
              name={formType === 'edit' ? 'edit' : 'delete'}
              size={40}
              color={theme.colors.mainColor}
            />
          ) : (
            <FontAwesome5 name="cut" size={40} color={theme.colors.mainColor} />
          )}
        </View>
        <KeyboardAvoidingView
          style={{width: '80%', flexDirection: 'row'}}
          behavior="height">
          <Input
            style={styles.inputStyle}
            inputContainerStyle={styles.inputContainerStyle}
            label={
              formType === 'add'
                ? 'Service title'
                : formType === 'edit'
                ? 'Title of the editing service'
                : 'Title of the deleting service'
            }
            placeholder="Enter the title of the service"
            returnKeyType="next"
            value={title.value}
            onChangeText={text => setTitle({value: text, error: ''})}
            error={!!title.error}
            errorMessage={title.error}
            autoCapitalize="none"
            autoCompleteType="off"
            errorStyle={{color: theme.colors.error}}
            leftIcon={{type: 'material-icons', name: 'access-time', size: 15}}
            blurOnSubmit={false}
            forwardRef={true}
            disabled={formType === 'delete' ? true : false}></Input>
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
            value={estimatedTime.value}
            onChangeText={text => setEstimatedTime({value: text, error: ''})}
            error={!!estimatedTime.error}
            errorMessage={estimatedTime.error}
            autoCapitalize="none"
            autoCompleteType="off"
            errorStyle={{color: theme.colors.error}}
            leftIcon={{type: 'material-icons', name: 'access-time', size: 15}}
            blurOnSubmit={false}
            forwardRef={true}
            disabled={formType === 'delete' ? true : false}></Input>
        </KeyboardAvoidingView>
        <KeyboardAvoidingView style={{width: '80%'}} behavior="height">
          <Input
            style={styles.inputStyle}
            inputContainerStyle={styles.inputContainerStyle}
            placeholder="Enter the code of the service"
            returnKeyType="next"
            value={code.value}
            onChangeText={text => setCode({value: text})}
            error={!!code.error}
            errorMessage={code.error}
            autoCapitalize="none"
            autoCompleteType="off"
            errorStyle={{color: theme.colors.error}}
            leftIcon={{type: 'material-icons', name: 'event-note', size: 15}}
            blurOnSubmit={false}
            forwardRef={true}
            disabled={formType === 'delete' ? true : false}></Input>
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
              toogleServiceForm();
              resetValues();
            }}
          />
        </View>
      </Overlay>
      {isSuccessfulOverlayVisible ? <SuccessfulOverlay /> : null}
    </ScrollView>
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
