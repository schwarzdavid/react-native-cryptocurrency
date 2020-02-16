import React from "react";
import {RefreshControl, ScrollView, StyleSheet, View} from "react-native";
import {Animate, default as CurrencyHeader} from "../partials/CurrencyHeader";
import {Palette} from "../../../Theme";
import {StackedAreaChart} from "react-native-svg-charts";
import {curveNatural} from "d3-shape";

interface IScrollTabLayoutProps {
    children: React.ReactNode,
    refreshing?: boolean,
    onRefresh?: () => any,
    color: Palette
}

class ScrollTabLayout extends React.Component<IScrollTabLayoutProps> {
    private static readonly CHART_KEYS = ['dark', 'default', 'light'];

    private static generateChartDatasetNumber(): number {
        return Math.random() * -100 - 50;
    }

    private static generateChartDataset(): { [key: string]: number } {
        return {
            [ScrollTabLayout.CHART_KEYS[0]]: this.generateChartDatasetNumber(),
            [ScrollTabLayout.CHART_KEYS[1]]: this.generateChartDatasetNumber(),
            [ScrollTabLayout.CHART_KEYS[2]]: this.generateChartDatasetNumber()
        }
    }

    private static generateChartData(): { [key: string]: number }[] {
        return [
            this.generateChartDataset(),
            this.generateChartDataset(),
            this.generateChartDataset(),
            this.generateChartDataset()
        ]
    }

    private _headerAnimate = new Animate(this.props.color.DEFAULT);
    private _timeoutID: undefined | number;
    private _chartData: { [key: string]: number }[] = ScrollTabLayout.generateChartData();

    componentDidMount(): void {
        this._timeoutID = setInterval(() => {
            this._chartData = ScrollTabLayout.generateChartData();
            this.forceUpdate();
        }, 5000);
        setTimeout(() => {
            ScrollTabLayout.generateChartData();
        }, 100);
    }

    componentWillUnmount(): void {
        if (this._timeoutID !== undefined) {
            clearInterval(this._timeoutID);
        }
    }

    get _refreshing(): boolean {
        return !!this.props.refreshing;
    }

    get _onRefresh(): (() => any) {
        return this.props.onRefresh ? this.props.onRefresh : () => {
        };
    }

    get _chartColors(): string[] {
        return [this.props.color.DARKER, this.props.color.DEFAULT, this.props.color.LIGHTER];
    }

    render() {
        const {children, color} = this.props;
        return (
            <View style={styles.wrapper}>
                <ScrollView onScroll={this._headerAnimate.onScroll}
                            scrollEventThrottle={16}
                            style={styles.scrollView}
                            refreshControl={
                                <RefreshControl refreshing={this._refreshing} onRefresh={this._onRefresh}/>
                            }>

                    <StackedAreaChart
                        keys={ScrollTabLayout.CHART_KEYS}
                        colors={this._chartColors}
                        data={this._chartData}
                        curve={curveNatural}
                        animate={true}
                        animationDuration={5000}
                        style={styles.gradient}/>

                    <View style={styles.view}>
                        {children}
                    </View>
                </ScrollView>
                <CurrencyHeader animate={this._headerAnimate.value} color={color}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1
    },
    scrollView: {
        flex: 1,
        height: '100%'
    },
    view: {
        marginHorizontal: 15,
        paddingTop: 65,
        minHeight: 300
    },
    gradient: {
        height: 300,
        position: 'absolute',
        top: 0,
        left: 0,
        right: -1
    }
});

export default ScrollTabLayout;
