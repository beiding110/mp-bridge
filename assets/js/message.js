import store from '@/store/index.js';

/**
 * @param {String} content 提示内容
 * @param {Funciton} confirm 点击确认后的回调
 */
export function showMsgBox(content, confirm) {
	store.dispatch('openMsg', {
		controller: 'showMsgBoxController',
		content,
		confirm,
	});
}

/**
 * @param {String} content 提示内容
 * @param {String} type 提示倾向
 */
export function showMsg(content, type) {
	store.dispatch('openMsg', {
		controller: 'showMsgController',
		content,
		type,
	});
}

/**
 * @param {String} content 提示内容
 * @param {Function} confirm 点击确认后的回调
 * @param {Function} cancel 点击取消后的回调
 */
export function showConfirm(content, confirm, cancel) {
	store.dispatch('openMsg', {
		controller: 'showConfirmController',
		content,
		confirm,
		cancel,
	});
}