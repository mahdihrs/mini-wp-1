Vue.component('navbar-explore', {
    data() {
        return {
            
        }
    },
    methods: {
        toHomepage() {
            this.$emit('to-homepage')
        },
        toSignUpPage() {
            this.$emit('to-register-page')
        }
    },
    template: `
    <div>
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark d-flex">
            <div style="text-align: center; margin: 0 auto;">
                <a class="navbar-brand p-0 m-0" style="font-size: 2em;" href="#" @click="toHomepage">Kumpakata</a>
            </div>
            <button class="btn btn-primary" @click="toSignUpPage">Sign Up</button>
        </nav>
    </div>
    `
})