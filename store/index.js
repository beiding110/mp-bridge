import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import message from './message.js';
import dictionary from './dictionary.js';
import homePageNav from './home-page-nav.js';
import userinfo from './userinfo.js';

export default new Vuex.Store({
    state: {},
    getters: {},
    mutations: {},
    actions: {},
    modules: {
      message,
      dictionary,
      homePageNav,
      userinfo,
    },
});
