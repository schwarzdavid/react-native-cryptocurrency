import React from "react";
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from "react-navigation-stack";
import CurrencyPages from './pages/currency/CurrencyPages';
import DisclaimerPage from "./pages/disclaimer/DisclaimerPage";
import SettingsPage from "./pages/settings/SettingsPage";

enum SCREEN {
    CURRENCY = 'Currency',
    DISCLAIMER = 'Disclaimer',
    SETTINGS = 'Settings'
}

const AppNavigator = createStackNavigator({
    [SCREEN.CURRENCY]: {
        screen: CurrencyPages,
        navigationOptions: {
            headerShown: false
        }
    },
    [SCREEN.DISCLAIMER]: {
        screen: DisclaimerPage
    },
    [SCREEN.SETTINGS]: {
        screen: SettingsPage,
        navigationOptions: {
            title: 'Select Currencies'
        }
    }
}, {
    initialRouteName: SCREEN.CURRENCY
});

export {SCREEN}
export default createAppContainer(AppNavigator);
