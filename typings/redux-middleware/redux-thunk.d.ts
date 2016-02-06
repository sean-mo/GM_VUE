// Type definitions for custom-error
// Project: https://github.com/gaearon/redux-thunk
// Definitions by: Sean mo <https://github.com/sean-mo>

declare module 'redux-thunk' {
    let thunk: thunkStatic.thunkMiddleware;
    namespace thunkStatic {
        interface thunkMiddleware {
            (_ref: Redux.Store): any
        }
    }
    export = thunk
}
