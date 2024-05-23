<template>
	<view class="menu">
		<view 
		class="btn" 
		:style="{
			top: $u.addUnit($u.sys().statusBarHeight + 10, 'px'),
		}"
		@click="openHandler"
		>
			<view class="line"></view>
			<view class="line"></view>
			<view class="line"></view>
		</view>
		
		<u-popup 
		class="popup"
		:show="popMenuShow" 
		mode="left" 
		:closeOnClickOverlay="true" 
		bgColor="#FEF5EA"
		:safeAreaInsetTop="true"
		@close="closeHandler"
		>
			<Overview></Overview>
		</u-popup>
	</view>
</template>

<script>
	import Overview from './overview';
	
	export default {
		components: {
			Overview,
		},
		props: {},
		data() {
			return {
				popMenuShow: false,
			};
		},
		methods: {
			openHandler() {
				this.popMenuShow = true;
			},
			closeHandler() {
				this.popMenuShow = false;
			},
		},
		mounted() {
			
		},
	}
</script>

<style scoped lang="scss">
	.menu {
		.btn {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			background: #FDF0E1;
			position: fixed;
			left: 10px;
			width: 30px;
			padding: 7px 6px;
			border-radius: 5px;
			box-sizing: border-box;
			
			.line {
				background: #F1916C;
				width: 100%;
				height: 3px;
				border-radius: 2px;
				
				& + .line {
					margin-top: 3px;
				}
			}
		}
		
		.popup{
			::v-deep {
				.u-popup__content{
					height: 100%;
				}
			}
		}
	}
</style>