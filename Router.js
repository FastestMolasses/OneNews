import React from 'react';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';

import HomeScreen from './src/pages/HomeScreen';
import MapsScreen from './src/pages/MapsScreen';
import SettingsScreen from './src/pages/SettingsScreen';

const TabNavigator = createBottomTabNavigator(
    {
        Home: HomeScreen,
        Map: MapsScreen,
        Settings: SettingsScreen,
    },
    {
        tabBarOptions: {
            activeTintColor: 'tomato',
            inactiveTintColor: 'gray',
        },
    },
);

export default createAppContainer(TabNavigator);
