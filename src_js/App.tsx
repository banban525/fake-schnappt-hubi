import * as React from "react";
import { Component } from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import FlatButton from "material-ui/FlatButton";
import * as injectTapEventPlugin from "react-tap-event-plugin";
import Paper from "material-ui/Paper";
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import Avatar from 'material-ui/Avatar';
import GamesIcon from 'material-ui/svg-icons/av/games';
import UpArrow from 'material-ui/svg-icons/hardware/keyboard-arrow-up';
import DownArrow from 'material-ui/svg-icons/hardware/keyboard-arrow-down';
import LeftArrow from 'material-ui/svg-icons/hardware/keyboard-arrow-left';
import RightArrow from 'material-ui/svg-icons/hardware/keyboard-arrow-right';
import {List,ListItem} from 'material-ui/List';
import HelpIcon from 'material-ui/svg-icons/action/help';
import IconButton from 'material-ui/IconButton';
import SvgIcon from 'material-ui/SvgIcon';

import {AppActionDispatcher, AppState,Aisle,AisleTypes,Player,PlayerType,AisleState,MessageIcons} from './AppReducer';

// Needed for onTouchTap 
// http://stackoverflow.com/a/34015469/988941 
injectTapEventPlugin();



export interface AppProps extends AppState
{
  actions?:AppActionDispatcher;
//   children?:JSX.Element;
//   history?:H.History;
}

class App extends Component<AppProps> {
  constructor(props: any) {
    super(props);
  }

  getAisleColor(aisle:AisleState):string
  {
    if(aisle.shown===false)
    {
        return "pink";
    }
    switch(aisle.type)
    {
    case AisleTypes.FreePassage:
        return "white";
    case AisleTypes.MouseHole:
        return "gray";
    case AisleTypes.RabbitWindow:
        return "green";
    case AisleTypes.Wall:
        return "black"
    case AisleTypes.MagicDoor1:
        return "purple";
    case AisleTypes.MagicDoor2:
        return "purple";
    case AisleTypes.MagicDoor3:
        return "purple";
    case AisleTypes.MagicDoorOpened:
        return "white";
    }
  }
  getHubiPositionX(position:number):number
  {
    if(position === -1)
    {
        return -200;
    }
    var result = (position % 4) * 100;    
    result += 20;
    return result;
  }
  getHubiPositionY(position:number):number
  {
    if(position === -1)
    {
        return -200;
    }
    var result = Math.floor(position / 4) * 100; 
    result += 20;
    return result;
  }
  getPlayerPositionX(player:Player):number
  {
    var result = (player.position % 4) * 100;    
    if(player.playerType === PlayerType.BlueRabbit || player.playerType === PlayerType.GreenRabbit)
    {
        result += 10;
    }
    else
    {
        result += 60;
    }
    return result;
  }
  getPlayerPositionY(player:Player):number
  {
    var result = Math.floor(player.position / 4) * 100;
    if(player.playerType === PlayerType.GreenRabbit || player.playerType === PlayerType.RedMouse)
    {
        result += 10;
    }
    else
    {
        result += 60;
    }
    return result;
  }
    getPlayerColor(player:Player):string{
        switch(player.playerType)
        {
        case PlayerType.BlueRabbit:
            return "blue";
        case PlayerType.RedMouse:
            return "red";
        case PlayerType.GreenRabbit:
            return "green";
        case PlayerType.YellowMouse:
            return "yellow";
        }
        return "";
    }

    getPlayerShape(player:Player):string{
        switch(player.playerType)
        {
        case PlayerType.BlueRabbit:
            return "#rabbit";
        case PlayerType.RedMouse:
            return "#mouse";
        case PlayerType.GreenRabbit:
            return "#rabbit";
        case PlayerType.YellowMouse:
            return "#mouse";
        }
        return "";
    }

    isPlayer(playerType:PlayerType):boolean{
        var matchedPlayer = this.props.players.filter(player=>player.playerType === playerType);
        if(matchedPlayer.length !== 0)
        {
            return true;
        }
        return false;
    }
    isNextPlayer(playerType:PlayerType):boolean{
        return this.props.players[0].playerType === playerType;
    }
    getMessageAvatar(messageIcon: MessageIcons):React.ReactElement<any>
    {
        if(messageIcon == MessageIcons.WhiteOwl)
        {
            return <svg/>
        }
        return <div></div>
    }
    render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <div>
            <AppBar
                title="Snap Hibi"
                iconClassNameRight="muidocs-icon-navigation-expand-more"
            />

            <div style={{float:"right",width:"400px"}}>
            <p>{this.props.operations.length}/{30}</p>
            <svg width="400px" height="400px">
                <polygon points="0,0 0,400 400,400 400,0 0,0 10,10 90,10 90,30 110,30 110,10 190,10 190,30 210,30 210,10 290,10 290,30 310,30 310,10  390,10 390,90 370,90 370,110 390,110 390,190 370,190 370,210 390,210 390,290 370,290 370,310 390,310 390,390  310,390 310,370 290,370 290,390 210,390 210,370 190,370 190,390 110,390 110,370 90,370 90,390  10,390 10,310 30,310 30,290 10,290 10,290 10,210 30,210 30,190 10,190 10,110 30,110 30,90 10,90    10,10 0,0" stroke="black" strokeWidth="1" fill="saddlebrown" />    
                <polygon points=" 90, 90  90, 70 110, 70 110, 90 130, 90 130,110 110,110 110,130  90,130  90,110  70,110  70, 90  90, 90" stroke="black" strokeWidth="1" fill="saddlebrown" />    
                <polygon points="190, 90 190, 70 210, 70 210, 90 230, 90 230,110 210,110 210,130 190,130 190,110 170,110 170, 90 190, 90" stroke="black" strokeWidth="1" fill="saddlebrown" />    
                <polygon points="290, 90 290, 70 310, 70 310, 90 330, 90 330,110 310,110 310,130 290,130 290,110 270,110 270, 90 290, 90" stroke="black" strokeWidth="1" fill="saddlebrown" />    

