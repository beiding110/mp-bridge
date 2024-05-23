import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import message from './message.js';
import dictionary from './dictionary.js';
import homePageNav from './home-page-nav.js';
import userinfo from './userinfo.js';

export default new Vuex.Store({
    state: {
		currentPoint: 'zhao-zhou-qiao',
	},
    getters: {},
    mutations: {
		updateCurrentPoint(state, value) {
			state['currentPoint'] = value;
		},
	},
    actions: {},
    modules: {
      message,
      dictionary,
      homePageNav,
      userinfo,
    },
});
