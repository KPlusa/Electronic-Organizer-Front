import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Dimensions,
  BackHandler,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Button, Overlay, Divider, Text} from 'react-native-elements';
import Background from '../components/background';
import {theme} from '../themes/theme';
import RenderService from '../components/render-service';
import {useHeaderHeight} from '@react-navigation/elements';
import BackButton from '../components/back-button';
import {HeaderBackButton} from '@react-navigation/elements';
import AddServiceFormOverlay from '../components/add-service-overlay';
import EditServiceFormOverlay from '../components/edit-service-overlay';
import DeleteServiceFormOverlay from '../components/delete-service-overlay';

export default function Service({navigation}) {
  const [isFullHeaderOptionsSelected, setFullHeaderOptionsSelected] =
    useState(false);
  const [visibleAddServiceForm, setVisibleAddServiceForm] = useState(false);
  const [visibleEditServiceForm, setVisibleEditServiceForm] = useState(false);
  const [visibleDeleteServiceForm, setVisibleDeleteServiceForm] = useState(false);
  const [service, setService] = useState(null);
  var isBackButtonPressed = false;
  const toogleAddServiceFormOverlay = () => {
    setVisibleAddServiceForm(!visibleAddServiceForm);
  };
  const toogleEditServiceFormOverlay = () => {
    setVisibleEditServiceForm(!visibleEditServiceForm);
  };
  const toogleDeleteServiceFormOverlay = () => {
    setVisibleDeleteServiceForm(!visibleDeleteServiceForm);
  };

  const SelectedService = childData => {
    setService(childData);
    console.log('Log: ' + childData.id);
  };

  const fullHeaderOptions = () => {
    setFullHeaderOptionsSelected(true);
    navigation.setOptions({
      headerRight: () => (
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            style={styles.headerButtons}
            onPress={toogleAddServiceFormOverlay}>
            <Icon name={'plus-circle'} size={25} color="white"></Icon>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.headerButtons}
            onPress={toogleEditServiceFormOverlay}>
            <Icon name={'edit'} size={25} color="white"></Icon>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.headerButtons}
            onPress={toogleDeleteServiceFormOverlay}
          >
            <Icon name={'trash'} size={25} color="white"></Icon>
          </TouchableOpacity>
        </View>
      ),
    });
  };
  const windowHeight = Dimensions.get('window').height;
  const headerHeight = useHeaderHeight();
  const statusBarHeight = StatusBar.currentHeight;
  const contentHeight =
    windowHeight -
    statusBarHeight -
    headerHeight -
    theme.sizes.bottomTabNavigatorHeight -
    20;

  const onlyAddHeaderOption = () => {
    setFullHeaderOptionsSelected(false);
    navigation.setOptions({
      headerRight: () => (
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            style={styles.headerButtons}
            onPress={toogleAddServiceFormOverlay}>
            <Icon name={'plus-circle'} size={25} color="white"></Icon>
          </TouchableOpacity>
        </View>
      ),
    });
  };
  useEffect(() => {
    isBackButtonPressed = false;
    BackHandler.addEventListener('hardwareBackPress', () => {
      isBackButtonPressed = true;
    });
    navigation.setOptions({
      headerLeft: () => (
        <BackButton
          color={theme.colors.backgroundColor}
          goBack={() => {
            navigation.goBack();
            isBackButtonPressed = true;
          }}
        />
      ),
    });
    onlyAddHeaderOption();

    const unsubscribe = navigation.addListener('blur', () => {
      onlyAddHeaderOption();
      isBackButtonPressed ? null : navigation.goBack();
    });

    return unsubscribe;
  }, [navigation]);
  return (
    <Background>
      <TouchableOpacity
        style={styles.container}
        activeOpacity={1}
        onPressIn={onlyAddHeaderOption}>
        <View
          elevation={4}
          style={[styles.rectangle, {height: contentHeight}]}
          activeOpacity={1}
          onPressIn={onlyAddHeaderOption}>
          <Text h3 style={styles.title}>
            Your saved services
          </Text>
          <RenderService
            fullHeaderOptions={fullHeaderOptions}
            isFullHeaderOptionsSelected={isFullHeaderOptionsSelected}
            selectedService={SelectedService}
          />
        </View>
        <AddServiceFormOverlay
          visibleAddServiceForm={visibleAddServiceForm}
          toogleAddServiceFormOverlay={toogleAddServiceFormOverlay}
          onlyAddHeaderOption={onlyAddHeaderOption}
        />
        {service ? (
          <>
            <EditServiceFormOverlay
              visibleEditServiceForm={visibleEditServiceForm}
              toogleEditServiceFormOverlay={toogleEditServiceFormOverlay}
              service={service}
              onlyAddHeaderOption={onlyAddHeaderOption}
            />
            <DeleteServiceFormOverlay
              visibleDeleteServiceForm={visibleDeleteServiceForm}
              toogleDeleteServiceFormOverlay={toogleDeleteServiceFormOverlay}
              service={service}
              onlyAddHeaderOption={onlyAddHeaderOption}
            />
          </>
        ) : null}
      </TouchableOpacity>
    </Background>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
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
    width: '90%',
    borderRadius: 15,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 10,
  },
  title: {
    fontSize: 20,
    color: theme.colors.mainColor,
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
});