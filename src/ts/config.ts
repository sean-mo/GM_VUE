'use strict';

import $    = require('jquery');
import Vue  = require('vue');
import { modalComponent, formControl } from '../component/components'

// 开启全局jQuery
declare module window {
    let jQuery: any;
}
window.jQuery = $;
// 开启调试模式
Vue.config.debug = process.env.NODE_ENV === 'dev' ? true : false;
// 导入组件
Vue.component('modal',        modalComponent);
Vue.component('formControl',  formControl);

export default Vue;
