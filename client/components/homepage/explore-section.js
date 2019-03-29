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
        toFullArticle(id) {
            // this.$emit('to-detail-article', payload)
            server({
                url: `/articles/${id}`,
                method: 'get',
                headers: {
                    access_token: localStorage.getItem('token')
                }
            })
            .then(({data}) => {
                this.$emit('data-payload-to-show', data)
            })
            .catch(err => {
                console.log(err)
            })
        }
    },
    template: `
    <div>
        <div class="container d-flex mt-5">
            <div>
                <highlight-cards @to-detail-article="toFullArticle" :cardObj="explorecards[0]"></highlight-cards>
            </div>
            <div class="mx-5">
                <list-cards @to-detail-article="toFullArticle" :cardObj="explorecards[1]"></list-cards>
                <list-cards @to-detail-article="toFullArticle" :cardObj="explorecards[2]"></list-cards>
                <list-cards @to-detail-article="toFullArticle" :cardObj="explorecards[3]"></list-cards>
            </div>
            <div>
                <highlight-cards @to-detail-article="toFullArticle" :cardObj="explorecards[4]"></highlight-cards>
            </div>
        </div>
        <div v-if="!someonelogin" class="container">
            <h6 style="text-align:right;color:#18BC9C" class="mt-5"><a href="#" class="no-underline-anchor-tag" @click="toRegister">See All Featured >> </a></h6>
        </div>
        <hr>
    </div>
    `
})