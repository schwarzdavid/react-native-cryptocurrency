import React from "react";
import {Animated, StyleSheet, View} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {MaterialCommunityIcons as Icon} from "@expo/vector-icons";
import {NavigationInjectedProps, withNavigation} from "react-navigation";
import {SCREEN} from "../../../types/screen";

interface ICurrencyHeaderAnimateProps {
    backgroundColor: Animated.AnimatedInterpolation,
    elevation: Animated.AnimatedInterpolation,
    paddingHorizontal: Animated.AnimatedInterpolation,
    color: Animated.AnimatedInterpolation
}

interface ICurrencyHeaderProps extends NavigationInjectedProps {
    animate: ICurrencyHeaderAnimateProps
}

const AnimatedIcon = Animated.createAnimatedComponent(Icon);

class Animate {
    private _value = new Animated.Value(0);

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
            outputRange: ['transparent', '#FFFFFF']
        });

        const elevation = this._value.interpolate({
            inputRange: [40, 65],
            outputRange: [0, 5],
            extrapolate: 'clamp'
        });

        const paddingHorizontal = this._value.interpolate({
            inputRange: [0, 65],
            outputRange: [0, 10],
            extrapolate: 'clamp'
        });

        const color = this._value.interpolate({
            inputRange: [0, 65],
            outputRange: ['#FFFFFF', '#4DADFE'],
            extrapolate: 'clamp'
        });

        return {backgroundColor, elevation, paddingHorizontal, color};
    }
}

class CurrencyHeader extends React.Component<ICurrencyHeaderProps> {
    render() {
        const {backgroundColor, elevation, color, paddingHorizontal} = this.props.animate;
        const {navigate} = this.props.navigation;
        return (
            <View style={styles.container}>
                <SafeAreaView>
                    <Animated.View style={[styles.appbar, {backgroundColor, elevation, paddingHorizontal}]}>
                        <View style={styles.appbarContent}>
                            <AnimatedIcon name="death-star-variant" style={{color}} size={30}/>
                            <Animated.Text style={[styles.title, {color}]}>Currencyshizzl</Animated.Text>
                        </View>
                        <View style={styles.appbarContent}>
                            <AnimatedIcon name="information" style={{color}} size={30}
                                          onPress={() => navigate(SCREEN.DISCLAIMER)}/>
                        </View>
                    </Animated.View>
                </SafeAreaView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 10,
        left: 20,
        right: 20
    },
    appbar: {
        backgroundColor: 'transparent',
        borderRadius: 1000,
        height: 50,
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
        paddingLeft: 5
    }
});

export default withNavigation(CurrencyHeader);
export {Animate}
