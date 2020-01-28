import React from 'react';
import {registerRootComponent} from "expo";
import {InitialProps} from "expo/build/launch/withExpoRoot.types";
import {Provider as PaperProvider} from "react-native-paper";
import AppNavigator from "./Navigator";
import {SafeAreaProvider} from "react-native-safe-area-context";
import theme from "./Theme";
import {FontAwesome} from "@expo/vector-icons";

class Root extends React.Component<InitialProps> {
    render() {
        return (
            <SafeAreaProvider>
                <PaperProvider theme={theme} settings={{icon: props => <FontAwesome {...props}/>}}>
                    <AppNavigator/>
                </PaperProvider>
            </SafeAreaProvider>
        );
    }
}

export default registerRootComponent(Root);
