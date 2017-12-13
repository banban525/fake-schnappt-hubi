import * as React from "react";
import { Component } from "react";
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import {InitialSettingsActionDispatcher,InitialSettingsState} from "./InitialSettingsReducer";

export interface IntroductionProps extends InitialSettingsState
{
    actions?:InitialSettingsActionDispatcher;
}

export default class Introduction extends Component<IntroductionProps> {
    constructor(props: any) {
        super(props);
    }

    render(){
        return <div>
            
            <RaisedButton label="はじめてのゲーム" style={{ margin: 12}}
                onClick={()=>this.props.actions.StartNewGame()}/>
            <RaisedButton label="まえとおなじなんいどではじめる" primary={true} style={{ margin: 12}} disabled={!this.props.canStartSameSettingGame}
                onClick={()=>this.props.actions.StartSameSettingGame()}/>
            <RaisedButton label="つづきからはじめる" primary={true} style={{ margin: 12}} disabled={!this.props.canContinueGame}
                onClick={()=>this.props.actions.ContinuePreviousGame()}/>
            </div>
    }
}