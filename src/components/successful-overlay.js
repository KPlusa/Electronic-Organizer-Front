import React, {useState} from 'react';
import {Overlay, Text} from 'react-native-elements';
import {Image, StyleSheet} from 'react-native';
import {theme} from '../themes/theme';


export default function SuccessfulOverlay() {
  return (
    <Overlay
    isVisible={true}>
    <Text style={styles.overlayText}>The operation was successful.</Text>
    </Overlay>
  );
};

const styles = StyleSheet.create({
  overlayText: {
    fontSize: 16,
    margin: 10,
    fontWeight: 'bold',
    color: theme.colors.thirdColor,
  },
});
