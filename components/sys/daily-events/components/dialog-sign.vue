<template>
	<dialog-model v-if="visible">
		<view class="dialog-sign">
			<view
				class="btn-close"
				@click="close"
			></view>
			
			<view class="head">
				<view class="banner">
					<view class="background-image">
						<u-image
							width="100%"
							height="68"
							src="/static/images/daily-events/signin-bg.png"
						/>
					</view>
					
					<view class="text">
						{{signTitle}}
					</view>
				</view>
			</view>

			<view class="body">
				<view 
				v-for="(item, index) in data"
				:key="index"
				class="item"
				:class="item.class"
				>
					<view class="title">
						<view class="index">
							{{index + 1}}
						</view>

						<view class="text">
							{{item.title}}
						</view>

						<view class="bar" v-if="item.type === 'full'">
							<view class="process">
								<u-line-progress 
									:percentage="item.percentage"
									height="4"
									:showText="false"
									:activeColor="$u.color.primary"
								></u-line-progress>
							</view>

							<view class="process-text">
								{{item.num}}
								/
								{{item.total}}
							</view>
						</view>
					</view>

					<view class="desc">
						{{item.desc}}
					</view>

					<view class="icon-get">
						<u-image
							width="40"
							height="40"
							:src="item.iconGet"
						/>
					</view>
				</view>
			</view>

			<view class="footer">
				<view 
				v-if="completedSettingInfo !== '1'"
				class="row"
				>
					<view class="text">
						{{settingInfoRule}}
					</view>
					
					<view class="btn">
						<u-button
						type="primary" 
						size="small" 
						@click="completeInfo"
						>
							补充信息
						</u-button>
					</view>
				</view>

				<view 
				v-if="inviteCodeRule"
				class="row"
				>
					<view class="text">
						{{inviteCodeRule.title}}
					</view>
					
					<view class="btn">
						<u-button
						type="primary" 
						size="small" 
						@click="shareCopyHandler"
						>
							复制邀请码
						</u-button>
					</view>
				</view>
			</view>
		</view>
	</dialog-model>
</template>

<script>
	import Chain from '@/assets/js/Chain.js';
	
	import dialogModel from './dialog-model';
	
	export default {
		components: {
			dialogModel,
		},
		props: {},
		data() {
			return {
				visible: false,
				onclose: null,
		
				signTitle: '', //签到标题
				data: [], //签到奖励列表
				completedSettingInfo: '1', //已完善信息标记
				settingInfoRule: '', //完成签到规则信息
				inviteCodeRule: '', //邀请码规则
		
				chain: null,
				questionnaireRules: null, // 问卷调查信息
			};
		},
		methods: {
			/**
			 * 初始化/绑定数据
			 */
			initData(data) {
				var {
						signTitle, //签到标题
						allRules, //签到规则信息
						completedSettingInfo, //完成签到标记
						settingInfoRule,  //完成签到规则信息
						inviteCodeRule, //邀请码规则
					} = data;
	
				this.signTitle = signTitle;
				this.data = allRules.map(item => {
					var className = [];
					
					item.get && className.push('active');
					item.disabled && className.push('disabled');
					className.push(item.type);
					
					if (item.type === 'full') {
						return {
							...item,
							iconGet: '/static/images/daily-events/signin-get.png',
							class: className,
							percentage: (item.num / item.total) * 100,
						};
					}

					return {
						...item,
						iconGet: '/static/images/daily-events/signin-today-get.png',
						class: className,
					};
				});
				this.completedSettingInfo = completedSettingInfo;
				this.settingInfoRule = settingInfoRule;
				this.inviteCodeRule = inviteCodeRule;
			},
			open(obj) {
				var {data, onclose} = obj;
	
				this.initData(data);
				
				this.onclose = onclose || function() {};
	
				this.signHandler();
				this.visible = true;
			},
			close() {
				var chain = new Chain();
	
				chain.link(next => {
					this.visible = false;
	
					next();
				});
	
				chain.link(next => {
					if (this.onclose) {
						this.onclose();
					}
	
					this.$emit('close');
				});
	
				chain.run();
			},
			signHandler() {
				this.$get(`/signin/signin.json`, data => {
					this.initData(data);
	
					this.questionnaryHandler(data);
				});
			},
			/**
			 * 检查调查问卷
			 */
			questionnaryHandler(data) {
				if (data.todayQuestionnaire) {
					// 已经提示过
					return;
				}
	
				this.questionnaireRules = data.questionnaireRules;
			},
			// 完善信息
			completeInfo() {
				this.goto('/pages/user/setting/info/info');
			},
			shareCopyHandler() {
				var text = this.inviteCodeRule.code;
				
				uni.setClipboardData({
					data: text,
					showToast: false,
					success: () => {
						this.showMsgBox(`已复制分享信息，请前往粘贴以分享`);
					},
					fail: () => {
						this.showMsgBox(`复制失败：${text}`);
					},
				});
			},
		},
		mounted() {
			
		},
	}
