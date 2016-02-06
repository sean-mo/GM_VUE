'use strict';

import { createAction } from 'redux-act';

interface IAppState {
    TITLE: string,
    GAMEID: number,
    Language: string,
    LanguagePack: any,
    USERID: string,
    MENUID: number,
    ROLE: string,
    MenuRole: string,
    GAMELIST: Array<any>
}

const defaultAppState: IAppState = {
    TITLE: '',
    GAMEID: 0,
    Language: 'cn',
    LanguagePack: {},
    USERID: '',
    MENUID: 0,
    ROLE: '',
    MenuRole: '',
    GAMELIST: []
}

export const setAppState: reduxAct.IActions = createAction('setAppState', (appState: any) => {
    return Object.assign({}, defaultAppState, appState);
})
