import Vue from 'vue';

export default {
    state: {
		tabActive: 'home',		// 下导航控制器
		
		navCurrent: {			// 上导航控制器
			info: 'notice',		// 讯息
		},
		navList: [
			{
				name: 'tab1',
				id: 'notice',
			},
			{
				name: 'tab2',
				id: 'portraits',
			},
			{
				name: 'tab3',
				id: 'manager'
			},
		],
	},
    getters: {
        navIndex(state) {
			var index = state.navList.findIndex(item => item.id === state.navCurrent.info);
			
			if (index < 0) {
				return 0;
			}
			
			return index;
		},
    },
    mutations: {
		updateHomePageNavState(state, {name, value}) {
			state[name] = value;
		},
    },
    actions: {
		homePageNavTo({state, commit}, obj) {
			var {tab, nav} = obj;
			
			if (tab) {
				// 更新下导航
				commit('updateHomePageNavState', {
					name: 'tabActive',
					value: tab,
				});
			}
			
			if (nav) {
				// 更新上导航
				let navCurrent = state.navCurrent;
				
				navCurrent = {
					...navCurrent,
					...nav,
				};
				
				commit('updateHomePageNavState', {
					name: 'navCurrent',
					value: navCurrent,
				});
			}
		},
    },
}
