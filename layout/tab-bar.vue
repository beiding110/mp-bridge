<template>
	<view class="layout-tab-bar">
		<view 
			v-if="currentTopNavBg"
			class="bar-auto-placeholder"
			:style="{background: currentTopNavBg}"
		></view>
		
		<view class="layout-content">
			<slot></slot>
		</view>
		
		<view class="tab-bar">
			<u-tabbar
				:value="active"
				:fixed="false"
			>
				<u-tabbar-item 
					v-for="(item, index) in tabList"
					:key="index"
					:text="item.text" 
					:name="item.name"
					@click="commonClickHandler(item, item.click)" 
				>
					<image
						class="tab-bar-slot-icon"
						slot="active-icon"
						:src="item.img2"
					></image>
					<image
						class="tab-bar-slot-icon"
						slot="inactive-icon"
						:src="item.img"
					></image>
				
				</u-tabbar-item>
			</u-tabbar>
		</view>
		
		<my-msg></my-msg>
		
		<!-- #ifdef H5 -->
		<my-cnzz></my-cnzz>
		<!-- #endif -->
	</view>
</template>

<script>
	import {mapState} from 'vuex';
	
	export default {
		data() {
			var that = this;
			
			return {
				tabList: [
					{
						text: '首页',
						name: 'home',
						img: '/static/images/tab/home-normal.png',
						img2: '/static/images/tab/home-pressed.png',
						topNavBg: false,
						click() {
							return true;
						},
					},
					{
						text: '投标方案',
						name: 'document',
						img: '/static/images/tab/fangan-normal.png',
						img2: '/static/images/tab/fangan-pressed.png',
						topNavBg: false,
						click() {
							return true;
						},
					},
					{
						text: '讯息',
						name: 'info',
						img: '/static/images/tab/xunxi-normal.png',
						img2: '/static/images/tab/xunxi-pressed.png',
						topNavBg: false,
						click() {
							return true;
						},
					},
					{
						text: '商机人脉',
						name: 'business-contact',
						img: '/static/images/tab/shangji-normal.png',
						img2: '/static/images/tab/shangji-pressed.png',
						topNavBg: false,
						click() {
							return true;
						},
					},
					{
						text: '个人中心',
						name: 'user',
						img: '/static/images/tab/personal-normal.png',
						img2: '/static/images/tab/personal-pressed.png',
						topNavBg: false,
						click() {
							var isLogin = that.$store.getters.isLogin;
							
							if (!isLogin) {
								that.goto('/pages/login/login');
								
								return false;
							}
							
							return true;
						},
					},
				],
			};
		},
		computed: {
			...mapState({
				active: state => state.homePageNav.tabActive,
			}),
			currentTopNavBg() {
				var item = this.tabList.filter(item => {
					return item.name === this.active;
				})[0];
				
				if (!item) {
					return false;
				}
				
				return item.topNavBg;
			},
		},
		methods: {
			commonClickHandler(item, cb) {
				if (cb && !cb(item)) {
					// 返回false则不进行跳转
					return;
				}
				
				this.$store.dispatch('homePageNavTo', {
					tab: item.name,
				});
				
				this.$emit('select', item);
			},
		},
	}
</script>

<style scoped lang="scss">
	.layout-tab-bar{
		display: flex;
		flex-direction: column;
		height: 100%;
		
		.bar-auto-placeholder {
			height: var(--status-bar-height);
		}
		
		.layout-content{
			flex: 1;
			overflow: auto;
		}
		
		.tab-bar{
			
			.tab-bar-slot-icon{
				width: 24px;
				height: 24px;
			}
			
			::v-deep {
				.u-tabbar-item__text{
					line-height: 1em;
					margin-top: 2px;
				}
			}
		}
	}
</style>