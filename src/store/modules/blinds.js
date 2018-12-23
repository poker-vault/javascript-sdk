import { getBlindName } from '../../helpers/blindHelper';
import Blinds from '../../api/blinds';

const blindsModule = {
    state: {
        blinds: [

        ],
    },
    getters: {
        getBlinds(state) {
            return state.blinds.map((blind) => {
                blind.name = getBlindName(blind);
                return blind;
            });
        },
    },
    actions: {
        getBlinds({ commit }) {
            return Blinds.getAllBlinds()
                .then((response) => {
                    const blinds = response.data.data;
                    commit('setBlinds', blinds);
                })
                .catch((response) => {
                    console.error(response);
                });
        },
    },
    mutations: {
        setBlinds(state, blinds) {
            state.blinds = blinds;
        },
    },
};

export default blindsModule;
