export default {
    props: {
        value: {
            type: [String, Object, Array, Number],
        }
    },
    computed: {
        model: {
            get() {
                return this.value;
            },
            set(val) {
                this.$emit('input', val);
            }
        }
    }
}
