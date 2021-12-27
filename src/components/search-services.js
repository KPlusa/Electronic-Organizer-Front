import React, {useState, useEffect} from 'react';
import {StoreData, GetData, RemoveData} from '../helpers/store-data';
import axios from 'axios';
import {config} from '../configs/config';
import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  FlatList,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Input from '../components/input-text';
import {theme} from '../themes/theme';
export default function SearchServices({
  navigation,
  setEvent,
  event,
  disable,
  setTitleFocused,
  action,
}) {
  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);
  const [isFlatListVisible, setFlatListVisible] = useState(false);

  const getService = () => {
    GetData('token').then(token => {
      GetData('email').then(mail => {
        axios
          .post(
            `${config.api_url}/Services/list-services`,
            {
              userMail: mail,
            },
            {headers: {Authorization: `Bearer ${token}`}},
          )
          .then(response => {
            setFilteredDataSource(JSON.parse(response.data.data));
            setMasterDataSource(JSON.parse(response.data.data));
          })
          .catch(error => {});
      });
    });
  };
  useEffect(() => {
    setTitleFocused(false);
    getService();
  }, []);
  const searchFilterFunction = text => {
    if (text) {
      const newData = masterDataSource.filter(function (item) {
        const itemData = item.name.toUpperCase()
          ? item.name.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      setFilteredDataSource(masterDataSource);
      setSearch(text);
    }
  };

  const getItem = item => {
    setEvent({value: item});
    setFlatListVisible(false);
  };

  return (
    <>
      <Input
        style={styles.inputStyle}
        inputContainerStyle={styles.inputContainerStyle}
        placeholder="Enter the event you want to add"
        returnKeyType="next"
        value={event.value}
        onChangeText={text => {
          setEvent({value: text});
          searchFilterFunction(text);
        }}
        disabled={disable}
        label="Title"
        error={!!event.error}
        errorMessage={event.error}
        errorStyle={{color: theme.colors.error}}
        leftIcon={{type: 'material-icons', name: 'event-note', size: 15}}
        style={styles.inputStyle}
        inputContainerStyle={styles.inputContainerStyle}
        onPressIn={() => {
          setFlatListVisible(true);
          setTitleFocused('focus');
        }}
        onBlur={() => {
          action();
          setFlatListVisible(false);
          setTitleFocused('blur');
        }}
      />
      {isFlatListVisible ? (
        <View style={styles.flatListStyle}>
          {filteredDataSource.map((item, index) => (
            <TouchableOpacity
              onPress={() => {
                getItem(item.name);
              }}
              style={styles.insideView}
              key={index}>
              <Text style={styles.itemStyle}>{item.name.toUpperCase()}</Text>
            </TouchableOpacity>
          ))}
        </View>
      ) : null}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  itemStyle: {
    padding: 10,
    color: 'black',
    fontSize: 12,
    alignSelf: 'center',
  },
  inputStyle: {
    height: 50,
  },
  inputContainerStyle: {
    height: 50,
    width: '100%',
    alignSelf: 'center',
  },
  flatListStyle: {
    backgroundColor: theme.colors.secondColor,
    alignSelf: 'center',
    borderRadius: 10,
  },
  insideView: {
    borderWidth: 1,
    borderColor: 'white',
  },
});
