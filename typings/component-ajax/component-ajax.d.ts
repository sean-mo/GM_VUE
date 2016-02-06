// Type definitions for custom-error
// Project: https://github.com/ForbesLindesay/ajax
// Definitions by: Sean mo <https://github.com/sean-mo>

interface ajaxStatic {
    (options: IAjaxSetting): IXHR;
    active: Number;
    settings: IAjaxSetting;
    JSONP(options: IAjaxSetting): IXHR;
    get(url: string, success: IAjaxSuccess): IXHR;
    post(url: string, data: any, success: IAjaxSuccess, dataType: string): IXHR;
    getJSON(url: string, success: IAjaxSuccess): IXHR;
}
interface IAjaxSetting {
    url: string;
    type: string,
    accepts?: any;
    async?: Boolean;
    beforeSend?: Function;
    complete?: IAjaxComplete;
    contents?: any;
    contentType: string;
    context?: HTMLElement;
    crossDomain?: Boolean;
    data?: any | string | Array<any>;
    dataType?: string;
    success?: IAjaxSuccess,
    xhr?: Function;
    error?: IAjaxError;
    global?: Boolean;
    headers?: any;
    method?: string;
    timeout: number;
}
interface IXHR {
    readyState: number;
    status: number;
    responseText: string;
    responseXML: XMLDocument;
    statusText: string;
    open(method: string, url: string, async: Boolean, username?: string, password?: string): void;
    send(content: any): void;
    overrideMimeType(mimeType: string): Function;
    onreadystatechange(): void;
    getResponseHeader(header: string): string;
    setRequestHeader(header: string, value: string): void;
    getAllResponseHeaders(): string;
    getResponseHeader(header: string): any;
    Abort(): void;
}
interface IAjaxSuccess {
    (data: any, status: string, xhr: IXHR): void;
}
interface IAjaxComplete {
    (xhr: IXHR, status: string): void;
}
interface IAjaxError {
    (xhr: IXHR, textStatus: string, errorThrown: string): void;
}


declare var httpAjax: ajaxStatic;
declare module 'component-ajax' {
    export = httpAjax;
}
