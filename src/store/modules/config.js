import BootstrappedData from '../BootstrappedData';

const configModule = {
    state: {
        config: {
            bugsnag_api_key: BootstrappedData.get('bugsnag_js_api_key'),
            env: BootstrappedData.get('env'),
        },
    },
    getters: {
        env(state) {
            return state.config.env;
        },

        bugsnagApiKey(state) {
            return state.config.bugsnag_api_key;
        },
    },
    actions: {

    },
    mutations: {

    },
};

export default configModule;
