export default {
	data() {
		return {
			isAvailable: false,
		};
	},
	methods: {
		// 判断是否登录
		loginCheck() {
			var isLogin = this.$store.getters.isLogin;
			
			if (!isLogin) {
				uni.redirectTo({
					url: '/pages/login/login'
				});
				
				return false;
			}
			
			return true;
		}
	},
	created() {
		this.isAvailable = this.loginCheck();
	},
}