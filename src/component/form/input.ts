'use strict';
import VueComponent = require('vue-class-component');
import { prop }   from '../../decorators/all';
import { isFunction } from 'lodash';

@VueComponent
export default class Input {
    static template: string = `
      <input type="text" 
        id="{{id}}" 
        name="{{name}}" 
        readonly="{{readonly}}"
        class="f2-text" 
        placeholder="{{placeholder}}" 
        value="{{value}}" v-on="keyup: validate($event),  change: changeValue($event);" />
    `;
    @prop({ type: String })
    type: string;
    @prop({ type: String })
    id: string;
    @prop({ type: String })
    name: string;
    @prop({ type: String })
    classname: string;
    @prop({ type: String })
    placeholder: string;
    @prop({ type: String, default: '' })
    defaultvalue: string;
    @prop({ type: String, default: '' })
    value: string;
    @prop({ type: Boolean, default: false })
    require: Boolean;
    @prop({ type: Boolean, default: false })
    readonly: Boolean;
    @prop({ type: Function })
    handlerChange: Function;
    @prop({ type: Function })
    handlerValidate: Function;
    @prop({ type: Function })
    handlerKeyup: Function;
    @prop({ type: Number })
    max: number;
    @prop({ type: Number, default: 0 })
    min: number;
    @prop({ type: Number, default: 0 })
    decimal: number;
    @prop({ type: Boolean, default: false })
    onlydate: Boolean;
    @prop({ type: Boolean, default: false })
    onlytime: Boolean;
    @prop({ type: Boolean, default: false })
    unixtime: Boolean;
    @prop({ type: Number, default: 3 })
    rows: number;
    created(): void {
        
    }
    validate(event: Event): void {
        console.log('validate')
        console.log(event.target)
    }
    changeValue(event: Event): void {
        console.log('change')
        console.log(event.target)
    }
}
