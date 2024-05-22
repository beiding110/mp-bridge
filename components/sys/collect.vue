<template>
	<view 
	class="collect-star"
	@click.native.stop="clickHandler"
	>
		<u-icon
			:name="iconName"
			:size="size"
			:color="iconColor"
		></u-icon>
		
		<slot></slot>
	</view>
</template>

<script>
	import Chain from '@/assets/js/Chain.js';
	
	export default {
		props: {
			defaultVal: {
				type: Boolean,
				default: false,
			},
			size: {
				type: [String, Number],
				default: 24,
			},
			action: {
				type: String,
				default: '',
			},
			// 通用参数
			data: {
				type: Object,
				default: () => ({}),
			},
			// 手动取data中值的方法
			dataFilter: {
				type: [Function, Boolean,],
				default: false,
			},
			// 设为激活的参数
			activeData: {
				type: Object,
				default: () => ({}),
			},
			// 设为非激活的参数
			inactiveData: {
				type: Object,
				default: () => ({}),
			},
			icon: {
				type: Array,
				default: () => ['star-fill', 'star'],
			},
			color: {
				type: Array,
				default: () => ['#FF9D00', '#C4C4C4'],
			},
			msg: {
				type: Array,
				default: () => ['操作', '取消'],
			},
			// 震动
			vibrate: {
				type: Boolean,
				default: true,
			},
			// 取消前文字提示
			beforeInactiveText: {
				type: [Boolean, String],
				default: false,
			},
		},
		data() {
			return {
				innerModel: false,
			}
		},
		computed: {
			iconName() {
				return this.innerModel ? this.icon[0] : this.icon[1];
			},
			iconColor() {
				return this.innerModel ? this.color[0] : this.color[1];
			},
		},
		watch: {
			defaultVal: {
				handler(val) {
					this.innerModel = val;
				},
				immediate: true,
			}
		},
		methods: {
			clickHandler() {
				if (!this.action) {
					this.innerModel = !this.innerModel;
					return;
				}
				
				var data = {
						...this.data,
					},
					msg = '成功';
					
				// 如果设置了dataFilter则使用其进行取值
				if (this.data && this.dataFilter) {
					data = this.dataFilter(this.data);
				}
				
				var chain = new Chain();
				
				if (!this.innerModel) {
					// 设为激活
					data = {
						...data,
						...this.activeData,
					};
					
					msg = this.msg[0] + msg;
				} else {
					// 取消激活
					data = {
						...data,
						...this.inactiveData,
					};
					
					msg = this.msg[1] + msg;
					
					if (this.beforeInactiveText) {
						// 取消前文字提示
						chain.link(next => {
							this.showConfirm(this.beforeInactiveText, () => {
								next()
							});
						});
					}
				}
				
				chain.link(() => {
					this.$post(this.action, data, data => {
						// this.showMsg(msg, 'success');
						this.innerModel = !this.innerModel;
						
						if (this.vibrate) {
							uni.vibrateShort({
								success () {
									console.log('list vibrateShort success');
								},
							});
						}
						
						this.$emit('change', this.innerModel);
					});
				}).run();
			},
		},
		mounted() {
			
		},
	}
</script>

<style scoped lang="scss">
	.collect-star{
		display: flex;
		align-items: center;
	}
</style>