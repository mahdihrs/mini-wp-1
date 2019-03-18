Vue.component('article-list-card', {
    props: ['articledata'],
    created() {
        this.getTags()
    },
    data() {
        return {
            tags: []
        }
    },
    methods: {
        getTags() {
            this.tags = this.articledata.tags
        },
        getMyArticles() {
            this.$emit('get-me-articles')
        },
        getDetail(id) {
            this.$emit('get-article-detail', id)
        },
        findByTag(id) {
            this.$emit('get-articles-by-tag', id)
        },
        dateFormat(date) {
            return new Date(date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'})
        }
    },
    template: `
    <div>
        <div class="col-10 my-3">
            <h5 style="font-weight: 700;" class="kumpakata-font"><a href="#" @click="getDetail(articledata._id)">{{ articledata.title }}</a></h5>
            <p v-html="articledata.content" style="font-size: 1em; max-height:100px; overflow-y: hidden;"></p>
            Tags:
            <span v-for="tag in tags"><a href="#" class="p-2 mx-2 my-2 no-underline-anchor-tag" style="max-height: 30px;" @click="findByTag(tag._id)">{{tag.name}}</a></span> <br>
            <small>Created At: {{ dateFormat(articledata.created_at) }}</small>
            <hr>
        </div>  
    </div>
    `
})