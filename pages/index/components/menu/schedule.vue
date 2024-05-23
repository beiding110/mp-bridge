<template>
	<view class="schedule">
		<view v-for="(item, index) in data" class="row">
			<view class="col label">{{timeText(item.detail.time)}}</view>
			<view class="col value">{{item.detail.name}}</view>
		</view>
	</view>
</template>

<script>
	import data from '../data.js';
	
	export default {
		props: {},
		data() {
			return {
				data,
			};
		},
		methods: {
			timeText(arr) {
				if (arr.length === 1) {
					return arr[0];
				}
			
				return `${arr[0]} - ${arr[1]}`;
			},
		},
		mounted() {
			
		},
	}
</script>

<style scoped lang="scss">
	.schedule{
		box-sizing: border-box;
		
		.row {
			display: flex;
			
			.col {
				padding: 6px 8px;
				background: #67AB61;
				border-radius: 6px;;
				color: white;
				
				&.label{
					width: 7em;
					background: #65C35D;
				}
				
				&.value{
					flex: 1;
					margin-left: 6px;
				}
			}
			
			& + .row {
				margin-top: 6px;
			}
		}
	}
</style>