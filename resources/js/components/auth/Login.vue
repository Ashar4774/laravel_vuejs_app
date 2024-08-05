<template>
    <div class="container">
        <div class="row">
            <div class="col-5 mx-auto mt-5">
                <div class="card">
                    <div class="card-header">
                        Login
                    </div>
                    <div class="card-body">
                        <ul v-for="error in errors">
                            <p class="text-danger">
                                {{ error }}
                            </p>
                        </ul>
                        <form @submit.prevent="login">
                            <div class="mb-3">
                                <label for="email" class="form-label">Email</label>
                                <input type="email" class="form-control" id="email" v-model="email">
                            </div>
                            <div class="mb-3">
                                <label for="password" class="form-label">Password</label>
                                <input type="password" class="form-control" id="password" v-model="password">
                            </div>
                            <button type="submit" class="btn btn-primary">Submit</button>
                        </form>
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
            email: '',
            password: '',
            errors: []
        }
    },

    methods: {
        login() {
            axios.get('/sanctum/csrf-cookie').then(response => {
                axios.post('api/login', {
                    email: this.email,
                    password: this.password
                }).then(response => {

                    // dispatch authentication
                    const status = true;
                    const token = response.data.token

                    this.$store.dispatch('checkAuthStatus', status)

                    this.$store.dispatch('setAuthToken', token)

                    this.$router.push({
                        name: 'dashboard'
                    });
                }).catch(error => {
                    console.log(error.response.data)
                    if(error.response.status == 422){
                        this.errors = Object.values(error.response.data.errors).flat()
                    } else {
                        this.errors = Object.values([error.response.data.errors]).flat()
                    }
                })
            });
        },

        clearErrorMessage() {
            this.errors = ''
        }
    }
}
</script>
