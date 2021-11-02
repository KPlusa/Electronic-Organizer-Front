import React, {useState} from 'react';
import {Text, View, StyleSheet, StatusBar, Image} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Button, Overlay, Divider} from 'react-native-elements';
import Background from '../components/background';
import {theme} from '../themes/theme';
import {
  launchCamera,
  launchImageLibrary,
  ImagePicker,
} from 'react-native-image-picker';

export default function Scan({navigation}) {
  const [pickedImage, setPickedImage] = useState(null);

  const takePhotoFromCamera = () => {
    ImagePicker.openCamera({
      compressImageMaxWidth: 300,
      compressImageMaxHeight: 300,
      cropping: true,
      compressImageQuality: 0.7,
    }).then(image => {
      console.log(image);
      setImage(image.path);
      this.bs.current.snapTo(1);
    });
  };

  reset = () => {
    setPickedImage(null);
  };

  pickImageHandler = () => {
    ImagePicker.showImagePicker(
      {title: 'Pick an Image', maxWidth: 800, maxHeight: 600},
      res => {
        if (res.didCancel) {
          console.log('User cancelled!');
        } else if (res.error) {
          console.log('Error', res.error);
        } else {
          setPickedImage({uri: res.uri});
        }
      },
    );
  };

  resetHandler = () => {
    reset();
  };
  return (
    <Background>
    
      <Text style={styles.textStyle}>Pick Image From Camera and Gallery </Text>
      <View style={styles.placeholder}>
        <Image source={pickedImage} style={styles.previewImage} />
      </View>
      <View style={styles.button}>
        <Button title="Pick Image" onPress={pickImageHandler} />

        <Button title="Reset" onPress={resetHandler} />
      </View>
    
    </Background>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: '#eee',
    width: '70%',
    height: 280,
    marginTop: 50,
  },
  button: {
    width: '80%',
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  previewImage: {
    width: '100%',
    height: '100%',
  },
});
