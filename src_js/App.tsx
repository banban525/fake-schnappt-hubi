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
import ImageDefinition from './icons/ImageDefinition';
import Ghost from './icons/Ghost';
import PlayerComponent from './icons/PlayerComponent';


import {AppActionDispatcher, AppState,Aisle,AisleTypes,Player,PlayerType,AisleState,MessageIcons,GamePhase} from './AppReducer';

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
            <ImageDefinition/>
            <p>{this.props.turns.length}/{30}</p>
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


                {this.props.players.map(player=><PlayerComponent key={"ply:"+player.playerType}  player={player}/>)}
                <Ghost x={this.getHubiPositionX(this.props.hubiPosition)} 
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
                    {
                        this.props.turns.map(_=>_.messages).reduce((x,y)=>x.concat(y)).reverse().map(message=>{
                            return <ListItem key={"msg:"+message.id} disabled={true} leftAvatar={this.getMessageAvatar(message.icon)}>{message.text}</ListItem>
                        })
                    }
                </List>
            </Paper>
        </div>
      </MuiThemeProvider>
    );
  }

}

export default App;
