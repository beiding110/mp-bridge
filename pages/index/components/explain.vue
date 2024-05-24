<template>
	<view v-if="model" class="explain">
		<view class="modal">
			<view class="header">
				<view class="left">
					<view class="title">
						石家庄桥文化主题文旅线路
					</view>
				</view>
				
				<view class="right">
					<u-icon
						name="close" 
						:size="22"
						@click.native.stop="closeHandler"
					></u-icon>
				</view>
			</view>
			
			<view class="body">
				<p>
					中国是桥文化的故乡，自古就有桥的国度之称，发展于隋，兴盛于宋。遍布在神州大地的桥、编织成四通八达的交通网络，连接着祖国的四面八方，充分显示了中国劳动人民的非凡智慧和艺术创造力。从古代的简易木桥到现代的特大桥梁，桥梁的历史每一步都为中国的交通和经济发展做出了重要贡献。
				</p>
				<p>
					2014年习近平总书记首次提出要“增强文化自信和价值观自信”。党的十八大以来，我国文化建设取得了历史性成就，中华优秀传统文化焕发勃勃生机，文化旅游产业繁荣发展。2020年党的二十大报告再次强调，推进文化自信自强，铸就社会主义文化新辉煌。这为新时代新征程社会主义文化强国建设规划了蓝图、指明了方向、提供了遵循。近年来，河北省坚持以文塑旅、以旅彰文，着力建设文旅融合、全域全季的旅游强省。同时倪岳峰书记调研时也曾多次强调“要牢固树立文物保护理念，加大研究和宣传力度，积极传承中华优秀传统文化。要充分挖掘文化资源价值，促进文旅深度融合，打造精品文旅线路，叫响“这么近、那么美，周末到河北”品牌，让历史文化遗产更多惠及广大人民群众”。
				</p>
				<p>
					石家庄作为一座拥有丰富历史文化遗产的城市，近年来，聚焦文旅融合高质量发展，努力打造全国知名文化和旅游城市、国家重点旅游枢纽城市。推出石家庄City walk六大宝藏线路，精品一日游、两日游精品路线，满足广大游客多样化的出游需求。“桥”作为石家庄的重要文化符号和历史遗产，具有独特的魅力，它们见证了城市从古代到现代的发展变迁，承载着深厚的文化内涵和历史记忆，其中赵州桥、永通桥、清明桥、泊水公园特大桥、滹沱河特大桥、子龙大桥、大石桥以等构成了石家庄独特的“桥文化”体系。为此，以桥文化为主线，深挖传统文化精神内核，焕发创新创造活力，真正让旅客“慕名而来、不虚此行、流连忘返、还想再来”，不断提升群众体验感和满意度。
				</p>
			</view>
			
			<view class="footer"></view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {},
		data() {
			return {
				model: true,
			};
		},
		methods: {
			closeHandler() {
				this.model = false;
			},
		},
		mounted() {
			
		},
	}
</script>

<style scoped lang="scss">
	.explain{
		position: fixed;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		background-color: rgba(0, 0, 0, .2);
		
		.modal {
			position: absolute;
			left: 50%;
			top: 50%;
			transform: translate(-50%, -50%);
			width: 350px;
			height: auto;
			background: #FEF5EA;
			border: 4px dashed #FBA756;
			border-radius: 8px;
			padding: 20px;
			box-sizing: border-box;
			
			.header {
				display: flex;
				padding-bottom: 14px;
				align-items: center;
				
				.left{
					flex: 1;
					
					.title{
						display: inline-block;
						color: #FBA756;
						font-size: 20px;
						font-weight: bold;
						background: #38521C;
						border: 4px solid #FBA756;
						border-radius: 8px;
						padding: 4px 6px;
					}
				}
			}
			
			.body {
				max-height: 50vh;
				line-height: 1.6em;
				text-indent: 2em;
				overflow: auto;
				font-size: 16px;
			}
			
			.footer {
				
			}
		}
	}
</style>