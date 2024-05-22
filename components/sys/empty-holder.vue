<template>
	<view
	class="empty-placeholder"
	>
		<image
			class="empty-icon"
			src="/static/images/icon/icon-list-empty.png"
			mode="widthFix"
		></image>
		
		<view class="empty-text">
			{{text}}
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			text: {
				type: String,
				default: '',
			},
		},
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
	.empty-placeholder{
		text-align: center;
		
		
		.empty-icon{
			width: 156px;
		}
		
		.empty-text{
			font-size: 14px;
			margin-top: 40px;
			color: #7d7d7d;
			text-align: center;
		}
	}
</style>