import Vue from 'vue';
import Vuex from 'vuex';
import router from '@/router';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        user: null,
        isAuthenticated: false,
        error_msg: null,
        accessToken: null
    },
    mutations: {
        setUser(state, payload) {
            state.user = payload;
        },
        setIsAuthenticated(state, payload) {
            state.isAuthenticated = payload;
        },
        setToken(state, payload) {
            state.accessToken = `Bearer ${payload}`;
        },
        setError(state, payload) {
            state.error_msg = payload;
        }
    },
    actions: {
        userLogin({ commit }, { email, password }) {
            axios
                .post('https://test-api.updivision.work/api/login', {
                    email: email,
                    password: password
                })
                .then(
                    response => {
                        commit('setUser', response);
                        commit('setToken', response.data.accessToken);
                        commit('setIsAuthenticated', true);
                        commit('setError', null);
                        router.push('/');
                    },
                    error => {
                        let error_msg = error.response.data.message;
                        commit('setUser', null);
                        commit('setToken', null);
                        commit('setIsAuthenticated', false);
                        commit('setError', error_msg);
                        router.push('/sign-in');
                    }
                );
        },
        userRegister({ commit }, register) {
            axios
                .post('https://test-api.updivision.work/api/register', register)
                .then(
                    response => {
                        commit('setUser', response);
                        commit('setToken', response.data.accessToken);
                        commit('setIsAuthenticated', true);
                        commit('setError', null);
                        router.push('/');
                    },
                    error => {
                        let error_msg = error.response.data.message;
                        commit('setUser', null);
                        commit('setToken', null);
                        commit('setIsAuthenticated', false);
                        commit('setError', error_msg);
                        router.push('/register');
                    }
                );
        },
        userSignOut({ commit }) {
            axios
                .post(
                    'https://test-api.updivision.work/api/logout',
                    {},
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': this.state.accessToken
                        }
                    }
                )
                .then(
                    () => {
                        commit('setUser', null);
                        commit('setToken', null);
                        commit('setIsAuthenticated', false);
                        commit('setError', null);
                        router.push('/sign-in');
                    },
                    () => {
                        commit('setUser', null);
                        commit('setToken', null);
                        commit('setIsAuthenticated', false);
                        commit('setError', null);
                        router.push('/sign-in');
                    }
                );
        }
    },
    getters: {
        isAuthenticated(state) {
            return state.user !== null && state.user !== undefined;
        }
    }
});
