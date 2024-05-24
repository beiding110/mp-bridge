<template>
	<movable-area class="stage">
		<movable-view 
		direction="all" 
		:x="dragX ? dragX : mapOffset.x"
		:y="dragY ? dragY : mapOffset.y"
		:scale="true"
		:scale-min="0.5"
		:scale-max="1"
		:style="{width: 'auto', height: 'auto'}"
		@change="dragChangeHandler"
		@scale="scaleChangeHandler"
		>
			<MapCom :theme="mapTheme" :size="mapSize">
				<template v-for="(item, index) in pointsData">
					<PointCom 
						:key="index" 
						:img="item.point.img"
						:size="pointSize"
						:position="item.point.position"
						:detail="item.detail" 
						:badge="currentPoint.id === item.id"
						@click="pointClickHandler(item)"
					></PointCom>
				</template>
			</MapCom>
		</movable-view>
	</movable-area>
</template>

<script>
	import {
		mapState,
		mapMutations,
	} from 'vuex';
	
	import MapCom from './map';
	import PointCom from './point';

	import data from '../data.js';
	
	var sysInfo = uni.getSystemInfoSync(),
		winH = sysInfo.windowHeight, // 屏幕高
		winW = sysInfo.windowWidth; // 屏幕宽
		
	const SCALE_NUM = 0.25;

	export default {
		components: {
			MapCom,
			PointCom,
		},
		props: {

		},
		data() {
			return {
				data,

				mapTheme: 'day',
				
				pointSize: 300,
				mapSize: 6460 * SCALE_NUM,
				
				scale: 1,
			};
		},
		computed: {
			...mapState(['currentPoint', 'dragX', 'dragY']),
			mapOffset() {
				var x = -1 * this.currentPoint.point.position[0],
					y = -1 * this.currentPoint.point.position[1],
					deviationH = winH / 3, // 高度偏移
					deviationW = winW / 2; // 宽度偏移
				
				return {
					x: (x - (this.pointSize / 2)) * this.scale + deviationW,
					y: y * this.scale + deviationH,
				};
			},
			pointsData() {
				return this.data.filter(item => !item.disabled);
			}
		},
		methods: {
			...mapMutations(['updateCurrentPoint', 'updateDragPos']),
			// 点击景点
			pointClickHandler(item) {
				let {
						detail,
						id,
					} = item, 
					{
						time
					} = detail,
					[starttime] = time,
					timeHour = Number(starttime.split(':')[0]);

				// 切换主题	
				if (timeHour >= 17 || timeHour <= 7) {
					// 夜间主题
					this.mapTheme = 'night';
				} else {
					// 日间主题
					this.mapTheme = 'day';
				}
				
				// 切换badge
				this.updateCurrentPoint(item);
				
				// 清空拖拽位置
				this.updateDragPos({
					x: 0,
					y: 0,
				});
			},
			dragChangeHandler(e) {
				var {x, y} = e.detail;
				
				// 更新拖动位置
				this.updateDragPos({
					x,
					y,
				});
			},
			scaleChangeHandler(e) {
				var {scale} = e.detail;
				
				this.scale = scale;
			},
		},
		mounted() {
			
		},
	}
</script>

<style scoped lang="scss">
	.stage {
		width: 100vw;
		height: 100vh;
		position: relative;
		overflow: hidden;
	}
</style>