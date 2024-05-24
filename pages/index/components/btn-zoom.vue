<template>
	<view class="btn-zoom" :style="{ bottom }">
		<template v-for="(item, index) in ruler">
			<view v-if="item !== mapScale" class="item" :key="index" @click="clickHandler(item)">
				<u-icon class="icon" name="search" size="22px" color="#F1916C"></u-icon>
			
				<view class="text">
					× {{item}}
				</view>
			</view>
		</template>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations,
	} from 'vuex';

	var bottom = uni.$u.addUnit(uni.$u.sys().safeAreaInsets.bottom + 10, 'px');

	export default {
		props: {},
		data() {
			return {
				ruler: [1, 0.5],
				pointer: 0,

				bottom,
			};
		},
		computed: {
			...mapState(['mapScale']),
		},
		methods: {
			...mapMutations(['updateMapScale']),
			clickHandler(value) {
				this.updateMapScale(value);
			},
		},
		mounted() {

		},
	}
</script>

<style scoped lang="scss">
	.btn-zoom {
		display: flex;
		position: fixed;
		right: 10px;

		.item {
			display: flex;
			background: #FDF0E1;
			color: #F1916C;
			height: 30px;
			padding: 0 6px;
			border-radius: 5px;
			align-items: center;
			font-weight: bolder;

			&+.item {
				margin-left: 6px;
			}
		}
	}
</style>