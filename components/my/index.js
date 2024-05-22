export default {
    install: function(Vue){
        Vue.component('my-msg', function(){return import(/*webpackChunkName: 'coms'*/ './msg');});
		Vue.component('my-list', function(){return import(/*webpackChunkName: 'coms'*/ './list');});
		Vue.component('my-picker', function(){return import(/*webpackChunkName: 'coms'*/ './picker');});
		Vue.component('my-popup', function(){return import(/*webpackChunkName: 'coms'*/ './popup');});
    }
}
