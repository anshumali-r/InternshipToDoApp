import { View, Text } from 'react-native'
import NotificationSounds from 'react-native-notification-sounds';
import React, { useEffect } from 'react'
import notifee, {
    AuthorizationStatus,
    EventType, AndroidImportance, AndroidVisibility,
    Notification,
    TimestampTrigger,
    TriggerType,
    sound
} from '@notifee/react-native';

const scheduleNotification = async ({ reminder, date, minutes, id }) => {
    console.log("INSIDE scheduleNotification in NOTIFICATION.JS")
    const checkPermissions = async () => {
        const settings = await notifee.requestPermission();
        if (settings.authorizationStatus >= AuthorizationStatus.AUTHORIZED) {
            console.log('Permission settings:', settings);
            return true;
        } else {
            console.log('User declined permissions');
            return false
        }
    }
    console.log("Indide scheduleNotifcation : ", date)
    const subtractMinutes = (date, minutes) => {
        date.setMinutes(date.getMinutes() - minutes);
        return date;
    }
    const newDate = subtractMinutes(date, minutes)
    const hasPermissions = await checkPermissions();
    if (hasPermissions) {
        const trigger = {
            type: TriggerType.TIMESTAMP,
            timestamp: +newDate,
        };
        console.log("After if(hasPermission)")
        const notificationDetails = {
            vibration: true,
            vibrationPattern: [2000, 200, 1500, 200],
            // id: '1',
            // id: Math.floor(Math.random() * 1000) + "",
            id: id + "",
            title: ` Reminder - ${reminder}`,
            body: 'Tap on it to check',
            importance: AndroidImportance.HIGH,
            visibility: AndroidVisibility.PUBLIC,

            android: {
                channelId: 'reminder',
                importance: AndroidImportance.HIGH,
                visibility: AndroidVisibility.PUBLIC,
                pressAction: {
                    id: 'default',
                    mainComponent: 'Detail',
                },
                timestamp: Date.now(),
                // showTimestamp: true
            },
            // sound: 'default',
            // vibration: {
            //     // type: notifee.VibrationType.DEFAULT,
            //     pattern: [2250, 500, 250, 500]
            //     // [3000, 800]
            //     // [250, 500, 250, 500], // Custom vibration pattern
            // },
            data: {
                id: '1',
                action: 'reminder',
                details: {
                    name: reminder,
                    date: date.toString(),
                    // date: date,
                },
            },
        };

        await notifee.createTriggerNotification(
            notificationDetails,
            trigger,
        );
    }
    const bootstrap = async () => {
        console.log("INSIDE bootstrap")
        const initialNotification = await notifee.getInitialNotification();
        if (initialNotification) {
            handleNotificationOpen(initialNotification.notification);
        }
    }


    const handleNotificationOpen = (notification) => {
        // console.log("INSIDE handleNotificationOpen")
        const { data } = notification;
        // console.log('Notification Opened', data)
    }

    const foregroundListener = notifee.onForegroundEvent(({ type, detail }) => {
        switch (type) {
            case EventType.DISMISSED:
                console.log('User dismissed notification', detail.notification);
                break;
            case EventType.PRESS:
                console.log('User pressed notification', detail.notification);
                handleNotificationOpen(detail.notification)
                break;
        }
    });
    notifee.onBackgroundEvent(async ({ type, detail }) => {
        const { notification } = detail;
        console.log('Notification received:background', type, detail);
        if (notification) {
            handleNotificationOpen(notification);
        }
    });



    return (<View><Text></Text></View>)
}
const cancelNotification = async (notificationId) => {
    await notifee.cancelNotification(notificationId);
};
export { scheduleNotification, cancelNotification }
