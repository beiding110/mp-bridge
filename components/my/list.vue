<template>
	<u-list 
	:height="height"
	@scrolltolower="load"
	@scrolltoupper="reload"
	>
		<template v-if="skeleton ? loadingFirstPage : false">
			<view 
			v-for="item in 5"
			class="skeleton"
			>
				<u-skeleton
					rows="3"
					:loading="loadingFirstPage"
				></u-skeleton>
			</view>
		</template>
		
		<template v-else>
			<template v-if="autoList">
				<u-list-item
					v-for="(item, index) in model"
					:key="index"
				>
					<slot :row="item" :index="index"></slot>
				</u-list-item>
			</template>
			
			<template v-if="!autoList">
				<slot></slot>
			</template>
			
			<view 
			v-if="!loading && loadedFirstPage && !model.length"
			class="empty-placeholder"
			>
				<image
					class="empty-icon"
					src="/static/images/icon/icon-list-empty.png"
					mode="widthFix"
				></image>
				
				<view class="empty-text">
					{{emptyText}}
				</view>
			</view>
			
			<view 
			v-if="loading"
			class="loading"
			>
				<u-loading-icon 
					text="加载中" 
					textSize="12"
					size="12"
				></u-loading-icon>
			</view>
		</template>
	</u-list>
</template>

<script>
	export default {
		props: {
			value: {
				type: Array,
				default: () => [],
			},
			// 接口请求地址
			action: {
				type: String,
				default: '',
			},
			// 接口请求参数
			data: {
				type: Object,
				default: () => ({}),
			},
			// 自动请求第一次
			lazy: {
				type: Boolean,
				default: false,
			},
			// 使用组件内循环渲染
			autoList: {
				type: Boolean,
				default: true,
			},
			// 高度
			height: {
				type: [String, Number],
				default: '100%',
			},
			// 骨架页
			skeleton: {
				type: Boolean,
				default: true,
			},
			// 震动,滚动到顶部和底部时震动
			vibrate: {
				type: Boolean,
				default: true,
			},
			// 每次请求完成后自动执行的函数，参数为当前请求返回的列表及完整返回值
			afterQuery: {
				type: [Function, Boolean,],
				default: false,
			},
			// 为空时的文字提示
			emptyText: {
				type: String,
				default: '',
			},
		},
		data() {
			return {
				pageindex: 0,
				
				loading: false,		// 加载中
				canLoadMore: true,  // 可请求下一页
				loadingFirstPage: false, // 重新加载或加载第一页
				loadedFirstPage: false,
				
				defaultSearch: {
					pagesize: 10,
					sortname: 'addtime',
					sortorder: 'desc',
				}
			};
		},
		computed: {
			model: {
				get() {
					return this.value;
				},
				set(val) {
					this.$emit('input', val);
				},
			},
		},
		methods: {
			// 请求下一页
			load(isReload = false, argSearch = {}) {
				if (!this.action) {
					return;
				}
				
				if (this.loading) {
					// 加载中
					return;
				}
				
				if (this.vibrate) {
					uni.vibrateShort({
						success () {
							console.log('list vibrateShort success');
						},
					});
				}
				
				if (!this.canLoadMore) {
					// 无更多数据
					return;
				}
				
				this.loading = true;
				this.pageindex ++;
				
				// 重新加载或加载第一页;
				if (this.pageindex === 1) {
					this.loadingFirstPage = true;
				}
				
				var search = {
					...this.defaultSearch,
					...this.data,
					...argSearch,
					pageindex: this.pageindex,
				};
				
				this.$get(this.action, search, res => {
					var {rows, total,} = res;
					
					if (rows.length < search.pagesize) {
						this.canLoadMore = false;
					}
					
					if (this.afterQuery) {
						this.afterQuery(rows, res);
					}
					
					if(isReload){
						this.model = rows;
						
						this.$emit('input', rows);
					}else{
						var model = [
							...this.model,
							...rows,
						];
						
						this.model = model;
						
						this.$emit('input', model);
					}
					
					this.$emit('update:total', total);
					
					this.loading = false;
					this.loadingFirstPage = false;
					
					if (this.pageindex === 1) {
						// 已进行第一次加载
						this.loadedFirstPage = true;
					}
				});
			},
			// 刷新列表
			reload() {
				this.pageindex = 0;
				this.canLoadMore = true;
				
				this.load(true)
			},
		},
		mounted() {
			if (this.lazy) {
				return;
			}
			
			// 加载首屏
			this.load();
		},
	};
</script>

<style scoped lang="scss">
	.skeleton{
		width: 90%;
		margin: 0 auto;
		padding: 10px 0;
	}
	
	.loading {
		padding: 4px 0;
	}
	
	.empty-placeholder{
		margin: 50% auto;
		
		.empty-icon{
			width: 156px;
		}
		
		.empty-text{
			font-size: 14px;
			margin-top: 40px;
			color: #7d7d7d;
			text-align: center;
		}
	}
</style>