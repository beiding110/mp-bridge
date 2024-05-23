<template>
	<movable-area class="stage">
		<movable-view 
		direction="all" 
		:x="-590"
		:y="-1448"
		:scale="true"
		:scale-value="1"
		:scale-min="0.5"
		:scale-max="2"
		:style="{width: 'auto', height: 'auto'}"
		>
			<MapCom :theme="mapTheme">
				<template v-for="(item, index) in data">
					<PointCom 
						:key="index" 
						:img="item.point.img"
						:position="item.point.position"
						:detail="item.detail" 
						:badge="currentPoint === item.id"
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
			};
		},
		computed: {
			...mapState(['currentPoint']),
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
				this.updateCurrentPoint(id);
				
				console.log(this.currentPoint)
			},
		},
		mounted() {},
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