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
        setBugsnagApiKey(key) {
            state.config.bugsnag_api_key = key;
        },

        setEnvironment(env) {
            state.config.env = env;
        }
    },
};

export default configModule;
