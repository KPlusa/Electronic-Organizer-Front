import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {theme} from '../themes/theme';

export default function RenderItem({
  item,
  firstItemInDay,
  selectedEvent,
  style,
}) {
  const showItemInfo = value => {
    selectedEvent(value);
  };
  const startTime = new Date(item.start_time);
  const endTime = new Date(item.end_time);
  return (
        <TouchableOpacity
          style={[styles.item, firstItemInDay ? {marginTop: 25} : null, style]}
          delayLongPress={100}
          onLongPress={() => {
            showItemInfo(item);
          }}>
          <Text style={{color: 'black', fontSize: 18, fontWeight: 'bold'}}>
            {String(startTime.getHours()).padStart(2, '0') +
              ':' +
              String(startTime.getMinutes()).padStart(2, '0')}
            -
            {String(endTime.getHours()).padStart(2, '0') +
              ':' +
              String(endTime.getMinutes()).padStart(2, '0')}
          </Text>
          <Text style={{color: theme.colors.mainColor, fontSize: 16}}>
            {item.name !== undefined ? item.name : item.title}
          </Text>
        </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  item: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    borderRadius: 10,
    padding: 10,
    marginRight: 20,
    marginTop: 5,
  },
});
