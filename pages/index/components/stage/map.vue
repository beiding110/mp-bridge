<template>
	<view class="map" :style="{
		width: `${size}px`,
		height: `${size}px`,
		left: `-${position[0]}px`,
		top: `-${position[1]}px`,
	}" @panmove="onPanmove" @pinchmove="onPinchmove">
		<view class="layer day" :style="{
			width: `${size}px`,
			height: `${size}px`,
			backgroundImage: `url(${day})`,
			backgroundSize: `${size}px ${size}px`,
		}"></view>
		<view class="layer night" :class="{active: theme === 'night'}" :style="{
			width: `${size}px`,
			height: `${size}px`,
			backgroundImage: `url(${night})`,
			backgroundSize: `${size}px ${size}px`,
		}"></view>

		<slot></slot>
	</view>
</template>

<script>
	import AnyTouch from 'any-touch';

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
				default: '/static/images/map/day.png',
			},
			night: {
				type: String,
				default: '/static/images/map/night.png',
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
			console.log(this.$el)
			const at = new AnyTouch(this.$el);
			//  destroy
			this.$on('hook:destroyed', () => {
				at.destroy();
			});
		},
	}
</script>

<style scoped lang="scss">
	.map {
		position: absolute;

		.layer {
			position: absolute;
			left: 0;
			top: 0;
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