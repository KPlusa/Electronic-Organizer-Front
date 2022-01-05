import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import {theme} from '../themes/theme';
import {StoreData, GetData, RemoveData} from '../helpers/store-data';
import IonIcon from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import {config} from '../configs/config';

export default function RenderRecognizedEvents({
  fullHeaderOptions,
  isFullHeaderOptionsSelected,
  selectedRecognizedEvent,
  recognizedEventsList,
  getRecognizedEvent,
  isLoading,
}) {
  const [isItemSelected, setItemSelected] = useState(false);
  const [recognizedEvents, setRecognizedEvents] = useState([]);
  // const startTime = new Date(item.StartTime);
  //   const endTime = new Date(item.EndTime);
  const showRecognizedItemInfo = value => {
    selectedRecognizedEvent(value);
  };
  const toogleItemSelected = value => {
    fullHeaderOptions();
    setItemSelected(value);
  };

  // console.log(recognizedEventsList);
  useEffect(() => {
    getRecognizedEvent();
  }, []);
  const Item = ({item}) => (
    <TouchableOpacity
      style={[
        styles.item,
        {
          backgroundColor:
            isItemSelected === item.Id && isFullHeaderOptionsSelected
              ? theme.colors.secondColor
              : theme.colors.backgroundColor,
        },
      ]}
      delayLongPress={100}
      onLongPress={() => {
        showRecognizedItemInfo(item);
        toogleItemSelected(item.Id);
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <View style={{flexDirection: 'column'}}>
          <Text style={{color: 'black', fontSize: 18, fontWeight: 'bold'}}>
            {String(new Date(item.StartTime).getHours()).padStart(2, '0') +
              ':' +
              String(new Date(item.StartTime).getMinutes()).padStart(2, '0')}
            -
            {String(new Date(item.EndTime).getHours()).padStart(2, '0') +
              ':' +
              String(new Date(item.EndTime).getMinutes()).padStart(2, '0')}
          </Text>
          <Text style={{color: theme.colors.mainColor, fontSize: 16}}>
            {item.Name}
          </Text>
        </View>
        <Text style={{color: theme.colors.mainColor, fontSize: 16}}>
          {String(
            new Date(Date.parse(item.StartTime)).toISOString().split('T')[0],
          )}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const renderItem = ({item}) => <Item item={item} />;

  return (
    <SafeAreaView style={styles.container}>
      {/* {isLoading ? (
        <ActivityIndicator />
      ) : ( */}
      <FlatList
        data={recognizedEventsList}
        renderItem={renderItem}
        keyExtractor={item => item.Id}
      />
      {/* )} */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    backgroundColor: '#f2f4f5',
    width: '80%',
    borderRadius: 15,
    marginBottom: 20,
  },
  item: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    marginHorizontal: 10,
    marginVertical: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'center',
    color: 'black',
    marginBottom: 10,
  },
  content: {
    marginLeft: 10,
    fontSize: 16,
    color: theme.colors.mainColor,
    alignSelf: 'center',
  },
});
