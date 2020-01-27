import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import MainBar from "./partials/MainBar";
import {registerRootComponent} from "expo";
import {InitialProps} from "expo/build/launch/withExpoRoot.types";
import {Provider as PaperProvider} from "react-native-paper";
import AppNavigator from "./Navigator";

class Root extends React.Component<InitialProps> {
    render() {
        return (
            <PaperProvider>
                <View style={styles.container}>
                    <MainBar/>
                    <AppNavigator/>
                    <Text>Jetzt vlt</Text>
                </View>
            </PaperProvider>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f00',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default registerRootComponent(Root);
