<template>
	<view class="page">		
		<Stage></Stage>
		
		<Menu></Menu>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex';

	import MIXIN_GLOBAL from '@/mixins/global.js';
	
	import Stage from './components/stage';
	import Menu from './components/menu';

	export default {
		mixins: [MIXIN_GLOBAL],
		components: {
			Stage,
			Menu,
		},
		data() {
			return {

			};
		},
		computed: {

		},
		methods: {

		},
		created() {

		},
		mounted() {

		},
		onLoad(option) {
			// #ifdef MP-WEIXIN
			uni.showShareMenu({
				menus: ['shareAppMessage', 'shareTimeline'],
			});
			// #endif
		},
		// 小程序分享时触发
		onShareAppMessage(res) {
			const SHARE_LIST_NUM = 1;

			var fullPath = this.$scope.$page.fullPath,
				random = Math.random(),
				index = Math.floor(Math.random() * SHARE_LIST_NUM),
				imageUrl = `/static/banner/share-${index}.jpg`;

			return {
				title: '石家庄桥文化',
				desc: '石家庄桥文化',
				path: fullPath,
				imageUrl,
			};
		},
	}
</script>

<style scope lang="scss">
	.page {
		display: flex;
		width: 100%;
		height: 100%;
		overflow: hidden;
	}
</style>