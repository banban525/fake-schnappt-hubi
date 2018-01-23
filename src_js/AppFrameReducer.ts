import star from "material-ui/svg-icons/toggle/star";
import * as objectAssign from "object-assign";

export interface AppFrameState
{
  drawOpened:boolean;
  settingsDialogOpened:boolean;
  settingsSelectedLanguage:string;
  language:string;
}

export class AppFrameActionDispatcher
{
  dispatch: (action:any)=>any;
  getState: ()=>AppFrameState;
  constructor(dispatch:(action:any)=>any, getState: ()=>AppFrameState)
  {
    this.dispatch = dispatch;
    this.getState = getState;
  }
  changeDrawerState(open:boolean):void{
    this.dispatch({type:"changeDrawerState", payload:open});
  }
  settingsOk():void{
    this.dispatch({type:"settingsOk"});
  }
  settingsCancel():void{
    this.dispatch({type:"settingsCancel"});
  }
  openSettings():void{
    this.dispatch({type:"openSettings"});
  }
  changeSettingsSelectedLanguage(newLang:string):void{
    this.dispatch({type:"changeSettingsSelectedLanguage", payload:newLang});
  }
  backToStart():void{
    this.dispatch({type:"backToStart"});
  }
}

const initialState:AppFrameState={
  drawOpened:false,
  settingsDialogOpened:false,
  settingsSelectedLanguage:"ja",
  language:"ja"
};

export function appFrameReducer(state: AppFrameState = initialState, action: any = {type:'none'}):AppFrameState
{
  switch(action.type)
  {
    case "changeDrawerState":
      return objectAssign({}, state, {drawOpened:action.payload});
    case "openSettings":
      return objectAssign({}, state, {settingsDialogOpened:true, settingsSelectedLanguage:state.language});
    case "settingsOk":
      return objectAssign({}, state, {drawOpened:false, settingsDialogOpened:false, language:state.settingsSelectedLanguage});
    case "settingsCancel":
      return objectAssign({}, state, {drawOpened:false, settingsDialogOpened:false});
    case "changeSettingsSelectedLanguage":
      return objectAssign({}, state, {settingsSelectedLanguage:action.payload});
    case "backToStart":
      return objectAssign({}, state, {drawOpened:false});
  }
    return state;
}