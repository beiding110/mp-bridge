<template>
	<movable-area class="stage">
		<movable-view 
		direction="all" 
		:scale="true"
		:style="{width: 'auto', height: 'auto'}"
		>
			<MapCom :position="[90, 0]" :theme="mapTheme">
				<template v-for="(item, index) in data">
					<PointCom 
						:key="index" 
						 :img="item.point.img"
						 :position="item.point.position"
						:detail="item.detail" 
						@click.native="pointClickHandler(item)"
					></PointCom>
				</template>
			</MapCom>
		</movable-view>
	</movable-area>
</template>

<script>
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

		},
		methods: {
			// 点击景点
			pointClickHandler(item) {
				let {
					detail
				} = item, {
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