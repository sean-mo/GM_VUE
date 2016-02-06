// Type definitions for custom-error
// Project: https://github.com/substack/node-deep-equal
// Definitions by: Sean mo <https://github.com/sean-mo>

declare module 'deep-equal' {
    let de: deepEqualStatic.deepEqual;
    module deepEqualStatic {
        interface deepEqual {
            (actual: any, expected: any, opts?: any): Boolean;
        }
    }
    export default de;
}