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

export default function AddServiceFormOverlay({
  visibleAddServiceForm,
  toogleAddServiceFormOverlay,
  onlyAddHeaderOption,
}) {
  const [title, setTitle] = useState({value: '', error: ''});
  const [estimatedTime, setEstimatedTime] = useState({value: '', error: ''});
  const [code, setCode] = useState({value: '', error: ''});

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
    toogleAddServiceFormOverlay();
    setSuccessfulOverlayVisibility(true);
    setTimeout(() => {
      resetValues();
    }, 1000);
  };

  const resetValues = () => {
    setTitle({value: '', error: ''});
    setEstimatedTime({value: '', error: ''});
    setCode({value: '', error: ''});
    setSuccessfulOverlayVisibility(false);
    onlyAddHeaderOption();
  };

  return (
    <>
      <Overlay
        isVisible={visibleAddServiceForm}
        onBackdropPress={toogleAddServiceFormOverlay}>
        <View style={{alignSelf: 'center'}}>
          <FontAwesome5 name="cut" size={40} color={theme.colors.mainColor} />
        </View>
        <KeyboardAvoidingView
          style={{width: '80%', flexDirection: 'row'}}
          behavior="height">
          <Input
            style={styles.inputStyle}
            inputContainerStyle={styles.inputContainerStyle}
            label="Service title"
            placeholder="Enter the title of the service"
            returnKeyType="next"
            value={title.value}
            onChangeText={text => setTitle({value: text, error: ''})}
            error={!!title.error}
            errorMessage={title.error}
            autoCapitalize="none"
            autoCompleteType="off"
            errorStyle={{color: theme.colors.error}}
            leftIcon={{type: 'material-icons', name: 'title', size: 15}}
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
              toogleAddServiceFormOverlay();
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
