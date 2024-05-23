<template>
	<view class="schedule">
		<view 
		v-for="(item, index) in data" 
		class="row"
		@click="rowClickHandler(item)"
		>
			<view class="col label">{{timeText(item.detail.time)}}</view>
			<view class="col value">
				{{item.detail.name}}
				
				<view v-if="currentPoint.id === item.id" class="badge"></view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations,
	} from 'vuex';
	
	import data from '../data.js';
	
	export default {
		props: {},
		data() {
			return {
				data,
			};
		},
		computed: {
			...mapState(['currentPoint']),
		},
		methods: {
			...mapMutations(['updateCurrentPoint']),
			timeText(arr) {
				if (arr.length === 1) {
					return arr[0];
				}
			
				return `${arr[0]} - ${arr[1]}`;
			},
			rowClickHandler(row) {
				// 切换badge
				this.updateCurrentPoint(row);
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
					position: relative;
					
					.badge{
						width: 10px;
						height: 10px;
						background: red;
						border-radius: 50%;
						position: absolute;
						right: -3px;
						top: -3px;
					}
				}
			}
			
			& + .row {
				margin-top: 6px;
			}
		}
	}
</style>