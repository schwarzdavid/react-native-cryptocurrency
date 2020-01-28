import React from "react";
import {ScrollView, View} from "react-native";
import CurrencyHeader from "../partials/CurrencyHeader";
import {SafeAreaView} from "react-native-safe-area-context";

interface IScrollTabLayoutProps {
    children: React.ReactNode
}

class ScrollTabLayout extends React.Component<IScrollTabLayoutProps> {
    private _headerAnimate = new CurrencyHeader.Animate();

    render() {
        const {children} = this.props;
        return (
            <SafeAreaView>
                <CurrencyHeader backgroundColor={this._headerAnimate.value} />
                <ScrollView onScroll={this._headerAnimate.onScroll}>
                    {children}
                </ScrollView>
            </SafeAreaView>
        );
    }
}

export default ScrollTabLayout;
