<template>
	<view 
	class="my-chart"
	:style="{height: reHeight}"
	>
		<qiun-data-charts
			:type="type"
			:opts="opts"
			:chartData="chartData"
			<!-- #ifdef MP-WEIXIN -->
			:canvasId="canvasId"
			canvas2d
			inScrollView
			<!-- #endif -->
		/>
	</view>
</template>

<script>
	export default {
		props: {
			type: {
				type: String,
				default: 'column',
			},
			opts: {
				type: Object,
				default: () => ({}),
			},
			chartData: {
				type: Object,
				default: () => ({}),
			},
			height: {
				type: [String, Number],
				default: 220,
			},
		},
		data() {
			return {
				canvasId: '',
			}
		},
		computed: {
			reOpts() {
				var def = {
					
				};
				
				return {
					...def,
					...this.opts,
				};
			},
			reHeight() {
				var height = this.height;
				
				if (
					typeof height === 'string' 
					&& /px/.test(height)
				) {
					return height;
				}
				
				return `${height}px`;
			},
		},
		methods: {
			getHash() {
				const LENGTH = 32,
					CHARTS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
					
				var uuid = [];
				
				for(let i = 0; i < LENGTH; i++) {
					let item;
					
					if (i === 0) {
						item = 'C';
					} else {
						let random = Math.round(Math.random() * CHARTS.length);
						
						item = CHARTS[random];
					}
					
					uuid.push(item)
				}
				
				return uuid.join('');
			},
		},
		created() {
			this.canvasId = this.getHash();
		},
		mounted() {
			
		},
	}
</script>

<style scoped lang="scss">
	.my-chart {
		width: 100%;
	}
</style>