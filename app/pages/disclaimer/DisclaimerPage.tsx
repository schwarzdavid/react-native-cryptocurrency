import React from "react";
import {Text} from "react-native";
import {NavigationStackScreenProps} from "react-navigation-stack";

interface IDisclaimerPageProps extends NavigationStackScreenProps{
}

export default class DisclaimerPage extends React.Component<IDisclaimerPageProps> {
    render() {
        return (
            <Text>{JSON.stringify(this.props)}</Text>
        );
    }
}
