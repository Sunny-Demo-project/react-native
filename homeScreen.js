import React from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import Atar from './atarCalculator/atar';
import Tracker from './studyTracker/tracker';
import Profile from './profilePage/user';
import Splash from './userManual/first';
import { NavigationContainer } from '@react-navigation/native';

class atarCalculator extends React.Component {
    render() {
        return < Atar />
    }
}

class StudyTracker extends React.Component {
    render() {
        return < Tracker />
    }
}

class ProfileScreen extends React.Component {
    render() {
        return < NavigationContainer >
            < Profile />
        </NavigationContainer>
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
});

const TabNavigator = createMaterialBottomTabNavigator(
    {
        AtarCalculator: {
            screen: atarCalculator,
            navigationOptions: {
                tabBarIcon: () => (
                    <View>
                        <Image source={require('../assets/bottom_icons/calculator_dark.png')} style={{ width: 30, height: 30 }}></Image>
                    </View>
                ),
            }
        },
        StudyTracker: {
            screen: StudyTracker,
            navigationOptions: {
                tabBarIcon: () => (
                    <View>
                        <Image source={require('../assets/bottom_icons/clock_dark.png')} style={{ width: 30, height: 30 }}></Image>
                    </View>
                ),
            }
        },
        ProfileScreen: {
            screen: ProfileScreen,
            navigationOptions: {
                tabBarIcon: () => (
                    <View>
                        {/* (focused == true) ?
                        <Image source={require('../assets/bottom_icons/profile_active.png')} style={{ width: 30, height: 30 }}></Image> : */}
                        <Image source={require('../assets/bottom_icons/profile_dark.png')} style={{ width: 30, height: 30 }}></Image>
                    </View>
                ),
            }
        },
    },
    {
        initialRouteName: "AtarCalculator",
        barStyle: { backgroundColor: '#ffffff' },
        labeled: false,
        inactiveColor: '#ffffff',
        activeColor: '#000000',
    },
);

export default createAppContainer(TabNavigator);