/// <reference path="../../typings/global.d.ts" />
var chai_1 = require('chai');
var httpAjax = require('../../src/utils/ajaxJquery');
describe('检查AjaxJquery对象属性', function () {
    it('get', function () {
        chai_1.expect(httpAjax).to.have.property('GET').and.a('function');
    });
    it('post', function () {
        chai_1.expect(httpAjax).to.have.property('POST').and.a('function');
    });
    it('ajaxAsync', function () {
        chai_1.expect(httpAjax).to.have.property('AsyncRequest').and.a('function');
    });
    it('private IOption', function () {
        chai_1.expect(httpAjax).to.not.have.property('IOption');
    });
});
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
