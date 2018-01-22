import * as React from "react";
import { Component } from "react";
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import {InitialSettingsActionDispatcher,InitialSettingsState} from "./InitialSettingsReducer";
import MyIntl from './MyIntl';

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
            
            <RaisedButton label={
                <MyIntl
                    id="Introduction_NewGame" />} 
                style={{ margin: 12}}
                onClick={()=>this.props.actions.StartNewGame()}/>
            <RaisedButton label={
                <MyIntl
                    id="Introduction_NewGameWithSameSettings"/>}
                primary={true} style={{ margin: 12}} disabled={!this.props.canStartSameSettingGame}
                onClick={()=>this.props.actions.StartSameSettingGame()}/>
            <RaisedButton label={
                <MyIntl
                    id="Introduction_Continue"/>}
                primary={true} style={{ margin: 12}} disabled={!this.props.canContinueGame}
                onClick={()=>this.props.actions.ContinuePreviousGame()}/>
            </div>
    }
}