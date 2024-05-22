<template>
	<view class="daily-events">
		<dialog-sign ref="dialogSign"></dialog-sign>
	</view>
</template>

<script>
	import Chain from '@/assets/js/Chain.js';
	
	import DialogSign from './components/dialog-sign.vue';
	
	export default {
		components: {
			DialogSign,
		},
		data() {
			return {				
				chain: null,
			};
		},
		methods: {
			/**
			 * 校验用户每日事件
			 */
			checkUserStatus() {				
				var isLogin = this.$store.getters.isLogin;
	
				if (!isLogin) {
					return;
				}
	
				this.$get(`/signin/checkuserstatus.json`, data => {
					if (!data) {
						return;
					}
					
					this.showSignDialog(data);
					this.showNoSign(data);
	
					this.chain.run();
				});
			},
			/**
			 * 展示签到界面
			 */
			showSignDialog(data) {
				if (
					data.todaySignIn 
				) {
					return;
				}
	
				this.chain.link(next => {
					this.$refs.dialogSign.open({
						data,
						onclose: () => {
							next();
						},
					});
				});
			},
			/**
			 * 连续若干天没有登录
			 */
			showNoSign(data) {
				if (
					!data.noLoginInRules 
					|| !data.noLoginInRules.length
				) {
					return;
				}
	
				var noLoginInRule = data.noLoginInRules[0],
					{title, desc, wxmpUrl} = noLoginInRule;
	
				this.chain.link(next => {					
					this.showConfirm(desc, () => {
						this.goto(wxmpUrl);
					}, () => {
						next(); 
					});
				});
			},
		},
		mounted() {
			this.chain = new Chain();
			
			this.checkUserStatus();
		},
	};
</script>

<style lang="scss" scoped>
</style>