                <polygon points=" 90,190  90,170 110,170 110,190 130,190 130,210 110,210 110,230  90,230  90,210  70,210  70,190  90,190" stroke="black" strokeWidth="1" fill="saddlebrown" />    
                <polygon points="190,190 190,170 210,170 210,190 230,190 230,210 210,210 210,230 190,230 190,210 170,210 170,190 190,190" stroke="black" strokeWidth="1" fill="saddlebrown" />    
                <polygon points="290,190 290,170 310,170 310,190 330,190 330,210 310,210 310,230 290,230 290,210 270,210 270,190 290,190" stroke="black" strokeWidth="1" fill="saddlebrown" />    

                <polygon points=" 90,290  90,270 110,270 110,290 130,290 130,310 110,310 110,330  90,330  90,310  70,310  70,290  90,290" stroke="black" strokeWidth="1" fill="saddlebrown" />    
                <polygon points="190,290 190,270 210,270 210,290 230,290 230,310 210,310 210,330 190,330 190,310 170,310 170,290 190,290" stroke="black" strokeWidth="1" fill="saddlebrown" />    
                <polygon points="290,290 290,270 310,270 310,290 330,290 330,310 310,310 310,330 290,330 290,310 270,310 270,290 290,290" stroke="black" strokeWidth="1" fill="saddlebrown" />    

                <rect id="aisle_00" x=" 90" y=" 30" width="20" height="40" stroke="black" strokeWidth="1" fill={this.getAisleColor(this.props.aisleStates[0])} />
                <rect id="aisle_01" x="190" y=" 30" width="20" height="40" stroke="black" strokeWidth="1" fill={this.getAisleColor(this.props.aisleStates[1])} />
                <rect id="aisle_02" x="290" y=" 30" width="20" height="40" stroke="black" strokeWidth="1" fill={this.getAisleColor(this.props.aisleStates[2])} />
                
                <rect id="aisle_03" x=" 90" y="130" width="20" height="40" stroke="black" strokeWidth="1" fill={this.getAisleColor(this.props.aisleStates[3])} />
                <rect id="aisle_04" x="190" y="130" width="20" height="40" stroke="black" strokeWidth="1" fill={this.getAisleColor(this.props.aisleStates[4])} />
                <rect id="aisle_05" x="290" y="130" width="20" height="40" stroke="black" strokeWidth="1" fill={this.getAisleColor(this.props.aisleStates[5])} />
                
                <rect id="aisle_06" x=" 90" y="230" width="20" height="40" stroke="black" strokeWidth="1" fill={this.getAisleColor(this.props.aisleStates[6])} />
                <rect id="aisle_07" x="190" y="230" width="20" height="40" stroke="black" strokeWidth="1" fill={this.getAisleColor(this.props.aisleStates[7])} />
                <rect id="aisle_08" x="290" y="230" width="20" height="40" stroke="black" strokeWidth="1" fill={this.getAisleColor(this.props.aisleStates[8])} />
                
                <rect id="aisle_09" x=" 90" y="330" width="20" height="40" stroke="black" strokeWidth="1" fill={this.getAisleColor(this.props.aisleStates[9])} />
                <rect id="aisle_10" x="190" y="330" width="20" height="40" stroke="black" strokeWidth="1" fill={this.getAisleColor(this.props.aisleStates[10])} />
                <rect id="aisle_11" x="290" y="330" width="20" height="40" stroke="black" strokeWidth="1" fill={this.getAisleColor(this.props.aisleStates[11])} />

                
                <rect id="aisle_12" x=" 30" y=" 90" width="40" height="20" stroke="black" strokeWidth="1" fill={this.getAisleColor(this.props.aisleStates[12])} />
                <rect id="aisle_13" x="130" y=" 90" width="40" height="20" stroke="black" strokeWidth="1" fill={this.getAisleColor(this.props.aisleStates[13])} />
                <rect id="aisle_14" x="230" y=" 90" width="40" height="20" stroke="black" strokeWidth="1" fill={this.getAisleColor(this.props.aisleStates[14])} />
                <rect id="aisle_15" x="330" y=" 90" width="40" height="20" stroke="black" strokeWidth="1" fill={this.getAisleColor(this.props.aisleStates[15])} />

                <rect id="aisle_16" x=" 30" y="190" width="40" height="20" stroke="black" strokeWidth="1" fill={this.getAisleColor(this.props.aisleStates[16])} />
                <rect id="aisle_17" x="130" y="190" width="40" height="20" stroke="black" strokeWidth="1" fill={this.getAisleColor(this.props.aisleStates[17])} />
                <rect id="aisle_18" x="230" y="190" width="40" height="20" stroke="black" strokeWidth="1" fill={this.getAisleColor(this.props.aisleStates[18])} />
                <rect id="aisle_19" x="330" y="190" width="40" height="20" stroke="black" strokeWidth="1" fill={this.getAisleColor(this.props.aisleStates[19])} />

                <rect id="aisle_20" x=" 30" y="290" width="40" height="20" stroke="black" strokeWidth="1" fill={this.getAisleColor(this.props.aisleStates[20])} />
                <rect id="aisle_21" x="130" y="290" width="40" height="20" stroke="black" strokeWidth="1" fill={this.getAisleColor(this.props.aisleStates[21])} />
                <rect id="aisle_22" x="230" y="290" width="40" height="20" stroke="black" strokeWidth="1" fill={this.getAisleColor(this.props.aisleStates[22])} />
                <rect id="aisle_23" x="330" y="290" width="40" height="20" stroke="black" strokeWidth="1" fill={this.getAisleColor(this.props.aisleStates[23])} />
                
