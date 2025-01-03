import { createStore } from 'vuex';

export default createStore ({
    state: {
        token: localStorage.getItem('token') || '',
        isAuthenticated: false
    },

    mutations: {
        updateAuthenticationStatus(state, status){
            state.isAuthenticated = status;
        },
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
        },

        changeAuthentication(state){
            state.token = false;
            state.isAuthenticated = false;
        }
    },

    actions: {
        checkUserAuthentication({commit}){
            axios.get('api/checkAuthStatus')
                .then(response => {
                    commit('updateAuthenticationStatus', response.data.status)
                })
                .catch(error => {
                    console.error(error);
                })
        },

        checkAuthStatus( {commit}, status){
            // url:auth/checkAuthStatus
                commit('UpdateAuthStatus', status)

        },

        setAuthToken ( {commit}, token ){
            commit('getAuthToken', token)
        },

        logout({commit}){
            commit('changeAuthentication')
            localStorage.removeItem('token')
            delete axios.defaults.headers.common['Authorization']
        }
    },

    getters: {
        authStatus : state => state.isAuthenticated
    }
})
