import React from 'react';
import {AppLoading, registerRootComponent} from "expo";
import {InitialProps} from "expo/build/launch/withExpoRoot.types";
import {Provider as PaperProvider} from "react-native-paper";
import AppNavigator from "./Navigator";
import {SafeAreaProvider} from "react-native-safe-area-context";
import {generateTheme} from "./Theme";
import {Provider as ReduxProvider} from "react-redux";
import {configureStore} from "./reducers";
import {PersistGate} from "redux-persist/integration/react";
import {reloadCurrencies} from "./reducers/currency/actions";
import {StatusBar} from "react-native";

interface IRootState {
    isAppReady: boolean
}

const {store, persistor} = configureStore();
const theme = generateTheme();

class Root extends React.Component<InitialProps, IRootState> {
    state = {
        isAppReady: false
    };

    async prefetchData() {
        // @ts-ignore
        await store.dispatch(reloadCurrencies());
    }

    render() {
        if (!this.state.isAppReady) {
            return (
                <AppLoading startAsync={this.prefetchData.bind(this)} onFinish={() => this.setState({isAppReady: true})}
                            onError={console.error}/>
            );
        }

        return (
            <SafeAreaProvider>
                <ReduxProvider store={store}>
                    <PersistGate persistor={persistor}>
                        <PaperProvider theme={theme}>
                            <StatusBar barStyle="light-content" />
                            <AppNavigator/>
                        </PaperProvider>
                    </PersistGate>
                </ReduxProvider>
            </SafeAreaProvider>
        );
    }
}

export default registerRootComponent(Root);
