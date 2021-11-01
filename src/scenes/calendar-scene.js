import React, { useState } from 'react';
import { Text, View, StyleSheet, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Button, Overlay, Divider } from 'react-native-elements';
import Background from '../components/background';
import { theme } from '../themes/theme';


export default function Calendar({ navigation }) {

    return (
        <Background>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={styles.tab}>Calendar</Text>
          </View>
        </Background>
      );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1, 
      alignItems: 'center', 
      justifyContent: 'center'
    },
    tab: {
        fontSize: 16,
        fontWeight: 'bold',
        color: theme.colors.mainColor,
      },
  });