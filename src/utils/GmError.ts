/// <reference path='../../typings/global.d.ts' />	

'use strict';

export function captureError(): void {
    window.onerror = function(errorMessage: any, scriptURI: any, lineNumber: any, columnNumber: any, errorObj: any): void {
        console.log('错误信息：', errorMessage);
        console.log('出错文件：', scriptURI);
        console.log('出错行号：', lineNumber);
        console.log('出错列号：', columnNumber);
        console.log('错误详情：', errorObj);
    };
}

export function throwError(errorMessage: string, name?: string): void {
    console.error(errorMessage)
}
