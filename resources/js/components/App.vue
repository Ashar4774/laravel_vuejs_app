<template>
    <div>
        <nav class="navbar navbar-expand-lg bg-body-tertiary">
            <div class="container-fluid">
                <a class="navbar-brand" href="#">Laravel App</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                    aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                            <router-link to="/" class="nav-link active" aria-current="page" href="#">Home</router-link>
                        </li>
                    </ul>
                    <form class="d-flex" role="search">
                        <router-link to="/dashboard" v-if="isAuthenticated == true" class="btn btn-outline-success">Dashboard</router-link>&nbsp;
                        <a @click="logout" v-if="isAuthenticated == true" class="btn btn-outline-danger">Logout</a>&nbsp;
                        <router-link to="/login" v-if="isAuthenticated == false" class="btn btn-outline-primary">login</router-link>&nbsp;
                        <router-link to="/register" v-if="isAuthenticated == false" class="btn btn-outline-info">Register</router-link>
                    </form>
                </div>
            </div>
        </nav>
    </div>
    <router-view></router-view>
</template>
<script>

    import axios from '../axios.js';
    export default {

        mounted(){
            this.$store.dispatch('checkUserAuthentication')
        },

        methods: {
            logout(){
                // logout API call
                axios.post('api/logout')
                .then(response => {
                    console.log(response.data);
                    this.$store.dispatch('logout');

                    this.$router.push({
                        name: 'login'
                    });

                }).catch(error =>{
                    console.error(error);
                })

                // const status = false;
                // const token = '';
                //
                // this.$store.dispatch('UpdateAuthStatus', status);
                //
                // this.$store.dispatch('getAuthToken', token);


            }
        },

        computed: {
            // 1st method
            // isAuthenticated(){
            //     return this.$store.state.isAuthenticated
            // }

            isAuthenticated(){
                return this.$store.getters.authStatus
            },

            authToken(){
                return this.$store.state.token
            }
        }
    }
</script>
