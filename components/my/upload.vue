<template>
	<view class="my-upload">		
		<view class="actions">
			<view class="btn-item">
				<slot>
					<u-button
						:text="uploadText" 
						icon="arrow-upward" 
						type="primary"
						:loadingText="loadingText"
						:loading="loadingController"
						:size="size"
						@click="triggerHandler"
					></u-button>
				</slot>
			</view>
		</view>
		
		<view 
		v-if="fileList.length"
		class="preview"
		>
			<Preview 
				:data="fileList"
				@delete="deleteHandler"
			></Preview>
		</view>
		
		<select-file
			ref="selectFile"
			@change="fileChangeHandler"
		></select-file>
	</view>
</template>

<script>
	import resCheck from '@/plugins/request/util/resCheck.js';
	import CONFIG from '@/config/index.js';
	
	import Preview from './upload/preview.vue';
	import SelectFile from './upload/select-file.vue';
	
	var {filePathHead} = CONFIG;
	
	export default {
		components: {
			Preview,
			SelectFile,
		},
		props: {
			size: {
				type: String,
				default: 'small',
			},
			// 文件主键
			fileguid: {
				type: String,
				default: '',
			},
			// 文件数量，不大于9
			filenum: {
				type: Number,
				default: 1,
			},
			// 点击上传按钮,选择文件前
			beforeSelect: {
				type: [Function, Boolean,],
				default: false,
			},
		},
		data() {
			return {
				actions: {
					upload: `${filePathHead}/standalonfile/upload/mobile/common.json`,
					list: `_${filePathHead}/standalonfile/operate/getlist.json`,
					del: `_${filePathHead}/standalonfile/operate/delete.json`,
				},
				
				fileList: [],
				
				loadingText: '',
				loadingController: false,
			};
		},
		computed: {
			exist() {
				return this.fileList.length > 0;
			},
			uploadText() {
				if (
					this.filenum === 1 
					&& this.fileList.length > 0
				) {
					return '重新上传';
				}
				
				return '上传';
			},
		},
		watch: {
			fileguid: {
				handler(val) {
					if (!val) {
						return;
					}
					
					this.queryList();
				},
				immediate: true,
			},
		},
		methods: {
			// 弹出actionsheet，选择文件获取方式
			triggerHandler() {
				if (
					this.filenum === 1 
					&& this.fileList.length === 1
				) {
					this.deleteHandler({
						file: this.fileList[0],
						index: 0,
					})
					
					return;
				}
				
				this.beforeSelect && this.beforeSelect();
				
				this.$refs.selectFile.open();
			},
			// 选中文件触发
			fileChangeHandler(file) {				
				// if (this.filenum > 1) {
				// 	this.fileList.push({
				// 		...file,
				// 		status: 'uploading',
				// 	});
				// } else {
				// 	this.fileList = [{
				// 		...file,
				// 		status: 'uploading',
				// 	}];
				// }
				
				this.$emit('change', file);
				
				this.uploadHandler(file);
			},
			// 请求文件列表
			queryList() {
				this.loadingText = '获取文件中';
				this.loadingController = true;
				
				this.$get(this.actions.list, {
					fileguid: this.fileguid,
				}, data => {
					this.fileList = data || [];
					
					this.loadingController = false;
				});
			},
			// 上传文件
			uploadHandler(file) {
				this.loadingText = '上传中';
				this.loadingController = true;
				
				uni.uploadFile({
					url: this.actions.upload,
					filePath: file.path || file.tempFilePath,
					name: this.fileguid,
					header: {},
					formData: {
						fileguid: this.fileguid,
						single: (this.filenum & 1),
					},
					success: res => {
						var {data} = res,
							json = JSON.parse(data);
							
						resCheck(json, {}, () => {
							this.fileList = [
								...this.fileList,
								...json.tdata,
							];
							
							// this.queryList();
							
							this.$emit('success', json.tdata[0]);
						});
					},
					fail: res => {
						var {msg} = res;
						
						this.showMsgBox(msg || JSON.stringify(res));
					},
					complete: () => {
						this.loadingController = false;
					},
				});
			},
			deleteHandler({file, index}) {
				this.loadingText = '删除文件中';
				this.loadingController = true;
				
				this.$post(this.actions.del, {
					rowguid: file.rowguid,
				}, data => {
					this.fileList.splice(index, 1);
					
					this.$emit('del');
					
					this.loadingController = false;
				});
			},
		},
		mounted() {
			
		},
	}
</script>

<style scoped lang="scss">
	.my-upload{
		.actions{
			display: flex;
			
			.btn-item{
				// width: 
			}
		}
		
		.preview{
			margin-top: 10px;
		}
	}
</style>