import * as React from "react";
import { Component } from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import AppBar from 'material-ui/AppBar';

import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import Paper from 'material-ui/Paper';

import {InitialSettingsActionDispatcher,InitialSettingsState,SettingsPhases} from './InitialSettingsReducer';
import {Aisle,AisleTypes,Player,PlayerType,AisleState,MessageIcons,GamePhase} from './AppReducer';
import Introduction from "./Introduction";
import SelectPlayers from "./SelectPlayers";
import SelectStartPlayer from "./SelectStartPlayer";
import CustomizeDifficulty from "./CustomizeDifficulty";

export interface InitialSettingsProps extends InitialSettingsState
{
    actions?:InitialSettingsActionDispatcher;
}

export default class InitialSettings extends Component<InitialSettingsProps> {
    constructor(props: any) {
        super(props);
    }

    render(){
        return <MuiThemeProvider muiTheme={getMuiTheme()}>
        <div>
            {this.props.phase !== SettingsPhases.SettingsComplated && <AppBar
                title="Snap Hibi"
                iconClassNameRight="muidocs-icon-navigation-expand-more"
                />}
            <Paper style={{width:"300px"}} zDepth={1}>
                {this.props.phase === SettingsPhases.Start && <Introduction {...this.props}/>}
                {this.props.phase === SettingsPhases.SelectPlayers && <SelectPlayers {...this.props}/>}
                {this.props.phase === SettingsPhases.SelectStartPlayer && <SelectStartPlayer {...this.props}/>}
                {this.props.phase === SettingsPhases.CustomizeDificulty && <CustomizeDifficulty  {...this.props}/>}
            </Paper>
            </div>
        </MuiThemeProvider>
    }
}