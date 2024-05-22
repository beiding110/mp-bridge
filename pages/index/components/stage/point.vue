<template>
	<view 
	class="point" 
	:style="{
		width: `${size}px`,
		height: `${size}px`,
		backgroundImage: `url(${img})`,
		backgroundSize: `${size}px auto`,
		left: `${position[0]}px`,
		top: `${position[1]}px`,
	}"
	>
		<Pop 
			:name="detail.name" 
			:img="detail.img" 
			:time="detail.time" 
			:context="detail.context"
		></Pop>
	</view>
</template>

<script>
	import Pop from './pop';

	export default {
		components: {
			Pop,
		},
		props: {
			size: {
				type: Number,
				default: 500,
			},
			img: {
				type: String,
				default: '/static/images/points/zhao-zhou-qiao.png',
			},
			position: {
				type: Array,
				default: () => [0, 0],
			},
			detail: {
				type: Object,
				default: () => ({}),
			},
		},
		data() {
			return {

			};
		},
		computed: {
			
		},
		methods: {

		},
		mounted() {

		},
	}
</script>

<style scoped lang="scss">
	.point {
		position: absolute;
		background-repeat: no-repeat;
		background-position: center center;
	}
</style>