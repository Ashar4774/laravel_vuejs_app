<template>
    <div class="container">
        <div class="row">
            <div class="col-12 mt-5">
                <div class="card" >
                    <div class="card-body">
                        <h5 class="card-title">Dashboard</h5>
                        <p class="card-text" v-if="user">Welcome <b>{{ user.name }}</b> to Laravel Vue App</p>
                        <!-- <router-link to="/" class="btn btn-primary">Go somewhere</router-link> -->
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                user: null
            }
        },

        mounted() {
            this.getUserInfo()
        },

        methods: {
            async getUserInfo(){
                await axios.get('api/user').then(response => {
                    this.user = response.data
                    console.log(response)
                }).catch(error => {

                })
            }
        }
    }
</script>
