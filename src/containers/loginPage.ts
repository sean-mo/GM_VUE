'use strict';

import i18n = require('vue-i18n');
import Vue                         from '../ts/config';
import { Actions }                 from '../store/configStore';
import { SyncStorage }             from '../utils/localstorage';
import { watch, ReduxComponent }   from '../decorators/all';

const mapState: Function = (state: any) => {
    return {
        loginError: state.loginInfo.error,
        language: state.appState.Language,
        languagePack: state.appState.LanguagePack
    }
}

@ReduxComponent(mapState)
class loginPage  {
    static replace: Boolean = false;
    static template: string = '#login-template';
    username: string;
    password: string;
    errormsg: string;
    userError: Boolean;
    pwdError: Boolean;
    language: string;
    languagePack: any;
    loginError: any;
    $$: any;
    public data(): any  {
        return {
            username: '',
            password: '',
            errormsg: '',
            userError: false,
            pwdError: false,
            language: 'cn',
            languagePack: {},
            loginError: {}
        }
    }
    @watch('loginError')
    onChangeLoginError(loginError: { code: number, msg: string }): void {
        if (!loginError) {
            return;
        }
        if (loginError.code === 0) {
            location.href = 'index.html';
        } else {
            this.errormsg = loginError.msg;
        }
    }
    initState(): void {
        this.errormsg = '';
        this.userError = false;
        this.pwdError = false;
    }
    changeLanguage(event: Event): void {
        let el: HTMLInputElement = <HTMLInputElement>event.target;
        SyncStorage(() => 1)(false, el.value);
    }
    login(): void {
        this.initState();
        if (this.username.length === 0) {
            this.$$.username.focus();
            this.userError = true;
            this.errormsg = this.languagePack.login.userText;
            return;
        }
        if (this.password.length === 0) {
            this.$$.password.focus();
            this.pwdError = true;
            this.errormsg = this.languagePack.login.pwdText;
            return;
        }
        Actions.requestLogin({ username: this.username, password: this.password });
    }
}


SyncStorage((langObject: { language: string, languagePack: any }) => {
    let locales: Array<string> = [];
    locales[langObject.language] = langObject.languagePack
    Vue.use(i18n, { lang: langObject.language, locales: locales });
    let loginVue: any = new loginPage();
    loginVue.$mount('#login');
})(true);


