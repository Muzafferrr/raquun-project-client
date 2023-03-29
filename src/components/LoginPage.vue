<template>
    <div class="container py-5 h-100">
        <div class="row d-flex justify-content-center align-items-center h-100">
            <div class="col-12 col-md-8 col-lg-6 col-xl-5">
                <div class="card bg-dark text-white" style="border-radius: 1rem;">
                    <div class="card-body p-5 text-center">
                        <div class="mb-md-5 mt-md-4 pb-5">
                            <h2 class="fw-bold mb-2 text-uppercase">Sign In</h2>
                            <p class="text-white-50 mb-5">Please enter your username and password!</p>

                            <div class="form-outline form-white mb-4">
                                <input type="text" v-model="user.username" name="username" ref="username"
                                    class="form-control form-control-lg" placeholder="Username" />
                            </div>
                            <div class="form-outline form-white mb-4">
                                <input type="password" v-model="user.password" name="password" ref="password"
                                    class="form-control form-control-lg" placeholder="Password" />
                            </div>
                            <button class="btn btn-outline-light btn-lg px-5" type="button" v-on:click="login">Sign
                                in</button>
                        </div>
                        <div>
                            <p class="mb-0">Don't have an account?
                                <a href="javascript:void(0)" v-on:click="signup" class="text-white-50 fw-bold">Sign Up</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
import Swal from 'sweetalert2'
export default {
    name: 'LoginPage',
    data() {
        return {
            user: {
                username: "",
                password: "",
            }
        }
    },
    methods: {
        signup() {
            this.$router.push({ name: 'Register' })
        },
        login() {
            if (this.checkValidation) {
                axios.get(this.hostname + "/api/users/" + this.user.username + "/" + this.user.password)
                    .then(response => {
                        if (response.data.id > 0) {
                            localStorage.setItem('token', JSON.stringify(response.data.token));
                            response.data.token = "";
                            localStorage.setItem('user', JSON.stringify(response.data));
                            this.$router.push({ name: "HomePage" });
                        }
                    })
                    .catch(error => {
                        if (error.response) {
                            Swal.fire(error.response.data)
                        }
                    });
            }
        },
        checkValidation() {
            if (!this.user.username) {
                this.$refs.username.focus();
                Swal.fire("Please enter a valid username!");
                return;
            }
            if (!this.user.password) {
                this.$refs.password.focus();
                Swal.fire("Please enter a valid password!")
                return;
            }
            return true;
        }
    }
}
</script>