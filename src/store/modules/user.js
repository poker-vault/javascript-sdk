import moneyFormatter from '../../helpers/moneyFormatter';
import Users from '../../api/users';

const userModule = {
    state: {
        user: {
            bankroll: null,
            average_big_blinds_per_hour: 0,
            hours_played: 0,
            id: null,
            money_invested: null,
            name: null,
            profit: null,
            total_gambled: null,
            total_roi: null,
        },
    },
    getters: {
        user(state) {
            return state.user;
        },
        bankroll(state) {
            return moneyFormatter(state.user.bankroll);
        },
        averageBigBlindsPerHour(state) {
            return state.user.average_big_blinds_per_hour;
        },
        hoursPlayed(state) {
            return state.user.hours_played;
        },
        moneyInvested(state) {
            return moneyFormatter(state.user.money_invested);
        },
        name(state) {
            return state.user.name;
        },
        email(state) {
            return state.user.email;
        },
        profit(state) {
            return moneyFormatter(state.user.profit);
        },
        totalGambled(state) {
            return moneyFormatter(state.user.total_gambled);
        },
        totalRoi(state) {
            return state.user.total_roi;
        },
        isInPositive(state) {
            return state.user.profit > 0;
        },
        isInNegative(state) {
            return state.user.profit < 0;
        },
        profitPerHour(state, getters) {
            const profit = state.user.profit;
            const hoursPlayed = getters.hoursPlayed;

            return moneyFormatter(profit / hoursPlayed);
        },
        userId(state) {
            return state.user.id;
        },
    },
    actions: {
        getUser({ commit }, userId) {
            return Users.getUser(userId)
                .then((response) => {
                    const user = response.data.data;
                    commit('setUser', user);
                })
                .catch((response) => {
                    console.error(response);
                });
        },
    },
    mutations: {
        setUser(state, user) {
            state.user = user;
        },

        setUserId(state, userId) {
            state.user.id = userId;
        }
    },
};

export default userModule;
