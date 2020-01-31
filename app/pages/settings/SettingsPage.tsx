import React from "react";
import {Searchbar} from "react-native-paper";
import {View} from "react-native";

interface ISettingsState {
    searchText: string
}

class SettingsPage extends React.Component<null, ISettingsState> {
    state = {
        searchText: ''
    };

    private _doSearchFilter(query: string){
        // TODO: do smth here
        this.setState({
            searchText: query
        });
    }

    render() {
        const {searchText} = this.state;
        return (
            <View>
                <Searchbar placeholder="Search..." value={searchText} onChangeText={this._doSearchFilter.bind(this)} />
            </View>
        );
    }
}

export default SettingsPage;
