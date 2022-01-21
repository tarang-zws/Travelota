<template>
    <div class="jumbotron">
        <div class="container">
            <div class="row">
                <div class="col-sm-8 offset-sm-2">
                    <div>
                        <p class="h4 text-center mb-4">Sign in</p>
                        <form @submit.prevent="handleSubmit">
                            
                            <div class="form-group">
                                <label for="email">Email</label>
                                <input type="text" v-model="user.email" id="email" name="email" class="form-control" :class="{ 'is-invalid': submitted && $v.user.email.$error }" />
                                <div v-if="submitted && $v.user.email.$error" class="invalid-feedback">
                                    <span v-if="!$v.user.email.required">Email is required</span>
                                    <span v-if="!$v.user.email.email">Email is invalid</span>
                                     
                                </div>
                                
                            </div>
                            <div class="form-group">
                                <label for="password">Password</label>
                                <input type="password" v-model="user.password" id="password" name="password" class="form-control" :class="{ 'is-invalid': submitted && $v.user.password.$error }" />
                                <div v-if="submitted && $v.user.password.$error" class="invalid-feedback">
                                    <span v-if="!$v.user.password.required">Password is required</span>
                                    <span v-if="!$v.user.password.minLength">Password must be at least 6 characters</span>
                                    
                                </div>
                            </div>
                            <span v-if="user.email !=='' && user.password !==''">
                                    <p v-if=" submitted && (user.email !== 'demo@gmail.com' || user.password !=='demo@4545' )"  class="invalid">The username or password you have entered is incorrect. Please try again.</p>
                            </span>
                            <div class="form-group">
                                <button class="btn btn-primary" @click="Login">Login</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { required, email, minLength , sameAs} from "vuelidate/lib/validators";

    export default {
        name: "app",
        data() {
        return {
            
            user: {
                firstName: "",
                lastName: "",
                email: "",
                password: "",
                confirmPassword: "",
                
            },
            submitted: false,
            isValidationAllowed: false,
            
        };
        },
        computed: {
            validated() {
            return this.isValidationAllowed && !this.searchTerm
            }
        },
        validations: {
            user: {
                firstName: { required },
                lastName: { required },
                email: { required, email },
                password: { required, minLength: minLength(6) },
            }
        },
        methods: {
            handleSubmit(e) {
                this.submitted = true;
                // stop here if form is invalid
                this.$v.$touch();
                if (this.$v.$invalid) {
                    return;
                }
            },
            Login(){
                console.log("here in Login");
                if(this.user.email == "demo@gmail.com" && this.user.password=="demo@4545")
                {
                    this.$router.push('/hotel_search')
                }
            }
    
                


        }
    };
</script>