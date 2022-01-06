import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Alert, Image, ActivityIndicator} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Divider, Text} from 'react-native-elements';
import Background from '../components/background';
import Button from '../components/button';
import {theme} from '../themes/theme';
import ImagePicker from 'react-native-image-crop-picker';
import {StoreData, GetData, RemoveData} from '../helpers/store-data';
import axios from 'axios';
import {config} from '../configs/config';

export default function Scan({navigation}) {
  const [pickedImage, setPickedImage] = useState(null);
  const [mimeImage, setMimeImage] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState('');
  reset = () => {
    setPickedImage(null);
    setMimeImage(null);
    setError('');
    setLoading(false);
  };
  const takePhotoFromCamera = () => {
    reset();
    ImagePicker.openCamera({
      compressImageMaxWidth: 960,
      compressImageMaxHeight: 1280,
      cropping: false,
      includeBase64: true,
    })
      .then(image => {
        setPickedImage(image.data);
        setMimeImage(image.mime);
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
  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      reset();
    });
    return unsubscribe;
  }, [navigation]);
  const extractData = () => {
    GetData('token').then(token => {
      GetData('email').then(mail => {
        setLoading(true);
        axios
          .post(`${config.google_api}`, {
            requests: [
              {
                image: {
                  content: pickedImage,
                },
                features: [
                  {
                    type: 'DOCUMENT_TEXT_DETECTION',
                  },
                ],
              },
            ],
          })
          .then(response => {
            axios
              .post(
                `${config.api_url}/Recognition`,
                {
                  userMail: mail,
                  recognizedText:
                    response.data.responses[0].fullTextAnnotation.text,
                },
                {headers: {Authorization: `Bearer ${token}`}},
              )
              .then(response => {
                navigation.navigate({
                  name: 'Events',
                  params: {recEvents: response.data.data},
                });
              })
              .catch(error => {
                console.log('Api error');
                setLoading(false);
                if (!error.response) {
                  setError('Network error.');
                } else {
                  if (error.response.data) {
                    setError(error.response.data.message);
                  } else {
                    setError('API error.');
                  }
                }
              });
          })
          .catch(error => {
            setLoading(false);
            console.log('Google error');
            if (!error.response) {
              setError('Network error.');
            } else {
              if (error.response.data) {
                setError(error.response.data.message);
              } else {
                setError('Google API error.');
              }
            }
          });
      });
    });
  };

  const takePhotoFromGalery = () => {
    reset();
    ImagePicker.openPicker({
      width: 1280,
      height: 960,
      cropping: false,
      includeBase64: true,
    })
      .then(image => {
        setPickedImage(image.data);
        setMimeImage(image.mime);
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
    <Background>
      {isLoading ? (
        <ActivityIndicator size="large" color={theme.colors.mainColor} />
      ) : (
        <View elevation={4} style={styles.rectangle}>
          <View style={styles.subRectangle}>
            {pickedImage ? (
              <View style={styles.container}>
                <View style={styles.placeholder}>
                  <Text style={styles.textStyle}>Preview</Text>
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
                  style={styles.buttonTop}
                  txtStyle={{justifyContent: 'center'}}
                  title="Extract Data"
                  onPress={() => {
                    extractData();
                  }}
                />
                <Button
                  icon={
                    <Icon
                      name="undo"
                      size={20}
                      color="white"
                      style={{marginRight: 10}}
                    />
                  }
                  style={styles.buttonBottom}
                  txtStyle={{justifyContent: 'center'}}
                  title="Reset Photo"
                  onPress={reset}
                />
              </View>
            ) : (
              <View>
                <Text h3 style={{color: theme.colors.mainColor}}>
                  Select An Option
                </Text>
                <Button
                  icon={
                    <Icon
                      name="image"
                      size={20}
                      color="white"
                      style={{marginRight: 10}}
                    />
                  }
                  style={styles.buttonTop}
                  txtStyle={{justifyContent: 'center'}}
                  title="Pick Image"
                  onPress={takePhotoFromGalery}
                />

                <Button
                  icon={
                    <Icon
                      name="camera"
                      size={20}
                      color="white"
                      style={{marginRight: 10}}
                    />
                  }
                  style={styles.buttonBottom}
                  txtStyle={{justifyContent: 'center'}}
                  title="Take Photo"
                  onPress={takePhotoFromCamera}
                />
              </View>
            )}
          </View>
          <Text style={{color: theme.colors.error}}>{error}</Text>
        </View>
      )}
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
  buttonTop: {
    marginTop: 20,
    height: 50,
    width: '80%',
    backgroundColor: theme.colors.mainColor,
    alignSelf: 'center',
  },
  buttonBottom: {
    marginTop: 20,
    marginBottom: 20,
    height: 50,
    width: '80%',
    backgroundColor: theme.colors.mainColor,
    alignSelf: 'center',
  },
  previewImage: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  rectangle: {
    width: '90%',
    height: '95%',
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
  subRectangle: {
    width: '80%',
    borderRadius: 15,
    backgroundColor: 'white',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 10,
  },
});
