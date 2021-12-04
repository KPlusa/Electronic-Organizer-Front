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

  return (
    <TouchableOpacity
      style={[
        styles.item,
        firstItemInDay ? {marginTop: 25} : null,
        style,
      ]}
      delayLongPress={100}
      onLongPress={() => {
        // console.log(
        //   'Start: ' +
        //     item.startTime +
        //     '\nEnd: ' +
        //     item.endTime +
        //     '\nObject: ' +
        //     Object.keys(item),
        // );
        showItemInfo(item);
      }}>
      <Text style={{color: 'black', fontSize: 18, fontWeight: 'bold'}}>
        {item.startTime}-{item.endTime}
      </Text>
      <Text style={{color: theme.colors.mainColor, fontSize: 16}}>
        {item.name}
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
