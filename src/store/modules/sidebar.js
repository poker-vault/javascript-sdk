const sidebarModule = {
    state: {
        sidebar: {
            opened: false,
            hidden: false,
        },
    },
    getters: {
        sidebar(state) {
            return state.sidebar;
        },
    },
    actions: {
        toggleSidebar({ commit }, toggle) {
            return new Promise(() => {
                commit('toggle_sidebar', toggle);
            });
        },
    },
    mutations: {
        toggle_sidebar(state, toggle) {
            state.sidebar.opened = toggle;
        },
    },
};

export default sidebarModule;
