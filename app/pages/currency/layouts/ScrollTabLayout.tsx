import React from "react";
import {RefreshControl, ScrollView, StyleSheet, View} from "react-native";
import {default as CurrencyHeader, Animate} from "../partials/CurrencyHeader";
import {SafeAreaView} from "react-native-safe-area-context";
import {LinearGradient} from "expo-linear-gradient";

interface IScrollTabLayoutProps {
    children: React.ReactNode,
    refreshing?: boolean,
    onRefresh?: () => any
}

class ScrollTabLayout extends React.Component<IScrollTabLayoutProps> {
    private _headerAnimate = new Animate();

    get _refreshing(): boolean {
        return !!this.props.refreshing;
    }

    get _onRefresh(): (() => any) {
        return this.props.onRefresh ? this.props.onRefresh : () => {
        };
    }

    render() {
        const {children} = this.props;
        return (
            <View>
                <LinearGradient colors={['#4DADFE', '#00F1FE', 'transparent']} style={styles.gradient}/>
                <SafeAreaView style={styles.safeArea}>
                    <ScrollView onScroll={this._headerAnimate.onScroll} scrollEventThrottle={16} style={styles.scrollView}
                                refreshControl={<RefreshControl refreshing={this._refreshing}
                                                                onRefresh={this._onRefresh}/>}>
                        <View style={styles.view}>
                            {children}
                        </View>
                    </ScrollView>
                </SafeAreaView>
                <CurrencyHeader animate={this._headerAnimate.value}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    safeArea: {
        height: '100%'
    },
    scrollView: {
        marginTop: 70,
        flex: 1
    },
    view: {
        marginHorizontal: 15
    },
    gradient: {
        height: 300,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0
    }
});

export default ScrollTabLayout;
