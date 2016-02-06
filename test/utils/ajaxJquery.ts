/// <reference path="../../typings/global.d.ts" />
import { expect } from 'chai';
import * as httpAjax from '../../src/utils/ajaxJquery';
import * as ajax from 'superagent';

describe('检查AjaxJquery对象属性', () => {
   it('get', () => {
       expect(httpAjax).to.have.property('GET').and.a('function');
   })
   it('post', () => {
       expect(httpAjax).to.have.property('POST').and.a('function');
   })
   it('ajaxAsync', () => {
       expect(httpAjax).to.have.property('AsyncRequest').and.a('function');
   })
   it('private IOption', () => {
       expect(httpAjax).to.not.have.property('IOption');
   })
})

// describe('检查函数返回值', () => {
//     it('超时404的请求', async function( done: MochaDone ): Promise<any> {
//         try {
//             let res: ajax.Response = await httpAjax.get('http://www.163.com', { external: true });
//             expect(res).to.undefined('404')
//             done();
//         } catch (error){
//             console.log(Object.keys(error))
//             done();
//         }
//     })
// })
