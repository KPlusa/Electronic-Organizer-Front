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
import ServiceForm from '../components/service-form';
import {StoreData, GetData, RemoveData} from '../helpers/store-data';
import axios from 'axios';
import {config} from '../configs/config';

export default function Service({navigation}) {
  const [isFullHeaderOptionsSelected, setFullHeaderOptionsSelected] =
    useState(false);
  const [visibleServiceForm, setVisibleServiceForm] = useState(false);
  const [service, setService] = useState(null);
  const [services, setServices] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [formType, setFormType] = useState('add');
  var isBackButtonPressed = false;

  const toogleServiceForm = type => {
    if (type === 'add') setFormType('add');
    if (type === 'delete') setFormType('delete');
    if (type === 'edit') setFormType('edit');
    setVisibleServiceForm(!visibleServiceForm);
  };

  const SelectedService = childData => {
    setService('');
    setService(childData);
  };
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
            setServices(JSON.parse(response.data.data));
          })
          .catch(error => {})
          .finally(() => setLoading(false));
      });
    });
  };

  const fullHeaderOptions = () => {
    setFullHeaderOptionsSelected(true);
    navigation.setOptions({
      headerRight: () => (
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            style={styles.headerButtons}
            onPress={() => {
              toogleServiceForm('add');
            }}>
            <Icon name={'plus-circle'} size={25} color="white"></Icon>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.headerButtons}
            onPress={() => {
              toogleServiceForm('edit');
            }}>
            <Icon name={'edit'} size={25} color="white"></Icon>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.headerButtons}
            onPress={() => {
              toogleServiceForm('delete');
            }}>
            <Icon name={'trash'} size={25} color="white"></Icon>
          </TouchableOpacity>
        </View>
      ),
    });
  };
  const windowHeight = Dimensions.get('window').height;
  //const headerHeight = useHeaderHeight();
  const statusBarHeight = StatusBar.currentHeight;
  const contentHeight =
    windowHeight -
    statusBarHeight -
    //headerHeight -
    theme.sizes.bottomTabNavigatorHeight -
    20;

  const onlyAddHeaderOption = () => {
    setFullHeaderOptionsSelected(false);
    navigation.setOptions({
      headerRight: () => (
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            style={styles.headerButtons}
            onPress={() => {
              setFormType('add');
              setVisibleServiceForm(true);
            }}>
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
    <Background noScrollView={true}>
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
            servicesList={services}
            getService={getService}
            isLoading={isLoading}
          />
        </View>
        <ServiceForm
          visibleServiceForm={visibleServiceForm}
          toogleServiceForm={toogleServiceForm}
          onlyAddHeaderOption={onlyAddHeaderOption}
          getService={getService}
          formType={formType}
          service={service}
        />
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
    marginTop: 35,
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
