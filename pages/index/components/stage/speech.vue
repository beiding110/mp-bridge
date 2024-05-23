<template>
	<u-icon 
		:name="iconName" 
		@click.native.stop="audioClickHandler"
	></u-icon>
</template>

<script>
	export default {
		props: {
			src: {
				type: String,
				default: '',
			},
			disabled: {
				type: Boolean,
				default: false,
			},
		},
		data() {
			return {
				audioContext: null,
				
				readyState: 0,
				playState: 0,
			};
		},
		computed: {
			iconName() {
				if (!this.readyState) {
					return 'volume';
				}
				
				if (!this.playState) {
					// 停止中
					return 'volume-fill';
				}
				
				return 'volume-off-fill';
			},
		},
		methods: {
			audioClickHandler() {
				if (this.disabled) {
					return;
				}
				
				if (!this.readyState) {
					// 加载中
					return;
				}
				
				if (!this.playState) {
					// 停止中
					this.play();
					
					return;
				}
				
				this.stop();
			},
			play() {
				this.audioContext.play();
			},
			pause() {
				this.audioContext.pause();
			},
			stop() {
				this.audioContext.stop();
			},
		},
		mounted() {
			if (!this.src) {
				return;
			}
			
			this.audioContext = uni.createInnerAudioContext();
			this.audioContext.autoplay = false;
			this.audioContext.src = this.src;
			
			this.audioContext.onCanplay(() => {
				this.readyState = 1;
			});
			
			this.audioContext.onPlay(() => {
				this.playState = 1;
			});
			
			this.audioContext.onPause(() => {
				this.playState = 0;
			});
			
			this.audioContext.onStop(() => {
				this.playState = 0;
			});
			
			this.audioContext.onEnded(() => {
				this.playState = 0;
			});
			
			this.audioContext.onWaiting(() => {
				this.playState = 0;
			});
			
			this.audioContext.onError((err) => {
				this.readyState = 0;
				
				console.log(err);
			});
		},
		beforeDestroy() {
			if (!this.audioContext) {
				return;
			}
			
			try {
				this.audioContext.stop();
				this.audioContext.destroy();
				this.audioContext = null;
			} catch(e) {}
		},
	}
</script>

<style scoped lang="scss">
	
</style>