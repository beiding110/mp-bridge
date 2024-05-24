<template>
	<view class="page">		
		<Stage></Stage>
		
		<Menu></Menu>
		
		<Explain></Explain>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex';

	import MIXIN_GLOBAL from '@/mixins/global.js';
	
	import Stage from './components/stage';
	import Menu from './components/menu';
	import Explain from './components/explain';

	export default {
		mixins: [MIXIN_GLOBAL],
		components: {
			Stage,
			Menu,
			Explain,
		},
		data() {
			return {

			};
		},
		computed: {

		},
		methods: {
			pointClickHandler(e) {
				console.log(e);
			},
		},
		created() {

		},
		mounted() {

		},
		onLoad(option) {
			
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