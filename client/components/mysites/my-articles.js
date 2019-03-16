Vue.component('my-articles-content', {
    props: ['myarticles'],
    created() {
        this.getMyArticles()
    },
    methods: {
        getMyArticles() {
            this.$emit('get-me-articles')
        },
        getDetail(payload) {
            this.$emit('get-article-detail', payload)
        }
    },
    template: `
        <div>
            <h1 class="kumpakata-font">Your Stories</h1>
            <hr class="ml-0 col-10">
            <article-list-card @get-article-detail="getDetail" :articledata="myarticles"></article-list-card>
        </div>
    `
})