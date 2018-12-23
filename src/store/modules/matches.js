import moment from 'moment';
import _ from 'underscore';
import Matches from '../../api/matches';
import { getBlindName, getBigBlind } from '../../helpers/blindHelper';

const matchesModule = {
    state: {
        matches: [],
    },
    mutations: {
        addMatch(state, match) {
            state.matches.unshift(match);
        },

        setMatches(state, matches) {
            state.matches = matches;
        },
    },

    getters: {
        numberOfSessionsPlayed(state) {
            return state.matches.length;
        },

        getAllMatches(state) {
            return state.matches.map((match) => {
                match.blinds.name = getBlindName(match.blinds);
                return match;
            });
        },

        getAllMatchesByLocationAndStake(state, getters) {
            const data = {};

            const matches = getters.getAllMatches;

            if (!matches.length) {
                return [];
            }

            matches.forEach((match) => {
                if (!data[match.location]) {
                    data[match.location] = [];
                }

                if (!data[match.location][match.blinds.name]) {
                    data[match.location][match.blinds.name] = [];
                }

                data[match.location][match.blinds.name].push(match);
            });

            const mapped = [];

            Object.keys(data).forEach((location) => {
                Object.keys(data[location]).forEach((stake) => {
                    const match = data[location][stake];

                    const totalProfit = match.reduce((sum, m) => m.profit + sum, 0);
                    const minutesPlayed = match.reduce((sum, m) => m.minutes_played + sum, 0);
                    const hoursPlayed = Math.round(minutesPlayed / 60);
                    const profitPerHour = totalProfit / hoursPlayed;
                    const bigBlindsPerHour = profitPerHour / getBigBlind(match[0].blinds);

                    mapped.push({
                        location,
                        blinds: {
                            name: stake,
                        },
                        big_blinds_per_hour: bigBlindsPerHour.toFixed(2),
                        profit_per_hour: profitPerHour,
                        hours_played: hoursPlayed,
                        total_profit: totalProfit,
                    });
                });
            });

            return mapped;
        },

        // chart getters. these should probably be moved somewhere else in the future
        getAllMatchesBankrollChartData(state, getters) {
            const matches = state.matches;

            if (matches.length === 0) {
                return [];
            }

            const data = matches
                .map(match => [
                    moment(match.start_time).valueOf(),
                    match.resulting_bankroll / 100, // convert pennies to dollars
                ]).sort((a, b) => ((a[0] < b[0]) ? -1 : 1));

            data.unshift([
                moment(data[0][0]).subtract(1, 'days').valueOf(),
                getters.user.money_invested / 100,
            ]);

            return data;
        },

        getBankrollByHourChartData(state, getters) {
            const matches = state.matches;

            if (matches.length === 0) {
                return [];
            }

            let hours = 0;

            const data = matches
                .map((match) => {
                    hours += Math.round(match.minutes_played / 60);
                    return [hours, match.resulting_bankroll / 100]; // convert pennies to dollars
                });

            data.unshift([
                0,
                getters.user.money_invested / 100,
            ]);


            return data;
        },

        getAllMatchesProfitByLocationChartData(state) {
            const matches = state.matches;

            if (matches.length === 0) {
                return [];
            }

            return _.toArray(_.groupBy(matches, 'location'))
                .map((location, index, grouped) => {
                    const groupedMatches = grouped[index];
                    const profit = groupedMatches.reduce((sum, match) => match.profit + sum, 0.00);

                    return [
                        groupedMatches[0].location,
                        profit / 100,
                    ];
                });
        },

        getAllMatchesSessionsPerLocationChartData(state) {
            const matches = state.matches;

            if (matches.length === 0) {
                return [];
            }

            return _.toArray(_.groupBy(matches, 'location'))
                .map((location, index, grouped) => {
                    const groupedMatches = grouped[index];

                    return [
                        groupedMatches[0].location,
                        groupedMatches.length,
                    ];
                });
        },

        getWinsVsLossesChartData(state) {
            const matches = state.matches;

            if (matches.length === 0) {
                return [];
            }

            const wins = { name: 'wins', y: matches.filter(match => match.profit > 0).length, color: 'green' };
            const losses = { name: 'losses', y: matches.filter(match => match.profit < 0).length, color: 'red' };
            const pushes = { name: 'pushes', y: matches.filter(match => match.profit === 0).length, color: 'yellow' };

            return pushes.y ? [wins, losses, pushes] : [wins, losses];
        },

        getAllProfitChartData(state) {
            const matches = state.matches;

            if (matches.length === 0) {
                return [];
            }

            let currentProfit = 0;

            const data = matches
                .map((match) => {
                    const thisProfit = match.profit / 100;
                    currentProfit += thisProfit;

                    return [
                        moment(match.start_time).valueOf(),
                        currentProfit,
                    ];
                }).sort((a, b) => ((a[0] < b[0]) ? -1 : 1));

            // append fake first match to be profit of 0
            data.unshift([
                moment(data[0][0]).subtract(1, 'days').valueOf(),
                0,
            ]);

            return data;
        },
    },

    actions: {
        getAllMatches({ commit }, userId) {
            return Matches.getAllMatches(userId)
                .then((response) => {
                    const matches = response.data.data;
                    commit('setMatches', matches);
                })
                .catch((response) => {
                    console.error(response);
                });
        },

        createMatch({ commit, dispatch }, { userId, match }) {
            return Matches.create(userId, match)
                .then((response) => {
                    const createdMatch = response.data.data;
                    commit('addMatch', createdMatch);
                    dispatch('getUser', userId); // to recalculate the stats etc.
                });
        },
    },
};

export default matchesModule;
