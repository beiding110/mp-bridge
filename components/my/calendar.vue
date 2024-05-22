<template>
	<view class="my-calendar">
		<view 
		class="input-group"
		:class="{daterange: daterange}"
		@click="openHandler"
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
		
		<u-calendar 
			:show="showController"
			:mode="daterange ? 'range' : 'single'"
			:minDate="minDate"
			:maxDate="maxDate"
			monthNum="3"
			@confirm="confirmHandler"
			@close="closeHandler"
		></u-calendar>
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
				showController: false,
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
			}
		},
		methods: {
			openHandler() {
				this.showController = true;
			},
			closeHandler() {
				this.showController = false;
			},
			confirmHandler(e) {
				var first = e[0],
					last = e[e.length - 1];
				
				if (this.daterange) {
					// 范围
					this.model = [first, last];
				} else {
					// 单选
					
					this.model = first;
				}
				
				
				this.closeHandler();
			},
		},
		mounted() {
			
		},
	}
</script>

<style scoped lang="scss">
	.my-calendar{
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