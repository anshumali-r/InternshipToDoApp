import React from 'react';
import Completed from './Screens/Completed';
import Remaining from './Screens/Remaining';
import TaskInput from './Component/TaskInput';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
const Tab = createBottomTabNavigator();
const MyTabs = () => {
    return (
        <Tab.Navigator
            initialRouteName='Home'
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    if (route.name === 'Home') {
                        iconName = focused
                            ? 'home'
                            : 'home-outline';
                    } else if (route.name === 'Completed') {
                        iconName = focused ? 'md-checkmark-circle' : 'md-checkmark-circle-outline';
                    }
                    else if (route.name === 'Remaining') {
                        iconName = focused ? 'md-list-circle' : 'md-list-circle-outline'
                    }

                    return <Ionicons name={iconName} size={25} color={color} />;
                },
                tabBarActiveTintColor: '#BBD6B8',
                tabBarInactiveTintColor: 'gray',
                // tabBarShowLabel: false
                headerShown: false,

                "tabBarHideOnKeyboard": true,
                "tabBarStyle": [
                    {
                        "display": "flex"
                    },
                    null
                ]

            })}
        >
            <Tab.Screen name='Home' component={TaskInput} />
            <Tab.Screen name='Completed' component={Completed} />
            <Tab.Screen name='Remaining' component={Remaining} />
        </Tab.Navigator>
    )
}

export default MyTabs;