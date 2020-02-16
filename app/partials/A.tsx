import React from "react";
import {Linking, Text, ToastAndroid, StyleSheet} from "react-native";
import {HIGHLIGHT_COLOR} from "../Theme";

interface IAProps {
    href: string,
    children: React.ReactNode
}

class A extends React.Component<IAProps> {
    private _openUrl = async (): Promise<void> => {
        const webSupported = await Linking.canOpenURL(this.props.href);
        if (webSupported) {
            Linking.openURL(this.props.href);
        } else {
            ToastAndroid.show('Cannot open url', ToastAndroid.SHORT);
        }
    };

    render() {
        return (
            <Text onPress={this._openUrl} style={styles.link}>{this.props.children}</Text>
        )
    }
}

const styles = StyleSheet.create({
    link: {
        color: HIGHLIGHT_COLOR
    }
});

export default A
