// Type definitions for custom-error
// Project: https://github.com/fcomb/redux-logger
// Definitions by: Sean mo <https://github.com/sean-mo>

declare module "redux-logger" {
    let reduxLogger: reduxLoggerStatic.createLogger;
    namespace reduxLoggerStatic {
        interface createLogger {
            (): any;
        }
    }
    export = reduxLogger;
}
