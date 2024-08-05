import { createStore } from 'vuex';

export default createStore ({
    state: {
        token: localStorage.getItem('token') || '',
        isAuthenticated: false
    },

    mutations: {
        UpdateAuthStatus (state, status) {
            state.isAuthenticated = status
        },

        getAuthToken( state, token){
            state.token = token
            if(state.token){
                localStorage.setItem('token', token);
            } else {
                localStorage.removeItem('token');
            }
        }
    },

    actions: {
        checkAuthStatus( {commit}, status){
            // url:auth/checkAuthStatus
                commit('UpdateAuthStatus', status)

        },

        setAuthToken ( {commit}, token ){
            commit('getAuthToken', token)
        }
    },

    getters: {
        authStatus : state => state.isAuthenticated
    }
})
