<template>
    <span :id='`cnzz_stat_icon_${cid}`' :style="conStype"></span>
</template>

<script>
export default {
    props: {
        hide: {
            type: Boolean,
            default: true,
        },
		cid: {
			type: String,
			default: '',
		},
    },
    data () {
        return {

        }
    },
    computed: {
        conStype() {
            return {
                display: this.hide ? 'none' : 'inline',
            };
        },
    },
    watch: {
        '$route'() {
            if (window._czc) {
                let location = window.location;
                let contentUrl = location.pathname + location.hash;
                let refererUrl = '/';
				
                window._czc.push(['_trackPageview', contentUrl, refererUrl]);
            }
        },
    },
    methods: {
        setCnzz() {
            var script = document.createElement('script'),
				protocol = (("https:" == document.location.protocol) ? " https://" : " http://");
				
            script.src = (protocol + `s9.cnzz.com/z_stat.php?id=${this.cid}&show=pic1`);
            script.language = 'javascript';
            document.body.appendChild(script)
        }
    },
    mounted: function() {
		if (!this.cid) {
			return;
		}
		
        this.setCnzz();
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
