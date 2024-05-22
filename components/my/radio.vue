<template>
	<view 
	class="my-radio"
	>
		<u-radio-group 
		v-model="model" 
		:placement="placement"
		:shape="shape"
		@change="changeHandler"
		>
			<u-radio
				v-for="(item, index) in list"
				:key="index"
				:label="item[props.label]" 
				:name="item[props.value]"
			></u-radio>
		</u-radio-group>
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
				default: 'circle',
			},
		},
		data() {
			return {
				list: [],
			};
		},
		computed: {
			model: {
				get() {
					return this.value;
				},
				set(val) {
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
	.my-radio{
		display: flex;
		
		::v-deep{
			.u-radio-group--column{				
				.u-radio{					
					& + .u-radio{
						margin-top: 10px;
					}
				}
			}
			
			.u-radio-group--row{
				.u-radio{
					margin-right: 10px;
				}
			}
		}
	}
</style>