</script>

<style scoped lang="scss">
	.dialog-sign {
		width: 320px;
		background: white;
		border-radius: 6px;
		position: fixed;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		
		.btn-close{
			position: absolute;
			bottom: -42px;
			left: 50%;
			transform: translateX(-50%);
			width: 28px;
			height: 28px;
			border-radius: 50%;
			box-sizing: border-box;
			cursor: pointer;
			border: 1px solid white;
		
			&:before, &:after{
				content: '';
				display: bolck;
				width: 2px;
				height: 18px;
				background: white;
				position: absolute;
				left: 50%;
				top: 50%;
				border-radius: 1px;
			}
		
			&:before {
				transform: translate(-50%, -50%) rotate(-45deg);
			}
		
			&:after{
				transform: translate(-50%, -50%) rotate(45deg);
			}
		
			&:hover{
				background: #898c93;
			}
		}

		.head{
			position: relative;

			.banner{
				height: 68px;
				position: relative;
				border-top-left-radius: 6px;
				border-top-right-radius: 6px;
				overflow: hidden;
				
				.background-image{
					position: absolute;
					left: 0; 
					top: 0;
					width: 100%;
				}

				.text{
					width: 17em;
					color: #050070;
					font-size: 13px;
					line-height: 1.5em;
					padding: 12px;
					font-weight: bold;
				}
			}
		}

		.body{
			padding: 10px 10px 0;

			.item{
				padding: 10px;
				box-sizing: border-box;
				line-height: 1em;
				border-radius: 4px;
				border: solid 1px $u_primary;
				position: relative;

				.title{
					display: flex;
					align-items: center;

					.index{
						font-size: 10px;
						color: white;
						width: 12px;
						height: 12px;
						line-height: 12px;
						text-align: center;
						border-radius: 2px;
						background-color: $u_primary;
						margin-right: 8px;
					}

					.text{
						font-size: 12px;
						color: $u_primary;
						font-weight: bold;
					}

					.bar{
						display: flex;
						align-items: center;
						margin-left: 9px;

						.process{
							width: 82px;
						}

						.process-text{
							margin-left: 4px;
							font-size: 10px;
							color: #303030;
						}
					}
				}

				.desc{
					width: 232px;
					font-size: 12px;
					color: #131415;
					margin-top: 6px;
					line-height: 1.5em;
				}

				.icon-get{
					display: none;
					position: absolute;
					right: 8px;
					top: 18px;
					width: 40px;
					height: 40px;
				}

				&.active{
					border: none;
					background-image: linear-gradient(269deg, #8fa9ff 0%, #f6faff 100%);


					.icon-get{
						display: block;
					}
				}

				&.disabled{
					border: solid 1px #a7afbf;

					.title{
						color: #898c93;

						.index{
							background-color: #898c93;
						}

						.text{
							color: #898c93;
						}
					}

					.desc{
						color: #898c93;
					}
				}
				
				&.full{
					.title{
						.text{
							max-width: 134px;
						}
					}
				}

				& + .item{
					margin-top: 10px;
				}
			}
		}

		.footer{
			margin-top: 20px;
			padding: 0 16px 20px;

			.row{
				text-align: center;
				
				.text{
					color: #2b2b2b;
					font-size: 12px;
					font-weight: bold;
				}
				
				.btn{
					width: 110px;
					margin: 6px auto 0;
				}
				
				& + .row{
					margin-top: 16px;
				}
			}
		}
	}
</style>