'use strict';

export default function shallowEqual(objA: any, objB: any): Boolean {
  if (objA === objB) {
    return true
  }

  const keysA: any = Object.keys(objA)
  const keysB: any = Object.keys(objB)

  if (keysA.length !== keysB.length) {
    return false
  }

  // Test for A's keys different from B.
  const hasOwn: any = Object.prototype.hasOwnProperty
  for (let i: number = 0; i < keysA.length; i++) {
    if (!hasOwn.call(objB, keysA[i]) ||
        objA[keysA[i]] !== objB[keysA[i]]) {
      return false
    }
  }

  return true
}
