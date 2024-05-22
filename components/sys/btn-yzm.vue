<template>
	<view 
	class="btn-yzm"
	:class="{disabled: btnDisabled}"
	@click="getYzm"
	>
		{{text}}
	</view>
</template>

<script>
import MODEL from '@/mixins/model';

export default {
    mixins: [ MODEL ],
    props: {
        mobile: {
            type: String,
            default: '',
        },
		url: {
			type: String,
			default: '',
		},
    },
    data() {
        return {
            loadingController: false,
            btnDisabled: false,
            text: '获取手机验证码',
        }
    },
    methods: {
        getYzm() {
			if (this.btnDisabled) {
				return;
			}
			
            if(!this.mobile ||  !/^[1][0-9]{10}$/.test(this.mobile)) {
                this.showMsg('请确认手机号', 'warning');
                return;
            };

            this.$post(this.url, {
                mobile: this.mobile
            }, data => {
                //倒计时
                this.loadingController = true;
                this.btnDisabled = true
                //倒计时
                var remain = 60;
                this.text = '请在' + remain + 's后重试'

                var int = setInterval(() => {
                    if (remain != 0) {
                        remain--
                        this.text = '请在' + remain + 's后重试'
                    } else {
                        clearInterval(int);
                        this.text = '获取手机验证码';
                        this.btnDisabled = false;
                        this.loadingController = false;
                    }
                }, 1000)

            })
        }
    }
}
</script>

<style lang="scss">
	.btn-yzm{
		color: $u-primary;
		
		&.disabled{
			color: $u-primary-disabled;
		}
	}
</style>