                <defs>
                    <svg id="bat_tile" width="80" height="80" viewBox="0 0 623.626 623.626" overflow="visible" enableBackground="new 0 0 623.626 623.626">
                        <path  d={"M449.638,194.41c-13.229,45.682-57.704,74.534-82.957,74.534c-6.012-24.046-13.221-49.318-27.656-68.522 " +
                        "l-10.816,22.841l-41.388-1.318l-10.817-22.822c-14.426,19.222-21.644,44.457-27.646,68.523c-25.253,0-69.738-28.853-82.968-74.553 " +
                        "c-46.888,24.028-109.398,87.782-120.225,212.823c35.263-37.611,115.419-22.861,134.651-4.807 " +
                        "c20.355-20.372,89.555-29.93,127.193,72.029v1.318c0.093-0.26,0.176-0.447,0.26-0.668c0.018,0.055,0.055,0.147,0.083,0.221 "+
                        "l-0.343,0.447v1.262c0.093-0.205,0.176-0.408,0.26-0.631c0.083,0.223,0.166,0.426,0.25,0.631c0.084-0.205,0.167-0.408,0.251-0.631 "+
                        "c0.074,0.223,0.167,0.426,0.251,0.631v-1.262c37.638-101.996,106.846-92.402,127.191-72.049 "+
                        "c19.241-18.035,99.397-32.805,134.66,4.787C559.046,282.174,496.535,218.458,449.638,194.41z M283.221,264.027 "+
                        "c-3.98,0-7.218-3.228-7.218-7.217c0-3.971,3.238-7.181,7.218-7.181s7.218,3.21,7.218,7.181 "+
                        "C290.439,260.799,287.201,264.027,283.221,264.027z M331.815,264.027c-3.979,0-7.217-3.228-7.217-7.217 "+
                        "c0-3.971,3.238-7.181,7.217-7.181c3.98,0,7.209,3.21,7.209,7.181C339.024,260.799,335.796,264.027,331.815,264.027z"}/>
                    </svg>
                    <svg id="owl_tile" width="80" height="80" viewBox="0 0 623.626 623.626" overflow="visible" enableBackground="new 0 0 623.626 623.626">
                        <g>
                            <path d={"M259.543,202.19c-3.994,0-7.764,0.821-11.24,2.217c2.256,2.158,3.74,5.166,3.74,8.54c0,6.529-5.313,11.817-11.836,11.817 "+
                                "c-3.369,0-6.396-1.446-8.525-3.711c-1.407,3.476-2.227,7.251-2.227,11.235c0,16.616,13.485,30.093,30.088,30.093 "+
                                "c16.621,0,30.087-13.477,30.087-30.093C289.631,215.677,276.164,202.19,259.543,202.19z"}/>
                            <path d={"M365.93,202.19c-3.994,0-7.754,0.821-11.239,2.217c2.284,2.158,3.709,5.166,3.709,8.54c0,6.529-5.272,11.817-11.816,11.817 "+
                                "c-3.358,0-6.377-1.446-8.524-3.711c-1.397,3.476-2.228,7.251-2.228,11.235c0,16.616,13.496,30.093,30.099,30.093 "+
                                "c16.631,0,30.088-13.477,30.088-30.093C396.018,215.677,382.561,202.19,365.93,202.19z"}/>
                            <path d={"M446.506,244.534c0-11.596,0-19.331,0-19.331c0-25.112-7.168-48.496-19.365-68.442 "+
                                "c19.442-4.385,35.438-23.516,41.601-35.86c-33.623,9.6-82.617-6.728-98.965-15.376c-16.406-7.251-34.58-11.572-53.817-11.699 "+
                                "c-19.238,0.127-37.422,4.448-53.828,11.699c-16.338,8.648-65.342,24.976-98.965,15.376c6.162,12.344,22.157,31.475,41.621,35.86 "+
                                "c-12.217,19.946-19.375,43.33-19.375,68.442c0,0,0,7.764,0,19.396c-8.584,13.612-15.645,32.578-19.229,54.188 "+
                                "c-7.481,45.235,2.979,84.64,23.33,88.013c0.527,0.084,1.074,0.05,1.621,0.084c16.514,50.81,65.898,86.938,104.033,122.92 "+
                                "c6.924,6.527,13.857,13.012,20.791,19.512c6.934-6.5,13.856-12.984,20.79-19.512c38.136-35.982,87.521-72.11,104.033-122.92 "+
                                "c0.558-0.034,1.115,0.004,1.67-0.084c20.353-3.373,30.801-42.777,23.312-88.013C462.191,277.143,455.109,258.144,446.506,244.534z "+
                                "    M253.274,425.867c0,3.023-2.452,5.479-5.469,5.479c-3.018,0-5.479-2.456-5.479-5.479v-26.035c0-3.021,2.461-5.478,5.479-5.478 "+
                                "c3.017,0,5.469,2.456,5.469,5.478V425.867z M269.709,425.867c0,3.023-2.451,5.479-5.479,5.479c-3.018,0-5.469-2.456-5.469-5.479 "+
                                "v-26.035c0-3.021,2.451-5.478,5.469-5.478c3.027,0,5.479,2.456,5.479,5.478V425.867z M286.135,425.867 "+
                                "c0,3.023-2.451,5.479-5.479,5.479c-3.017,0-5.468-2.456-5.468-5.479v-26.035c0-3.021,2.451-5.478,5.468-5.478 "+
                                "c3.028,0,5.479,2.456,5.479,5.478V425.867z M356.731,425.867c0,3.023-2.452,5.479-5.479,5.479c-3.027,0-5.479-2.456-5.479-5.479 "+
                                "v-26.035c0-3.021,2.451-5.478,5.479-5.478c3.026,0,5.479,2.456,5.479,5.478V425.867z M373.156,425.867 "+
                                "c0,3.023-2.451,5.479-5.478,5.479c-3.019,0-5.479-2.456-5.479-5.479v-26.035c0-3.021,2.461-5.478,5.479-5.478 "+
                                "c3.026,0,5.478,2.456,5.478,5.478V425.867z M389.582,425.867c0,3.023-2.451,5.479-5.469,5.479c-3.026,0-5.478-2.456-5.478-5.479 "+
                                "v-26.035c0-3.021,2.451-5.478,5.478-5.478c3.018,0,5.469,2.456,5.469,5.478V425.867z M369.152,290.312 "+
                                "c-15.986,0-30.302-6.797-40.488-17.554l-12.704,21.997l-12.695-21.992c-10.196,10.752-24.512,17.549-40.498,17.549 "+
                                "c-30.86,0-55.869-25.021-55.869-55.874c0-30.86,25.009-55.884,55.869-55.884c25.156,0,46.191,16.738,53.203,39.599 "+
                                "c7.002-22.861,28.026-39.599,53.183-39.599c30.86,0,55.879,25.024,55.879,55.884C425.031,265.291,400.012,290.312,369.152,290.312z "+
                                ""}/>
                        </g>
                    </svg>
                    <svg  id="toad_tile" width="80" height="80"
                    viewBox="0 0 623.626 623.626" overflow="visible" enableBackground="new 0 0 623.626 623.626" xmlSpace="preserve">
                        <g>
                            <path d={"M215.513,180.555c12.314,0,22.294-9.976,22.294-22.29c0-12.311-9.98-22.29-22.294-22.29c-3.008,0-5.85,0.61-8.467,1.684 " +
                                "c2.334,1.607,3.965,4.165,3.965,7.212c0,4.917-3.985,8.897-8.887,8.897c-3.047,0-5.615-1.631-7.207-3.97 " +
                                "c-1.074,2.612-1.69,5.469-1.69,8.467C193.227,170.579,203.197,180.555,215.513,180.555z"}/>
                            <path d={"M406.284,180.555c12.313,0,22.284-9.976,22.284-22.29c0-12.311-9.971-22.29-22.284-22.29c-2.998,0-5.859,0.61-8.468,1.684 " +
                                "c2.334,1.607,3.966,4.165,3.966,7.212c0,4.917-3.984,8.897-8.896,8.897c-3.039,0-5.597-1.631-7.207-3.97 " +
                                "c-1.084,2.612-1.69,5.469-1.69,8.467C383.989,170.579,393.97,180.555,406.284,180.555z"}/>
                            <path d={"M457.435,489.94h-44.492l37.687-78.868c1.865-3.906,0.88-8.584-2.412-11.396c-3.321-2.813-8.086-3.043-11.641-0.597 " +
                                "l-41.67,28.745c2.168-7.622,3.407-15.639,3.407-23.96c0-12.651-2.754-24.647-7.588-35.503 " +
                                "c58.869-16.518,99.396-52.085,99.396-101.738c0-26.854-11.896-51.714-32.08-72.202c7.179-10.249,11.415-22.695,11.415-36.157 " +
                                "c0-34.894-28.279-63.174-63.173-63.174c-29.386,0-54.015,20.088-61.074,47.261c-11.112-1.524-22.56-2.378-34.307-2.378 " +
                                "c-11.738,0-23.193,0.854-34.316,2.382c-7.061-27.177-31.69-47.265-61.074-47.265c-34.893,0-63.174,28.281-63.174,63.174 " +
                                "c0,13.462,4.238,25.913,11.416,36.162c-20.176,20.488-32.071,45.346-32.071,72.197c0,49.653,40.528,85.221,99.395,101.738 " +
                                "c-4.834,10.855-7.588,22.852-7.588,35.503c0,8.321,1.24,16.338,3.408,23.96l-41.67-28.745c-3.554-2.446-8.32-2.217-11.64,0.597 " +
                                "c-3.291,2.812-4.278,7.489-2.412,11.396l37.685,78.868H164.37c-5.283,0-9.561,4.277-9.561,9.555c0,5.278,4.278,9.562,9.561,9.562 " +
                                "h59.647c3.282,0,6.338-1.686,8.086-4.464c1.758-2.777,1.953-6.254,0.537-9.219l-28.769-60.21l48.33,33.325 " +
                                "c8.135,7.403,17.666,13.268,28.164,17.193v23.252h-16.533c-5.283,0-9.561,4.276-9.561,9.555c0,5.279,4.278,9.561,9.561,9.561 " +
                                "h26.094c5.283,0,9.56-4.281,9.56-9.561v-28.047c3.74,0.489,7.529,0.831,11.416,0.831c3.887,0,7.676-0.342,11.416-0.831v28.047 " +
                                "c0,5.279,4.279,9.561,9.562,9.561h26.093c5.284,0,9.562-4.281,9.562-9.561c0-5.278-4.277-9.555-9.562-9.555h-16.533v-23.252 " +
                                "c10.498-3.926,20.031-9.79,28.164-17.193l48.33-33.325l-28.769,60.21c-1.416,2.965-1.211,6.441,0.537,9.219 " +
                                "c1.748,2.778,4.805,4.464,8.085,4.464h59.648c5.285,0,9.562-4.283,9.562-9.562C466.997,494.218,462.72,489.94,457.435,489.94z " +
                                "    M406.284,117.391c22.577,0,40.879,18.3,40.879,40.875c0,22.578-18.302,40.879-40.879,40.879 " +
                                "c-22.578,0-40.879-18.301-40.879-40.879C365.405,135.691,383.706,117.391,406.284,117.391z M215.513,117.391 " +
                                "c22.578,0,40.877,18.3,40.877,40.875c0,22.578-18.3,40.879-40.877,40.879c-22.579,0-40.87-18.301-40.87-40.879 " +
                                "C174.643,135.691,192.934,117.391,215.513,117.391z M166.713,279.666c0-1.977,1.601-3.584,3.584-3.584h281.212 " +
                                "c1.98,0,3.584,1.607,3.584,3.584c0,1.979-1.604,3.584-3.584,3.584H170.297C168.314,283.25,166.713,281.645,166.713,279.666z"}/>
                        </g>
                    </svg>
                    <svg id="centipede_tile" width="80" height="80"
                    viewBox="0 0 623.626 623.626" overflow="visible" enableBackground="new 0 0 623.626 623.626" xmlSpace="preserve">
                        <path d={"M492.145,323.331c0-25.246-13.251-48.011-34.753-60.732c2.939-7.768,4.615-16.146,4.615-24.931 " +
                            "c0-39.014-31.737-70.757-70.744-70.757c-9.23,0-18.176,1.947-26.581,5.37c-11.91-22.353-35.424-37.622-62.468-37.622 " +
                            "c-26.786,0-50.298,14.92-62.313,37.653c-8.353-3.467-17.479-5.401-27.044-5.401c-39.007,0-70.769,31.743-70.769,70.757 " +
                            "c0,8.514,1.623,16.957,4.588,24.878c-20.753,12.35-34.726,34.941-34.726,60.786c0,27.413,16.292,51.982,40.269,63.598 " +
                            "c-2.578,7.308-4.021,15.127-4.021,23.299c0,39.014,31.736,70.764,70.743,70.764c0.67,0,1.315-0.085,1.96-0.103 " +
                            "c0.593,8.068,2.965,20.566,11.524,29.667c6.832,7.264,16.267,10.937,28.076,10.937c0.387,0,0.774-0.006,1.16-0.011 " +
                            "c1.392-0.027,2.603-1.006,2.914-2.379c0.333-1.36-0.336-2.772-1.574-3.416c-1.263-0.639-28.951-15.244-22.971-37.912 " +
                            "c13.226-4.132,24.776-12.04,33.412-22.461c21.863,3.144,26.324,32.638,26.503,33.993c0.181,1.384,1.316,2.475,2.708,2.622 " +
                            "c0.103,0.014,0.205,0.02,0.335,0.02c1.263,0,2.398-0.793,2.862-2.005c4.305-11.582,4.048-22.087-0.696-31.209 " +
                            "c-5.156-9.925-14.515-15.983-21.76-19.464c4.022-8.875,6.291-18.692,6.291-29.043c0-28.088-16.474-52.335-40.271-63.744 " +
                            "c2.578-7.419,4.049-15.225,4.049-23.152c0-8.732-1.677-17.073-4.59-24.801c11.344-6.71,20.316-16.371,26.349-27.721 " +
                            "c8.507,3.505,17.685,5.355,26.992,5.355c9.411,0,18.409-1.889,26.633-5.253c6.188,11.583,15.469,20.936,26.529,27.463 " +
                            "c-2.991,7.942-4.719,16.338-4.719,24.956c0,8.129,1.443,15.908,3.971,23.178c-24.158,11.582-40.221,36.113-40.221,63.719 " +
                            "c0,39.014,31.737,70.764,70.745,70.764c39.033,0,70.771-31.75,70.771-70.764c0-7.889-1.393-15.745-3.971-23.17 " +
                            "C475.697,375.628,492.145,351.396,492.145,323.331z M391.263,200.021c20.754,0,37.641,16.886,37.641,37.647 " +
                            "c0,20.753-16.887,37.64-37.641,37.64c-15.598,0-29.571-9.712-35.113-24.221c10.467-12.336,16.809-28.269,16.809-45.678 " +
                            "c0-0.168-0.026-0.335-0.026-0.515C378.528,201.762,384.766,200.021,391.263,200.021z M182.692,285.692 " +
                            "c20.781,0,37.666,16.886,37.666,37.639c0,5.711-1.52,11.215-3.969,16.281c-17.738,0.639-33.8,7.805-45.891,19.208 " +
                            "c-14.928-5.163-25.446-19.407-25.446-35.489C145.052,302.578,161.939,285.692,182.692,285.692z M218.941,447.876 " +
                            "c-20.753,0-37.64-16.888-37.64-37.648c0-20.753,16.887-37.633,37.64-37.633c20.754,0,37.666,16.88,37.666,37.633 " +
                            "C256.607,430.988,239.695,447.876,218.941,447.876z M230.156,270.996c-12.581-11.396-29.184-18.414-47.464-18.414 " +
                            "c-1.366,0-2.706,0.128-4.047,0.199c-2.088-4.762-3.454-9.868-3.454-15.114c0-20.761,16.887-37.647,37.666-37.647 " +
                            "c20.754,0,37.641,16.886,37.641,37.647C250.498,251.848,242.557,264.558,230.156,270.996z M283.55,238.079 " +
                            "c0.025-0.141,0.051-0.276,0.051-0.412c0-17.273-6.24-33.103-16.578-45.401c5.44-14.605,19.233-24.498,35.191-24.498 " +
                            "c20.755,0,37.641,16.887,37.641,37.64c0,20.761-16.886,37.648-37.641,37.648C295.641,243.057,289.22,241.314,283.55,238.079z " +
                            "    M385.153,447.876c-20.753,0-37.64-16.888-37.64-37.648c0-16.165,10.363-30.299,25.419-35.482 " +
                            "c12.144,11.447,28.31,18.635,46.097,19.228c2.45,5.085,3.79,10.525,3.79,16.255C422.819,430.988,405.932,447.876,385.153,447.876z " +
                            "    M421.401,360.986c-20.753,0-37.666-16.894-37.666-37.655c0-5.303,1.134-10.479,3.248-15.248c1.445,0.083,2.812,0.334,4.28,0.334 " +
                            "c18.279,0,34.934-7.032,47.488-18.466c12.531,6.518,20.316,19.252,20.316,33.38C459.068,344.093,442.156,360.986,421.401,360.986z"}
                            />
                    </svg>
                    <svg id="mouse" width="30" height="30"
                    viewBox="0 0 623.626 623.626" overflow="visible" enableBackground="new 0 0 623.626 623.626" xmlSpace="preserve">
                    <path d={"M559.64,463.533c-28.116-1.012-59.773-11.105-78.993-18.276c10.382-24.632,11.741-53.354,2.854-79.294 " +
                        "c-17.946-52.324-40.208-117.043-217.957-120.763c20.531-12.366,40.704-29.103,44.624-48.771 " +
                        "c2.922-14.649-3.015-28.713-17.655-41.804c-12.046-10.779-27.674-13.693-45.171-8.349c-26.653,8.08-53.749,34.048-69.687,64.44 " +
                        "c-36.465,6.792-87.48,41.952-113.796,73.802c-15.902,19.25-22.869,36.896-20.155,51.016c0.357,1.854,1.461,3.469,3.057,4.471 " +
                        "c1.294,0.817,32.113,20.114,68.388,28.37c35.973,8.174,54.574,32.936,59.565,51.657c4.695,17.616-14.241,55.905-21.937,69.161 " +
                        "c-1.225,2.107-1.229,4.714-0.009,6.83c1.215,2.104,3.47,3.412,5.909,3.412h35.551c1.281,0,2.538-0.361,3.624-1.037 " +
                        "c21.013-13.176,42.309-39.948,50.353-50.646c8.544,3.692,26.538,11.06,44.86,16.3c3.03-2.004,6.127-3.516,9.162-4.593 " +
                        "c2.57-0.909,5.078-1.604,7.334-1.966c0.171-1.114,0.412-2.124,0.602-3.21c10.071-57.649,44.982-78.134,46.526-79.007 " +
                        "c2.319-1.317,5.266-0.5,6.591,1.818c1.323,2.319,0.513,5.289-1.808,6.606c-0.339,0.204-33.283,19.844-42.096,74.349 " +
                        "c-0.246,1.502-0.543,2.932-0.747,4.489c-0.307,2.338-2.264,4.119-4.611,4.213c-0.356,0.019-3.664,0.231-7.881,1.597 " +
                        "c-7.352,2.375-17.539,8.33-20.197,23.321c0.214,0.798,0.386,1.615,0.775,2.386c2.676,5.353,9.421,8.08,38.839,8.08 " +
                        "c34.846,0,85.315-4.296,85.236-4.314c21.694,0,41.511-10.465,56.327-29.372c21.788,4.536,46.149,5.669,64.251,5.669 " +
                        "c16.522,0,27.993-0.872,28.472-0.909c2.564-0.187,4.527-2.356,4.477-4.927C564.264,465.712,562.209,463.625,559.64,463.533z " +
                        "    M181.495,319.855c0.125,2.681-1.943,4.953-4.616,5.074l-43.427,2.032c-0.079,0-0.154,0-0.232,0c-2.575,0-4.717-2.022-4.837-4.621 " +
                        "c-0.125-2.671,1.943-4.935,4.615-5.065l43.428-2.03C179.101,315.086,181.375,317.183,181.495,319.855z M116.661,280.909 " +
                        "c6.243,0,11.309,5.065,11.309,11.318c0,6.244-5.065,11.309-11.309,11.309c-6.253,0-11.318-5.065-11.318-11.309 " +
                        "C105.342,285.974,110.408,280.909,116.661,280.909z M130.539,334.336l48.483,9.695c2.626,0.519,4.328,3.079,3.804,5.704 " +
                        "c-0.459,2.312-2.486,3.898-4.75,3.898c-0.315,0-0.636-0.029-0.956-0.094l-48.483-9.695c-2.625-0.519-4.327-3.08-3.804-5.705 " +
                        "C125.358,335.515,127.914,333.808,130.539,334.336z"}/>
                    </svg>
                    <svg id="rabbit" width="30" height="30"
                    viewBox="0 0 623.626 623.626" overflow="visible" enableBackground="new 0 0 623.626 623.626" xmlSpace="preserve">
                    <path d={"M294.045,590.53l10.8-18.801V554.03c-10.599-2.9-18.599-14.301-18.599-21.9c0-8.9,10.6-4,23.599-4 " +
                        "c13.101,0,23.701-4.9,23.701,4c0,7.6-8,19-18.701,21.9v17.699l11.001,19.101c123.4-3.2,185.599-53.5,184.9-149.899 " +
                        "c-0.301-45.301-14.7-86.5-41.899-119.601c16.298-47.3,21.799-134.7,24.699-207.1c0.398-7.9,0.6-13.6,0.8-16.4 " +
                        "c2.6-34-22.999-63.9-57.001-66.5c-34.099-2.7-63.999,23.3-66.499,57l-0.3,2.7c-4.001,51.1-8.201,118.1-7.4,165.7 " +
                        "c-15.501-3.6-31.3-5.4-47.3-5.4h-1.301c-16.499,0.1-32.699,2.2-48.599,6.1c0.2-57.399-6.901-141.399-9.3-168.3 " +
                        "c-3.1-34-32.701-59.1-67.3-56.1c-16.5,1.399-31.4,9.3-42.001,22c-10.599,12.7-15.599,28.8-14.099,45.2c0.2,2.9,0.5,8.8,1,17.1 " +
                        "c2.4,46.7,7.799,152.6,26.9,206c-26.7,33.5-40.6,74.899-40.3,120.2C121.445,536.229,179.645,585.53,294.045,590.53z M413.847,451.53 " +
                        "c6.499,0,11.699,12.3,11.699,27.6c0,15.301-5.2,27.7-11.699,27.7c-6.402,0-11.602-12.399-11.602-27.7 " +
                        "C402.246,463.83,407.445,451.53,413.847,451.53z M205.846,451.53c6.499,0,11.699,12.3,11.699,27.6c0,15.301-5.2,27.7-11.699,27.7 " +
                        "c-6.4,0-11.6-12.399-11.6-27.7C194.246,463.83,199.446,451.53,205.846,451.53z"}/>
                    </svg>
                    <svg id="ghost" width="60" height="60"
                    viewBox="0 0 623.626 623.626" overflow="visible" enableBackground="new 0 0 623.626 623.626" xmlSpace="preserve">
                        <g>
                            <path d={"M336.275,212.497c7.363,0,13.34-5.976,13.34-13.34c0-7.363-5.977-13.34-13.34-13.34s-13.34,5.977-13.34,13.34 " +
                                "C322.935,206.521,328.912,212.497,336.275,212.497z"}/>
                            <path d={"M254.479,212.497c7.363,0,13.34-5.976,13.34-13.34c0-7.363-5.977-13.34-13.34-13.34c-7.364,0-13.34,5.977-13.34,13.34 " +
                                "C241.138,206.521,247.115,212.497,254.479,212.497z"}/>
                            <path d={"M348.091,237.72h-20c0,14.58-14.678,26.436-32.715,26.436s-32.715-11.856-32.715-26.436h-20 " +
                                "c0,25.606,23.653,46.436,52.715,46.436C324.439,284.156,348.091,263.326,348.091,237.72z"}/>
                            <path d={"M462.886,219.625l-0.908-4.677c-18.379-95.274-63.564-139.649-142.188-139.649c-79.521,0-135.429,55.449-142.451,141.27 " +
                                "c-0.039,0.459-0.049,0.928-0.049,1.396c0.108,9.463-1.26,23.135-3.984,39.971c-39.492,0.762-78.145,9.043-95.176,69.12 " +
                                "c-1.25,4.435-0.41,9.191,2.305,12.91c2.705,3.731,6.972,5.996,11.572,6.172l8.555,0.275c8.779,0.243,20.468,0.584,25.117,2.069 " +
                                "c2.49,7.772,6.855,19.336,20.449,25.303c-7.676,26.308-15.605,49.921-22.715,67.607c-2.412,5.995-0.713,12.852,4.209,17.03 " +
                                "c5.899,5,11.24,10.508,16.407,15.84c20.156,20.791,40.673,42.207,94.765,40.371c13.828-0.508,24.199,2.354,36.445,5.703 " +
                                "c13.321,3.633,28.428,7.765,49.307,7.765c5.303,0,10.85-0.272,16.484-0.812c12.529-1.181,22.275-7.293,30.879-12.685 " +
                                "c8.721-5.47,16.25-10.187,26.211-10.187c4.795,0,9.941,1.035,15.742,3.164c7.822,2.871,15.801,4.327,23.711,4.327 " +
                                "c34.375,0,60.4-26.983,79.404-46.68c2.568-2.666,5.049-5.244,7.441-7.638c3.223-3.221,4.863-7.685,4.365-12.217 " +
                                "c-0.508-4.521-2.979-8.535-6.816-10.976C515.708,429.595,497.427,399.038,462.886,219.625z M437.574,481.91 " +
                                "c-4.434,0-8.818-0.821-13.379-2.491c-9.17-3.358-17.695-5-26.074-5c-18.584,0-31.65,8.185-42.148,14.767 " +
                                "c-6.611,4.141-12.324,7.725-17.773,8.241c-4.697,0.449-9.287,0.675-13.652,0.675c-16.855,0-28.779-3.263-41.396-6.709 " +
                                "c-12.276-3.351-24.961-6.816-41.241-6.816c-1.377,0-2.783,0.029-4.199,0.078c-40.224,1.474-53.603-12.149-72.139-31.271 " +
                                "c-3.378-3.476-6.816-7.03-10.527-10.586c7.852-20.888,16.348-47.469,24.317-76.172c1.229-4.414,0.371-9.149-2.334-12.851 " +
                                "c-2.696-3.701-6.934-5.967-11.514-6.153c-8.76-0.351-9.043-1.229-11.942-10.449c-5.03-15.946-20.987-19.237-39.639-20.283 " +
                                "c12.402-24.375,32.422-29.022,66.826-29.022l5.01,0.029c6.895-0.02,13.613-5.108,14.932-12.295 " +
                                "c4.454-24.277,6.67-43.535,6.602-57.246c6.025-70.811,48.037-113.057,112.49-113.057c63.418,0,97.139,34.492,112.734,115.332 " +
                                "l0.898,4.668c23.945,124.346,42.295,192.442,60.205,220.917C477.828,462.574,458.433,481.91,437.574,481.91z"}/>
                            <path d={"M388.97,295.582c-46.621-0.478-89.658,4.346-108.027,69.161c-1.25,4.433-0.401,9.188,2.304,12.91 " +
                                "c2.705,3.729,6.973,5.996,11.573,6.172l8.564,0.272c8.76,0.244,20.449,0.587,25.107,2.062c3.467,10.937,10.303,29.326,41.65,29.326 " +
                                "c0.977,0,1.992-0.021,3.018-0.06c8.281-0.293,14.746-7.246,14.453-15.526c-0.303-8.281-7.402-14.981-15.527-14.453 " +
                                "c-12.246,0.429-12.656-0.879-15.332-9.405l-0.371-1.181c-5.029-15.957-20.996-19.237-39.639-20.283 " +
                                "c12.764-25.079,33.799-29.493,71.875-28.995c8.281,0.332,15.078-6.543,15.176-14.824S397.251,295.679,388.97,295.582z"}/>
                        </g>
                    </svg>
                </defs>


