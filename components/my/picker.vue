<template>
	<view class="my-picker">
		<view 
		v-if="$slots"
		class="slot" 
		@click="pickerShow"
		>
			<slot></slot>
		</view>
		
		<u-picker
			:show="show" 
			:columns="columns"
			:keyName="reProps.label"
			immediateChange
			@confirm="confirmHandler"
			@cancel="cancelHandler"
		></u-picker>
	</view>
</template>

<script>
	import MIXIN_2WAY from '@/mixins/2way.js';
	import MIXIN_MODEL from '@/mixins/model.js';
	
	export default {
		mixins: [MIXIN_2WAY, MIXIN_MODEL,],
		props: {
			value: {
				type: String,
				default: '',
			},
			props: {
				type: Object,
				default: () => ({
					label: 'label',
					value: 'value',
				}),
			},
			data: {
				type: Array,
				default: () => [],
			},
			url: {
				type: String,
				default: '',
			},
			showAll: {
				type: Boolean,
				default: false,
			},
		},
		data() {
			return {
				show: false,
				
				columns: [],
			}
		},
		computed: {
			reProps() {
				const def = {
					label: 'label',
					value: 'value',
				};
				
				if (!this.props) {
					return def;
				}
				
				return {
					...def,
					...this.props,
				};
			},
		},
		watch: {
			data: {
				handler (n, o) {
					if (n !== o) {
						this.queryData();
					}
				},
				deep: true,
			},
		},
		methods: {
			/**
			 * 弹出
			 */
			pickerShow() {
				this.show = true;
			},
			/**
			 * 自动请求数据/同步数据
			 */
			queryData() {
				if (this.url) {
					this.$get(this.url, data => {
						if (this.showAll) {
							data.unshift({
								[this.reProps.value]: '',
								[this.reProps.label]: '全部',
							});
						}
						
						this.columns = [data];
					});
				} else {
					var data = [...this.data];
					
					if (this.showAll) {
						data.unshift({
							[this.reProps.value]: '',
							[this.reProps.label]: '全部',
						});
					}
					this.columns = [data];
				}
			},
			/**
			 * 点击提交按钮
			 * @param {Object} e confirm事件，参考uView
			 */
			confirmHandler(e) {				
				var {value} = e,
					first = value[0],
					model = first[this.reProps.value];
				
				this.twoWayHandler(first);
				
				this.model = model;
				
				this.$emit('select', first);
				
				this.cancelHandler();
			},
			/**
			 * 关闭
			 */
			cancelHandler() {
				// this.$emit('update:show', false);
				this.show = false;
			},
		},
		mounted() {
			this.queryData();
		},
	}
</script>

<style scoped lang="scss">
	.my-picker{
		display: inline-block;
		max-width: 100%;
		
		.slot{
			max-width: 100%;
		}
	}
</style>