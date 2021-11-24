import React from 'react';
import {View} from 'react-native';
import {theme} from '../themes/theme';

export default function EmptyDate() {
  return (
    <View
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'center',
          marginRight: 20,
          marginTop: 20,
        }}>
        <View
          style={{
            borderBottomColor: theme.colors.secondColor,
            borderBottomWidth: 1,
          }}></View>
      </View>
  );
}
