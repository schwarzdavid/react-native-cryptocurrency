import React from "react";
import {Grid, LineChart, YAxis} from "react-native-svg-charts"
import {IHistory, IHistoryPrice} from "../../../reducers/favorites/types";
import {StyleSheet, View} from "react-native";
import {Caption} from "react-native-paper";
import moment from "moment";

interface IHistoryChartProps {
    data: IHistory
}

class HistoryChart extends React.Component<IHistoryChartProps> {
    private get _timestamps(): number[] {
        return this.props.data.history.map(historyState => historyState.timestamp);
    }

    private get _minDate(): string {
        const minTimestamp = Math.min(...this._timestamps);
        return moment(minTimestamp).format('DD.MM.YYYY hh:mm');
    }

    private get _maxDate(): string {
        const maxTimestamp = Math.max(...this._timestamps);
        return moment(maxTimestamp).format('DD.MM.YYYY hh:mm');
    }

    private _getY = ({item}: { item: IHistoryPrice }): number => item.value;
    private _formatY = (value: number): string => value.toFixed(this.props.data.decimals);

    render() {
        const {history} = this.props.data;
        const verticalInsets = {top: 5, bottom: 15};
        const verticalTicks = 5;

        return (
            <View style={styles.view}>
                <YAxis data={history} yAccessor={this._getY} numberOfTicks={verticalTicks} formatLabel={this._formatY}
                       style={{marginRight: 5, marginBottom: 15}} contentInset={verticalInsets}/>

                <View style={{flex: 1}}>
                    <LineChart data={history} yAccessor={this._getY} svg={svg} style={styles.svg}
                               numberOfTicks={verticalTicks} contentInset={{...verticalInsets, left: 5, right: 5}}>
                        <Grid/>
                    </LineChart>
                    <View style={{height: 15, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start'}}>
                        <Caption>{this._minDate}</Caption>
                        <Caption>{this._maxDate}</Caption>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    view: {
        height: 200,
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
