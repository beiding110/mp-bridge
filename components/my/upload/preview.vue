<template>
	<view class="preview">
		<view
		    class="u-upload__wrap__preview"
		    v-for="(item, index) in lists"
		    :key="index"
		>
			<image
			    v-if="item.isImage || (item.type && item.type === 'image')"
			    :src="item[srcKey]"
			    mode="aspectFill"
			    class="u-upload__wrap__preview__image"
			    @tap="onPreviewImage(item)"
				:style="[{
					width: $u.addUnit(size),
					height: $u.addUnit(size)
				}]"
			/>
			<view
			    v-else
			    class="u-upload__wrap__preview__other"
			>
				<u-icon
				    color="#80CBF9"
				    size="26"
				    :name="item.isVideo || (item.type && item.type === 'video') ? 'movie' : 'folder'"
				></u-icon>
				<text class="u-upload__wrap__preview__other__text">{{item.isVideo || (item.type && item.type === 'video') ? '视频' : '文件'}}</text>
			</view>
			<view
			    class="u-upload__status"
			    v-if="item.status === 'uploading' || item.status === 'failed'"
			>
				<view class="u-upload__status__icon">
					<u-icon
					    v-if="item.status === 'failed'"
					    name="close-circle"
					    color="#ffffff"
					    size="25"
					/>
					<u-loading-icon
					    size="22"
					    mode="circle"
					    color="#ffffff"
					    v-else
					/>
				</view>
				<text
				    v-if="item.message"
				    class="u-upload__status__message"
				>{{ item.message }}</text>
			</view>
			<view
			    class="u-upload__deletable"
			    @tap.stop="deleteItem(index)"
			>
				<view class="u-upload__deletable__icon">
					<u-icon
					    name="close"
					    color="#ffffff"
					    size="10"
					></u-icon>
				</view>
			</view>
			<view
			    class="u-upload__success"
			    v-if="item.status === 'success'"
			>
				<!-- #ifdef APP-NVUE -->
				<image
				    :src="successIcon"
				    class="u-upload__success__icon"
				></image>
				<!-- #endif -->
				<!-- #ifndef APP-NVUE -->
				<view class="u-upload__success__icon">
					<u-icon
					    name="checkmark"
					    color="#ffffff"
					    size="12"
					></u-icon>
				</view>
				<!-- #endif -->
			</view>
		</view>
	</view>
</template>

<script>
	import CONFIG from '@/config/index.js';
	
	var {filePathHead} = CONFIG;
	
	export default {
		props: {
			data: {
				type: Array,
				default: () => [],
			},
			srcKey: {
				type: String,
				default: 'filesavepath',
			},
			size: {
				type: Number,
				default: 80,
			},
		},
		data() {
			return {
				lists: [],
			}
		},
		computed: {
			
		},
		watch: {
			// 监听文件列表的变化，重新整理内部数据
			data: {
				immediate: true,
				handler() {
					this.formatFileList()
				}
			},
		},
		methods: {
			formatFileList() {
				const {
					data = [],
				} = this;
				
				const lists = data.map((item) => {
					var filepath = this.urlParse(item[this.srcKey])
					
					if (filePathHead) {
						filepath = `${filePathHead}${filepath}`
					}
					
					return {
						...item,
						isImage: uni.$u.test.image(item[this.srcKey]),
						isVideo: uni.$u.test.video(item[this.srcKey]),
						[this.srcKey]: filepath,
					}
				});
				
				this.lists = lists
			},
			// 预览图片
			onPreviewImage(item) {
				if (!item.isImage || !this.previewFullImage) return
				uni.previewImage({
					// 先filter找出为图片的item，再返回filter结果中的图片url
					urls: this.lists.filter((item) => uni.$u.test.image(item[this.srcKey])).map((item) => item[this.srcKey]),
					current: item[this.srcKey],
					fail() {
						uni.$u.toast('预览图片失败')
					},
				});
			},
			deleteItem(index) {
				this.$emit(
					'delete',
					{
						file: this.data[index],
						index,
					}
				);
			},
			urlParse(url) {
				var res = '';
				
				res = url.replace(/\\+/g, '/');
				
				return res;
			},
		},
		mounted() {
			
		},
	}
</script>

