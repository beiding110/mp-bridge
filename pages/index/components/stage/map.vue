<template>
	<view 
	class="map" 
	:style="{
		width: `${size}px`,
		height: `${size}px`,
		left: `-${position[0]}px`,
		top: `-${position[1]}px`,
	}" 
	>
		<image 
			class="layer day" 
			:class="{active: theme === 'day'}" 
			:src="day"
			:style="{
				width: `${size}px`,
				height: `${size}px`,
			}"
		></image>
		<image 
			class="layer night" 
			:class="{active: theme === 'night'}" 
			:src="night"
			:style="{
				width: `${size}px`,
				height: `${size}px`,
			}"
		></image>

		<slot></slot>
	</view>
</template>

<script>
	import buildUrl from '../../../../assets/js/buildUrl.js';

	import Map from './map';

	export default {
		components: {
			Map,
		},
		props: {
			size: {
				type: Number,
				default: 2000,
			},
			day: {
				type: String,
				default: buildUrl('/static/web/images/map/day.jpg'),
			},
			night: {
				type: String,
				default: buildUrl('/static/web/images/map/night.jpg'),
			},
			position: {
				type: Array,
				default: () => [0, 0],
			},
			theme: {
				type: String,
				default: 'day',
			},
		},
		data() {
			return {
				
			};
		},
		computed: {
			
		},
		methods: {
			onPanmove(e) {
				// console.log(e.deltaX, e.deltaY);
				console.log(e);
			},
			onPinchmove(e) {
				console.log(e);
			},
		},
		mounted() {
			
		},
	}
</script>

<style scoped lang="scss">
	.map {
		position: relative;

		.layer {
			position: absolute;
			left: 0;
			top: 0;
			
			mask-image: radial-gradient(closest-side at 50% 50%, white 90%, transparent 100%);
			mask-repeat: no-repeat; 
			mask-position: center;
			mask-size: 100%;
		}
		
		.day {
			opacity: 0;
			transition: all .3s;
		
			&.active {
				opacity: 1;
			}
		}

		.night {
			opacity: 0;
			transition: all .3s;

			&.active {
				opacity: 1;
			}
		}
	}
</style>