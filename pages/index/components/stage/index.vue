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
						:ref="item.id"
						:key="index" 
						:img="item.point.img"
						:size="pointSize"
						:position="item.point.position"
						:detail="item.detail" 
						:badge="currentPoint.id === item.id"
						@click="pointClickHandler(item)"
					></PointCom>
				</template>
				
				<Car :to="currentPoint.id" @arrive="carArriveHandler"></Car>
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
	import TRANSFORM from '../../data/transform.js';
	
	var sysInfo = uni.getSystemInfoSync(),
		winH = sysInfo.windowHeight, // 屏幕高
		winW = sysInfo.windowWidth; // 屏幕宽
		
	const { MAP_SIZE, POINT_SIZE, SCALE_NUM, MAP_BORDER_SIZE } = TRANSFORM;

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
				
				pointSize: POINT_SIZE,
				mapSize: MAP_SIZE * SCALE_NUM,
				mapBorderSize: MAP_BORDER_SIZE,
			};
		},
		computed: {
			...mapState(['currentPoint', 'mapX', 'mapY', 'mapScale']),
			mapOffset() {
				var x = -1 * this.currentPoint?.point?.position[0],
					y = -1 * this.currentPoint?.point?.position[1],
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
		watch: {
			currentPoint(value) {
				let {
						detail,
					} = value, 
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
			},
		},
		methods: {
			...mapMutations(['updateCurrentPoint', 'updateMapPos', 'updateMapScale']),
			// 点击景点
			pointClickHandler(item) {				
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
			carArriveHandler(id) {
				setTimeout(() => {
					this.$refs[id][0].openPop();
				}, 300);
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