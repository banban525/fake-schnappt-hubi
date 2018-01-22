import * as React from 'react';
import *  as ReactDOM from "react-dom";
import { createStore, combineReducers  } from "redux";
import { Provider,connect } from "react-redux";

import App from "./App";
import {AppProps} from "./App";
import {appReducer,AppActionDispatcher,AppState} from "./AppReducer";
import InitialSettings from "./InitialSettings";
import {InitialSettingsProps} from "./InitialSettings";
import {initialSettingsReducer,InitialSettingsActionDispatcher,InitialSettingsState,SettingsPhases} from "./InitialSettingsReducer";
import AppFrame from "./AppFrame";
import {AppFrameProps} from "./AppFrame";
import {appFrameReducer,AppFrameActionDispatcher,AppFrameState} from "./AppFrameReducer";


import * as objectAssign from 'object-assign';

const rootReducer = combineReducers({ appReducer, initialSettingsReducer });
const store = createStore(rootReducer);
store.subscribe(() => console.log(store.getState()));

function mapAppStateToProps(state : any):AppProps
{
    var result = objectAssign({}, state.appReducer) as AppProps;
    return result;
}

function mapAppDispatchToProps(dispatch: any):any
{
    return {
        actions:new AppActionDispatcher(dispatch, ()=>(store.getState() as any).appReducer as AppState)
    }
}

function mapAppFrameStateToProps(state : any):AppFrameProps
{
    var result = objectAssign({}, state.appFrameReducer) as AppFrameProps;
    return result;
}

function mapAppFrameDispatchToProps(dispatch: any):any
{
    return {
        actions:new AppFrameActionDispatcher(dispatch, ()=>(store.getState() as any).appFrameReducer as AppFrameState)
    }
}


function mapInitialSettingsStateToProps(state : any):InitialSettingsProps
{
    var result = objectAssign({}, state.initialSettingsReducer) as InitialSettingsProps;
    return result;
}

function mapInitialSettingsDispatchToProps(dispatch: any):any
{
    return {
        actions:new InitialSettingsActionDispatcher(dispatch, ()=>(store.getState() as any).initialSettingsReducer as InitialSettingsState)
    }
}

var AppContainer = connect(
    mapAppStateToProps,
    mapAppDispatchToProps)(App)
var InitialSettingsContainer = connect(
    mapInitialSettingsStateToProps,
    mapInitialSettingsDispatchToProps)(InitialSettings)
var AppFrameContainer = connect(
    mapAppFrameStateToProps,
    mapAppFrameDispatchToProps)(AppFrame)
    
  
ReactDOM.render(
    <Provider store={store}>
        <div>
            <AppFrameContainer>
                <InitialSettingsContainer />
                <AppContainer />
            </AppFrameContainer>
        </div>
    </Provider>
    ,document.getElementById("app")
);
