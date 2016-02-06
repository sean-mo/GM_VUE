/// <reference path='../../typings/global.d.ts' />	

'use strict';

import VueComponent = require('vue-class-component');
import { store }       from '../store/configStore';
import connect         from '../utils/vue-redux';


/**
 * decorator of an event
 * @param  {string}            eventName [description]
 * @return {PropertyDecorator}           [description]
 */
export function event(eventName: string): PropertyDecorator {
  return function(target: any, propertyKey: string): void {
    (target.constructor.events || (target.constructor.events = {}))[eventName] = propertyKey
  }
}

export interface PropOption {
  type?: any
  required?: boolean
  default?: any
  twoWay?: boolean
  validator?: (value: any) => boolean
}

/**
 * decorator of a prop
 * @param  {PropOption}        options [description]
 * @return {PropertyDecorator}         [description]
 */
export function prop(options: PropOption): PropertyDecorator {
  return function(target: any, propertyKey: string): void {
    (target.constructor.props || (target.constructor.props = {}))[propertyKey] = options
  }
}

/**
 * decorator of a watch function
 * @param  {string}            path [description]
 * @return {PropertyDecorator}      [description]
 */
export function watch(path: string): PropertyDecorator {
  return function(target: any, propertyKey: string): void {
    (target.constructor.watch || (target.constructor.watch = {}))[path] = propertyKey
  }
}


export function ReduxComponent(stateProps: any, actions?: any): any {
    return function(target: any): any {
        target.store = store;
        return VueComponent(connect(stateProps, actions)(target));
    }
}