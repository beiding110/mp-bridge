export default {
    props: {
        'twoway': {
            type: String
        },
    },
    methods: {
        twoWayHandler(row) {
            if(this['twoway']) {
                var modelArr = this['twoway'].split(',');
				
                modelArr.forEach(function(key) {
                    this.$emit('update:' + key, row[key])
                }.bind(this));
            };
        }
    }
}