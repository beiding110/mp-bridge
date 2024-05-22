<template>
	<u-action-sheet
		title="选择获取文件方式" 
		:actions="actionSheetList" 
		:show="showController"
		closeOnClickAction
		closeOnClickOverlay
		:round="4"
		cancelText="取消"
		@close="close"
		@select="selectHandler"
	></u-action-sheet>
</template>

<script>
	export default {
		props: {
			
		},
		data() {
			return {
				showController: false,
				
				actionSheetList: [
					{
						name: '拍照',
						type: 'camera',
					},
					{
						name: '相册',
						type: 'album',
					},
					// #ifdef H5
					{
						name: '文件管理器',
						type: 'fileExploer'
					},
					// #endif
					// #ifdef MP-WEIXIN
					{
						name: '微信聊天记录',
						type: 'chat'
					},
					// #endif
				],
				
				actionHandlerList: {
					// 照相
					camera: () => {
						// #ifdef H5
						uni.chooseImage({
							count: 1,
							sizeType: ['original'],
							sourceType: ['camera'],
							success: (tempFilePaths) => {
								this.onFileSelect(tempFilePaths);
							},
							fail: (err) => {
								if (/cancel/.test(err.errMsg)) {
									return;
								}
								
								this.showMsgBox(err.errMsg);
							},
						});
						// #endif
						
						// #ifdef MP-WEIXIN
						uni.chooseMedia({
							count: 1,
							sizeType: ['original'],
							sourceType: ['camera'],
							success: (tempFilePaths) => {
								this.onFileSelect(tempFilePaths);
							},
							fail: (err) => {
								if (/cancel/.test(err.errMsg)) {
									return;
								}
								
								this.showMsgBox(err.errMsg);
							},
						});
						// #endif
					},
					// 相册
					album: () => {
						// #ifdef H5
						uni.chooseImage({
							count: 1,
							sizeType: ['original'],
							sourceType: ['album'],
							success: (tempFilePaths) => {
								this.onFileSelect(tempFilePaths);
							},
							fail: (err) => {
								if (/cancel/.test(err.errMsg)) {
									return;
								}
								
								this.showMsgBox(err.errMsg);
							},
						});
						// #endif
						
						// #ifdef MP-WEIXIN
						uni.chooseMedia({
							count: 1,
							sizeType: ['original'],
							sourceType: ['album'],
							success: (tempFilePaths) => {
								this.onFileSelect(tempFilePaths);
							},
							fail: (err) => {
								if (/cancel/.test(err.errMsg)) {
									return;
								}
								
								this.showMsgBox(err.errMsg);
							},
						});
						// #endif
					},
					// 文件浏览器
					fileExploer: () => {
						uni.chooseFile({
							count: 1,
							success: (tempFilePaths) => {
								this.onFileSelect(tempFilePaths);
							},
							fail: (err) => {
								if (/cancel/.test(err.errMsg)) {
									return;
								}
								
								this.showMsgBox(err.errMsg);
							},
						})
					},
					// 聊天记录
					chat: () => {
						wx.chooseMessageFile({
							count: 1,
							success: (tempFilePaths) => {
								this.onFileSelect(tempFilePaths);
							},
							fail: (err) => {
								this.showMsgBox(err.errMsg);
							},
						});
					},
				},
			}
		},
		methods: {
			// 打开actionsheet
			open() {
				this.showController = true;
			},
			// 关闭actionsheet
			close() {
				this.showController = false;
			},
			
			// 选中文件获取方式
			selectHandler(item) {				
				var {type} = item,
					handler = this.actionHandlerList[type];
				
				handler && handler();
				
				this.close();
			},
			
			onFileSelect({tempFiles}) {
				var file = tempFiles[0];
				
				this.$emit('change', file);
			},
		},
		mounted() {
			
		},
	}
</script>

<style scoped lang="scss">
	
</style>