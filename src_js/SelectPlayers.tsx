import * as React from "react";
import { Component } from "react";
import Checkbox from 'material-ui/Checkbox';
import RaisedButton from 'material-ui/RaisedButton';
import {InitialSettingsActionDispatcher,InitialSettingsState,ErrorMessageId} from "./InitialSettingsReducer";
import MyIntlLib from './MyIntlLib';
import MyIntl from './MyIntl';


import {AppActionDispatcher, AppState,Aisle,AisleTypes,Player,PlayerType,AisleState,MessageIcons,GamePhase} from './AppReducer';


export interface SelectPlayersProps extends InitialSettingsState
{
    actions?:InitialSettingsActionDispatcher;
}

export default class SelectPlayers extends Component<SelectPlayersProps> {
    constructor(props: any) {
        super(props);
    }

    getErrorMessage(errorMessageId:ErrorMessageId):string
    {
        switch(errorMessageId)
        {
            case ErrorMessageId.None:
                return "";
            case ErrorMessageId.PlayerIsLessThanTow:
                return MyIntlLib.format("SelectPlayers_PlayerIsLessThanTow");
            case ErrorMessageId.CannotSelectMouseOnly:
                return MyIntlLib.format("SelectPlayers_CannotSelectMouseOnly");
            case ErrorMessageId.CannotSelectRabbitOnly:
                return MyIntlLib.format("SelectPlayers_CannotSelectRabbitOnly");
        }
        return "";
    }

    render(){
        return <div>
            <p><MyIntl id="SelectPlayers_SelectUseCharactor"/></p>
            <Checkbox
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
                onCheck={(event:any,isInputChecked:boolean)=>this.props.actions.addOrRemovePlayer(PlayerType.GreenRabbit, isInputChecked)}
                checked={this.props.selectedPlayers.filter(_=>_ === PlayerType.GreenRabbit).length > 0}
            />
            <Checkbox
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
                onCheck={(event:any,isInputChecked:boolean)=>this.props.actions.addOrRemovePlayer(PlayerType.RedMouse, isInputChecked)}
                checked={this.props.selectedPlayers.filter(_=>_ === PlayerType.RedMouse).length > 0}
            />
            <Checkbox
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
                onCheck={(event:any,isInputChecked:boolean)=>this.props.actions.addOrRemovePlayer(PlayerType.BlueRabbit, isInputChecked)}
                checked={this.props.selectedPlayers.filter(_=>_ === PlayerType.BlueRabbit).length > 0}
            />
            <Checkbox
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
                onCheck={(event:any,isInputChecked:boolean)=>this.props.actions.addOrRemovePlayer(PlayerType.YellowMouse, isInputChecked)}
                checked={this.props.selectedPlayers.filter(_=>_ === PlayerType.YellowMouse).length > 0}
            />
            <p style={{color:"red"}}>{this.getErrorMessage(this.props.errorMessage)}</p>
            <RaisedButton label={MyIntlLib.format("Common_Previous")} style={{ margin: 12}}
                onClick={()=>this.props.actions.moveBack()}/>
            <RaisedButton label={MyIntlLib.format("Common_Next")} primary={true} style={{ margin: 12}}
                onClick={()=>this.props.actions.moveNext()}/>
            </div>
    }
}