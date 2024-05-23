<template>
	<view class="pop" :class="{active: model}" @click="openHandler">
		<view class="header">
			<view class="left">
				<Speech 
					v-if="speech" 
					ref="speech"
					:src="speech"
					:disabled="!model"
				></Speech>
			</view>
			<view class="right">
				<u-icon name="close" @click.native.stop="closeHandler"></u-icon>
			</view>
		</view>
		<view class="body">
			<view class="title">
				<view v-if="img" class="img">
					<image :src="img" mode="aspectFit"></image>
				</view>
				<view class="desc">
					<view class="name">
						{{name}}
					</view>

					<view class="time">
						{{timeText}}
					</view>
				</view>
			</view>

			<view class="context" v-html="context">

			</view>
		</view>
		<view class="footer"></view>
	</view>
</template>

<script>
	import Speech from './speech';
	
	export default {
		components: {
			Speech,
		},
		props: {
			name: {
				type: String,
				default: '-',
			},
			img: {
				type: String,
				default: '/static/images/shoots/zhao-zhou-qiao.png',
			},
			time: {
				type: Array,
				default: () => ['9:30', '11:00'],
			},
			context: {
				type: String,
				default: '-',
			},
			speech: {
				type: String,
				default: '',
			},
		},
		data() {
			return {
				model: false,
			}
		},
		computed: {
			timeText() {
				if (this.time.length === 1) {
					return this.time[0];
				}

				return `${this.time[0]} - ${this.time[1]}`;
			},
		},
		methods: {
			openHandler() {
				if (this.model) {
					return;
				}

				this.model = true;
			},
			closeHandler() {
				try {
					this.$refs.speech.stop();
				} catch(e) {};
				
				this.model = false;
			},
		},
		mounted() {

		},
	}
</script>

<style scoped lang="scss">
	.pop {
		width: 100%;
		height: 100%;
		position: absolute;
		border-radius: 50%;
		transition: all .3s;
		opacity: 0;
		padding: 20px;
		box-sizing: border-box;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		overflow: hidden;

		&.active {
			position: absolute;
			width: 350px;
			height: auto;
			border-radius: 8px;
			background: #FEF5EA;
			border: 4px dashed #FBA756;
			opacity: 1;

			.header {
				opacity: 1;
			}

			.body {
				opacity: 1;
			}

			.footer {
				opacity: 1;
			}
		}

		.header {
			display: flex;
			padding-bottom: 20px;
			opacity: 0;

			.left {
				flex: 1;
			}
		}

		.body {
			opacity: 0;

			.title {
				display: flex;
				align-items: center;

				.img {
					width: 50%;

					image {
						width: 100%;
						height: 100px;
					}
				}

				.desc {
					flex: 1;
					margin-left: 10px;

					.name {
						display: inline-block;
						color: #FBA756;
						font-size: 24px;
						font-weight: bold;
						background: #38521C;
						border: 4px solid #FBA756;
						border-radius: 8px;
						padding: .5em;
					}

					.time {
						color: #FBA756;
						font-size: 20px;
						margin-top: 10px;
						font-weight: bold;
					}
				}
			}

			.context {
				color: #3E3B39;
				margin-top: 10px;
				line-height: 1.8em;
			}
		}

		.footer {
			opacity: 0;
		}
	}
</style>