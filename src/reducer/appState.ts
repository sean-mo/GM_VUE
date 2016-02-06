'use strict';


import { createReducer } from 'redux-act';
import { setAppState } from '../actions/rootActions';

export var appState: reduxAct.IReducer = createReducer({
    [setAppState.toString()]: (state: any, playload: any): any => Object.assign({}, state, playload)
}, {});

