import React from 'react';
import {Image, StyleSheet} from 'react-native';

export default function Logo(style, ...props) {
  return (
    <Image source={require('../assets/images/logo.png')} style={[styles.image,style]}{...props}  />
  );
}

const styles = StyleSheet.create({
  image: {
    width: 300,
    height: 200,   
  },
});
