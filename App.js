import 'react-native-gesture-handler';
import { enableScreens } from 'react-native-screens';
import Constants from 'expo-constants';

import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useRef } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ScreenOrientation from 'expo-screen-orientation';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { NotificationsTypes } from 'store/ducks/notifications';
import * as Notifications from 'expo-notifications';
import { store, persistor } from './src/store';
import Routes from './src/routes';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import { customFonts } from './assets/fonts/customFonts';

enableScreens();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export default function App() {
  const [userLogged, setUserLogged] = useState('');
  const [userChecked, setUserChecked] = useState(true);

  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  async function registerForPushNotificationsAsync() {
    let token;
    if (Constants.isDevice) {
      const {
        status: existingStatus,
      } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log('expo push token', token);
    } else {
      alert('Must use physical device for Push Notifications');
    }

    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }

    return token;
  }

  function saveNotificationToStore(notification) {
    const currentNotifications = [...store.getState().notifications.data];

    const isAlreadyInStore = currentNotifications.find(
      (n) => n.id === notification.identifier
    );

    if (isAlreadyInStore) {
      return;
    }

    const stripedNotification = {
      id: notification.identifier,
      body: notification.content.body,
      title: notification.content.title,
      date: Date.now(),
    };
    currentNotifications.push(stripedNotification);
    store.dispatch({
      type: NotificationsTypes.SAVE_NOTIFICATIONS,
      notifications: currentNotifications,
    });
  }

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );

    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current = Notifications.addNotificationReceivedListener(
      (notification) => {
        saveNotificationToStore(notification.request);
        setNotification(notification);
      }
    );

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        saveNotificationToStore(response.notification.request);
      }
    );

    return () => {
      Notifications.removeNotificationSubscription(notificationListener);
      Notifications.removeNotificationSubscription(responseListener);
    };
  }, []);

  useEffect(() => {
    async function lockToPortrait() {
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.PORTRAIT_UP
      );
    }
    lockToPortrait();
    checkLogin();
  }, []);

  async function checkLogin() {
    const token = await AsyncStorage.getItem('@Boletao:userToken');

    setUserChecked(true);
    setUserLogged(!!token);
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
        <Routes uriPrefix={prefix} userLogged={userLogged} />
      </PersistGate>
    </Provider>
  );
}
