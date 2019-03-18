Vue.component('my-articles-content', {
    props: ['myarticles', 'searchresult'],
    created() {
        this.getMyArticles()
    },
    data() {
        return {
            loading: false,
            fetchingarticlesbysearchresult: false,
            myarticlesstate: true
        }
    },
    watch: {
        searchresult(v) {
            this.loading = true
            if (v.length === 0) {
                setTimeout(() => {
                    this.loading = false
                    this.fetchingarticlesbysearchresult = false
                    this.myarticlesstate = true
                }, 1500)
            } else {
                setTimeout(() => {
                    this.loading = false
                    this.fetchingarticlesbysearchresult = true
                    this.myarticlesstate = false
                }, 1500)
            }
        }
    },
    methods: {
        getMyArticles() {
            this.$emit('get-me-articles')
        },
        getDetail(payload) {
            this.loading = true
            setTimeout(() => {
                this.loading = false
                this.$emit('get-article-detail', payload)
            }, 1000)
        },
        getArticlesByTag(id) {
            this.loading = true
            setTimeout(() => {
                this.loading = false
                this.$emit('get-articles-by-tag', id)
            }, 1000)
        }
    },
    template: `
        <div>
            <div v-if="fetchingarticlesbysearchresult">
                <div v-for="article in searchresult">
                    <article-list-card @get-articles-by-tag="getArticlesByTag" :articledata="article"></article-list-card>
                </div>
            </div>
            <div v-if="loading" id="loading" style="margin: 0 auto;" class="d-flex justify-content-center">
                <img src="https://thumbs.gfycat.com/LameDifferentBalloonfish-small.gif">
            </div>
            <div v-if="myarticlesstate">
                <h1 class="kumpakata-font">Your Stories</h1>
                <hr class="ml-0 col-10">
                <div v-for="article in myarticles">
                    <article-list-card @get-articles-by-tag="getArticlesByTag" @get-article-detail="getDetail" :articledata="article"></article-list-card>
                </div>
            </div>
        </div>
    `
})