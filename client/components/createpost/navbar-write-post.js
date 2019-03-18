Vue.component('navbar-write-post', {
    template: `
        <div>
            <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <button type="button" class="btn btn-primary" id="write-btn" @click="toMySites">My Sites</button>
                </div>
            </nav>
        </div>
    `,
    methods: {
        toMySites() {
            this.$emit('to-my-site')
        }
    }
})

{/* <ul class="navbar-nav mr-auto" id="navbarNav">
<li class="nav-item active">
    <a href="#" class="nav-link cont-nav" @click="toMySites">My Sites</a>
</li>
<!-- <li class="nav-item active">
    <a href="#" class="nav-link cont-nav">User: Japra</a>
</li> -->
</ul> */}