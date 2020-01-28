import React from "react";
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from "react-navigation-stack";
import CurrencyPages from './pages/currency/CurrencyPages';
import DisclaimerPage from "./pages/disclaimer/DisclaimerPage";

enum SCREEN {
    CURRENCY = 'Currency',
    DISCLAIMER = 'Disclaimer'
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
    }
}, {
    initialRouteName: SCREEN.CURRENCY
});

export {SCREEN}
export default createAppContainer(AppNavigator);
