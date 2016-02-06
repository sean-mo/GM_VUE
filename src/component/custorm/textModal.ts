'use strict';
import VueComponent = require('vue-class-component');
import { prop }   from '../../decorators/all';

@VueComponent
export class textModal {
    static template: string = `
        <modal title="{{$t('custormBase.custom')}}{{$t('editor.ctrlText')}}" 
            resolveAgreed="resolveAgreed" 
            resolveCancel="resolveCancel" 
            resolve-close="{{resolveClose}}" 
            rawFooter="false">
         <fieldset class="f2-fieldset">
            <div class="f2-control f2-control-error f2-control-half">
                <label class="label" for="labelName">标签名</label>
                <input type="text" id="labelName" name="labelName" class="f2-text" placeholder="请您输入标签名" />
                <span class="tip">输入标签名称不要重名</span>
            </div>
            <form-control id="parameterName" type="text" name="parameterName" label="参数名" tip="输入参数名称不要重名"
                class-name="f2-control-half" placeholder="请您输入参数名"></form-control>
            <form-control id="tipInfo" type="text" name="tipInfo" label="提示" tip="请您输入提示信息"
                class-name="f2-control-half" placeholder="请您输入提示信息"></form-control>
            <form-control id="defaultValue" type="text" name="defaultValue" label="默认值" tip="请您输入默认值"
                class-name="f2-control-half" placeholder="请您输入默认值"></form-control>
        </fieldset>
        <fieldset class="f2-fieldset">
            <legend>组件配置</legend>
            <form-control id="minLength" name="minLength" type="num" label="最小长度" tip="仅允许输入数字" placeholder="最小长度">
            </form-control>
            <form-control id="maxLength" name="maxLength" type="num" label="最大长度" tip="仅允许输入数字" placeholder="最大长度">
            </form-control>
        </fieldset>
        <fieldset class="f2-fieldset f2-preview">
            <legend>组件预览</legend>
            <div class="f2-control f2-control-half">
                <label class="label" for="defaultValue">默认值</label>
                <input type="text" id="defaultValue" name="defaultValue" class="f2-text" placeholder="请您输入默认值" />
                <span class="tip">请您输入默认值</span>
            </div>
        </fieldset>
      </modal>
    `;
    @prop({ type: Function })
    resolveCancel: Function;
    @prop({ type: Function })
    resolveAgreed: Function;
    @prop({ type: Function, required: true })
    resolveClose: Function;
}
