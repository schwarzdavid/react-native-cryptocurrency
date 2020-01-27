import React from 'react';
import {Appbar} from "react-native-paper";

interface IAppBarState {

}

export default class MainBar extends React.Component<{}, IAppBarState> {
    render() {
        return (
            <Appbar>
                <Appbar.Content title={"Cryptoshizzl"} subtitle={"oida was"}/>
            </Appbar>
        );
    }
}
