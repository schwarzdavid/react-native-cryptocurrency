import React from 'react';
import {registerRootComponent} from "expo";
import {InitialProps} from "expo/build/launch/withExpoRoot.types";
import {Provider as PaperProvider} from "react-native-paper";
import AppNavigator from "./Navigator";
import {SafeAreaProvider} from "react-native-safe-area-context";
import theme from "./Theme";
import {Provider as ReduxProvider} from "react-redux";
import {configureStore} from "./reducers";
import {PersistGate} from "redux-persist/integration/react";
import {AppLoading} from "expo";
import {reloadCurrenciesAction} from "./reducers/settings/actions";

interface IRootState {
    isAppReady: boolean
}

const {store, persistor} = configureStore();

class Root extends React.Component<InitialProps, IRootState> {
    state = {
        isAppReady: false
    };

    async prefetchData(){
        // @ts-ignore
        await store.dispatch(reloadCurrenciesAction());
    }

    render() {
        if(!this.state.isAppReady){
            return (
                <AppLoading startAsync={this.prefetchData.bind(this)} onFinish={() => this.setState({isAppReady: true})} onError={console.error}/>
            );
        }

        return (
            <SafeAreaProvider>
                <ReduxProvider store={store}>
                    <PersistGate persistor={persistor}>
                        <PaperProvider theme={theme}>
                            <AppNavigator/>
                        </PaperProvider>
                    </PersistGate>
                </ReduxProvider>
            </SafeAreaProvider>
        );
    }
}

export default registerRootComponent(Root);
