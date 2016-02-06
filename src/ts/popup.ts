'use strict';
import Vue           from '../ts/config';
import { textModal } from '../component/components';


export function covertTip(className?: string, lostTime: number = 0): Function {
    return (msg: string): void => {
        let render: vuejs.Vue = new Vue({
            replace: true,
            el(): HTMLDDElement {
                let div: HTMLDDElement = document.createElement('div');
                return div;
            },
            data: {
               className, msg
            },
            template: `
                <div class="f2-tiplayout">
                    <div class="msgBox {{className}}">{{msg}} <cite v-on="click: modalclose()">&#10005</cite></div>
                </div>
            `,
            methods: {
                modalclose(): void {
                    render.$el.className += ' out';
                    setTimeout(() => {
                        render.$destroy(true);
                    }, 500);
                }
            }
        })
        render.$appendTo('body')
    }
}

export function covertPopup(vueComponent: any): Function {
    return (data: any, actions: any): void => {
        let render: vuejs.Vue = new Vue({
            replace: true,
            el(): HTMLDDElement {
                let div: HTMLDDElement = document.createElement('div');
                return div;
            },
            template: `
                <div class="f2-masklayout">
                    <vue-modal resolve-close="{{modalclose}}" />
                </div>
            `,
            components: { 'vueModal': vueComponent },
            methods: {
                modalclose(): void {
                    render.$el.className += ' f2-masklayout-out';
                    setTimeout(() => {
                        render.$destroy(true);
                    }, 500);
                }
            }
        })
        render.$appendTo('body')
    }
}

export function alert(msg: string): void {
    return covertTip()(msg);
}

export function warn(msg: string): void {
    return covertTip('warn')(msg);
}

export function textPopup(data: any, actions: any): void {
    return covertPopup(textModal)(data, actions);
}
