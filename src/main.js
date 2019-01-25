// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import '@/assets/font_8eo2ewbhfw/iconfont.css';
import '@/assets/font_lvwze5dvzgg/iconfont.css';
import '@/assets/css/reset.css';
import ElementUI from 'element-ui';
import axios from 'axios'
import VueResource from 'vue-resource';
import Qs from 'qs'
import store from './store';
import $ from 'jquery'
import 'element-ui/lib/theme-chalk/index.css';
import 'weui/dist/style/weui.css';
import "babel-polyfill";
require('es6-promise').polyfill()
import { DatetimePicker } from 'we-vue'
Vue.use(DatetimePicker)
import { Dialog } from 'we-vue'
import wechat from 'weixin-js-sdk'
Vue.prototype.$wechat = wechat;
import getUrl from '@/assets/js/getUrl.js';
import VueWechatTitle from 'vue-wechat-title'; 
Vue.use(VueWechatTitle)
//import fastClick from 'fastclick'

Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(VueResource); 
//Vue.http.headers.common['token'] = 'application/x-www-form-urlencoded';
//fastClick.attach(document.body)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
