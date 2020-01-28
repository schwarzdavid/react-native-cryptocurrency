import React from "react";
import {createMaterialBottomTabNavigator} from "react-navigation-material-bottom-tabs";
import OverviewTab from "./tabs/OverviewTab";
import FavoritesTab from "./tabs/FavoritesTab";
import ConverterTab from "./tabs/ConverterTab";
import {FontAwesome} from "@expo/vector-icons";

function icon(name: string, tintColor?: string): React.ReactNode {
    return (
        <FontAwesome name={name} size={22} style={{color: tintColor}}/>
    );
}

const CurrencyPages = createMaterialBottomTabNavigator({
    Overview: {
        screen: OverviewTab,
        navigationOptions: {
            tabBarIcon: ({tintColor}) => icon('line-chart', tintColor)
        }
    },
    Favorites: {
        screen: FavoritesTab,
        navigationOptions: {
            tabBarIcon: ({tintColor}) => icon('star', tintColor)
        }
    },
    Converter: {
        screen: ConverterTab,
        navigationOptions: {
            tabBarIcon: ({tintColor}) => icon('refresh', tintColor)
        }
    }
}, {
    initialRouteName: 'Overview',
    inactiveColor: '#FFFFFFAA'
});

export default CurrencyPages;
