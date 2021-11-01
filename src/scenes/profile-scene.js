import React, { useState } from 'react';
import { Text, View, StyleSheet, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Button, Overlay, Divider } from 'react-native-elements';
import Background from '../components/background';
import { theme } from '../themes/theme';


export default function Profile({ navigation }) {

    return (
    <Background>
      <View style={styles.container}>
        <Text style={{ color: theme.colors.mainColor }}>Home Screen</Text>
        <Button
          title="Go to details screen"
          onPress={() => navigation.navigate("Details")}
        />
      </View>
      </Background>
    );
  
  }
  function OverlayComp({ navigation }) {
    const [visible, setVisible] = useState(true);
    const toggleOverlay = param => {
      setVisible(true);
      if (param === 'yes') {
  
        navigation.reset({
          index: 0,
          routes: [{ name: 'StartScene' }],
        });
      } else setVisible(false);
    };
    return (
      <Overlay isVisible={visible} onBackdropPress={() => toggleOverlay('no')}>
        <Text style={styles.tab}>Are you sure you want to log out?</Text>
        <View style={styles.row}>
          <Button title="Yes" onPress={() => toggleOverlay('yes')} />
  
          <Button title="No" onPress={() => toggleOverlay('no')} />
        </View>
      </Overlay>
    );
  }
  const styles = StyleSheet.create({
    container: {
      flex: 1, 
      alignItems: 'center', 
      justifyContent: 'center'
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        maxWidth: 400,
        alignSelf: 'center',
        justifyContent: 'center',
        fontSize: 16,
      },
      tab: {
        fontSize: 16,
        fontWeight: 'bold',
        color: theme.colors.mainColor,
      },
  });