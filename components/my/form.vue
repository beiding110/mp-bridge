<template>
	<view 
	class="my-form"
	:class="{full}"
	:style="{backgroundColor: bgColor,}"
	>
		<view class="area-form">
			<view class="scroll-warpper">
				<u--form
				ref="form"
				:model="model"
				:rules="rules"
				:labelWidth="labelWidth"
				:labelPosition="labelPosition"
				>
					<slot></slot>
				</u--form>
			</view>
			
			<view class="u-safe-bottom u-safe-area-inset-bottom"></view>
		</view>
		
		<view 
		v-if="full"
		class="area-btn"
		>
			<slot name="btn" :submit="submit">
				<u-button
					:text="btnText" 
					:icon="btnIcon" 
					:type="btnType"
					@click="submit"
				></u-button>
			</slot>
			
			<view class="u-safe-bottom u-safe-area-inset-bottom"></view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "u-form",
		// 假装自己是u-form,让form-item从这里取到参数，wxmp中会用到
		options: {
			// 解决微信小程序中::v-deep样式无法穿透的问题
			styleIsolation: 'shared',
		},
		props: {
			model: {
				type: Object,
				default: () => ({}),
			},
			rules: {
				type: Object,
				default: () => ({}),
			},
			labelWidth: {
				type: [Number, String],
				default: 'auto',
			},
			labelPosition: {
				type: String,
				default: 'left',
			},
			labelAlign: {
				type: String,
				default: 'left',
			},
			labelStyle: {
				type: Object,
				default: () => ({}),
			},
			errorType: {
				type: String,
				default: 'message',
			},
			bgColor: {
				type: String,
				default: '',
			},
			action: {
				type: String,
				default: '',
			},
			// 提交成功后返回上一页
			autoBack: {
				type: Boolean,
				default: true,
			},
			// 满页表单
			full: {
				type: Boolean,
				default: true,
			},
			btnIcon: {
				type: String,
				default: 'checkmark-circle',
			},
			btnText: {
				type: String,
				default: '提交',
			},
			btnType: {
				type: String,
				default: 'primary',
			},
		},
		data() {
			return {
				
			};
		},
		methods: {
			setMpData() {
				if (
					!this.$refs.form.children.length 
					&& this.children
				) {
					this.$refs.form.children = this.children;
				}
			},
			// 自定义校验时被调起，校验部分字段
			validateField(value, callback) {
				// #ifdef MP-WEIXIN
				this.setMpData()
				// #endif
				
				return this.$refs.form.validateField(value, callback);
			},
			
			submit() {
				// #ifdef MP-WEIXIN
				this.setMpData()
				// #endif
				
				if (!Object.keys(this.rules).length) {
					// 没有设置rules时,直接提交
					this.send();
					
					return;
				}
				
				this.$refs.form.validate().then(res => {
					this.send();
				}).catch(errors => {
					uni.$u.toast('请完成表单填写');
				});
			},
			send() {
				if (!this.action) {
					this.$emit('submit');
				} else {
					this.$post(this.action, this.model, data => {
						this.$emit('submit');
						
						if (this.autoBack) {
							uni.navigateBack();
						}
					});
				}
			},
		},
		created() {
			this.children = []
		},
		mounted() {
			this.$refs.form.setRules(this.rules)
		},
	}
</script>

<style scoped lang="scss">
	.my-form{
		display: flex;
		flex-direction: column;
		
		::v-deep{			
			.uni-input-placeholder{
				font-size: 12px;
			}
			
			.u-form-item{
				margin-left: 16px;
				margin-right: 16px;
				
				.u-form-item__body__left__content__label{
					font-weight: bold;
				}
				
				.u-form-item__body__right, 
				.u-form-item__body__right__content,
				.u-form-item__body__right__content__slot {
					overflow: hidden;
				}
			}
		}
		
		&.full{
			height: 100%;
			overflow: hidden;
			position: relative;
			
			& > .area-form{
				height: 100%;
				overflow: hidden;
				overflow-y: auto;
				
				& > .scroll-warpper{
					// #ifdef H5
					padding-bottom: (26px + 38px + 10px);
					// #endif
					
					// #ifndef H5
					padding-bottom: (14px + 38px + 10px);
					// #endif
				}
			}
			
			& > .area-btn{
				width: 100%;
				position: absolute;
				left: 0;
				bottom: 0;
				box-sizing: border-box;
				z-index: 2;
				
				// #ifdef H5
				padding: 0 14px 26px;
				// #endif
				
				// #ifndef H5
				padding: 0 14px 14px;
				// #endif
			}
		}
	}
</style>