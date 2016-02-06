// Type definitions for vue-i18n 2.3.3
// Project: https://github.com/kazupon/vue-i18n
// Definitions by: sean <https://github.com/sean-mo>

declare module 'vue-i18n' {
    let i18n: i18nStatic.plugin;
    namespace i18nStatic {
        interface plugin {
            (vue: Vue, opts: { lang: string, locales: any }): void
        }
    }
    export = i18n;
}