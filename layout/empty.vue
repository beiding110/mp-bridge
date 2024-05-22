<template>
	<view class="layout-empty">
		<slot></slot>
		
		<my-msg></my-msg>
		
		<!-- #ifdef H5 -->
		<my-cnzz></my-cnzz>
		<!-- #endif -->
	</view>
</template>

<script>
	export default {
		props: {
			
		},
		methods: {
			
		}
	};
</script>

<style scoped lang="scss">
	.layout-empty{
		height: 100%;
	}
</style>