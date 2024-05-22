<template>
	<view class="my-form-item-group">
		<view class="group-title" :class="subtitlePosition">
			<view class="title">
				{{title}}
			</view>
			
			<view class="subtitle">
				{{subtitle}}
			</view>
		</view>
		
		<view class="group-body">
			<slot></slot>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			title: {
				type: String,
				default: '',
			},
			subtitle: {
				type: String,
				default: '',
			},
			subtitlePosition: {
				type: String,
				default: 'right', // bottom
			},
		},
		data() {
			return {
				
			}
		},
		methods: {
			
		},
		mounted() {
			console.log(this.$parent.$options.name)
		},
	}
</script>

<style scoped lang="scss">
	.my-form-item-group{
		display: flex;
		flex-direction: column;
		
		.group-title{
			display: flex;
			padding: 12px 16px;
			
			&.right{
				align-items: center;
				
				.subtitle{
					margin-left: 15px;
				}
			}
			
			&.bottom{
				flex-direction: column;
				justify-content: center;
				
				.subtitle{
					margin-top: 10px;
				}
			}
			
			.title{
				font-size: 14px;
				color: #303030;
				font-weight: bold;
				line-height: 1em;
			}
			
			.subtitle{
				font-size: 12px;
				color: #b8b8b8;
				line-height: 1em;
			}
		}
		
		.group-body{
			background: white;
		}
	}
</style>