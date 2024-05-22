<template>
	<view class="data-time-picker">
		<u--input
			v-model="value"
			disabled
			:placeholder="placeholder"
			:border="border"
			disabledColor="white"
			@click.native.stop="open"
		></u--input>
						
		<u-datetime-picker
			ref="datetimePicker"
			v-model="model"
			:show="show"
			:mode="mode"
			@confirm="confirmHandler"
			@cancel="cancelHandler"
		></u-datetime-picker>
	</view>
</template>

<script>
	import MIXIN_MODEL from '@/mixins/model.js';
	
	export default {
		mixins: [MIXIN_MODEL,],
		props: {
			placeholder: {
				type: String,
				default: '请选择时间',
			},
			mode: {
				type: String,
				default: 'datetime',
			},
			border: {
				type: String,
				default: 'surround',
			},
			format: {
				type: String,
				default: 'yyyy-MM-dd HH:mm',
			},
		},
		data() {
			return {
				show: false,
			};
		},
		computed: {
			model: {
				get() {
					var val = this.value;
					
					if (!val) {
						return new Date().getTime();
					}
					
					if (typeof val === 'string') {
						return new Date(val).getTime();
					}
					
					if (val instanceof Date) {
						return val.getTime();
					}
					
					return val;
				},
				set(val) {
					if (!val) {
						this.$emit('input', '');
						return;
					}
					
					var date = new Date(val);
					
					date = date.pattern(this.format);
					
					this.$emit('input', date);
				},
			},
		},
		methods: {
			open() {
				this.show = true;
			},
			close() {
				this.show = false;
			},
			confirmHandler(e) {
				this.close();
			},
			cancelHandler() {
				this.model = '';
				
				this.close();
			},
		},
		mounted() {
			
		},
	}
</script>

<style scoped lang="scss">
	
</style>