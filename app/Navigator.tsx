import React from "react";
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from "react-navigation-stack";
import CurrencyPages from './pages/currency/CurrencyPages';
import DisclaimerPage from "./pages/disclaimer/DisclaimerPage";
import {FAB} from "react-native-paper";
import {StyleSheet} from "react-native";

enum SCREEN {
    CURRENCY = 'Currency',
    DISCLAIMER = 'Disclaimer'
}

const AppNavigator = createStackNavigator({
    [SCREEN.CURRENCY]: {
        screen: CurrencyPages,
        navigationOptions({navigation}) {
            return {
                headerTransparent: true,
                title: '',
                headerRight: ({tintColor}) => (
                    <FAB small onPress={() => navigation.navigate(SCREEN.DISCLAIMER)} icon="legal" color={tintColor} style={styles.fab}/>),
                headerTintColor: '#555555'
            };
        }
    },
    [SCREEN.DISCLAIMER]: {
        screen: DisclaimerPage
    }
}, {
    initialRouteName: SCREEN.CURRENCY
});

const styles = StyleSheet.create({
    fab: {
        margin: 20
    }
});

export {SCREEN}
export default createAppContainer(AppNavigator);
