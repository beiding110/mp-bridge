<template>
	<u-sticky
	:disabled="!sticky"
	<!-- #ifdef H5 -->
	:offsetTop="-44" 
	<!-- #endif -->
	bgColor="#fff"
	>
		<u-tabs 
			:list="innerList"
			:current="current"
			:scrollable="scrollable"
			:keyName="props.label"
			@click="tabClick"
		></u-tabs>
	</u-sticky>
</template>

<script>
	import MIXIN_MODEL from '@/mixins/model.js';
	export default {
		mixins: [MIXIN_MODEL,],
		props: {
			//吸顶
			sticky: {
				type: Boolean,
				default: false,
			},
			// 标签数组
			list: {
				type: Array,
				default: () => ([
					// {
					// 	name: '',
					// 	id: '',
					// 	show: true,
					//	disabled: false,
					// },
				]),
			},
			// 是否滚动
			scrollable: {
				type: Boolean,
				default: true,
			},
			props: {
				type: Object,
				default: () => ({
					label: 'name',
					value: 'id',
				}),
			},
		},
		data() {
			return {
				autoFirst: false,
			};
		},
		computed: {
			current() {
				var index = this.innerList.findIndex(item => item[this.props.value] === this.model);
				
				if (index < 0) {
					return 0;
				}
				
				return index;
			},
			/**
			 * 实际展示的pushList中show为true的项
			 */
			innerList() {
				var list = this.list.filter(item => {
					if (item.show === undefined) {
						return true;
					}
					
					return item.show;
				});
				
				return list;
			},
		},
		watch: {
			innerList: {
				handler(val) {
					if (!this.autoFirst) {
						return;
					}
					
					let first = val[0];
					
					if (first) {
						this.model = first[this.props.value];
					}
				},
				deep: true,
			}
		},
		methods: {
			/**
			 * 列表项的导航被点击
			 * @param {Object} e 列表项的对象
			 */
			tabClick(e) {				
				this.model = e[this.props.value];
				
				this.$nextTick(() => {
					this.$emit('click', e);
				});
			},
		},
		created() {
			if (!this.model) {
				this.autoFirst = true;
			}
		},
		mounted() {
			
		},
	}
</script>

<style scoped lang="scss">
	
</style>