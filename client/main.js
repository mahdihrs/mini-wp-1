const server = axios.create({
    baseURL: `http://localhost:3000`
})

const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000
});

const app = new Vue({
    el: '#app',
    created() {

    },
    components: {
        wysiwyg: vueWysiwyg.default.component,
        vueTagsInput: vueTagsInput.default
    },
    data: {
        isLogin: true,
        userLogin: {},
        signUpForm: false,
        headers: true,
        navbarHomepage: true,
        navbarMySites: false,
        writePost: false,
        navbarWritePost: false,
        forms: false,
        email: '',
        password: '',
        watchedTags: '',
        name: '',
        signUpForm: false,
        loginForm: false,
        title: '',
        content: '',
        tag: '',
        tags: [],
    },
    computed: {
        tagsBeingWathced() {
            return this.watchedTags.split(' ')
        }
    },
    methods: {
        homepage() {
            this.signUpForm = false
            this.headers = true
            this.navbarHomepage = true
            this.navbarMySites = false
            this.writePost = false
            this.navbarWritePost = false
        },
        toRegisterForm() {
            this.headers = false
            this.signUpForm = true
        },
        setUserLogin(payload) {
            this.userLogin = payload
            setTimeout(() => {
                this.toMySites()
            }, 2000)
        },
        toMySites() {
            this.signUpForm = false
            this.headers = false
            this.navbarMySites = true
            this.navbarHomepage = false
            this.writePost = false
            this.navbarWritePost = false
            this.signUpForm = false
            this.loginForm = false
        },
        toWritePost() {
            this.signUpForm = false
            this.headers = false
            this.navbarMySites = false
            this.navbarHomepage = false
            this.writePost = true
            this.navbarWritePost = true
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
        register() {
            server({
                url: `/register`,
                method: 'post',
                data: {
                    email: this.email,
                    password: this.password,
                    name: this.name,
                    watchedTags: this.tagsBeingWathced
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
                    name: data.name
                })
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
                    name: data.name
                })
            })
            .catch(err => {
                if (err.response.data.msg) {
                    swal(`${err.response.data.msg}`, "", "error")
                } else {
                    swal(`Internal Server Error`, "", "error")
                }
            })
        },
        postArticle() {
            let data = {
                title: this.title,
                content: this.content,
                tag: this.tags
            }
            let postReady = new FormData()
            postReady.append("image", this.file)
            postReady.append("data", JSON.stringify(data))
            this.$emit('post-article', postReady)
        },
        getFile(e) {
            this.file = e.target.files[0]
        }
    }
})