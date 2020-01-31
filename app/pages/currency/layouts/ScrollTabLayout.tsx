import React from "react";
import {ScrollView, StyleSheet, View} from "react-native";
import {default as CurrencyHeader, Animate} from "../partials/CurrencyHeader";
import {SafeAreaView} from "react-native-safe-area-context";
import {LinearGradient} from "expo-linear-gradient";

interface IScrollTabLayoutProps {
    children: React.ReactNode
}

class ScrollTabLayout extends React.Component<IScrollTabLayoutProps> {
    private _headerAnimate = new Animate();

    render() {
        const {children} = this.props;
        return (
            <View>
                <LinearGradient colors={['#4DADFE', '#00F1FE', 'transparent']} style={styles.gradient} />
                <SafeAreaView>
                    <ScrollView onScroll={this._headerAnimate.onScroll} scrollEventThrottle={16} style={styles.scrollView}>
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
    scrollView: {
        marginTop: 70,
    },
    view: {
        marginHorizontal: 20
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
