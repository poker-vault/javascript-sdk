import Users from '../../api/users';

const authModule = {
    state: {
        auth: {
            token: undefined,
        },
    },
    getters: {
        token(state) {
            return state.auth.token;
        }
    },
    actions: {
        login({ commit }, data) {
            return Users.login(data.email, data.password)
                .then((response) => {
                    const token = response.data.token;
                    commit('setAuthToken', token);
                })
                .catch((response) => {
                    console.error(response);
                });
        },
    },
    mutations: {
        setAuthToken(state, token) {
            state.auth.token = token;
        }
    },
};

export default authModule;
