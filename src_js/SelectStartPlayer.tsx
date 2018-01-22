import * as React from "react";
import { Component } from "react";
import RaisedButton from 'material-ui/RaisedButton';
import {RadioButton,RadioButtonGroup} from 'material-ui/RadioButton';
import MyIntlLib from './MyIntlLib';
import MyIntl from './MyIntl';

import {InitialSettingsActionDispatcher,InitialSettingsState} from "./InitialSettingsReducer";

import {AppActionDispatcher, AppState,Aisle,AisleTypes,Player,PlayerType,AisleState,MessageIcons,GamePhase} from './AppReducer';

export interface SelectStartPlayerProps extends InitialSettingsState
{
    actions?:InitialSettingsActionDispatcher;
}

export default class SelectStartPlayer extends Component<SelectStartPlayerProps> {
    constructor(props: any) {
        super(props);
    }

    render(){
        return <div>
            <p><MyIntl id="SelectStartPlayer_WhoIsStart"/></p>
            <RadioButtonGroup name="StartPlayer" defaultSelected={this.props.startPlayer}
                onChange={(event:any,value:string)=>{this.props.actions.changeStartPlayer(value)}}>
                <RadioButton
                    value={PlayerType.GreenRabbit}
                    style={{display:this.props.selectedPlayers.filter(_=>_ === PlayerType.GreenRabbit).length !==0?"":"none"}}
                    checkedIcon={<svg width={24} height={24}>
                        <use 
                            xmlnsXlink="http://www.w3.org/1999/xlink" 
                            xlinkHref="#rabbit" 
                            x="0" 
                            y="0" 
                            width="24" 
                            height="24" 
                            fill={"green"}
                            />
                        </svg>}
                    uncheckedIcon={<svg width={24} height={24}>
                        <use 
                            xmlnsXlink="http://www.w3.org/1999/xlink" 
                            xlinkHref="#rabbit" 
                            x="0" 
                            y="0" 
                            width="24" 
                            height="24" 
                            fill={"gray"}
                            />
                        </svg>}
                    label={MyIntlLib.format("Common_GreenRabbit")}
                />
                <RadioButton
                    value={PlayerType.RedMouse}
                    style={{display:this.props.selectedPlayers.filter(_=>_ === PlayerType.RedMouse).length !==0?"":"none"}}
                    checkedIcon={<svg width={24} height={24}>
                        <use 
                            xmlnsXlink="http://www.w3.org/1999/xlink" 
                            xlinkHref="#mouse" 
                            x="0" 
                            y="0" 
                            width="24" 
                            height="24" 
                            fill={"red"}
                            />
                        </svg>}
                    uncheckedIcon={<svg width={24} height={24}>
                        <use 
                            xmlnsXlink="http://www.w3.org/1999/xlink" 
                            xlinkHref="#mouse" 
                            x="0" 
                            y="0" 
                            width="24" 
                            height="24" 
                            fill={"gray"}
                            />
                        </svg>}
                    label={MyIntlLib.format("Common_RedMouse")}
                    />
                <RadioButton
                    value={PlayerType.BlueRabbit}
                    style={{display:this.props.selectedPlayers.filter(_=>_ === PlayerType.BlueRabbit).length !==0?"":"none"}}
                    checkedIcon={<svg width={24} height={24}>
                        <use 
                            xmlnsXlink="http://www.w3.org/1999/xlink" 
                            xlinkHref="#rabbit" 
                            x="0" 
                            y="0" 
                            width="24" 
                            height="24" 
                            fill={"blue"}
                            />
                        </svg>}
                    uncheckedIcon={<svg width={24} height={24}>
                        <use 
                            xmlnsXlink="http://www.w3.org/1999/xlink" 
                            xlinkHref="#rabbit" 
                            x="0" 
                            y="0" 
                            width="24" 
                            height="24" 
                            fill={"gray"}
                            />
                        </svg>}
                    label={MyIntlLib.format("Common_BlurRabbit")}
                    />
                <RadioButton
                    value={PlayerType.YellowMouse}
                    style={{display:this.props.selectedPlayers.filter(_=>_ === PlayerType.YellowMouse).length !==0?"":"none"}}
                    checkedIcon={<svg width={24} height={24}>
                        <use 
                            xmlnsXlink="http://www.w3.org/1999/xlink" 
                            xlinkHref="#mouse" 
                            x="0" 
                            y="0" 
                            width="24" 
                            height="24" 
                            stroke="black"
                            strokeWidth="8" 
                            fill={"yellow"}
                            />
                        </svg>}
                    uncheckedIcon={<svg width={24} height={24}>
                        <use 
                            xmlnsXlink="http://www.w3.org/1999/xlink" 
                            xlinkHref="#mouse" 
                            x="0" 
                            y="0" 
                            width="24" 
                            height="24" 
                            stroke="black"
                            fill={"gray"}
                            />
                        </svg>}
                    label={MyIntlLib.format("Common_YellowMouse")}
                    />
            </RadioButtonGroup>
            <p><MyIntl id="SelectStartPlayer_SelectDifficulty"/></p>
            <RadioButtonGroup name="difficulty" defaultSelected={this.props.difficulty.name}
                onChange={(event:any,value:string)=>{this.props.actions.changeDifficulty(value)}}>
                <RadioButton label={MyIntlLib.format("Common_DifficultyEasy")} value="easy" />
                <RadioButton label={MyIntlLib.format("Common_DifficultyNormal")} value="normal" />
                <RadioButton label={MyIntlLib.format("Common_DifficultyHard")} value="hard" />
                <RadioButton label={MyIntlLib.format("Common_DifficultyCustom")} value="custom" />
            </RadioButtonGroup>
            
        <RaisedButton label="Back" style={{ margin: 12}}
            onClick={()=>this.props.actions.moveBack()}/>
        <RaisedButton label="Next" primary={true} style={{ margin: 12}}
            onClick={()=>this.props.actions.moveNext()}/>
    </div>
    }
}