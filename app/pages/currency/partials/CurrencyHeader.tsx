import React from "react";
import {Animated, StyleSheet, View, Text, StatusBar} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {MaterialCommunityIcons as Icon} from "@expo/vector-icons";
import {NavigationInjectedProps, withNavigation} from "react-navigation";
import {SCREEN} from "../../../types/screen";
import {HIGHLIGHT_COLOR, Palette, SURFACE_COLOR} from "../../../Theme";

interface ICurrencyHeaderAnimateProps {
    backgroundColor: Animated.AnimatedInterpolation,
    elevation: Animated.AnimatedInterpolation
}

interface ICurrencyHeaderProps extends NavigationInjectedProps {
    animate: ICurrencyHeaderAnimateProps,
    color: Palette
}

class Animate {
    private _value = new Animated.Value(0);
    private _color = HIGHLIGHT_COLOR;

    constructor(color: string) {
        this._color = color;
    }

    public onScroll = Animated.event([{
        nativeEvent: {
            contentOffset: {
                y: this._value
            }
        }
    }]).bind(this);

    public get value(): ICurrencyHeaderAnimateProps {
        const backgroundColor = this._value.interpolate({
            inputRange: [0, 65],
            outputRange: ['transparent', this._color],
            extrapolate: 'clamp'
        });

        const elevation = this._value.interpolate({
            inputRange: [40, 65],
            outputRange: [0, 5],
            extrapolate: 'clamp'
        });

        return {backgroundColor, elevation};
    }
}

class CurrencyHeader extends React.Component<ICurrencyHeaderProps> {

    componentDidMount(): void {
        StatusBar.setBackgroundColor(this.props.color.DARK);
    }

    render() {
        const {backgroundColor, elevation} = this.props.animate;
        const {navigate} = this.props.navigation;
        return (
            <Animated.View style={[styles.appbar, {backgroundColor, elevation}]}>
                <SafeAreaView style={styles.safeArea}>
                    <View style={styles.appbarContent}>
                        <Icon name="death-star-variant" size={30} color={SURFACE_COLOR}/>
                        <Text style={styles.title}>Currencyshizzl</Text>
                    </View>
                    <View style={styles.appbarContent}>
                        <Icon name="information" size={30} onPress={() => navigate(SCREEN.DISCLAIMER)}
                              color={SURFACE_COLOR}/>
                    </View>
                </SafeAreaView>
            </Animated.View>
        );
    }
}

const styles = StyleSheet.create({
    appbar: {
        position: 'absolute',
        left: 0,
        right: 0,
        paddingHorizontal: 15,
        paddingVertical: 15,
        backgroundColor: 'transparent'
    },
    safeArea: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    appbarContent: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    title: {
        fontSize: 22,
        paddingLeft: 5,
        color: SURFACE_COLOR
    }
});

export default withNavigation(CurrencyHeader);
export {Animate}
