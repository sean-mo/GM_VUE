/// <reference path="../../typings/global.d.ts" />
import { expect } from 'chai';
import Vue = require('vue');
import VR from '../../src/utils/vue-redux';
import {store} from '../../src/store/configStore'; 

// describe('vue-redux', () => {
//     let loginVue: any = {
//         data(): any {
//             return {
//                 store: store
//             }
//         }
//     }
//     let mapState: Function = (state: any) => state.loginInfo;
//     let options: any = VR(mapState)(loginVue);
//     let vm: any = new Vue(options)
//     it('校验属性', () => {
//         expect(vm).to.have.property('trySubscribe').and.a('function');
//         expect(vm).to.have.property('handlerChange').and.a('function');
//         expect(vm).to.have.property('updateState').and.a('function');
//         expect(vm).to.have.property('updateActions').and.a('function');
//         expect(vm).to.have.property('store').and.a('object');
//     })
// })