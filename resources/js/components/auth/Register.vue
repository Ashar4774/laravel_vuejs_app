<template>
    <div class="container">
        <div class="row">
            <div class="col-5 mx-auto mt-5">
                <div class="card">
                    <div class="card-header">
                        Register
                    </div>
                    <div class="card-body">
                        <ul>
                            <li class="text-success" v-if="success != ''">{{ success }}</li>
                        </ul>
                    <ul v-for="error in errors">
                        <li class="text-danger">{{ error }}</li>
                    </ul>
                        <form @submit.prevent="register">
                            <div class="mb-3">
                                <label for="name" class="form-label">Name</label>
                                <input type="text" v-model="name" class="form-control" id="name"
                                    aria-describedby="emailHelp">
                            </div>
                            <div class="mb-3">
                                <label for="email" class="form-label">Email</label>
                                <input type="email" v-model="email" class="form-control" id="email"
                                    aria-describedby="emailHelp">
                            </div>
                            <div class="mb-3">
                                <label for="password" class="form-label">Password</label>
                                <input type="password" v-model="password" class="form-control" id="password">
                            </div>
                            <div class="mb-3">
                                <label for="confirmPassword" class="form-label">Confirm Password</label>
                                <input type="password" v-model="confirmPassword" class="form-control" id="confirmPassword">
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
                name : '',
                email: '',
                password: '',
                confirmPassword: '',
                errors: [],
                success: ''
            }
        },

        methods: {
            register() {
                if(this.password != this.confirmPassword){
                    this.errors = ['Password and confirm password should be same'];
                    return;
                }

                // Store API
                axios.post('api/register', {
                    name: this.name,
                    email: this.email,
                    password: this.password
                }).then(response => {
                    console.log(response.data)
                    this.success = response.data.message
                    this.clearErrorMessage();
                }).catch(error => {
                    if(error.response.status == 422){
                        this.errors = Object.values(error.response.data.errors).flat()
                    } else {
                        this.errors = error.data.errors
                    }
                    this.success = ''
                })
            },

            clearErrorMessage(){
                this.errors = ''
            }
        }
    }
</script>
