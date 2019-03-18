const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 2000
});

Vue.component('register-form', {
    props: ['tologin', 'googleuser'],
    created() {
        this.checkAddress()
        this.checkGoogleSignIn()
    },
    data() {
        return {
            email: '',
            password: '',
            watchedTags: '',
            name: '',
            tag: '',
            tags: [],
            signUpForm: true,
            loginForm: false
        }
    },
    components: {
        vueTagsInput: vueTagsInput.default
    },
    computed: {
        tagsBeingWathced() {
            return this.watchedTags.split(' ')
        }
    },
    methods: {
        checkGoogleSignIn() {
            if (this.googleuser.name) {
                this.name = this.googleuser.name
                this.email = this.googleuser.email
            }
        },  
        checkAddress() {
            if (this.tologin) {
                this.email = ''
                this.password = ''
                this.signUpForm = false
                this.loginForm = true
            } else {
                this.email = ''
                this.password = ''
                this.signUpForm = true
                this.loginForm = false
            }
        },
        getMyArticles() {
            this.$emit('get-my-articles')
        },
        getMyWatchedTagsList() {
            this.$emit('get-watched-tags')
        },
        showLoginForm() {
            this.email = ''
            this.password = ''
            this.signUpForm = false
            this.loginForm = true
        },
        showSignUpForm() {
            this.email = ''
            this.password = ''
            this.signUpForm = true
            this.loginForm = false
        },
        setUserLogin(payload) {
            this.$emit('set-user-login', payload)
        },
        register() {
            server({
                url: `/register`,
                method: 'post',
                data: {
                    email: this.email,
                    password: this.password,
                    name: this.name,
                    watchedTags: this.tags
                }
            })
            .then(({data}) => {
                Toast.fire({
                    type: 'success',
                    title: 'Registered in successfully'
                })
                localStorage.setItem('token', data.token)
                this.setUserLogin({
                    id: data.id,
                    name: data.name,
                    watchedtags: data.tags
                })
                this.getMyArticles()
                this.getMyWatchedTagsList()
            })
            .catch(err => {
                let errorsVal = ''
                if (!err.response.data.modelValidation) {
                    swal(`Internal server error!`)
                } else {
                    err.response.data.modelValidation.forEach(e => {
                        errorsVal += `${e} \n `
                    });
                }
                console.log(errorsVal)
            })
        },
        loginUser() {
            server({
                url: `/login`,
                method: 'post',
                data: {
                    email: this.email,
                    password: this.password
                }
            })
            .then(({data}) => {
                Toast.fire({
                    type: 'success',
                    title: 'Logged in successfully'
                })
                localStorage.setItem('token', data.token)
                this.setUserLogin({
                    id: data.id,
                    name: data.name,
                    watchedtags: data.tags
                })
                this.getMyArticles()
                this.getMyWatchedTagsList()
            })
            .catch(err => {
                if (err.response.data.msg) {
                    swal(`${err.response.data.msg}`, "", "error")
                } else {
                    swal(`Internal Server Error`, "", "error")
                }
            })
        }
    },
    template: `
    <div>
        <div class="container my-3">
            <img class="d-block" style="min-width: 940px; margin: 0 auto; text-align: center;" src="https://ginadrayer.com/wp-content/uploads/2015/03/cant-write.gif" />
        </div>
        <div class="container" v-if="signUpForm">
            <form class="justify-content-center" style="max-width: 500px; margin: 0 auto;" @submit.prevent="register">
                <legend style="text-align: center;">Register Form</legend>
                <div class="form-group">
                    <label for="exampleInputPassword1">Email</label>
                    <input style="margin: 0 auto;" type="text" class="form-control" placeholder="Email" v-model="email">
                </div>
                <div class="form-group">
                    <label>Name</label>
                    <input style="margin: 0 auto;" type="text" class="form-control" placeholder="Full Name" v-model="name">
                </div>
                <div class="form-group">
                    <label for="exampleInputPassword1">Password</label>
                    <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" v-model="password">
                </div>
                <template class="form-group">
                    <label>Watch Tags</label>
                    <div class="mb-3">
                        <vue-tags-input
                            v-model="tag"
                            :tags="tags"
                            @tags-changed="newTags => tags = newTags"
                            placeholder="e.g. 'Machine Learning' 'self-love'"
                        />
                    </div>
                </template>
                <button type="submit" class="btn btn-primary">Submit</button>
                <hr>
                <div class="row justify-content-center mt-3" style="margin: 0 auto;">
                    <p>Already have an account? <a href="#" @click="showLoginForm">Login</a></p>
                </div>
            </form>
        </div>
        <div id="loginFormUser">
            <div class="container" v-if="loginForm">
                <form class="justify-content-center" style="max-width: 500px; margin: 0 auto;" @submit.prevent="loginUser">
                    <legend style="text-align: center;">Login Form</legend>
                    <div class="form-group">
                        <label>Email</label>
                        <input style="margin: 0 auto;" type="text" class="form-control" placeholder="Email" v-model="email">
                    </div>
                    <div class="form-group">
                        <label for="exampleInputPassword1">Password</label>
                        <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" v-model="password">
                    </div>
                    <button type="submit" class="btn btn-primary">Submit</button>
                    <hr>
                    <div class="row justify-content-center mt-3" style="margin: 0 auto;">
                        <a href="#" @click="showSignUpForm">Sign Up</a>
                    </div>
                </form>
            </div>
        </div>        
    </div>
    `
})


{/* <div class="form-group">
<label>Watch Tags</label>
<input type="text" class="form-control" placeholder="e.g. 'Machine Learning' 'self-love' " v-model="watchedTags">
</div> */}