'use strict';
import VueComponent = require('vue-class-component');
import { prop }   from '../../decorators/all';
import { isFunction } from 'lodash';

@VueComponent
export class modalComponent {
    static template: string = `
        <div class="f2-modal">
            <h3>
                <strong>{{title}}</strong>
                <cite v-on="click: resolveClose()">&#10005</cite>
            </h3>
            <content></content>
            <div class="f2-modal-footer" v-if="rawFooter">
                <a href="javascript:void(0);" class="f2-button-ok" v-on="click: onAgreed()">添加</a>
                <a href="javascript:void(0);" class="f2-button" v-on="click: onCancel()">取消</a>
            </div>
        </div>
    `;
    @prop({ type: String, default: 'modal tilte' })
    title: string;
    @prop({ type: Boolean, default: true })
    rawFooter: Boolean;
    @prop({ type: Function })
    resolveCancel: Function;
    @prop({ type: Function })
    resolveAgreed: Function;
    @prop({ type: Function, required: true })
    resolveClose: Function;
    onAgreed(): void {
        if (isFunction(this.resolveAgreed)) {
            this.resolveAgreed()
        }
        this.resolveClose();
    }
    onCancel(): void {
        if (isFunction(this.resolveCancel)) {
            this.resolveCancel();
        }
        this.resolveClose();
    }
}
