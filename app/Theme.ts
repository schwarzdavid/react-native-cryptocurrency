import {DefaultTheme, Theme} from "react-native-paper";

const theme: Theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: '#388E3C',
        accent: '#FF9800',
        background: '#FFFFFF',
        text: '#000000'
    }
};

export default theme;
