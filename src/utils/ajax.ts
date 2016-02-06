/// <reference path='../../typings/global.d.ts' />	

'use strict';

import * as httpAjax from 'superagent';
import { throwError } from './GmError';

export interface IOption {
    accept?: string;
    external?: boolean;
    type?    : string;
}
let defaultOptions: IOption = {
    accept  : 'json',
    external: false,
    type    : 'urlencoded',
}

function prepareRequest(method: string = 'GET', requestURL: string, options: IOption = defaultOptions): httpAjax.Request<any> {
    let opts: IOption                    = Object.assign({}, defaultOptions, options);
    let parsedUrl: string                = opts.external ? requestURL : `http://10.20.72.96:8005/api/${requestURL}`;
    let req: httpAjax.Request<any>       = httpAjax(method.toLocaleUpperCase(), parsedUrl);
    delete opts.external;
    return req.type(opts.type).accept(opts.accept).timeout(10 * 1000);
}

function sendAsync(req: httpAjax.Request<any>): Promise<httpAjax.Response> {
    return new Promise(( resolve: any, reject: any ) => {
        req.end((err: any, res: httpAjax.Response) => {
            if (err) {
                reject(err);
                throwError(`${err}`);
                return;
            }
            resolve(res.body);
        });
    })
}

export function get(url: string, options?: IOption): Promise<httpAjax.Response> {
    return sendAsync(prepareRequest('GET', url, options));
}


export function post(url: string, sendData: any = {}, options?: IOption): Promise<httpAjax.Response> {
    let req: httpAjax.Request<any> = prepareRequest('POST', url, options).send(sendData);
    return sendAsync(req);
}

export function ajaxAsync(method: string = 'GET', requestURL: string, sendData?: any, options: IOption = defaultOptions): Promise<any> {
    let req: httpAjax.Request<any> = prepareRequest(method, requestURL, options);
    if (method.toLocaleUpperCase() && sendData ) {
       req.send(sendData);
    }
    return sendAsync(req);
}
