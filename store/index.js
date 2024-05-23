import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import message from './message.js';

import data from '../pages/index/components/data.js'

export default new Vuex.Store({
    state: {
		currentPoint: data[0],
	},
    getters: {
		
	},
    mutations: {
		updateCurrentPoint(state, value) {
			state['currentPoint'] = value;
		},
	},
    actions: {},
    modules: {
      message,
    },
});
