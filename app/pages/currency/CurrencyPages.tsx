import React from "react";
import {createMaterialBottomTabNavigator} from "react-navigation-material-bottom-tabs";
import OverviewTab from "./tabs/OverviewTab";
import FavoritesTab from "./tabs/FavoritesTab";
import {FontAwesome} from "@expo/vector-icons";
import {GREEN_PALETTE, RED_PALETTE} from "../../Theme";
import {StatusBar} from "react-native";

function icon(name: string, tintColor?: string): React.ReactNode {
    return (
        <FontAwesome name={name} size={22} style={{color: tintColor}}/>
    );
}

const CurrencyPages = createMaterialBottomTabNavigator({
    Overview: {
        screen: OverviewTab,
        navigationOptions: {
            tabBarIcon: ({tintColor}) => icon('line-chart', tintColor),
            tabBarColor: RED_PALETTE.DEFAULT,
            tabBarOnPress: (route) => {
                StatusBar.setBackgroundColor(RED_PALETTE.DARK);
                route.defaultHandler();
            }
        }
    },
    Favorites: {
        screen: FavoritesTab,
        navigationOptions: {
            tabBarIcon: ({tintColor}) => icon('star', tintColor),
            tabBarColor: GREEN_PALETTE.DEFAULT,
            tabBarOnPress: (route) => {
                StatusBar.setBackgroundColor(GREEN_PALETTE.DARK);
                route.defaultHandler();
            }
        }
    }
}, {
    initialRouteName: 'Overview',
    inactiveColor: '#FFFFFFAA',
    shifting: true
});

export default CurrencyPages;
