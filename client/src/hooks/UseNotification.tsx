import React, { useState, useEffect, useRef } from 'react';
import { Text, View, Button, Platform } from 'react-native';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { notifications } from '../services/notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function UseNotifications() {
  const [expoPushToken, setExpoPushToken] = useState<string>('');
  const [notification, setNotification] = useState<Notifications.Notification | false>(false);
  const notificationListener = useRef<Notifications.Subscription>();
  const responseListener = useRef<Notifications.Subscription>();
  const userData = useSelector((state: RootState) => state.auth.userData);

  const [title, setTitle] = useState('');
  const [body, setBody] = useState('')

  useEffect(() => {
    if (!userData.notificationToken){
        console.log('need permission')
        registerForPushNotificationsAsync().then((token) => setExpoPushToken(token));
    } else{
        setExpoPushToken(userData.notificationToken)
    }


    notificationListener.current = Notifications.addNotificationReceivedListener((notification) => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener((response) => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  async function pushNotification() {
    if (!expoPushToken) {
        console.log('Token not available!');
        return;
    }
    await Notifications.scheduleNotificationAsync({
      content: {
        title,
        body,
      //   data: { data: 'goes here' },
      },
      trigger: { seconds: 2 },
    });
  }


  async function registerForPushNotificationsAsync(): Promise<string> {
    let token: string | null = null;


    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }

    if (Device.isDevice) {

      const { status: existingStatus } = await Notifications.getPermissionsAsync();

      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        return '';
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
    } else {
      console.log('Must use a physical device for Push Notifications');
    }
    if (token){
        await notifications.saveToken(userData.id, token)
    }

    return token || '';
  }

  return {setBody, setTitle, pushNotification}
}



