'use strict';

import i18n = require('vue-i18n');
import VueComponent = require('vue-class-component')
import { Actions }              from '../store/configStore';
import connect         from '../utils/vue-redux';
import Vue             from '../ts/config';
import { SyncStorage } from '../utils/localstorage';
import { watch } from '../decorators/all';
import { textPopup, alert, warn } from '../ts/popup';






SyncStorage((langObject: { language: string, languagePack: any }) => {
    let locales: Array<string> = [];
    locales[langObject.language] = langObject.languagePack
    Vue.use(i18n, { lang: langObject.language, locales: locales });
    textPopup({ x: 1 }, Actions);
})(true);

