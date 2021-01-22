import 'react-native-gesture-handler';

import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ScreenOrientation from 'expo-screen-orientation';
import * as firebase from 'firebase';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { NotificationsTypes } from 'store/ducks/notifications';

import { store, persistor } from './store';
import * as NavigationService from './services/NavigationService';
import Routes from './routes';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import { customFonts } from './assets/fonts/customFonts';

// const firebaseConfig = {
//   apiKey: 'AIzaSyATjQb-diXwMxMK1Q6V59mm_HpogyUNupk',
//   authDomain: 'project-id.firebaseapp.com',
//   databaseURL: 'https://boletaoapp.firebaseio.com',
//   projectId: 'boletaoapp',
//   storageBucket: 'boletaoapp.appspot.com',
//   projectNumber: '107471933995',
// };

// firebase.initializeApp(firebaseConfig);

export default function App() {
  const [userLogged, setUserLogged] = useState('');
  const [userChecked, setUserChecked] = useState(true);

  useEffect(() => {
    async function lockToPortrait() {
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.PORTRAIT_UP
      );
    }
    lockToPortrait();
    // checkLogin();
    // startNotificationService();
  }, []);

  async function checkLogin() {
    const token = await AsyncStorage.getItem('@Boletao:userToken');

    setUserChecked(true);
    setUserLogged(!!token);
    // console.tron.log(token);
  }
  // PUSH NOTIFICATION SETUP START
  async function getToken() {
    let fcmToken = await AsyncStorage.getItem('fcmToken');
    if (!fcmToken) {
      fcmToken = await firebase.messaging().getToken();
      if (fcmToken) {
        await AsyncStorage.setItem('fcmToken', fcmToken);
      }
    }
  }

  async function requestPermission() {
    try {
      await firebase.messaging().requestPermission();
      getToken();
    } catch (error) {
      // console.tron.log('permission rejected');
    }
  }

  async function checkPermission() {
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
      getToken();
    } else {
      requestPermission();
    }
  }

  async function createNotificationListeners() {
    firebase.notifications().onNotification((notification) => {
      notification.android.setChannelId('insider').setSound('default');
      firebase.notifications().displayNotification(notification);
      const stripedNotification = {
        id: notification.notificationId,
        body: notification.body,
        title: notification.title,
        date: Date.now(),
      };
      // eslint-disable-next-line prefer-const
      let newList = [...store.getState().notifications.data];
      newList.push(stripedNotification);
      store.dispatch({
        type: NotificationsTypes.SAVE_NOTIFICATIONS,
        notifications: newList,
      });
    });
    firebase.notifications().onNotificationOpened(() => {
      NavigationService.navigate('Notifications');
    });
  }
  // PUSH NOTIFICATION SETUP END

  function startNotificationService() {
    const channel = new firebase.notifications.Android.Channel(
      'insider',
      'insider channel',
      firebase.notifications.Android.Importance.High
    );
    firebase.notifications().android.createChannel(channel);
    checkPermission();
    createNotificationListeners();
  }

  const prefix = 'boletaoapp://';

  if (!userChecked) return null;

  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      try {
        await Font.loadAsync(customFonts);
        setFontsLoaded(true);
      } catch (err) {
        console.log(err);
      }
    }
    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor="rgb(234, 239, 245)"
        />
        <Routes
          uriPrefix={prefix}
          ref={(navigation) => NavigationService.setNavigator(navigation)}
          userLogged={userLogged}
        />
        {/* <View style={styles.container}>
            <Text>Open up App.js to start working on your apps!</Text>
            <StatusBar style="auto" />
          </View> */}
      </PersistGate>
    </Provider>
  );
}