<style scoped lang="scss">
	$u-upload-preview-border-radius: 2px !default;
	$u-upload-preview-margin: 0 8px 8px 0 !default;
	$u-upload-image-width:80px !default;
	$u-upload-image-height:$u-upload-image-width;
	$u-upload-other-bgColor: rgb(242, 242, 242) !default;
	$u-upload-other-flex:1 !default;
	$u-upload-text-font-size:11px !default;
	$u-upload-text-color:$u-tips-color !default;
	$u-upload-text-margin-top:2px !default;
	$u-upload-deletable-right:0 !default;
	$u-upload-deletable-top:0 !default;
	$u-upload-deletable-bgColor:rgb(55, 55, 55) !default;
	$u-upload-deletable-height:14px !default;
	$u-upload-deletable-width:$u-upload-deletable-height;
	$u-upload-deletable-boder-bottom-left-radius:100px !default;
	$u-upload-deletable-zIndex:3 !default;
	$u-upload-success-bottom:0 !default;
	$u-upload-success-right:0 !default;
	$u-upload-success-border-style:solid !default;
	$u-upload-success-border-top-color:transparent !default;
	$u-upload-success-border-left-color:transparent !default;
	$u-upload-success-border-bottom-color: $u-success !default;
	$u-upload-success-border-right-color:$u-upload-success-border-bottom-color;
	$u-upload-success-border-width:9px !default;
	$u-upload-icon-top:0px !default;
	$u-upload-icon-right:0px !default;
	$u-upload-icon-h5-top:1px !default;
	$u-upload-icon-h5-right:0 !default;
	$u-upload-icon-width:16px !default;
	$u-upload-icon-height:$u-upload-icon-width;
	$u-upload-success-icon-bottom:-10px !default;
	$u-upload-success-icon-right:-10px !default;
	$u-upload-status-right:0 !default;
	$u-upload-status-left:0 !default;
	$u-upload-status-bottom:0 !default;
	$u-upload-status-top:0 !default;
	$u-upload-status-bgColor:rgba(0, 0, 0, 0.5) !default;
	$u-upload-status-icon-Zindex:1 !default;
	$u-upload-message-font-size:12px !default;
	$u-upload-message-color:#FFFFFF !default;
	$u-upload-message-margin-top:5px !default;
	$u-upload-button-width:80px !default;
	$u-upload-button-height:$u-upload-button-width;
	$u-upload-button-bgColor:rgb(244, 245, 247) !default;
	$u-upload-button-border-radius:2px !default;
	$u-upload-botton-margin: 0 8px 8px 0 !default;
	$u-upload-text-font-size:11px !default;
	$u-upload-text-color:$u-tips-color !default;
	$u-upload-text-margin-top: 2px !default;
	$u-upload-hover-bgColor:rgb(230, 231, 233) !default;
	$u-upload-disabled-opacity:.5 !default;
	
	.preview{
		@include flex;
		flex-wrap: wrap;
	}
	
	.u-upload {
		@include flex(column);
		flex: 1;
	
		&__wrap {
			@include flex;
			flex-wrap: wrap;
			flex: 1;
	
			&__preview {
				border-radius: $u-upload-preview-border-radius;
				margin: $u-upload-preview-margin;
				position: relative;
				overflow: hidden;
				@include flex;
	
				&__image {
					width: $u-upload-image-width;
					height: $u-upload-image-height;
				}
	
				&__other {
					width: $u-upload-image-width;
					height: $u-upload-image-height;
					background-color: $u-upload-other-bgColor;
					flex: $u-upload-other-flex;
					@include flex(column);
					justify-content: center;
					align-items: center;
	
					&__text {
						font-size: $u-upload-text-font-size;
						color: $u-upload-text-color;
						margin-top: $u-upload-text-margin-top;
					}
				}
			}
		}
	
		&__deletable {
			position: absolute;
			top: $u-upload-deletable-top;
			right: $u-upload-deletable-right;
			background-color: $u-upload-deletable-bgColor;
			height: $u-upload-deletable-height;
			width: $u-upload-deletable-width;
			@include flex;
			border-bottom-left-radius: $u-upload-deletable-boder-bottom-left-radius;
			align-items: center;
			justify-content: center;
			z-index: $u-upload-deletable-zIndex;
	
			&__icon {
				position: absolute;
				transform: scale(0.7);
				top: $u-upload-icon-top;
				right: $u-upload-icon-right;
				/* #ifdef H5 */
				top: $u-upload-icon-h5-top;
				right: $u-upload-icon-h5-right;
				/* #endif */
			}
		}
	
		&__success {
			position: absolute;
			bottom: $u-upload-success-bottom;
			right: $u-upload-success-right;
			@include flex;
			// 由于weex(nvue)为阿里巴巴的KPI(部门业绩考核)的laji产物，不支持css绘制三角形
			// 所以在nvue下使用图片，非nvue下使用css实现
			/* #ifndef APP-NVUE */
			border-style: $u-upload-success-border-style;
			border-top-color: $u-upload-success-border-top-color;
			border-left-color: $u-upload-success-border-left-color;
			border-bottom-color: $u-upload-success-border-bottom-color;
			border-right-color: $u-upload-success-border-right-color;
			border-width: $u-upload-success-border-width;
			align-items: center;
			justify-content: center;
			/* #endif */
	
			&__icon {
				/* #ifndef APP-NVUE */
				position: absolute;
				transform: scale(0.7);
				bottom: $u-upload-success-icon-bottom;
				right: $u-upload-success-icon-right;
				/* #endif */
				/* #ifdef APP-NVUE */
				width: $u-upload-icon-width;
				height: $u-upload-icon-height;
				/* #endif */
			}
		}
	
		&__status {
			position: absolute;
			top: $u-upload-status-top;
			bottom: $u-upload-status-bottom;
			left: $u-upload-status-left;
			right: $u-upload-status-right;
			background-color: $u-upload-status-bgColor;
			@include flex(column);
			align-items: center;
			justify-content: center;
	
			&__icon {
				position: relative;
				z-index: $u-upload-status-icon-Zindex;
			}
	
			&__message {
				font-size: $u-upload-message-font-size;
				color: $u-upload-message-color;
				margin-top: $u-upload-message-margin-top;
			}
		}
	}
</style>