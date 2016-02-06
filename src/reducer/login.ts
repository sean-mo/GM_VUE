'use strict';

import { createReducer } from 'redux-act';
import { Receive_LOGIN } from '../actions/rootActions';

export var login: reduxAct.IReducer = createReducer({
    [Receive_LOGIN.toString()]: (state: any, loginInfo: any) => loginInfo
}, {});

