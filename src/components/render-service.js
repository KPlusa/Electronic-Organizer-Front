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

export default function RenderService({
  fullHeaderOptions,
  isFullHeaderOptionsSelected,
  selectedService,
  servicesList,
  getService,
  isLoading,
}) {
  const [isItemSelected, setItemSelected] = useState(false);
  const [services, setServices] = useState([]);
  const showServiceInfo = value => {
    selectedService(value);
  };
  const toogleItemSelected = value => {
    fullHeaderOptions();
    setItemSelected(value);
  };


  useEffect(() => {
    getService();
  }, []);
  const Item = ({item}) => (
    <TouchableOpacity
      style={[
        styles.item,
        {
          backgroundColor:
            isItemSelected === item.id && isFullHeaderOptionsSelected
              ? theme.colors.secondColor
              : theme.colors.backgroundColor,
        },
      ]}
      delayLongPress={100}
      onLongPress={() => {
        showServiceInfo(item);
        toogleItemSelected(item.id);
      }}>
      <Text style={styles.title}>{item.name}</Text>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <View style={{width: 25, height: 25, justifyContent: 'center'}}>
          <IonIcon
            name={'time'}
            size={20}
            color={theme.colors.mainColor}></IonIcon>
        </View>
        <Text style={styles.content}>Estimated Time:</Text>
        <Text style={styles.content}>{item.estimated_time} min</Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <View style={{width: 25, height: 25, justifyContent: 'center'}}>
          <FontAwesome
            name={'hashtag'}
            size={20}
            color={theme.colors.mainColor}></FontAwesome>
        </View>
        <Text style={styles.content}>Code: </Text>
        <Text style={styles.content}>{item.code}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderItem = ({item}) => <Item item={item} />;

  return (
    <SafeAreaView style={styles.container}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={servicesList}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      )}
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
