import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  SafeAreaView,
} from 'react-native';
import {theme} from '../themes/theme';
import GetServices from '../helpers/get-services';
import IonIcon from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function RenderService({
  fullHeaderOptions,
  isFullHeaderOptionsSelected,
}) {
  const [isItemSelected, setItemSelected] = useState(false);

  const toogleItemSelected = value => {
    fullHeaderOptions();
    setItemSelected(value);
  };
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
      onLongPress={() => {
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
        <Text style={styles.content}>{item.estimatedTime} min</Text>
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
      <FlatList
        data={GetServices()}
        renderItem={renderItem}
        keyExtractor={item => item.name}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
