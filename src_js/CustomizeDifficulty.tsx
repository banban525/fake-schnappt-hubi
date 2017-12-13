import * as React from "react";
import { Component } from "react";
import Checkbox from 'material-ui/Checkbox';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Slider from 'material-ui/Slider';
import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';
import {InitialSettingsActionDispatcher, InitialSettingsState,ErrorMessageId} from "./InitialSettingsReducer";

import {AppActionDispatcher, AppState,Aisle,AisleTypes,Player,PlayerType,AisleState,MessageIcons,GamePhase} from './AppReducer';

export interface CustomizeDifficultyProps extends InitialSettingsState
{
    actions?:InitialSettingsActionDispatcher;
}

export default class CustomizeDifficulty extends Component<CustomizeDifficultyProps> {
    constructor(props: any) {
        super(props);
    }
    getErrorMessage(errorMessageId:ErrorMessageId):string
    {
        switch(errorMessageId)
        {
            case ErrorMessageId.None:
                return "";
            case ErrorMessageId.CanInputNumberGreaterThanZero:
                return "0よりおおきいすうじをいれてね";
        }
        return "";
    }
    render(){
        return <div>
            <p>せいげんじかん</p>
            <div>
                <div style={{display: "inline-block", width:"70%", verticalAlign:"top"}}>
                    <Slider
                        min={10}
                        max={100}
                        step={1}
                        value={this.props.difficulty.timeLimit}
                        onChange={(event, value) => this.props.actions.changeTimeLimit(value)}
                        />
                </div>
                <div style={{display: "inline-block", width:"30%"}}>
                    <TextField
                        value={this.props.difficulty.timeLimit}
                        disabled={true}
                        fullWidth={true}
                    />
                </div>
            </div>
            <p>まほうのとびらのかず</p>
            <SelectField
                value={this.props.difficulty.magicDoorCount}
                onChange={(event, index, value)=>this.props.actions.changeMagicDoorCount(value)}
            >
                <MenuItem value={1} primaryText="1" />
                <MenuItem value={2} primaryText="2" />
                <MenuItem value={3} primaryText="3" />
                <MenuItem value={4} primaryText="4" />
                <MenuItem value={5} primaryText="5" />
            </SelectField>
            <p>はじめにフビがいどうするじかん</p>
            <div>
                <div style={{display: "inline-block", width:"45%"}}>
                    <TextField
                        value={this.props.firstHubiMoveTimingStartTemp}
                        fullWidth={true}
                        onChange={(event,value)=>this.props.actions.changeFistHubiMoveTimingStart(value)}
                        errorText={this.getErrorMessage(this.props.errorFirstHubiMoveTimingStartTemp)}
                        />
                </div>
                <div style={{display: "inline-block", width:"10%", textAlign:"center"}}>
                    -
                </div>
                <div style={{display: "inline-block", width:"45%"}}>
                    <TextField
                        value={this.props.firstHubiMoveTimingEndTemp}
                        fullWidth={true}
                        onChange={(event,value)=>this.props.actions.changeFistHubiMoveTimingEnd(value)}
                        errorText={this.getErrorMessage(this.props.errorFirstHubiMoveTimingEndTemp)}
                        />
                </div>
            </div>
            <p>2かいめいこうにフビがいどうするじかん</p>
            <div>
                <div style={{display: "inline-block", width:"45%"}}>
                    <TextField
                        value={this.props.afterFirstHubiMoveTimingStartTemp}
                        fullWidth={true}
                        onChange={(event,value)=>this.props.actions.changeAfterFirstHubiMoveTimingStart(value)}
                        errorText={this.getErrorMessage(this.props.errorAfterFirstHubiMoveTimingStartTemp)}
                        />
                </div>
                <div style={{display: "inline-block", width:"10%", textAlign:"center"}}>
                    -
                </div>
                <div style={{display: "inline-block", width:"45%"}}>
                    <TextField
                        value={this.props.afterFirstHubiMoveTimingEndTemp}
                        fullWidth={true}
                        onChange={(event,value)=>this.props.actions.changeAfterFirstHubiMoveTimingEnd(value)}
                        errorText={this.getErrorMessage(this.props.errorAfterFirstHubiMoveTimingEndTemp)}
                    />
                </div>
            </div>
            <p>くわしいヒントをだすわりあい</p>
            <div>
                <div style={{display: "inline-block", width:"70%", verticalAlign:"top"}}>
                    <Slider
                        min={10}
                        max={100}
                        step={10}
                        value={this.props.difficulty.detailHintPercent}
                        onChange={(event, value) => this.props.actions.changeDetailHintPercent(value)}
                        />
                </div>
                <div style={{display: "inline-block", width:"30%"}}>
                    <TextField
                        value={this.props.difficulty.detailHintPercent + "%"}
                        disabled={true}
                        fullWidth={true}
                    />
                </div>
            </div>
            <RaisedButton label="Back" style={{ margin: 12}}
                onClick={()=>this.props.actions.moveBack()}/>
            <RaisedButton label="Next" primary={true} style={{ margin: 12}}
                onClick={()=>this.props.actions.moveNext()}/>
        </div>
    }
}