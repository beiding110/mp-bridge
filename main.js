
// #ifndef VUE3
import Vue from 'vue'
import App from './App'

import store from './store/index.js';

import './plugins/index.js';

import './assets/js/app-proto.js';
import './assets/js/app-supply.js';

import uView from '@/uni_modules/uview-ui'
import filters from '@/filters/index.js';

Vue.use(uView);
Vue.use(filters);

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App,
	store,
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import App from './App.vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif