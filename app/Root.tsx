import React from 'react';
import {registerRootComponent} from "expo";
import {InitialProps} from "expo/build/launch/withExpoRoot.types";
import {Provider as PaperProvider} from "react-native-paper";
import AppNavigator from "./Navigator";
import {SafeAreaProvider} from "react-native-safe-area-context";
import theme from "./Theme";

class Root extends React.Component<InitialProps> {
    render() {
        return (
            <SafeAreaProvider>
                <PaperProvider theme={theme}>
                    <AppNavigator/>
                </PaperProvider>
            </SafeAreaProvider>
        );
    }
}

export default registerRootComponent(Root);