                <rect id="tile_00" x=" 10" y=" 10" width="80" height="80" fill="gray"/>
                <rect id="tile_01" x="110" y=" 10" width="80" height="80" fill="gray"/>
                <rect id="tile_02" x="210" y=" 10" width="80" height="80" fill="gray"/>
                <rect id="tile_03" x="310" y=" 10" width="80" height="80" fill="gray"/>
                <rect id="tile_04" x=" 10" y="110" width="80" height="80" fill="gray"/>
                <rect id="tile_05" x="110" y="110" width="80" height="80" fill="gray"/>
                <rect id="tile_06" x="210" y="110" width="80" height="80" fill="gray"/>
                <rect id="tile_07" x="310" y="110" width="80" height="80" fill="gray"/>
                <rect id="tile_08" x=" 10" y="210" width="80" height="80" fill="gray"/>
                <rect id="tile_09" x="110" y="210" width="80" height="80" fill="gray"/>
                <rect id="tile_10" x="210" y="210" width="80" height="80" fill="gray"/>
                <rect id="tile_11" x="310" y="210" width="80" height="80" fill="gray"/>
                <rect id="tile_12" x=" 10" y="310" width="80" height="80" fill="gray"/>
                <rect id="tile_13" x="110" y="310" width="80" height="80" fill="gray"/>
                <rect id="tile_14" x="210" y="310" width="80" height="80" fill="gray"/>
                <rect id="tile_15" x="310" y="310" width="80" height="80" fill="gray"/>

