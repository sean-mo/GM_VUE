// Type definitions for Redux v1.0.0
// Project: https://github.com/rackt/redux
// Definitions by: William Buchwalter <https://github.com/wbuchwalter/>, Vincent Prouillet <https://github.com/Keats/>
// Definitions: https://github.com/borisyankov/DefinitelyTyped

declare module Redux {
    interface ActionCreator extends Function {
        (...args: any[]): any;
    }
    interface Reducer extends Function {
        (state: any, action: any): any;
    }
    interface Dispatch extends Function {
        (action: any): any;
    }
    interface StoreMethods {
        dispatch: Dispatch;
        getState(): any;
    }
    interface MiddlewareArg {
        dispatch: Dispatch;
        getState: Function;
    }
    interface Middleware extends Function {
        (obj: MiddlewareArg): Function;
    }
    interface IActions {
        type: string
    }

    export class Store {
        public getReducer(): Reducer;
        public replaceReducer(nextReducer: Reducer): void;
        public dispatch(action: any): any;
        public getState(): any;
        public subscribe(listener: Function): Function;
    }

    export function createStore(reducer: Reducer, initialState?: any): Store;
    export function bindActionCreators<T>(actionCreators: T, dispatch: Dispatch): T;
    export function combineReducers(reducers: any): Reducer;
    export function applyMiddleware(...middlewares: Middleware[]): Function;
    export function compose<T extends Function>(...functions: Function[]): T;
}

declare module 'redux' {
    export = Redux;
}
