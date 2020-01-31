import React from "react";
import {Text} from "react-native";
import ScrollTabLayout from "../layouts/ScrollTabLayout";
import {NavigationInjectedProps} from "react-navigation";
import {connect, ConnectedProps} from "react-redux";
import {ICurrencyState} from "../../../reducers/currency/types";
import moment from "moment";
import {reloadAllAction} from "../../../reducers/currency/actions";

const mapState = (state: ICurrencyState) => ({
    lastUpdated: state.lastUpdated
});

const mapDispatch = {
    reload: reloadAllAction
};

const connector = connect(mapState, mapDispatch);

interface IOverviewTabProps extends NavigationInjectedProps, ConnectedProps<typeof connector> {
}

class OverviewTab extends React.Component<IOverviewTabProps> {
    get lastUpdated(): string {
        if(!this.props.lastUpdated){
            return 'Never';
        }
        return moment(this.props.lastUpdated).format('YYYY MM DD, hh:mm');
    }

    componentDidMount(): void {
        if(!this.props.lastUpdated){
            this.props.reload();
        }
    }

    render() {
        return (
            <ScrollTabLayout>
                <Text style={{height:2000}}>{this.lastUpdated}</Text>
            </ScrollTabLayout>
        );
    }
}

export default connector(OverviewTab)
