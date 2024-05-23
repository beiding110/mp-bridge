<template>
	<movable-area class="stage">
		<movable-view 
		direction="all" 
		:x="mapOffset.x"
		:y="mapOffset.y"
		:scale="true"
		:scale-value="1"
		:scale-min="0.5"
		:scale-max="2"
		:style="{width: 'auto', height: 'auto'}"
		>
			<MapCom :theme="mapTheme" :size="mapSize">
				<template v-for="(item, index) in data">
					<PointCom 
						:key="index" 
						:img="item.point.img"
						:size="pointSize"
						:position="item.point.position"
						:detail="item.detail" 
						:badge="currentPoint.id === item.id"
						@click.native="pointClickHandler(item)"
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
				
				pointSize: 500,
				mapSize: 2000,
			};
		},
		computed: {
			...mapState(['currentPoint']),
			mapOffset() {
				var x = -1 * this.currentPoint.point.position[0],
					y = -1 * this.currentPoint.point.position[1],
					sysInfo = uni.getSystemInfoSync(),
					winH = sysInfo.windowHeight, // 屏幕高
					winW = sysInfo.windowWidth, // 屏幕宽
					deviationH = winH / 3, // 高度偏移
					deviationW = winW / 2; // 宽度偏移
				
				return {
					x: x + deviationW - (this.pointSize / 2),
					y: y + deviationH,
				};
			},
		},
		methods: {
			...mapMutations(['updateCurrentPoint']),
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