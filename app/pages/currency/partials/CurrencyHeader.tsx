import React from "react";
import {Appbar} from "react-native-paper";
import {Animated, StyleSheet} from "react-native";

const AnimatedAppbar = Animated.createAnimatedComponent(Appbar);

interface ICurrencyHeaderProps {
    backgroundColor: string | Animated.AnimatedInterpolation
}

class CurrencyHeader extends React.Component<ICurrencyHeaderProps> {
    public static Animate = class Animate {
        private _value = new Animated.Value(0);

        constructor() {
            this._value.addListener(({value}) => {
                console.log(value);
            });
        }


        public onScroll = Animated.event([{
            nativeEvent: {
                contentOffset: {
                    y: this._value
                }
            }
        }]).bind(this);

        public get value(): Animated.AnimatedInterpolation {
            return this._value.interpolate({
                inputRange: [0, 100],
                outputRange: ['transparent', '#FF0000']
            });
        }
    };

    componentDidUpdate() {
        console.log(this.props);
    }

    render() {
        return (
            <AnimatedAppbar style={[styles.appbar, {backgroundColor: this.props.backgroundColor}]}>
                <Appbar.Action icon="plus"/>
                <Appbar.Content title="Hey"/>
                <Appbar.Action icon="info"/>
            </AnimatedAppbar>
        );
    }
}

const styles = StyleSheet.create({
    appbar: {
        marginHorizontal: 20,
        elevation: 0,
        borderRadius: 1000
    }
});

export default CurrencyHeader;
