
import * as objectAssign from 'object-assign';
import * as immutable from 'immutable';

import {PlayerType, Difficulty,Range} from './AppReducer';

export enum ErrorMessageId
{
  None,
  PlayerIsLessThanTow,
  CannotSelectRabbitOnly,
  CannotSelectMouseOnly,
  CanInputNumberGreaterThanZero,
}

export interface InitialSettingsState
{
    phase:SettingsPhases;
    canStartSameSettingGame:boolean;
    canContinueGame:boolean;
    selectedPlayers:PlayerType[];
    startPlayer:PlayerType;
    difficulty:Difficulty;
    errorMessage:ErrorMessageId;
    firstHubiMoveTimingStartTemp:string;
    firstHubiMoveTimingEndTemp:string;
    afterFirstHubiMoveTimingStartTemp:string;
    afterFirstHubiMoveTimingEndTemp:string;
    errorFirstHubiMoveTimingStartTemp:ErrorMessageId;
    errorFirstHubiMoveTimingEndTemp:ErrorMessageId;
    errorAfterFirstHubiMoveTimingStartTemp:ErrorMessageId;
    errorAfterFirstHubiMoveTimingEndTemp:ErrorMessageId;
  }

export enum SettingsPhases
{
    Start,
    SelectPlayers,
    SelectStartPlayer,
    CustomizeDificulty,
    SettingsComplated,
}


var initialState:InitialSettingsState =
{
    phase:SettingsPhases.Start,
    canStartSameSettingGame:false,
    canContinueGame:false,
    selectedPlayers:[],
    startPlayer:PlayerType.None,
    difficulty:Difficulty.Normal,
    errorMessage:ErrorMessageId.None,
    firstHubiMoveTimingStartTemp:"",
    firstHubiMoveTimingEndTemp:"",
    afterFirstHubiMoveTimingStartTemp:"",
    afterFirstHubiMoveTimingEndTemp:"",
    errorFirstHubiMoveTimingStartTemp:ErrorMessageId.None,
    errorFirstHubiMoveTimingEndTemp:ErrorMessageId.None,
    errorAfterFirstHubiMoveTimingStartTemp:ErrorMessageId.None,
    errorAfterFirstHubiMoveTimingEndTemp:ErrorMessageId.None,
  };


export class InitialSettingsActionDispatcher
{
  dispatch: (action:any)=>any;
  getState: ()=>InitialSettingsState;
  constructor(dispatch:(action:any)=>any, getState: ()=>InitialSettingsState)
  {
    this.dispatch = dispatch;
    this.getState = getState;
  }
  StartNewGame():void
  {
    this.dispatch({type:"StartNewGame"});    
  }
  StartSameSettingGame():void
  {
    this.dispatch({type:"StartSameSettingGame"});    
  }
  ContinuePreviousGame():void
  {
    this.dispatch({type:"ContinuePreviousGame"});    
  }
  addOrRemovePlayer(playerType:PlayerType, isExists:boolean):void
  {
    this.dispatch({type:"addOrRemovePlayer",playerType:playerType,isExists:isExists});    
  }
  moveBack():void
  {
    this.dispatch({type:"moveBack"});
  }
  moveNext():void
  {
    this.dispatch({type:"moveNext"});
    if(this.getState().phase === SettingsPhases.SettingsComplated)
    {
      var state = this.getState();
      var selectedPlayers = state.selectedPlayers;
      var difficulty = state.difficulty;
      var startPlayer = state.startPlayer;
      this.dispatch({type:"startGame", difficulty:difficulty, selectedPlayers:selectedPlayers,startPlayer:startPlayer });
    }
  }
  changeStartPlayer(player:string):void
  {
    this.dispatch({type:"changeStartPlayer",player:player});
  }
  changeDifficulty(difficulty:string):void
  {
    this.dispatch({type:"changeDifficulty", difficulty:difficulty});
  }
  changeTimeLimit(value:number):void
  {
    this.dispatch({type:"changeTimeLimit",value:value});
  }
  changeMagicDoorCount(value:number):void
  {
    this.dispatch({type:"changeMagicDoorCount",value:value});
  }
  changeFistHubiMoveTimingStart(value:string):void
  {
    this.dispatch({type:"changeFistHubiMoveTimingStart",value:value});
  }
  changeFistHubiMoveTimingEnd(value:string):void
  {
    this.dispatch({type:"changeFistHubiMoveTimingEnd",value:value});
  }
  changeAfterFirstHubiMoveTimingStart(value:string):void
  {
    this.dispatch({type:"changeAfterFirstHubiMoveTimingStart",value:value});
  }
  changeAfterFirstHubiMoveTimingEnd(value:string):void
  {
    this.dispatch({type:"changeAfterFirstHubiMoveTimingEnd",value:value});
  }
  changeDetailHintPercent(value:number):void
  {
    this.dispatch({type:"changeDetailHintPercent",value:value});
  } 
}

