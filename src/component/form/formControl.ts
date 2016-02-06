'use strict';
import VueComponent = require('vue-class-component');
import Vue                             from '../../ts/config';
import Input                           from './input';
import { prop, PropOption }            from '../../decorators/all';
import { differenceBy, isFunction, values, last }  from 'lodash';
// 设置type对应的vue组件
const formComponents: any = {
    'text, date, num, textarea': Input
}
// 获取所有vue组件的props
const vueProps: Array<any> = values(formComponents).map((item: any) => item.options.props);
const mergeProps: Function = ( needMergeProps: Array<any> ) => {
    if (needMergeProps.length < 2) {
        throw new Error('At least need more than two components props to merge');
    }
    let allProps: Array<PropOption> = last(needMergeProps);
    let allPropsLength: number = needMergeProps.length - 1;
    let i: number = 0;
    while ( i < allPropsLength ) {
        allProps = allProps.concat(differenceBy(needMergeProps[i], allProps, 'name'));
        i++;
    }
    return allProps;
}
const combinationProps: Function = (wrapComponent: any) => {
   let newComponent: any = VueComponent(wrapComponent)
   vueProps.push(newComponent.options.props);
   newComponent.options.props = mergeProps(vueProps);
   return newComponent;
}

@combinationProps
export class formControl {
    static replace: Boolean = true;
    static template: string = `
      <div class="f2-control {{className}}">
          <label class="label" for="labelName">{{label}}</label>
          <div v-el="vueControler"></div>
          <span class="tip">{{tip}}</span>
          <span class="tools" v-if="isEditor">
             <a href="javascript:void(0)" title="编辑"><i class="icon-external-link"></i></a>
             <a href="javascript:void(0)" title="删除">&#10005</a>
             <a href="javascript:void(0)" title="增长"><i class="icon-plus"></i></a>
             <a href="javascript:void(0)" title="减短"><i class="icon-minus"></i></a>
          </span>
      </div>
    `;
    $$: any;
    $options: any;
    $data: any;
    @prop({ type: String })
    type: string;
    @prop({ type: String })
    name: string;
    @prop({ type: String })
    label: string;
    @prop({ type: String, default: '' })
    className: string;
    @prop({ type: String })
    tip: string;
    @prop({ type: String, default: 'stacked' })
    viewMode: string;
    @prop({ type: Boolean, default: false })
    isEditor: Boolean;
    @prop({ type: Boolean, default: false })
    readOnly: Boolean;
    @prop({ type: Boolean, default: false })
    require: Boolean;
    @prop({ type: String, default: '' })
    defaultValue: string;
    @prop({ type: Number, default: '19' })
    colWidth: number;
    @prop({ type: Number, default: 1 })
    colNum: number;
    @prop({ type: Boolean, default: false })
    ignore: Boolean;
    @prop({ type: Function })
    handlerChange: Function;
    @prop({ type: null })
    parseData: any;
    data(): any {
        return {
            currProps: ''
        }
    }
    compiled(): void {
        // 查找当前匹配的控件
        let type: string = this.type || 'text' ;
        let matchKey: string = Object.keys(formComponents).filter((key: string) => key.indexOf(type) >= 0)[0];
        if (!matchKey) {
            return ;
        }
        let vueControler: any = formComponents[matchKey];
        // 组合区配的props
        let currProps: string = vueControler.options.props.filter((item: any) => {
            return item.type.name.toLowerCase() !== 'function' && item.name !== 'className'
        })
        .reduce((prev: any, prop: any) => {
            if ( this.$data[prop.name] ) {
                prev += `${prop.name}="${this.$data[prop.name]}" `;
            }
            return prev;
        }, '')
        // 直接打印结果
        let v: vuejs.Vue = new Vue({
            template: `<vue-controler ${currProps} 
                            handler-validate="{{handlerValidate}}" 
                            handler-Change="{{handlerChange}}">
                      </vue-controler>`,
            components: { vueControler },
            methods: {
                handlerChange: this.onChange.bind(this),
                handlerValidate: this.onValidate.bind(this)
            }
        })
        v.$mount(this.$$.vueControler);
    }
    onChange(name: string, result: any, raw: any, returnRawArray: Boolean): void {
        if (isFunction(this.handlerChange)) {
            this.handlerChange(name, result, raw, returnRawArray);
        }
    }
    onValidate(hasError: any, msg: string): void {
        console.log(hasError, msg)
    }
}

