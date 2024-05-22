<!-- 
弹窗组件
由于非h5页面没有window、document等对象，不能动态加载dom
每个页面 需要且仅需要 “手动引用一次msg组件”
一般这个msg组件存在于layout中
这就代表非页面的其他组件，在使用弹框功能时，会自动调用layout中的弹窗组件
-->

<template>
	<view class="msg">
		<u-modal 
			:show="showMsgBoxController" 
			:content="content"
			asyncClose
			@confirm="confirm('showMsgBoxController')" 
		></u-modal>
		
		<u-notify 
			ref="notify"
		></u-notify>
		
		<u-toast 
			ref="toast"
		></u-toast>
		
		<u-modal
			:show="showConfirmController" 
			:content="content"
			asyncClose
			showCancelButton
			@confirm="confirm('showConfirmController')" 
			@cancel="confirm('showConfirmController', true)"
		></u-modal>
	</view>
</template>

<script>
	import {mapState} from 'vuex';
	
	export default {
		data() {
			return {
				
			};
		},
		computed: {
			...mapState({
				showMsgBoxController: state => state.message.showMsgBoxController,
				showMsgController: state => state.message.showMsgController,
				showConfirmController: state => state.message.showConfirmController,
				
				content: state => state.message.content,
				title: state => state.message.title,
				type: state => state.message.type,
			}),
		},
		watch: {
			showMsgController: {
				handler (val) {
					if (!val) {
						return;
					}
					
					var settings = {
						type: this.type,
						message: this.content,
						top: .01,
						complete: () => {
							this.confirm('showMsgController');
						},
					};
					
					// if (this.$refs.notify) {
					// 	this.$refs.notify.show(settings);
					// } else {
					// 	this.$nextTick(() => {
					// 		this.$refs.notify.show(settings);
					// 	});
					// }
					
					if (this.$refs.toast) {
						this.$refs.toast.show(settings);
					} else {
						this.$nextTick(() => {
							this.$refs.toast.show(settings);
						});
					}
				},
				immediate: true,
			},
		},
		methods: {
			/**
			 * 按钮点击
			 * @param {Object} controllerName 将被赋值的controller名称
			 * @param {Object} cancel 是否为取消按钮
			 */
			confirm(controllerName, cancel) {
				this.$store.dispatch('closeMsg', {
					controller: controllerName,
					cancel,
				});
			},
		},
		mounted() {
			
		},
	};
</script>

<style scoped lang="scss">
	.msg{
		position: absolute;
		width: 0;
		height: 0;
	}
</style>