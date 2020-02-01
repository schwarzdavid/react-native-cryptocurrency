import React from "react";
import {Text, View} from "react-native";
import ScrollTabLayout from "../layouts/ScrollTabLayout";
import {NavigationInjectedProps} from "react-navigation";
import {connect, ConnectedProps} from "react-redux";
import moment from "moment";
import {reloadPricesAction} from "../../../reducers/currency/actions";
import CurrencyFilter from "../partials/CurrencyFilter";
import {RootState} from "../../../reducers/reducer";

const mapState = (state: RootState) => ({
    lastUpdated: state.currency.lastUpdated,
    isLoading: state.currency.isLoading,
    currency: state.currency.currencies[state.settings.baseCurrency]
});

const mapDispatch = {
    reload: reloadPricesAction
};

const connector = connect(mapState, mapDispatch);

interface IOverviewTabProps extends NavigationInjectedProps, ConnectedProps<typeof connector> {
}

class OverviewTab extends React.Component<IOverviewTabProps> {
    get lastUpdated(): string {
        if (!this.props.lastUpdated) {
            return 'Never';
        }
        return moment(this.props.lastUpdated).format('YYYY MM DD, hh:mm');
    }

    componentDidMount(): void {
        if (!this.props.lastUpdated) {
            this.props.reload();
        }
    }

    render() {
        // TODO: render tradeCurrencies here
        return (
            <ScrollTabLayout>
                <CurrencyFilter/>
                <Text>{this.props.isLoading.toString()}</Text>
                <Text>{this.lastUpdated}</Text>

                <View style={{height: 2000}}></View>
            </ScrollTabLayout>
        );
    }
}

export default connector(OverviewTab)
