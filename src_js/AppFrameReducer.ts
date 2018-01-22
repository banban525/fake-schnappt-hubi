export interface AppFrameState
{
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
}

export function appFrameReducer(state: AppFrameState = {}, action: any = {type:'none'}):AppFrameState
{
    return state;
}