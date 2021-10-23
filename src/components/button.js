import React from 'react';
import {StyleSheet} from 'react-native';
import {Button as ButtonElem} from 'react-native-elements';

export default function Button({style, txtStyle, ...props}) {
  return (
    <ButtonElem
      buttonStyle={[styles.button, style]}
      titleStyle={[styles.text, txtStyle]}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  button: {
    width: '100%',
    paddingVertical: 10,
    borderRadius: 10,
    
  },
  text: {
    fontWeight: 'bold',
    fontSize: 20,
    lineHeight: 26,
    alignItems: "center",
  },
});