export function initialSettingsReducer(state: InitialSettingsState = initialState, action: any = {type:'none'}):InitialSettingsState
{
    switch(action.type)
    {
    case "StartNewGame":
      return objectAssign({}, state, {phase:SettingsPhases.SelectPlayers});
    case "StartSameSettingGame":
    case "ContinuePreviousGame":
    case "addOrRemovePlayer":
      var playerType = action.playerType as PlayerType;
      var isExists = action.isExists as boolean;
      console.log(playerType + ":" + isExists);
      var newPlayers = state.selectedPlayers.slice();
      if(isExists)
      {
        if(newPlayers.indexOf(playerType) !== -1)
        {
          return state;
        }
        newPlayers = newPlayers.concat([playerType]);
      }
      else
      {
        if(newPlayers.indexOf(playerType) === -1)
        {
          return state;
        }
        newPlayers = newPlayers.filter(_=>_ !== playerType);
      }
      return objectAssign({}, state, {selectedPlayers:newPlayers});
    case "moveBack":
      state = objectAssign({}, state, {errorMessage:ErrorMessageId.None});    
      switch(state.phase)
      {
        case SettingsPhases.Start:
          return state;
        case SettingsPhases.SelectPlayers:
          var newPhase = SettingsPhases.Start;
          return objectAssign({}, state, {phase:newPhase});
        case SettingsPhases.SelectStartPlayer:
          var newPhase = SettingsPhases.SelectPlayers;
          return objectAssign({}, state, {phase:newPhase});
        case SettingsPhases.CustomizeDificulty:
          var newPhase = SettingsPhases.SelectStartPlayer;
          return objectAssign({}, state, {phase:newPhase});
        case SettingsPhases.SettingsComplated:
          var newPhase = SettingsPhases.SelectStartPlayer;
          return objectAssign({}, state, {phase:newPhase});
      }
    case "moveNext":
      state = objectAssign({}, state, {errorMessage:ErrorMessageId.None});    
      switch(state.phase)
      {
        case SettingsPhases.Start:
          var newPhase = SettingsPhases.SelectPlayers;
          return objectAssign({}, state, {phase:newPhase});
        case SettingsPhases.SelectPlayers:
          if(state.selectedPlayers.length <= 1)
          {
            //2人以上選択してください
            return objectAssign({}, state, {errorMessage:ErrorMessageId.PlayerIsLessThanTow});
          }
          var rabbitCount:number = 0;
          var mouseCount:number=0;
          state.selectedPlayers.map(_=>{
            if(_ === PlayerType.BlueRabbit || _ === PlayerType.GreenRabbit)
            {
              rabbitCount++;
            }
            if(_ === PlayerType.YellowMouse || _ === PlayerType.RedMouse)
            {
              mouseCount++;
            }
          })
          if(rabbitCount === 0)
          {
            //ネズミだけではゲームできません
            return objectAssign({}, state, {errorMessage:ErrorMessageId.CannotSelectMouseOnly});
          }
          if(mouseCount == 0)
          {
            //うさぎだけではゲームできません
            return objectAssign({}, state, {errorMessage:ErrorMessageId.CannotSelectRabbitOnly});
          }
          var startPlayer = state.selectedPlayers[0];
          var newPhase = SettingsPhases.SelectStartPlayer;
          return objectAssign({}, state, {phase:newPhase,startPlayer:startPlayer});
        case SettingsPhases.SelectStartPlayer:
          if(state.difficulty.name === 'custom')
          {
            var newPhase = SettingsPhases.CustomizeDificulty;
            var difficulty = state.difficulty;
            return objectAssign({}, state, {
              phase:newPhase,
              firstHubiMoveTimingStartTemp:difficulty.firstHubiMoveTiming.start.toString(),
              firstHubiMoveTimingEndTemp:difficulty.firstHubiMoveTiming.end.toString(),
              afterFirstHubiMoveTimingStartTemp:difficulty.afterFirstHubiMoveTiming.start.toString(),
              afterFirstHubiMoveTimingEndTemp:difficulty.afterFirstHubiMoveTiming.end.toString(),
            });
          }
          else
          {
            var newPhase = SettingsPhases.SettingsComplated;
            return objectAssign({}, state, {phase:newPhase});
          }
        case SettingsPhases.CustomizeDificulty:
          var newDifficulty = state.difficulty
            .changeFirstHubiMoveTiming(
              new Range(
                Number(state.firstHubiMoveTimingStartTemp),
                Number(state.firstHubiMoveTimingEndTemp)))
            .changeAfterFirstHubiMoveTiming(
              new Range(
                Number(state.afterFirstHubiMoveTimingStartTemp),
                Number(state.afterFirstHubiMoveTimingEndTemp)));

          var newPhase = SettingsPhases.SettingsComplated;
          return objectAssign({}, state, {phase:newPhase,difficulty:newDifficulty});
        case SettingsPhases.SettingsComplated:
          return state;
      }
    case "changeStartPlayer":
      var player = action.player as PlayerType;
      return objectAssign({}, state, {startPlayer:player}); 
    case "changeDifficulty":
      var difficultyName = action.difficulty as string;
      var newDifficulty = Difficulty.Invalid;
      switch(difficultyName)
      {
        case "easy":
          newDifficulty = Difficulty.Easy;
        case "normal":
          newDifficulty = Difficulty.Normal;
        case "hard":
          newDifficulty = Difficulty.Hard;
        case "custom":
          newDifficulty = Difficulty.Normal.changeName("custom");
      }
      return objectAssign({}, state, {difficulty:newDifficulty});       
    case "changeTimeLimit":
      var newValue = action.value as number;
      return objectAssign({}, state, {difficulty:state.difficulty.changeTimeLimit(newValue)});      
    case "changeMagicDoorCount":
      var newValue = action.value as number;
      console.log(newValue);
      return objectAssign({}, state, {difficulty:state.difficulty.changeMagicDoorCount(newValue)});      
    case "changeFistHubiMoveTimingStart":
      var newText = action.value as string;
      var errorMessage = ErrorMessageId.None;
      if((parseInt(newText, 10) > 0) == false)
      {
        errorMessage = ErrorMessageId.CanInputNumberGreaterThanZero;
      }
      return objectAssign({}, state, {
        firstHubiMoveTimingStartTemp:newText,
        errorFirstHubiMoveTimingStartTemp:errorMessage});
    case "changeFistHubiMoveTimingEnd":
      var newText = action.value as string;
      var errorMessage = ErrorMessageId.None;
      if((parseInt(newText, 10) > 0) == false)
      {
        errorMessage = ErrorMessageId.CanInputNumberGreaterThanZero;
      }
      return objectAssign({}, state, {
        firstHubiMoveTimingEndTemp:newText,
        errorFirstHubiMoveTimingEndTemp:errorMessage});      
    case "changeAfterFirstHubiMoveTimingStart":
      var newText = action.value as string;
      var errorMessage = ErrorMessageId.None;
      if((parseInt(newText, 10) > 0) == false)
      {
        errorMessage = ErrorMessageId.CanInputNumberGreaterThanZero;
      }
      return objectAssign({}, state, {
        afterFirstHubiMoveTimingStartTemp:newText,
        errorAfterFirstHubiMoveTimingStartTemp:errorMessage});
    case "changeAfterFirstHubiMoveTimingEnd":
      var newText = action.value as string;
      var errorMessage = ErrorMessageId.None;
      if((parseInt(newText, 10) > 0) == false)
      {
        errorMessage = ErrorMessageId.CanInputNumberGreaterThanZero;
      }
      return objectAssign({}, state, {
        afterFirstHubiMoveTimingEndTemp:newText,
        errorAfterFirstHubiMoveTimingEndTemp:errorMessage});
    case "changeDetailHintPercent":
      var newValue = action.value as number;
      return objectAssign({}, state, {difficulty:state.difficulty.changeDetailHintPercent(newValue)});
    }
    return state;    
}