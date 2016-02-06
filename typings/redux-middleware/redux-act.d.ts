// Type definitions for custom-error
// Project: https://github.com/pauldijou/redux-act
// Definitions by: Sean mo <https://github.com/sean-mo>

declare module reduxAct {
    export function createAction(description?: Function | string, payloadReducer?: Function, metaReducer?: Function): IActions;
    export function createReducer(handlers: any, defaultState: any): IReducer;
    export function assignAll(actions: any, stores: any): any;
    export function bindAll(actions: any, stores: any): any;
    export function batch(actions: any): any;
    export function disbatch(store: Redux.StoreMethods, ...actions: Array<any>): Redux.StoreMethods;

    interface IActions {
        (...arg: Array<any>): any;
        raw(...args: Array<any>): any;
        toString(): string;
        assignTo(dispatchOrStores: Redux.StoreMethods | Redux.Dispatch): Function;
        bindTo(dispatchOrStores: Redux.StoreMethods | Redux.Dispatch): Function;
        assigned(): Boolean;
        binded(): Boolean;
        dispatched(): Boolean;
    }
    interface Ihandlers {
        [index: string]: Function
    }
    interface IReducer {
        (state: any, action: any): any;
        has(actionCreator: string): Boolean;
        on(actionCreator: string): void;
        off(actionCreator: string): void;
        options(newOpts: any): void;
    }
}

declare module 'redux-act' {
    export = reduxAct;
}
