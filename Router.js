import React from 'react';
import { StyleSheet, Image } from 'react-native';

import AppStyle from './src/styles/AppStyle';
import HomeScreen from './src/pages/HomeScreen';
import MapsScreen from './src/pages/MapsScreen';
import SettingsScreen from './src/pages/SettingsScreen';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';

const TabNavigator = createBottomTabNavigator(
    {
        Home: {
            screen: HomeScreen,
            navigationOptions: {
                tabBarLabel: 'Home',
                tabBarIcon: ({ tintColor }) => (
                    <Image
                        source={require('./src/img/home_icon.png')}
                        style={[styles.icon, { tintColor }]}
                    />
                ),
            },
        },
        Map: {
            screen: MapsScreen,
            navigationOptions: {
                tabBarLabel: 'Maps',
                tabBarIcon: ({ tintColor }) => (
                    <Image
                        source={require('./src/img/maps_icon.png')}
                        style={[styles.icon, { tintColor }]}
                    />
                ),
            },
        },
        Settings: {
            screen: SettingsScreen,
            navigationOptions: {
                tabBarLabel: 'Settings',
                tabBarIcon: ({ tintColor }) => (
                    <Image
                        source={require('./src/img/settings_icon.png')}
                        style={[styles.icon, { tintColor }]}
                    />
                ),
            },
        },
    },
    {
        tabBarOptions: {
            activeTintColor: AppStyle.pink,
            inactiveTintColor: AppStyle.gunmetal,
        },
    },
);

export default createAppContainer(TabNavigator);

const imgSize = 22;
const styles = StyleSheet.create({
    icon: {
        width: imgSize,
        height: imgSize,
    },
});
