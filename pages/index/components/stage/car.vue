<template>	
	<image
		class="car" 
		:src="bulidUrl('/static/web/images/car.png')"
		mode="widthFix"
		:style="{left: `${activeItem.x}px`, top: `${activeItem.y}px`,}"
	></image>
</template>

<script>
	import path from '../../data/path.js';
	
	export default {
		props: {
			to: {
				type: String,
				default: '',
			},
		},
		data() {
			return {
				currentIndex: 0,
				targetIndex: path.length - 1,
				
				interval: null,
			};
		},
		computed: {
			activeItem() {
				return path[this.currentIndex];
			}
		},
		watch: {
			to: {
				handler(val) {
					if (!val) {
						// 返回起点
						this.run(0);
						return;
					}
					
					this.run(val);
				},
				immediate: true,
			},
		},
		methods: {
			run(index = path.length - 1) {
				if (typeof index === 'number') {
					this.targetIndex = index;
				} else {
					let target = path.filter(item => item.name === index)[0];
					this.targetIndex = path.indexOf(target);
				}
				
				try {
					clearInterval(this.interval);
				} catch(e) {}
				
				this.interval = setInterval(() => {
					if (this.targetIndex > this.currentIndex) {
						this.currentIndex += 1;
					} 
					
					if (this.targetIndex < this.currentIndex) {
						this.currentIndex -= 1;
					}
					
					if (this.currentIndex === this.targetIndex) {
						clearInterval(this.interval);
						
						if (!this.to) {
							return;
						}
						
						this.$emit('arrive', this.to);
					}
				}, 300);
			},
		},
		mounted() {
			
		},
	}
</script>

<style scoped lang="scss">
	.car{
		position: absolute;
		transition: all .3s;
		transform: translate(-50%, -50%);
		width: 80px;
	}
</style>