import React from "react";
import {Grid, LineChart} from "react-native-svg-charts"
import {IHistoryState} from "../../../reducers/favorites/types";
import {StyleSheet, View} from "react-native";

interface IHistoryChartProps {
    data: IHistoryState[]
}

class HistoryChart extends React.PureComponent<IHistoryChartProps> {
    get yValues(): number[] {
        return this.props.data.map(tupel => tupel.value);
    }

    render() {
        console.log(this.yValues);
        return (
            <View style={styles.view}>
                <LineChart data={this.yValues} svg={svg} style={styles.svg}>
                    <Grid/>
                </LineChart>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    view: {
        height: 150,
        flexDirection: 'row'
    },
    svg: {
        flex: 1
    }
});

const svg = {
    stroke: '#555555',
    strokeWidth: 2,
    height: '100%',
    width: '100%'
};

export default HistoryChart
