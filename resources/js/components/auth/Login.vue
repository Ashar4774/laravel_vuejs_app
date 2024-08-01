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
                            <li class="text-danger">
                                {{ error }}
                            </li>
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
            axios.post('api/login', {
                email: this.email,
                password: this.password
            }).then(response => {
                this.clearErrorMessage()
            }).catch(error => {
                this.errors = Object.values(error.response.data.errors).flat()
            })
        },

        clearErrorMessage() {
            this.errors = ''
        }
    }
}
</script>
