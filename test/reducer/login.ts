/// <reference path="../../typings/global.d.ts" />
// import { expect } from 'chai';
// import { combineReducers } from 'redux';
// import loginReducer from '../../src/reducer/login';

// describe('check login reducer', () => {
//     it('requestLogin ', () => {
//         let inputValue: any = { username: '你大爷', password: '168168', error: { code: 404, msg: 'hehe'}};
//         let reducer: any = combineReducers({ loginInfo: loginReducer.loginInfo });
//         let result: any = reducer({}, {type: 'RECEIVE_LOGIN', loginInfo: inputValue });
//         expect(result).to.exist;
//         expect(result).to.include.keys('loginInfo');
//         expect(result.loginInfo).to.include.keys('username', 'password', 'error');
//         expect(result.loginInfo.password).to.equal('168168')
//     })
// })
