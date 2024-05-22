<template>
	<view class="my-popup">
		<view 
		v-if="$slots.reference"
		class="reference"
		@click="openHandler"
		>
			<slot name="reference"></slot>
		</view>
		
		<u-popup 
		:show="show"
		:mode="mode"
		:customStyle="customStyle"
		@close="closeHandler"
		>
			<view class="content">
				<view class="status-bar">
					<uni-status-bar></uni-status-bar>
				</view>
				
				<view class="header">
					{{title}}
					
					<view 
					v-if="btnClose"
					class="btn-close"
					@click="closeHandler"
					>
						<u-icon
							name="close"
						></u-icon>
					</view>
				</view>
				
				<view class="body">
					<slot></slot>
				</view>
				
				<view class="footer">					
					<u-button 
						v-if="btnReset"
						type="default" 
						text="重置"
						@click="resetHandler"
					></u-button>
					
					<u-button
						v-if="btnSubmit"
						type="success" 
						text="确定"
						@click="submitHandler"
					></u-button>
					
					<slot 
						name="footer" 
						:resetHandler="resetHandler" 
						:submitHandler="submitHandler"
					></slot>
				</view>
				
				<view class="u-safe-bottom u-safe-area-inset-bottom"></view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import UniStatusBar from '@/uni_modules/uni-nav-bar/components/uni-nav-bar/uni-status-bar.vue';
	
	export default {
		options: {
			// 解决微信小程序中::v-deep样式无法穿透的问题
			styleIsolation: 'shared',
		},
		components: {
			UniStatusBar,
		},
		props: {
			// 弹出方向
			mode: {
				type: String,
				default: 'right',
			},
			// 用户自定义样式
			customStyle: {
				type: Object,
				default: () => ({
					width: '320px'
				}),
			},
			// 确定按钮
			btnSubmit: {
				type: Boolean,
				default: false,
			},
			// 重置按钮
			btnReset: {
				type: Boolean,
				default: false,
			},
			// 标题
			title: {
				type: String,
				default: '筛选',
			},
			// 关闭按钮
			btnClose: {
				type: Boolean,
				default: false,
			},
		},
		data() {
			return {
				show: false,
			}
		},
		methods: {
			/**
			 * 打开popup
			 */
			openHandler() {
				this.show = true;
			},
			/**
			 * 关闭popup
			 */
			closeHandler() {
				this.show = false;
			},
			/**
			 * 触发提交方法
			 */
			submitHandler() {
				this.$emit('submit');
				
				this.closeHandler();
			},
			/**
			 * 触发重置方法
			 */
			resetHandler() {
				this.$emit('reset');
				
				this.closeHandler();
			},
		},
		mounted() {
			
		},
	}
</script>

<style scoped lang="scss">
	.my-popup {
		::v-deep{
			.u-popup__content {
				height: 100%;
			}
		}
		
		.content {
			display: flex;
			flex-direction: column;
			height: 100%;
			box-sizing: border-box;
			
			.header{
				text-align: center;
				font-size: 16px;
				font-weight: bold;
				line-height: 1em;
				padding: 14px;
				
				.btn-close{
					// #ifndef MP-WEIXIN
					float: right;
					// #endif
					
					// #ifdef MP-WEIXIN
					float: left;
					// #endif
				}
			}
			
			.body {
				flex: 1;
				overflow: hidden auto;
			}
			
			.footer {
				display: flex;
			}
		}
	}
</style>