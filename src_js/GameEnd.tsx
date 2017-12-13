import * as React from "react";
import { Component } from "react";
import Checkbox from 'material-ui/Checkbox';
import RaisedButton from 'material-ui/RaisedButton';

import {AppActionDispatcher, AppState,Aisle,AisleTypes,Player,PlayerType,AisleState,MessageIcons,GamePhase} from './AppReducer';

export interface GameEndProps
{
    actions?:AppActionDispatcher;
}

export default class GameEnd extends Component<GameEndProps> {
    constructor(props: any) {
        super(props);
    }

    render(){
        return <div>
            <h2>おめでとう</h2>
            <p>フビをつかまえるまで：10ターン</p>
            <p>まほうのとびらをみつけるまで：10ターン</p>
            <RaisedButton label="スタートにもどる"  primary={true} fullWidth={true} style={{ margin: 12}}/>
            <RaisedButton label="おなじなんいどでもういちど" fullWidth={true} style={{ margin: 12}}/>
            </div>
    }
}