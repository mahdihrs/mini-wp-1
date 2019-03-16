Vue.component('article-list-card', {
    props: ['articledata'],
    methods: {
        getMyArticles() {
            this.$emit('get-me-articles')
        },
        getDetail(id) {
            this.$emit('get-article-detail', id)
        }
    },
    template: `
    <div>
        <div v-for="article in articledata" class="col-10 my-3">
            <h5 style="font-weight: 700;" class="kumpakata-font"><a href="#" @click="getDetail(article._id)">{{ article.title }}</a></h5>
            <p v-html="article.content" style="font-size: 1em; max-height:100px; overflow-y: hidden;"></p>
            <p>DEDIT OLE DEDI</p>
            <hr>
        </div>    
    </div>
    `
})