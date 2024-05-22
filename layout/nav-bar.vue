<template>
	<view class="layout-nav-bar">
		<view 
		v-if="navbar"
		class="nav-bar"
		>
			<u-navbar
				:title="title"
				autoBack
				:bgColor="navBgColor"
				:fixed="false"
			>
				<slot name="left" slot="left"></slot>
				<slot name="right" slot="right"></slot>
			</u-navbar>
		</view>
		
		<view class="layout-content">
			<slot></slot>
		</view>
		
		<view 
		v-if="$slots.foot"
		class="foot-bar"
		>
			<slot name="foot"></slot>
			
			<view class="u-safe-bottom u-safe-area-inset-bottom"></view>
		</view>
		
		<my-msg></my-msg>
		
		<!-- #ifdef H5 -->
		<my-cnzz></my-cnzz>
		<!-- #endif -->
	</view>
</template>

<script>
	export default {
		props: {
			navbar: {
				type: Boolean,
				default: true,
			},
			title: {
				type: String,
				default: '',
			},
			navBgColor: {
				type: String,
				default: '#ffffff',
			},
		},
		methods: {
			
		}
	};
</script>

<style scoped lang="scss">
	.layout-nav-bar{
		display: flex;
		flex-direction: column;
		height: 100%;
		
		.layout-content{
			flex: 1;
			overflow: auto;
		}
		
		.foot-bar{
			background: white;
		}
	}
</style>