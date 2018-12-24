import Vue from 'vue';
import Vuex from 'vuex';
import createLogger from 'vuex/dist/logger';
import matchesModule from './modules/matches';
import userModule from './modules/user';
import blindsModule from './modules/blinds';
import sidebarModule from './modules/sidebar';
import configModule from './modules/config';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
    modules: {
        matchesModule, userModule, blindsModule, sidebarModule, configModule,
    },
    strict: debug,
    plugins: debug ? [createLogger()] : [],
    state: {
        auth: {
            token: null,
        },
    },
});
