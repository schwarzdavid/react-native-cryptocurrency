import React from "react";
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from "react-navigation-stack";
import CurrencyPages from './pages/currency/CurrencyPages';
import DisclaimerPage from "./pages/disclaimer/DisclaimerPage";
import ConverterPage from "./pages/converter/ConverterPage";
import { SCREEN } from "./types/screen";

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
    [SCREEN.CONVERTER]: {
        screen: ConverterPage
    }
}, {
    initialRouteName: SCREEN.CURRENCY
});

export {SCREEN}
export default createAppContainer(AppNavigator);
