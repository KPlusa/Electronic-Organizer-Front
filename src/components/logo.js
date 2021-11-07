import React from 'react';
import {Image, StyleSheet} from 'react-native';
import { baseProps } from 'react-native-gesture-handler/lib/typescript/handlers/gestureHandlers';

export default function Logo(stylee, ...props) {
  return (
    <Image source={require('../assets/images/logo.png')} style={styles.image, stylee} {...props} />
  );
}

const styles = StyleSheet.create({
  image: {
    width: 300,
    height: 200,
    
  },
});
