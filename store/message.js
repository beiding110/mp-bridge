/**
 * @param {Object} key state中controller名
 * 通过state中controller名获取mutations中方法名
 */
function getMutationsNameByState(key) {
	var keyInState = key.replace('Controller', ''),
		fWord = keyInState.slice(0 ,1).toUpperCase();
		
	keyInState = fWord + keyInState.slice(1);
	
	var mutationName = `update${keyInState}`;
	
	return mutationName;
}

export default {
    state: {
		showMsgBoxController: false,
		showMsgController: false,
		showConfirmController: false,
		
		lock: false, // 锁住,不弹第二次
		
		waiting: [],
		
		title: '',
		content: '',
		type: '',
		confirm: null,
		cancel: null,
	},
    getters: {
        
    },
    mutations: {
		updateShowMsgBox(state, val) {
			state.showMsgBoxController = val
		},
		updateShowMsg(state, val) {
			state.showMsgController = val;
		},
		updateShowConfirm(state, val) {
			state.showConfirmController = val;
		},
		
		updateLock(state, val) {
			state.lock = val;
		},
		
		updateWaiting(state, {method, data}) {
			var fn = state.waiting[method];
			
			if (!fn) {
				return;
			}
			
			state.waiting[method](data);
		},
		
		updateTitle(state, val) {
			state.tiele = val;
		},
		updateContent(state, val) {
			state.content = val;
		},
		updateType(state, val) {
			state.type = val;
		},
		updateConfirm(state, val) {
			state.confirm = val;
		},
		updateCancel(state, val) {
			state.cancel = val;
		},
    },
    actions: {
		openMsg({state, commit, dispatch}, setting) {
			if (setting) {
				// 往列队中插入一个数据
				
				var {controller, content, confirm, cancel,} = setting;
				
				if (state.waiting.every(item => {
					return !(
						item.controller === controller
						&& item.content === content
					)
				})) {
					// 去除重复的弹框
					
					commit('updateWaiting', {
						method: 'push',
						data: {
							controller,
							content,
							confirm,
							cancel,
						},
					});
				}
			}
			
			if (state.lock) {
				return;
			}
			
			commit('updateLock', true);
			
			// 弹出列队中第一个
			var firstInWaiting = state.waiting[0],
				{controller} = firstInWaiting,
				mutationName = getMutationsNameByState(controller);
				
			// 设置参数
			commit('updateTitle', firstInWaiting.title || '');
			commit('updateContent', firstInWaiting.content || '');
			commit('updateType', firstInWaiting.type || '');
			commit('updateConfirm', firstInWaiting.confirm);
			commit('updateCancel', firstInWaiting.cancel);
			
			// 弹出
			commit(mutationName, true);
			
			// 弹出后移除第一个
			commit('updateWaiting', {
				method: 'shift'
			});
		},
		closeMsg({state, commit, dispatch}, obj) {
			commit('updateLock', false);
			
			var {controller, cancel} = obj;
			
			if (!cancel) {
				state.confirm && state.confirm();
			} else {
				state.cancel && state.cancel();
			}
			
			var mutationName = getMutationsNameByState(controller);
			commit(mutationName, false);
			
			// 关闭时,如果列队中有待弹出的,则继续弹出
			if (state.waiting.length > 0) {
				setTimeout(() => {
					dispatch('openMsg');
				}, 300);
			}
		}
    },
}
