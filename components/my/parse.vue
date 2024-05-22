<template>
	<mp-html 
		class="my-parse"
		:content="contentWithStyle" 
		scroll-table
	></mp-html>
</template>

<script>
	import MpHtml from '../sys/mp-html/mp-html.vue'
	
	export default {
		components: {
			MpHtml,
		},
		props: {
			content: {
				type: String,
				default: '',
			},
		},
		data() {
			return {
				
			};
		},
		computed: {
			contentWithStyle() {
				var style = `<style>
					th, tr, td { display: block; box-sizing: border-box;}
					table { display:table; width: 100%; border-collapse:collapse; border:none; word-break: break-all; font-size: 12px; box-sizing: border-box;}
					table tr { display:table-row; background: white; }
					table td { display:table-cell; padding: 0 4px; border: 1px solid #b0b0b0; background: white; }
					table th { display:table-cell; padding: 0 4px; border: 1px solid #b0b0b0; background: white; }
					div, p {font-size: 14px; box-sizing: border-box;}
					span, font, a {font-size: 14px;}
					h1 {font-size: 18px; font-weight: bold;}
					h2 {font-size: 16px; font-weight: bold;}
					h3 {font-size: 16px;}
					h4 {font-size: 14px;}
				</style>
				`;
				
				return `${style}${this.content}`;
			},
		},
	}
</script>

<style style="scss" scoped>
	.my-parse {
		display: block;
		color: #323232;
		font-size: 16px;
		line-height: 1.5em;
		word-break: break-all;
	}
</style>