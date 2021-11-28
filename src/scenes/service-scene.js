import React, {useState, useEffect} from 'react';
import {View, StyleSheet, StatusBar, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Button, Overlay, Divider, Text} from 'react-native-elements';
import Background from '../components/background';
import {theme} from '../themes/theme';
import RenderService from '../components/render-service';

export default function Service({navigation}) {
  const [isFullHeaderOptionsSelected, setFullHeaderOptionsSelected] =
    useState(false);
  const fullHeaderOptions = () => {
    setFullHeaderOptionsSelected(true);
    navigation.setOptions({
      headerRight: () => (
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            style={styles.headerButtons}
            //onPress={toogleAddFormOverlay}
          >
            <Icon name={'plus-circle'} size={25} color="white"></Icon>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.headerButtons}
            //onPress={toogleEditFormOverlay}
          >
            <Icon name={'edit'} size={25} color="white"></Icon>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.headerButtons}
            //onPress={toogleDeleteFormOverlay}
          >
            <Icon name={'trash'} size={25} color="white"></Icon>
          </TouchableOpacity>
        </View>
      ),
    });
  };

  const onlyAddHeaderOption = () => {
    setFullHeaderOptionsSelected(false);
    navigation.setOptions({
      headerRight: () => (
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            style={styles.headerButtons}
            //onPress={toogleAddFormOverlay}
          >
            <Icon name={'plus-circle'} size={25} color="white"></Icon>
          </TouchableOpacity>
        </View>
      ),
    });
  };
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    onlyAddHeaderOption();
    const unsubscribe = navigation.addListener('blur', () => {
      //setCurrentDate(currdate.toISOString().split('T')[0]);
      onlyAddHeaderOption();
    });

    return unsubscribe;
  }, [navigation]);
  return (
    <Background>
      <TouchableOpacity
        elevation={4}
        style={styles.rectangle}
        activeOpacity={1}
        onPressIn={onlyAddHeaderOption}>
        <Text h3 style={styles.title}>
          Your saved services
        </Text>
        <RenderService
          onlyAddHeaderOption={onlyAddHeaderOption}
          fullHeaderOptions={fullHeaderOptions}
          isFullHeaderOptionsSelected={isFullHeaderOptionsSelected}
        />
      </TouchableOpacity>
    </Background>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerButtons: {
    width: 30,
    height: 35,
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tab: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.mainColor,
  },
  rectangle: {
    width: '100%',
    height: '100%',
    borderRadius: 15,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 10,
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    color: theme.colors.mainColor,
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
});