                <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="#owl_tile"  x=" 10" y=" 10" fill="white"/>
                <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="#owl_tile"  x="310" y=" 10" fill="black"/>
                <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="#owl_tile"  x=" 10" y="310" fill="black"/>
                <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="#owl_tile"  x="310" y="310" fill="white"/>
                
                <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="#centipede_tile" x="110" y=" 10" fill="black"/>
                <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="#centipede_tile" x="310" y="110" fill="white"/>
                <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="#centipede_tile" x="210" y="310" fill="black"/>
                <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="#centipede_tile" x=" 10" y="210" fill="white"/>

                <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="#toad_tile" x="210" y=" 10" fill="white"/>
                <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="#toad_tile" x="310" y="210" fill="black"/>
                <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="#toad_tile" x="110" y="310" fill="white"/>
                <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="#toad_tile" x=" 10" y="110" fill="black"/>

                <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="#bat_tile"  x="110" y="110" fill="white"/>
                <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="#bat_tile"  x="110" y="210" fill="black"/>
                <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="#bat_tile"  x="210" y="110" fill="black"/>
                <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="#bat_tile"  x="210" y="210" fill="white"/>
                {this.props.players.map(player=>{
                    return (
                        <use key={"ply:"+player.playerType} xmlnsXlink="http://www.w3.org/1999/xlink" 
                            xlinkHref={this.getPlayerShape(player)}  
                            x={this.getPlayerPositionX(player)} 
                            y={this.getPlayerPositionY(player)} 
                            fill={this.getPlayerColor(player)}/>
                    );
                })}
                    
