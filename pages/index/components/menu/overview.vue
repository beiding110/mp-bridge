<template>
	<view class="overview">
		<view class="title">
			路线概览
		</view>
		
		<Schedule @close="$emit('close')"></Schedule>
	</view>
</template>

<script>
	import Schedule from './schedule';
	
	export default {
		components: {
			Schedule,
		},
		props: {},
		data() {
			return {
				
			}
		},
		methods: {
			
		},
		mounted() {
			
		},
	}
</script>

<style scoped lang="scss">
	.overview{
		padding: 8px;
		overflow: auto;
		
		.title{
			font-size: 20px;
			font-weight: bold;
			letter-spacing: .1em;
			text-align: center;
			margin-bottom: 8px;
			background: #188A0D;
			color: white;
			border-radius: 6px;
			padding: .3em;
		}
	}
</style>