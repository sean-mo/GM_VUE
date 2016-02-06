'use strict';

import { Actions } from '../store/configStore';
import { GET }     from './ajaxJquery';
import { isEqual } from 'lodash';

let language: string = 'cn';
const cacheKey: string = 'XSJGM';
const win: any = (typeof window !== 'undefined' ? window : global);
const localStorageName: string = 'localStorage';
const isLocalStorageNameSupported: Function = () => {
    try {
        return (localStorageName in win && win[localStorageName])
    } catch (err) {
        return false;
    }
}
const storage: any = window[localStorageName];
let cacheContent: any = undefined;

export interface ILanguage {
    language: string,
    languagePack: any
}

export function SyncStorage(func: Function): Function {
    return (async: Boolean = false, changeLang?: string) => {
        let storageData: any = get();
        if (storageData && !changeLang) {
            Actions.setAppState({ Language: storageData.language, LanguagePack: storageData.languagePack });
            language =  storageData.language || 'cn';
            func(storageData)
        }
        if (!storageData || async || changeLang ) {
            let rnd: string = new Date().getTime().toString();
            language = changeLang || storageData.language || 'cn';
            GET(`i18n/${language}.json?${rnd}`, true)((chani: any) => {
                let lang: ILanguage = { language, languagePack: chani.value() }
                save(lang);
                if (changeLang) {
                    location.reload();
                }
            })
        }
    }
}

export function get(): any {
    if (!isLocalStorageNameSupported) {
        return cacheContent;
    }
    let storeValue: any = storage.getItem(cacheKey);
    try {
       cacheContent = JSON.parse(storeValue);
    } catch (err) {
        storeValue = undefined;
    }
    return cacheContent;
}


export function save(obj: any): void {
    if (!isLocalStorageNameSupported) {
        return;
    }
    if (isEqual(obj, cacheContent)) {
        return;
    }
    cacheContent = Object.assign({}, cacheContent, obj);
    Actions.setAppState({ Language: cacheContent.language, LanguagePack: cacheContent.languagePack });
    try {
        storage.setItem(cacheKey, JSON.stringify(cacheContent));
    } catch (err) {
        throw new Error('save to localStorage fail');
    }
}
