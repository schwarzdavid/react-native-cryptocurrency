import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from "react-navigation-stack";
import Overview from './pages/Overview';

const AppNavigator = createStackNavigator({
    Overview: {
        screen: Overview
    }
});

export default createAppContainer(AppNavigator);
