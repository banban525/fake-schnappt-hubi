import * as React from "react";
import { Component } from "react";
import Checkbox from 'material-ui/Checkbox';
import RaisedButton from 'material-ui/RaisedButton';
import MyIntl from './MyIntl';
import MyIntlLib from './MyIntlLib';

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
            <h2><MyIntl id="GameEnd_Congratulations"/></h2>
            <p><MyIntl id="GameEnd_WhileFoundFubi"/></p>
            <p><MyIntl id="GameEnd_WhileFoundMagicDoor"/></p>
            <RaisedButton label={MyIntlLib.format("GameEnd_ReturnToStart")}  primary={true} fullWidth={true} style={{ margin: 12}}/>
            <RaisedButton label={MyIntlLib.format("GameEnd_ContinueWithSameDifficulty")} fullWidth={true} style={{ margin: 12}}/>
            </div>
    }
}