<template>
	<view 
	class="btn-select"
	:class="{scrollable}"
	>
		<view class="scroll-warpper">
			<view
			class="item"
			v-for="(item, index) in columns"
			:key="index"
			:class="{active: isSelected(item)}"
			@click="clickHandler(item)"
			>
				{{item[reProps.label]}}
			</view>
		</view>
	</view>
</template>

<script>
	import MIXIN_MODEL from '@/mixins/model.js';
	
	export default {
		mixins: [MIXIN_MODEL,],
		props: {
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
			scrollable: {
				type: Boolean,
				default: false,
			},
			multiple: {
				type: Boolean,
				default: false,
			},
			modelStr: {
				type: Boolean,
				default: true,
			},
			strSpliter: {
				type: String,
				default: ',',
			},
		},
		data() {
			return {
				columns: [],
			};
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
			modelArr: {
				get() {
					var model = this.model;
					
					if (this.multiple) {
						
						if (this.modelStr) {
							if (this.showAll && model === '') {
								return [''];
							}
							
							return model ? model.split(this.strSpliter) : [];
						}
						
						return model ? model : [];
					}
					
					return false;
				},
				set(val) {
					if (!this.multiple) {
						return;
					}
					
					if (this.modelStr) {
						this.model = val.join(this.strSpliter);
						
						return;
					}
					
					this.model = val;
				},
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
						
						this.columns = data;
					});
				} else {
					var data = [...this.data];
					
					if (this.showAll) {
						data.unshift({
							[this.reProps.value]: '',
							[this.reProps.label]: '全部',
						});
					}
					this.columns = data;
				}
			},
			isSelected(item) {
				var value = item[this.props.value];
				
				if (this.multiple) {					
					var index = this.modelArr.findIndex(col => {
						return col === value;
					});
					
					return index > -1;
				}
				
				return value === this.model;
			},
			clickHandler(item) {
				var isSel = this.isSelected(item);
				
				if (isSel) {
					// 已被选中，此次应清除选中
					
					this.setAsNoSel(item);
				} else {
					// 未被选中，此次应设为选中
					
					this.setAsSel(item);
				}
			},
			// 设为选中
			setAsSel(item) {
				var value = item[this.props.value],
					modelArr = this.modelArr;
				
				if (this.multiple) {
					if (
						this.showAll 
						&& (
							(
								// 从"全部"选到有值
								modelArr.length === 1
								&& !modelArr[0]
							)
							// 从有值选到"全部"
							|| value === ''
						)
					) {
						this.modelArr = [value];
						return;
					}
					
					modelArr.push(value);
					
					this.modelArr = modelArr;
				} else {
					this.model = value;
				}
			},
			// 设为未选中
			setAsNoSel(item) {
				var modelArr = this.modelArr;
					
				if (this.multiple) {
					var index = modelArr.findIndex(val => {
						return val === item[this.props.value];
					});
					
					if (index < 0) {
						return;
					}
					
					modelArr.splice(index, 1);
					this.modelArr = modelArr;
				} else {
					this.model = '';
				}
			},
		},
		mounted() {
			this.queryData();
		},
	}
</script>

<style scoped lang="scss">
	.btn-select{
		display: flex;
		
		&.scrollable{
			display: block;
			overflow: hidden;
			overflow-x: auto;
			
			.scroll-warpper{
				display: block;
				white-space: nowrap;
				
				.item{
					display: inline-block;
				}
			}
		}
		
		.scroll-warpper{
			display: flex;
			flex-wrap: wrap;
			
			.item{
				padding: 6px;
				margin-right: 2px;
				line-height: 1em;
				
				&.active{
					color: #3b68ff;
					background-color: #d3ddff;
				}
			}
		}
	}
</style>