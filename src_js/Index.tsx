import * as React from 'react';
import *  as ReactDOM from "react-dom";
import { createStore, combineReducers  } from "redux";
import { Provider,connect } from "react-redux";

import App from "./App";
import {AppProps} from "./App";
import {appReducer,AppActionDispatcher,AppState} from "./AppReducer";
import * as objectAssign from 'object-assign';

const rootReducer = combineReducers({ appReducer });
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

var AppContainer = connect(
    mapAppStateToProps,
    mapAppDispatchToProps)(App)

  
ReactDOM.render(
    <Provider store={store}>
        <AppContainer />
    </Provider>
    ,document.getElementById("app")
);
