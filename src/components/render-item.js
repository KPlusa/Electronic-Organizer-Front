import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {theme} from '../themes/theme';

export default function RenderItem({
  item,
  fullHeaderOptions,
  firstItemInDay,
  isFullHeaderOptionsSelected,
}) {
  const [isItemSelected, setItemSelected] = useState(false);
  const toogleItemSelected = () => {
    setItemSelected(!isItemSelected);
  };
  const checker = () => {
    !isFullHeaderOptionsSelected ? setItemSelected(false) : null;
  };

  return (
    <TouchableOpacity
      style={[
        styles.item,
        firstItemInDay ? {marginTop: 25} : null,
        isItemSelected ? {backgroundColor: theme.colors.secondColor} : null,
      ]}
      onLongPress={() => {
        fullHeaderOptions();
        console.log(
          'Start: ' +
            item.startTime +
            '\nEnd: ' +
            item.endTime +
            '\nObject: ' +
            Object.keys(item),
        );
        setItemSelected(true);
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
    backgroundColor: 'white',
    flexDirection: 'column',
    justifyContent: 'center',
    borderRadius: 10,
    padding: 10,
    marginRight: 20,
    marginTop: 5,
  },
});
