import React from "react";
import {Text} from "react-native";
import ScrollTabLayout from "../layouts/ScrollTabLayout";
import {NavigationInjectedProps} from "react-navigation";

export default class OverviewTab extends React.Component<NavigationInjectedProps> {
    render() {
        return (
            <ScrollTabLayout>
                <Text>Hallo</Text>
            </ScrollTabLayout>
        );
    }
}
