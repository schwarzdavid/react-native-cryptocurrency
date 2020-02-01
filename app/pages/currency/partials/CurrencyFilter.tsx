import React from "react";
import {StyleSheet} from "react-native";
import {View} from "react-native";

class CurrencyFilter extends React.Component {
    render(){
        // TODO: create useful filter
        return (
            <View style={styles.view}>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    view: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    }
});

export default CurrencyFilter;
