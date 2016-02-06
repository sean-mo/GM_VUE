// /// <reference path="../../typings/global.d.ts" />
// import { expect } from 'chai';
// import * as loginAction from '../../src/actions/login';

// describe('check login actions', () => {
//     it('REQUEST_LOGIN', () => {
//         expect(loginAction.REQUEST_LOGIN).to.equal('REQUEST_LOGIN');
//     })
//     it('RECEIVE_LOGIN',  () => {
//         expect(loginAction.RECEIVE_LOGIN).to.equal('RECEIVE_LOGIN');
//     })
//     it('receiveLogin',  () => {
//         expect(loginAction.receiveLogin).to.be.a('function');
//     })
//     it('requestLogin',  () => {
//         expect(loginAction.requestLogin).to.be.a('function');
//     })
//     it('receiveLog return value', () => {
//         let inputValue: loginAction.ILoginInfo = { username: '你大爷', password: '168168', error: { code: 404, msg: 'hehe'}};
//         let returnValue: any = loginAction.receiveLogin(inputValue);
//         expect(returnValue).to.include.keys('type', 'loginInfo');
//         expect(returnValue.loginInfo).to.include.keys('username', 'password', 'error');
//         expect(returnValue.loginInfo.error).to.include.keys('code', 'msg');
//         expect(returnValue.loginInfo.error.code).to.be.a('number');
//         expect(returnValue.loginInfo.error.msg).to.be.a('string');
//     })
// })
