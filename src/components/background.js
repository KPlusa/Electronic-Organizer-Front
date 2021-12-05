import React from 'react';
import {
  ImageBackground,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';

export default function Background({children, noScrollView}) {
  return (
    <ImageBackground
      source={require('../assets/images/background.png')}
      style={styles.background}>
      {noScrollView === undefined ? (
        <ScrollView behavior="padding" contentContainerStyle={styles.container}>
          {children}
        </ScrollView>
      ) : (
        <KeyboardAvoidingView
          style={styles.container}
          behavior="padding"
          enabled>
          {children}
        </KeyboardAvoidingView>
      )}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
    width: '100%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
