Vue.component('navbar-homepage', {
    props: ['explore', 'registerform', 'someonelogin', 'signup', 'headers'],
    data() {
        return {
            // exploreSection: false
        }
    },
    methods: {
        loginGithub() {
            window.location.href = `http://localhost:3000/login-github`
            // server({
            //     url: `/login-github`,
            //     method: 'get',
            //     // headers: {'origin': 'http://localhost:3000'}
            // })
            // .then(({data}) => {
            //     console.log(data)
            // })
            // .catch(err => {
            //     console.log(err)
            // })
        },
        toExploreSect() {
            this.$emit('to-explore-section')
        },
        toHomepage() {
            this.$emit('to-homepage')
        },
        toRegister() {
            this.$emit('to-register-page')
        },
        toMySite() {
            if (!localStorage.getItem('token')) {
                swal('Oops! Look you haven\'t been login, please to login menu to access this page =)')
            }
            this.$emit('to-my-site')
        },
        loginUser() {
            this.$emit('login-user', 'login')
        }
    },
    template: `
    <div>
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark d-flex">
            <button class="btn btn-primary" @click="toExploreSect">Explore</button>
            <button class="btn btn-primary mx-3" v-if="!someonelogin" @click="loginUser">Login</button>
            <div class="g-signin2" data-onsuccess="onSignIn" style="max-width: 100px;"></div>
            <div style="text-align: center; margin: 0 auto;">
                <a class="navbar-brand p-0 m-0" style="font-size: 2em;" href="#" @click="toHomepage">Kumpakata</a>
                </div>
                <div v-if="explore && registerform && !someonelogin"><template class="mt-1" style="font-size=0.3em;">Need More Access?</template><button class="btn btn-primary" @click="toRegister">Register</button></div>
                <!-- <div v-if="!explore && !someonelogin || !registerform && !someonelogin"> -->
                <div v-if="headers && someonelogin">
                    <button @click="toMySite" class="btn btn-primary">Posts</button>
                    <!-- <button class="btn btn-primary" @click="loginGithub">Git</button> -->
                </div>
        </nav>
    </div>
    `
})

// href="https://cors-anywhere.herokuapp.com/https://github.com/login?client_id=d60666e6cdf348adbba5&return_to=%2Flogin%2Foauth%2Fauthorize%3Fclient_id%3Dd60666e6cdf348adbba5%26redirect_uri%3Dhttp%253A%252F%252Flocalhost%253A3000%252Fauth%252Fgithub%252Fcallback%26response_type%3Dcode"