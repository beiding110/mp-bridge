import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import message from './message.js';

import data from '../pages/index/data/data.js';

var pointsData = data.filter(item => !item.disabled);

export default new Vuex.Store({
    state: {
		currentPoint: pointsData[0],
		
		// 拖拽方位
		mapX: 0,
		mapY: 0,
		mapScale: 1,
	},
    getters: {
		
	},
    mutations: {
		updateCurrentPoint(state, value) {
			state['currentPoint'] = value;
		},
		updateMapPos(state, value) {
			state.mapX = value.x;
			state.mapY = value.y;
		},
		updateMapScale(state, value = 1) {
			state.mapScale = value;
		},
	},
    actions: {},
    modules: {
      message,
    },
});
