<template>
	<movable-area class="stage" :class="[mapTheme]">
		<movable-view 
		class="view"
		direction="all" 
		:x="mapOffset.x"
		:y="mapOffset.y"
		:scale="true"
		:scale-min="0.5"
		:scale-max="1"
		:scale-value="mapScale"
		:style="{width: 'auto', height: 'auto', padding: `${mapBorderSize}px`}"
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
				
				<Car :to="currentPoint.id"></Car>
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
	import Car from './car';

	import data from '../../data/data.js';
	
	var sysInfo = uni.getSystemInfoSync(),
		winH = sysInfo.windowHeight, // 屏幕高
		winW = sysInfo.windowWidth; // 屏幕宽
		
	const SCALE_NUM = 0.18;
	const BORDER_SIZE = 200; // 和view的padding值对应

	export default {
		components: {
			MapCom,
			PointCom,
			Car,
		},
		props: {

		},
		data() {
			return {
				data,

				mapTheme: 'day',
				
				pointSize: 200,
				mapSize: 6460 * SCALE_NUM,
				mapBorderSize: 200,
			};
		},
		computed: {
			...mapState(['currentPoint', 'mapX', 'mapY', 'mapScale']),
			mapOffset() {
				var x = -1 * this.currentPoint.point.position[0],
					y = -1 * this.currentPoint.point.position[1],
					deviationH = winH / 3, // 高度偏移
					deviationW = winW / 2; // 宽度偏移
				
				return {
					x: (x - (this.pointSize / 2) - this.mapBorderSize) * this.mapScale + deviationW,
					y: (y - this.mapBorderSize) * this.mapScale + deviationH,
				};
			},
			pointsData() {
				return this.data.filter(item => !item.disabled);
			}
		},
		methods: {
			...mapMutations(['updateCurrentPoint', 'updateMapPos', 'updateMapScale']),
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
				this.updateMapPos({
					x: 0,
					y: 0,
				});
			},
			dragChangeHandler(e) {
				var {x, y} = e.detail;
				
				// 更新拖动位置
				this.updateMapPos({
					x,
					y,
				});
			},
			scaleChangeHandler(e) {
				var {scale} = e.detail;
				
				// this.updateMapScale(scale);
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
		transition: all .3s;
		
		&.day {
			background-color: #BFD7A5;
		}
		
		&.night {
			background-color: #022950;
		}
		
		& .view{
			
		}
	}
</style>