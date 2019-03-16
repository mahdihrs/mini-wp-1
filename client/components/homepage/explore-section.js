Vue.component('explore-section', {
    props: ['explorecards', 'someonelogin'],
    data() {
        return {

        }
    },
    methods: {
        toRegister() {
            this.$emit('to-register')
        },
    },
    template: `
    <div>
        <div class="container d-flex mt-5">
            <div>
                <highlight-cards :cardObj="explorecards[1]"></highlight-cards>
            </div>
            <div class="mx-5">
                <list-cards :cardObj="explorecards[1]"></list-cards>
                <list-cards :cardObj="explorecards[0]"></list-cards>
                <list-cards :cardObj="explorecards[2]"></list-cards>
            </div>
            <div>
                <highlight-cards :cardObj="explorecards[4]"></highlight-cards>
            </div>
        </div>
        <div v-if="!someonelogin" class="container">
            <h6 style="text-align:right;color:#18BC9C" class="mt-5"><a href="#" class="no-underline-anchor-tag" @click="toRegister">See All Featured >> </a></h6>
        </div>
        <hr>
    </div>
    `
})