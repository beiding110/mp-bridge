import Vue from 'vue';

export default {
    state: {
		state: {},

		areas: [], // 地区
	},
    getters: {
        
    },
    mutations: {
		updateDictionaryState(state, {name, value}) {
			state[name] = value;
			state.state[name] = true;
		},
    },
    actions: {
		// 地区
		getAreas({state, commit}, requery) {
			if (!requery && state.state.areas) {
				return;
			}
			
			Vue.prototype.$get('/tb/searchrelated/getareas.json', data => {
				data.forEach(item => {
					item.value = item.valuename;
				});
				
				commit('updateDictionaryState', {
					name: 'areas',
					value: data,
				});
			});
		},
    },
}
