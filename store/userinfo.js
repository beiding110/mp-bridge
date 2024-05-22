import Vue from 'vue';

import { getToken, removeToken, } from '@/assets/js/token';

var data = uni.getStorageSync('userinfo');

export default {
    state: {
		data,
	},
    getters: {
		// 获取登录状态
		isLogin(state, getters) {
			var token = getToken(),
				nickName = getters.getNickname;
			
			if (
				nickName 
				/* #ifdef MP-WEIXIN */
				&& /SERIAL_CODE/.test(token)
				/* #endif */
			) {
				return true;
			}
			
			return false;
		},
		// 获取登录名，即手机号
        getNickname(state) {
			var data = state.data;
			
			if (!data) {
				return '';
			}
			
			return data.mobile;
		},
    },
    mutations: {
		updateUserInfoState(state, {name, value}) {
			state[name] = value;
		},
		// 更新data数据
		updateUserInfoData(state, data) {
			state.data = data;
			
			uni.setStorageSync('userinfo', data);
		},
		// 移除data数据
		clearUserInfoData(state) {
			state.data = false;
			
			uni.setStorageSync('userinfo', '');
		},
    },
    actions: {
		queryUserInfo({commit}, cb) {
			Vue.prototype.$get('/web/userlogin/userinfo.json', data => {
				commit('updateUserInfoData', data);
				
				cb && cb(data);
			});
		},
		logoutHandler({commit}, cb) {
			Vue.prototype.$post(`/web/userlogin/logout.json`, data => {
				commit('clearUserInfoData');
				
				removeToken();
				
				cb && cb();
			});
		},
    },
}
