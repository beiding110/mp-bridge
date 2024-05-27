<template>
	<view 
	class="point" 
	:style="{
		left: `${position[0]}px`,
		top: `${position[1]}px`,
	}"
	>
		<image :src="img" mode="widthFix" :style="{width: `${size}px`}"></image>
	
		<view v-if="badge" class="badge"></view>
		
		<Pop 
			ref="pop"
			:name="detail.name" 
			:img="detail.img" 
			:time="detail.time" 
			:context="detail.context"
			:speech="detail.speech"
			@click="$emit('click')"
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
				default: '',
			},
			position: {
				type: Array,
				default: () => [0, 0],
			},
			detail: {
				type: Object,
				default: () => ({}),
			},
			// 是否显示badge
			badge: {
				type: Boolean,
				default: false,
			},
		},
		data() {
			return {

			};
		},
		computed: {
			
		},
		methods: {
			openPop() {
				this.$refs.pop.show();
			},
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
		
		.badge{
			width: 20px;
			height: 20px;
			border-radius: 50%;
			background: red;
			position: absolute;
			right: 0;
			top: 0;
			animation: shine 2s linear infinite;
		}
	}
	
	@keyframes shine {
		0% {
			opacity: 1;
		}
		
		50% {
			opacity: .2;
		}
		
		100% {
			opacity: 1;
		}
	}
</style>