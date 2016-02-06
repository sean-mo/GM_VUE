/// <reference path='../../typings/global.d.ts' />	

'use strict';

import { createAction } from 'redux-act';
import { POST } from '../utils/ajaxJquery';

export const Receive_LOGIN: reduxAct.IActions = createAction('Receive_LOGIN', (loginInfo: ILoginInfo) => loginInfo);

export interface ILoginInfo {
    username: string,
    password: string,
    error?: any
}

export function requestLogin(loginInfo: ILoginInfo): any {
    return (dispatch: Redux.Dispatch, getState: Function) => {
        POST('login', loginInfo)((chani: any) => {
            let result: { msg: string, code: number } = chani.value();
            loginInfo.error = {
                code: result.code || 0,
                msg: result.msg || ''
            }
            dispatch(Receive_LOGIN(loginInfo));
        })
    }
}

