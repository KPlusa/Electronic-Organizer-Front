import React, {useState} from 'react';
import {View, StyleSheet, StatusBar, Image} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Divider, Text} from 'react-native-elements';
import Background from '../components/background';
import Button from '../components/button';
import {theme} from '../themes/theme';
import ImagePicker from 'react-native-image-crop-picker';

export default function Scan({navigation}) {
  const [pickedImage, setPickedImage] = useState(null);
  const [mimeImage, setMimeImage] = useState(null);
  const [showResetButton, setShowResetButton] = useState(false);

  reset = () => {
    setPickedImage(null);
    setMimeImage(null);
  };
  const takePhotoFromCamera = () => {
    reset();
    ImagePicker.openCamera({
      compressImageMaxWidth: 960,
      compressImageMaxHeight: 1280,
      cropping: false,
      includeBase64: true,
    }).then(image => {
      setPickedImage(image.data);
      setMimeImage(image.mime);
    });
  };

  const takePhotoFromGalery = () => {
    reset();
    ImagePicker.openPicker({
      width: 1280,
      height: 960,
      cropping: false,
      includeBase64: true,
    }).then(image => {
      setPickedImage(image.data);
      setMimeImage(image.mime);
    });
  };


  return (
    <Background>
      <View elevation={4} style={styles.rectangle}>
        {pickedImage ? (
          <View style={styles.container}>
            <Text style={styles.textStyle}>Preview:</Text>
            <View style={styles.placeholder}>
              <Image
                source={{uri: `data:${mimeImage};base64,${pickedImage}`}}
                style={styles.previewImage}></Image>
            </View>
          </View>
        ) : null}

        {pickedImage ? (
          <View>
            <Divider orientation="horizontal" height={50} />
            <Button
              icon={
                <Icon
                  name="file"
                  size={20}
                  color="white"
                  style={{marginRight: 10}}
                />
              }
              style={[
                {height: 50},
                {width: 300},
                {backgroundColor: theme.colors.mainColor},
                {alignSelf: 'flex-start'},
              ]}
              txtStyle={{justifyContent: 'center'}}
              title="Extract Data"
              onPress={() => console.log(pickedImage)}
            />
            <Divider orientation="horizontal" height={20} />
            <Button
              icon={
                <Icon
                  name="undo"
                  size={20}
                  color="white"
                  style={{marginRight: 10}}
                />
              }
              style={[
                {height: 50},
                {width: 300},
                {backgroundColor: theme.colors.mainColor},
                {alignSelf: 'flex-start'},
              ]}
              txtStyle={{justifyContent: 'center'}}
              title="Reset Photo"
              onPress={reset}
            />
          </View>
        ) : (
          <View>
            <Button
              icon={
                <Icon
                  name="image"
                  size={20}
                  color="white"
                  style={{marginRight: 10}}
                />
              }
              style={[
                {height: 50},
                {width: 300},
                {backgroundColor: theme.colors.mainColor},
                {alignSelf: 'flex-start'},
              ]}
              txtStyle={{justifyContent: 'center'}}
              title="Pick Image"
              onPress={takePhotoFromGalery}
            />
            <Divider orientation="horizontal" height={20} />
            <Button
              icon={
                <Icon
                  name="camera"
                  size={20}
                  color="white"
                  style={{marginRight: 10}}
                />
              }
              style={[
                {height: 50},
                {width: 300},
                {backgroundColor: theme.colors.mainColor},
                {alignSelf: 'flex-start'},
              ]}
              txtStyle={{justifyContent: 'center'}}
              title="Take Photo"
              onPress={takePhotoFromCamera}
            />
          </View>
        )}
      </View>
    </Background>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '70%',
    height: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tab: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.mainColor,
  },
  textStyle: {
    fontWeight: 'bold',
    fontSize: 30,
    textAlign: 'center',
    color: theme.colors.mainColor,
    marginTop: 10,
  },
  placeholder: {
    width: '100%',
    height: '100%',
    marginTop: 20,
    marginBottom: 20,
  },
  button: {
    width: '80%',
    marginTop: 20,
    justifyContent: 'space-around',
  },
  previewImage: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  rectangle: {
    width: '100%',
    height: '100%',
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
});
