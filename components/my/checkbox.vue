<template>
	<view 
	class="my-checkbox"
	>
		<u-checkbox-group 
		v-model="model"
		:placement="placement"
		:shape="shape"
		@change="changeHandler"
		>
			<template v-if="singleCheckBox">
				<u-checkbox
					:label="label" 
					:name="trueLabel"
				></u-checkbox>
			</template>
			
			<template v-if="!singleCheckBox">
				<u-checkbox
					v-for="(item, index) in list"
					:key="index"
					:label="item[props.label]" 
					:name="item[props.value]"
				></u-checkbox>
			</template>
		</u-checkbox-group>
	</view>
</template>

<script>
	export default {
		options: {
			// 解决微信小程序中::v-deep样式无法穿透的问题
			styleIsolation: 'shared',
		},
		props: {
			value: {
				type: [String, Number, Boolean, Array],
				default: false,
			},
			data: {
				type: [Boolean, Array],
				default: false,
			},
			props: {
				type: Object,
				default() {
					return {
						value: 'value',
						label: 'label'
					};
				},
			},
			placement: {
				//布局方式 row column
				type: String,
				default: 'row',
			},
			shape: {
				type: String,
				default: 'square',
			},
			label: {
				type: String,
				default: '',
			},
			trueLabel: {
				type: [String, Number, Boolean],
				default: true,
			},
			falseLabel: {
				type: [String, Number, Boolean],
				default: false,
			},
			// 绑定数组时,使用字符串
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
				list: [],
			};
		},
		computed: {
			// 单checkbox组件
			singleCheckBox() {
				return !this.data;
			},
			model: {
				get() {
					if (this.singleCheckBox) {
						// 单个checkbox
						return [this.value];
					}
					
					if (this.modelStr) {
						// 绑定的字符串
						if (!this.value) {
							return [];
						}
						
						let value = this.value.split(this.strSpliter);
						
						return value;
					}
					
					return this.value || [];
				},
				set(val) {
					if (this.singleCheckBox) {
						// 单个checkbox
						let value = val[0] || this.falseLabel;
						
						this.$emit('input', value);
						
						return;
					}
					
					if (this.modelStr) {
						// 绑定的字符串
						let value = val.join(this.strSpliter);
						
						this.$emit('input', value);
						
						return;
					}
					
					this.$emit('input', val);
				},
			},
		},
		watch: {
			data: {
				handler(n, o) {
					if (n === o || !n) {
						return;
					}
					
					this.list = n;
				},
				deep: true,
				immediate: true,
			},
		},
		methods: {
			changeHandler(e) {
				this.$emit('change', e);
			},
		},
		mounted() {
			
		},
	}
</script>

<style scoped lang="scss">
	.my-checkbox{
		display: flex;
		
		::v-deep{
			.u-checkbox-group--column{				
				.u-checkbox{
					& + .u-checkbox{
						margin-top: 10px;
					}
				}
			}
			
			.u-checkbox-group--row{
				.u-checkbox{
					margin-right: 10px;
				}
			}
		}
	}
</style>