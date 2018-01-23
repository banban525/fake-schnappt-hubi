import star from "material-ui/svg-icons/toggle/star";
import * as objectAssign from "object-assign";

export interface AppFrameState
{
  drawOpened:boolean;
  settingsDialogOpened:boolean;
  settingsSelectedLanguage:string;
  language:string;
  passwordDialogOpened:boolean;
  passwordForDebug:string;
  debugMode:boolean;
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
  toggleDebugMode():void{
    this.dispatch({type:"toggleDebugMode"});
  }
  passwordDialogCancel():void{
    this.dispatch({type:"passwordDialogCancel"});
  }
  passwordDialogOk():void{
    this.dispatch({type:"passwordDialogOk"});
  }
  changePasswordForDebug(newValue:string):void{
    this.dispatch({type:"changePasswordForDebug", payload:newValue});
  }
}

const initialState:AppFrameState={
  drawOpened:false,
  settingsDialogOpened:false,
  settingsSelectedLanguage:"ja",
  language:"ja",
  debugMode:false,
  passwordDialogOpened:false,
  passwordForDebug:""
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
    case "toggleDebugMode":
      if(state.debugMode)
      {
        return objectAssign({}, state, {debugMode:false});
      }
      else
      {
        return objectAssign({}, state, {passwordDialogOpened:true});
      }
    case "passwordDialogCancel":
      return objectAssign({}, state, {passwordDialogOpened:false,passwordForDebug:"",drawOpened:false});
    case "passwordDialogOk":
      if(state.passwordForDebug === "admin")
      {
        return objectAssign({}, state, {debugMode:true, passwordForDebug:"", passwordDialogOpened:false,drawOpened:false});
      }
      else
      {
        return objectAssign({}, state, {passwordForDebug:""});
      }
    case "changePasswordForDebug":
      return objectAssign({}, state, {passwordForDebug:action.payload});
  }
    return state;
}