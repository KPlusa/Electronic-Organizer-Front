import React, {useState} from 'react';
import {Text, View, StyleSheet, StatusBar, Image} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Overlay, Divider} from 'react-native-elements';
import Background from '../components/background';
import Button from '../components/button';
import {theme} from '../themes/theme';
import ImagePicker from 'react-native-image-crop-picker';

export default function Scan({navigation}) {
  const [pickedImage, setPickedImage] = useState(null);
  const [showResetButton, setShowResetButton] = useState(false);

const [image, setImage] = useState('https://api.adorable.io/avatars/80/abott@adorable.png');


  const takePhotoFromCamera = () => {
    ImagePicker.openCamera({
      compressImageMaxWidth: 300,
      compressImageMaxHeight: 300,
      cropping: false,
      compressImageQuality: 0.7,
      rotation: 360
    }).then(image => {
      console.log(image);
      setImage(image.path);
      this.bs.current.snapTo(1);
    });
  };

  reset = () => {
    setPickedImage(null);
  };

const takePhotoFromGalery = () => {
  ImagePicker.openPicker({
  width: 300,
  height: 400,
  cropping: false,
  rotation: nonZeroInteger
}).then(image => {
  console.log(image);
});
};
  resetHandler = () => {
    reset();
  };
  return (
    <Background>
      
      <View elevation={4} style={styles.rectangle}>
      <View style={styles.placeholder}>
        <Image source={pickedImage} style={styles.previewImage} />
      </View>
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
      </View>
      <View style={styles.button}>
        {pickedImage ? <Button title="Reset" onPress={resetHandler} /> : null}
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
    justifyContent: 'space-around',
  },
  previewImage: {
    width: '100%',
    height: '100%',
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
