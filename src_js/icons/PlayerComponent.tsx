import * as React from "react";
import {PlayerType, Player} from "../AppReducer";

interface PlayerProps
{
    player:Player;
}

export default class PlayerComponent extends React.Component<PlayerProps> {
    constructor(props: any) {
      super(props);
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

    render(){
        return (
            <use xmlnsXlink="http://www.w3.org/1999/xlink" 
                xlinkHref={this.getPlayerShape(this.props.player)}  
                x={this.getPlayerPositionX(this.props.player)} 
                y={this.getPlayerPositionY(this.props.player)} 
                fill={this.getPlayerColor(this.props.player)}/>
        );
    }
}  