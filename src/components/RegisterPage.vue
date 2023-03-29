<template>
    <div class="card w-50 mx-auto">
        <div class="card-body p-md-5">
            <h2 class="fw-bold mb-4 text-uppercase">Sign Up</h2>
            <form>
                <div class="form-outline flex-fill mb-2">
                    <input type="text" v-model="user.username" ref="username" placeholder="Username" class="form-control" />
                </div>
                <div class="form-outline flex-fill mb-2">
                    <input type="email" v-model="user.email" ref="email" placeholder="Email" class="form-control" />
                </div>
                <div class="form-outline flex-fill mb-2">
                    <input type="password" v-model="user.password" ref="password" placeholder="Password"
                        class="form-control" />
                </div>
                <div class="form-outline flex-fill mb-2">
                    <input type="password" v-model="user.repeatPassword" ref="repeatPassword"
                        placeholder="Repeat Password" class="form-control" />
                </div>
                <div class="d-flex flex-row justify-content-center gap-4">
                    <button type="button" class="btn btn-danger btn-lg" v-on:click="cancel">Cancel</button>
                    <button type="button" class="btn btn-success btn-lg" v-on:click="signup">Register</button>
                </div>
            </form>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
import Swal from 'sweetalert2';
export default {
    name: "RegisterPage",
    data() {
        return {
            user: {
                userId: 0,
                username: "",
                email: "",
                password: "",
                repeatPassword: ""
            }
        }
    },
    methods: {
        signup() {
            if (this.checkValidation()) {
                axios.post(this.hostname + "/api/users/", this.user)
                    .then(response => {
                        if (response.data.data.id > 0) {
                            Swal.fire("Successfully registered!").then(() => {
                                this.cancel();
                            });
                        }
                        else {
                            Swal.fire("An error occured. Please try again!");
                        }
                    }).catch(error => {
                        if (error.response) {
                            Swal.fire(error.response.data);
                        }
                    });
            }
        },
        cancel() {
            this.$router.push({ name: 'Login' });
        },
        checkValidation() {
            if (!this.user.username) {
                this.$refs.username.focus();
                Swal.fire("Please enter a valid username!");
                return;
            }
            if (!this.user.email) {
                this.$refs.email.focus();
                Swal.fire("Please enter a valid email!")
                return;
            }
            if (!this.user.password) {
                this.$refs.password.focus();
                Swal.fire("Please enter a valid password!")
                return;
            }
            if (this.user.password != this.user.repeatPassword) {
                this.$refs.password.focus();
                Swal.fire("Password and repeat password unmatched!");
                return;
            }
            return true;
        }
    },
}
</script>