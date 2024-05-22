<template>
	<view class="my-date-picker">
		<view 
		class="input-group"
		:class="{daterange: daterange}"
		@click="openHandler(1)"
		>
			<template v-if="daterange">
				<view class="input">
					<view 
					v-if="model[0] || startTime"
					class="value"
					>
						{{model[0] || startTime}}
					</view>
					<view 
					v-else
					class="placeholder"
					>
						{{placeholder[0]}}
					</view>
				</view>
				<view class="text">
					-
				</view>
				<view class="input">
					<view 
					v-if="model[1] || endTime"
					class="value"
					>
						{{model[1] || endTime}}
					</view>
					<view 
					v-else
					class="placeholder"
					>
						{{placeholder[1]}}
					</view>
				</view>
			</template>
			
			<template v-if="!daterange">
				<view class="input">
					<view 
					v-if="model"
					class="value"
					>
						{{model}}
					</view>
					<view 
					v-else
					class="placeholder"
					>
						{{placeholder}}
					</view>
				</view>
			</template>
		</view>
		
		<u-datetime-picker
			:show="showController1"
			mode="date"
			:minDate="modelMinDate"
			:maxDate="modelMaxDate"
			@confirm="confirmHandler"
			@cancel="cancelHandler(1)"
		></u-datetime-picker>
		
		<u-datetime-picker
			:show="showController2"
			mode="date"
			:minDate="modelMinDate2"
			:maxDate="modelMaxDate"
			@confirm="confirmHandler($event, 2)"
			@cancel="cancelHandler(2)"
		></u-datetime-picker>
	</view>
</template>

<script>
	import MIXIN_MODEL from '@/mixins/model.js';
	
	export default {
		mixins: [MIXIN_MODEL],
		props: {
			placeholder: {
				type: [Array, String],
				default: () => ['开始时间', '结束日期'],
			},
			daterange: {
				type: Boolean,
				default: false,
			},
			startTime: {
				type: String,
				default: '',
			},
			endTime: {
				type: String,
				default: '',
			},
			minDate: {
				type: [Number, String],
				default: 0,
			},
			maxDate: {
				type: [Number, String],
				default: 0,
			},
		},
		data() {
			return {
				showController1: false,
				showController2: false,
				
				today: new Date().getTime(),
				ty: 10 * 365 * 24 * 60 * 60 * 1000,
				
				innerRangeVal: [],
			};
		},
		computed: {
			model: {
				get() {
					if (this.value) {
						return this.value;
					}
					
					if (this.daterange) {
						return [];
					}
					
					return '';
				},
				set(val) {
					this.$emit('input', val);
					
					if (this.daterange) {
						this.$emit('update:startTime', val[0]);
						this.$emit('update:endTime', val[1]);
					}
				},
			},
			modelMinDate() {
				if (!this.minDate) {
					var today = this.today,
						min = today - this.ty;
					
					return min;
				}
				
				if (this.minDate === 'today') {
					return this.today;
				}
				
				var minDate = this.minDate;
				minDate = minDate.replace(/\-/g, '/');
				
				return new Date(minDate).getTime();
			},
			modelMinDate2() {
				var firstSelected = this.innerRangeVal[0];
				
				if (!firstSelected) {
					return this.modelMinDate;
				}
				
				return new Date(this.innerRangeVal[0]).getTime();
			},
			modelMaxDate() {
				if (!this.maxDate) {
					var today = this.today,
						max = today + this.ty;
					
					return max;
				}
				
				if (this.maxDate === 'today') {
					return this.today;
				}
				
				var maxDate = this.maxDate;
				maxDate = maxDate.replace(/\-/g, '/');
				
				return new Date(maxDate).getTime();
			},
			
		},
		methods: {
			openHandler(index = 1) {
				this[`showController${index}`] = true;
				
				if (this.daterange && index === 1) {
					this.innerRangeVal = [];
				}
			},
			closeHandler(index = 1) {
				this[`showController${index}`] = false;
			},
			confirmHandler(e, index = 1) {				
				var {value} = e,
					formatVal = new Date(value).pattern('yyyy-MM-dd');
				
				if (!this.daterange) {
					this.model = formatVal;
					
					this.closeHandler(1);
				} else {
					// 范围
					
					this.innerRangeVal.push(formatVal);
					
					if (index === 1) {
						this.closeHandler(1);
						this.openHandler(2);
					}
					
					if (index === 2) {
						this.model = this.innerRangeVal;
						this.closeHandler(2);
					}
				}
			},
			cancelHandler(index = 1) {
				this.closeHandler(index);
				
				if (index === 2) {
					// 第二步没有选择
					this.innerRangeVal = [];
				}
			},
		},
		mounted() {
			
		},
	}
</script>

<style scoped lang="scss">
	.my-date-picker{
		display: flex;
		
		.input-group{
			display: flex;
			
			&.daterange{
				.input{
					width: 100px;
				}
			}
			
			.input{
				width: 100%;
				text-align: center;
				
				.placeholder{
					color: #9d9d9d;
					font-size: 12px;
				}
				
				.value{
					
				}
			}
			
			.text{
				
			}
		}
	}
</style>