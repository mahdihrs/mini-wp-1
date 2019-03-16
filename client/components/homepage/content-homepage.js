Vue.component('content-homepage', {
    data() {
        return {

        }
    },
    methods: {
        registerForm() {
            this.$emit('to-register-form')
        }
    },
    template: `
    <div style="background-color: #152744;">
        <div class="jumbotron mb-1">
            <h1 class="display-3">Kumpakata  <i class="fas fa-signature"></i></h1>
            <hr class="my-4">
            <p class="lead">“You don’t start out writing good stuff. You start out writing crap and thinking it’s good stuff, and then gradually you get better at it. That’s why I say one of the most valuable traits is persistence.”</p>
            <p><strong>―Octavia E. Butler</strong></p>
            <p class="lead">
            <a class="btn btn-primary btn-lg" href="#" role="button" @click="registerForm">Getting Started</a>
            </p>
        </div>
    </div> 
    `
})

{/* <div class="d-flex">
<div class="col-6 mt-1">
    <img class="vh-100 ml-0" src="https://images.pexels.com/photos/6375/quote-chalk-think-words.jpg?auto=compress&cs=tinysrgb&h=400&w=950"/>
</div>
<div class="align-items-center col-6 mx-5" style="max-width: 600px; display: inline-block; vertical-align: middle;">
    <blockquote class="blockquote align-items-center container">
        <p class="mb-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>
        <footer class="blockquote-footer">Someone famous in <cite title="Source Title">Source Title</cite></footer>
    </blockquote>
</div>
</div>
<div class="d-flex flex-row-reverse mt-3">
<div class="col-6">
    <img class="vh-100 ml-0" src="https://images.pexels.com/photos/19677/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=400&w=950"/>
</div>
<div class="align-items-center col-6 mx-5" style="max-width: 600px; display: inline-block; vertical-align: middle;">
    <img style="max-width: 2500px; max-height: 100px;" src="https://i.pinimg.com/originals/20/2c/04/202c0434d5e0b0ae2bc475b065256b4e.jpg"/>
</div>
</div> */}