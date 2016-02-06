'use strict';

import * as httpAjax from 'component-ajax';
import { warn } from '../ts/popup'
import { flow, chain } from 'lodash';

let defaultOptions: IAjaxSetting = {
    type: 'get',
    url: '',
    dataType: 'json',
    timeout: 15 * 1000, // 超时15秒
    contentType: 'application/x-www-form-urlencoded'
}

const serverAPI: string = 'http://127.0.0.1:8005/api/';
const syncFunc: Function = ( data: any, funcs: any[]): void => {
    let funcLength: number = funcs.length;
    switch (funcLength) {
        case 0:
            break;
        case 1:
            funcs[0](chain(data));
            break;
        default:
            flow(...funcs)(data);
            break;
    }
}

const asyncError: IAjaxError = (xhr: IXHR, status: string): void => {
    warn('System error or can\'t find the interface');
    throw new Error(status);
}

export function AsyncRequest(method: string = 'GET', url: string, options: IAjaxSetting = defaultOptions, external: Boolean = false): Function {
    return (...funcs: any[]) => {
        let parseUrl: string = external ? url : `${serverAPI}${url}`;
        let ajaxOpts: any = Object.assign({}, defaultOptions, options, {
            url: parseUrl,
            type: method.toLocaleUpperCase(),
            success(data: any, status: string, xhr: IXHR): void {
                syncFunc(data, funcs);
            },
            error: asyncError, // Param: (xhr: IXHR, status: string): void 
        })
        httpAjax(ajaxOpts);
    }
}

export function GET(url: string, external: Boolean = false, error: IAjaxError = asyncError): Function {
    return (...funcs: any[]) => {
        let parseUrl: string = external ? url : `${serverAPI}${url}`;
        httpAjax.settings = Object.assign({}, httpAjax.settings, defaultOptions, { error });
        httpAjax.getJSON(parseUrl, (data: any, status: string, xhr: IXHR) => {
           syncFunc(data, funcs);
        })
    }
}

export function POST(url: string, postData: any = {}, external: Boolean = false, error: IAjaxError = asyncError): Function {
    return (...funcs: any[]) => {
        let parseUrl: string = external ? url : `${serverAPI}${url}`;
        httpAjax.settings = Object.assign({}, httpAjax.settings, defaultOptions, { error });
        httpAjax.post(parseUrl, postData, (data: any, status: string, xhr: IXHR) => {
            syncFunc(data, funcs);
        }, 'json');
    }
}

