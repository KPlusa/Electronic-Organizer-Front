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
import SuccessfulOverlay from '../components/successful-overlay';
import ImagePicker from 'react-native-image-crop-picker';

export default function ImagePickerOverlay({
  visiblePicker,
  tooglePicker,
  selectedImage,
}) {
  const takePhotoFromCamera = () => {
    ImagePicker.openCamera({
      compressImageMaxWidth: 80,
      compressImageMaxHeight: 80,
      cropping: true,
      includeBase64: true,
    })
      .then(image => {
        selectedImage(`data:${image.mime};base64,${image.data}`);
        tooglePicker();
      })
      .catch(e => {
        if (e.code !== 'E_PICKER_CANCELLED') {
          console.log(e);
          Alert.alert(
            'Sorry, there was an issue attempting to get the image you selected. Please try again',
          );
        }
      });
  };

  const takePhotoFromGalery = () => {
    ImagePicker.openPicker({
      width: 80,
      height: 80,
      cropping: true,
      includeBase64: true,
    })
      .then(image => {
        selectedImage(`data:${image.mime};base64,${image.data}`);
        tooglePicker();
      })
      .catch(e => {
        if (e.code !== 'E_PICKER_CANCELLED') {
          console.log(e);
          Alert.alert(
            'Sorry, there was an issue attempting to get the image you selected. Please try again',
          );
        }
      });
  };

  return (
    <>
      <Overlay
        isVisible={visiblePicker}
        onBackdropPress={tooglePicker}
        overlayStyle={styles.container}>
        <View style={styles.section}>
          <View style={styles.overlayDivider}></View>
          <Button
            icon={
              <Icon
                name="camera"
                size={20}
                color="white"
                style={{paddingLeft: 10}}
              />
            }
            style={styles.overlayButton}
            titleStyle={{
              fontSize: 16,
              lineHeight: 16,
              justifyContent: 'center',
              paddingRight: 10,
              paddingLeft: 10,
            }}
            title="Take Photo"
            onPress={takePhotoFromCamera}
          />
          <View style={styles.overlayDivider}></View>
          <Button
            icon={
              <Icon
                name="image"
                size={20}
                color="white"
                style={{paddingLeft: 10}}
              />
            }
            style={styles.overlayButton}
            titleStyle={{
              fontSize: 16,
              lineHeight: 16,
              justifyContent: 'center',
              paddingRight: 10,
              paddingLeft: 10,
            }}
            title="Pick Image"
            onPress={takePhotoFromGalery}
          />
          <View style={styles.overlayDivider}></View>
        </View>
      </Overlay>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '50%',
  },
  overlayText: {
    fontSize: 16,
    margin: 10,
    fontWeight: 'bold',
    color: theme.colors.thirdColor,
  },
  section: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
  },
  overlayButton: {
    width: '100%',
    backgroundColor: theme.colors.mainColor,
  },
  overlayDivider: {
    margin: 10,
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
