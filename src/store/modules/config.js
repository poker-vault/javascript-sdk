const configModule = {
    state: {
        config: {
            bugsnag_api_key: null,
            env: null,
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
