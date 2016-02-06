// Type definitions for custom-error
// Project: https://github.com/andrezsanchez/custom-error
// Definitions by: Sean mo <https://github.com/sean-mo>

declare module customError {
    interface ErrorMaker {
        (name:string, ParentError?:any):ErrorStatic
    }
    export interface ErrorStatic {
        (message?: string):any;
        inspect():Array<string>;
        name:string;
    }
}
declare var throwError:Function;
declare var customError: customError.ErrorMaker;
declare var GmError:customError.ErrorMaker;
declare module "custom-error" {
    export = customError;
}
