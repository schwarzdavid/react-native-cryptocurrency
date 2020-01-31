import React from 'react';
import {registerRootComponent} from "expo";
import {InitialProps} from "expo/build/launch/withExpoRoot.types";
import {Provider as PaperProvider} from "react-native-paper";
import AppNavigator from "./Navigator";
import {SafeAreaProvider} from "react-native-safe-area-context";
import theme from "./Theme";
import {Provider as ReduxProvider} from "react-redux";
import {configureStore} from "./reducers";

const store = configureStore();

class Root extends React.Component<InitialProps> {
    render() {
        return (
            <SafeAreaProvider>
                <ReduxProvider store={store}>
                    <PaperProvider theme={theme}>
                        <AppNavigator/>
                    </PaperProvider>
                </ReduxProvider>
            </SafeAreaProvider>
        );
    }
}

export default registerRootComponent(Root);
