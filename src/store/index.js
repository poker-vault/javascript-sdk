import Vuex from 'vuex';
import createLogger from 'vuex/dist/logger';
import matchesModule from './modules/matches';
import userModule from './modules/user';
import blindsModule from './modules/blinds';
import sidebarModule from './modules/sidebar';
import configModule from './modules/config';

const debug = process.env.NODE_ENV !== 'production';

// we aren't automatically exporting a store object because of vue-native vs vue
// instead we expose a function allowing the vue instance to be passed
export default function createStore(VueInstance, initialState) {
    VueInstance.use(Vuex);

    initialState = initialState || {};

    return new Vuex.Store({
        modules: {
            matchesModule, userModule, blindsModule, sidebarModule, configModule,
        },
        strict: debug,
        plugins: debug ? [createLogger()] : [],
        state: initialState
    });
};