                <use xmlnsXlink="http://www.w3.org/1999/xlink"
                    xlinkHref="#ghost"
                    x={this.getHubiPositionX(this.props.hubiPosition)} 
                    y={this.getHubiPositionY(this.props.hubiPosition)} 
                    fill="black"/>

            </svg>
            <p style={{color:"gray"}}>■ネズミあな</p>
            <p style={{color:"white", backgroundColor:"gray"}}>■かべなし</p>
            <p style={{color:"green"}}>■ウサギまど</p>
            <p style={{color:"purple"}}>■まほうのとびら</p>
            <p style={{color:"black"}}>■カベ</p>
            <button onClick={()=>this.props.actions.onTest()}>Test</button>
            </div>
            <Paper style={{width:"300px"}} zDepth={1}>
            <table id="control">
                <tbody>
                <tr>
                    <td>
                        <svg width="88px" height="88px">
                            <use 
                                xmlnsXlink="http://www.w3.org/1999/xlink" 
                                xlinkHref="#rabbit" 
                                x="22" 
                                y="22" 
                                width="44" 
                                height="44" 
                                fill={this.isNextPlayer(PlayerType.GreenRabbit)?"green":"gray"}
                                visibility={this.isPlayer(PlayerType.GreenRabbit)?"visible":"hidden"} />
                        </svg>
                    </td>
                    <td><RaisedButton style={{height:88}} icon={<UpArrow/>} primary={true} onClick={()=>this.props.actions.onMoveUp()}/></td>
                    <td>
                        <svg width="88px" height="88px">
                            <use 
                                xmlnsXlink="http://www.w3.org/1999/xlink" 
                                xlinkHref="#mouse" 
                                x="22" 
                                y="22" 
                                width="44" 
                                height="44" 
                                fill={this.isNextPlayer(PlayerType.RedMouse)?"red":"gray"}
                                visibility={this.isPlayer(PlayerType.RedMouse)?"visible":"hidden"}/>
                        </svg>
                    </td>
                    </tr>
                <tr>
                    <td><RaisedButton style={{height:88}} icon={<LeftArrow/>} primary={true} onClick={()=>this.props.actions.onMoveLeft()}/></td>
                    <td><RaisedButton style={{height:88}} icon={<HelpIcon/>} secondary={true} onClick={()=>this.props.actions.onListenHint()}/></td>
                    <td><RaisedButton style={{height:88}} icon={<RightArrow/>} primary={true} onClick={()=>this.props.actions.onMoveRight()}/></td>
                </tr>
                <tr>
                    <td>
                        <svg width="88px" height="88px">
                            <use 
                                xmlnsXlink="http://www.w3.org/1999/xlink" 
                                xlinkHref="#rabbit" 
                                x="22" 
                                y="22" 
                                width="44" 
                                height="44" 
                                fill={this.isNextPlayer(PlayerType.BlueRabbit)?"blue":"gray"}
                                visibility={this.isPlayer(PlayerType.BlueRabbit)?"visible":"hidden"}/>
                        </svg>
                    </td>
                    <td><RaisedButton style={{height:88}} icon={<DownArrow/>} primary={true} onClick={()=>this.props.actions.onMoveDown()}/></td>
                    <td>
                        <svg width="88px" height="88px">
                            <use 
                                xmlnsXlink="http://www.w3.org/1999/xlink" 
                                xlinkHref="#mouse" 
                                x="22" 
                                y="22" 
                                width="44" 
                                height="44" 
                                stroke="black" 
                                strokeWidth="8" 
                                fill={this.isNextPlayer(PlayerType.YellowMouse)?"Yellow":"gray"}
                                visibility={this.isPlayer(PlayerType.YellowMouse)?"visible":"hidden"}/>
                        </svg>
                    </td>
                </tr>
                </tbody>
            </table>
            </Paper>
            <Paper style={{width:"300px"}} zDepth={1}>
                <List style={{height:"200px",overflowY:"scroll"}}>
                    {this.props.messages.slice().reverse().map(message=>{
                        return <ListItem key={"msg:"+message.id} disabled={true} leftAvatar={this.getMessageAvatar(message.icon)}>{message.text}</ListItem>
                    })}
                </List>
            </Paper>
        </div>
      </MuiThemeProvider>
    );
  }

}

export default App;
