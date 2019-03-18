Vue.component('watched-tags', {
    props: ['articleswatchedbyme', 'userlogin'],
    created() {
        this.populateMyTags()
    },
    data() {
        return {
            tag: "",
            tags: [],
            loading: false,
            reduce: [],
            add: []
        }
    },
    watch: {
        tags(newVal, oldVal) {
            this.add = []
            this.reduce = []
            //kalo berubah langsung tampilin loading ("Fetching the articles")
            //abis itu tembak ke server untuk ambil article dengan watched tags terbaru
            if (newVal.length !== oldVal.length) {
                this.loading = true
                let newValue = [...newVal]
                let oldValue = [...oldVal]
                if (newValue.length < oldValue.length) {
                    //reduce
                    //berarti nyari value di old val yang ga ada di new val
                    oldValue.forEach(old => {
                        let idx = newValue.findIndex(e => e.text == old.text)
                        oldValue.splice(idx, 1)
                    })
                    this.reduce.push(oldValue[0].text)
                } else if (newValue.length > oldValue.length) {
                    //add
                    this.add.push(newValue[newValue.length - 1].text)
                }
                server({
                    url: `/edit-watched-tag`,
                    method: 'post',
                    headers: {
                        access_token: localStorage.getItem('token')
                    },
                    data: {
                        add: this.add,
                        reduce: this.reduce
                    }
                })
                .then(({data}) => {
                    setTimeout(() => {
                        this.loading = false
                        this.$emit('populate-user-info-after-tag-update', 'yes')
                        // this.populateMyTags()
                    }, 1000)
                    this.add = []
                    this.reduce = []
                })
                .catch(err => {
                    console.log(err)
                })
            }
        }
    },
    components: {
        vueTagsInput: vueTagsInput.default
    },
    methods: {
        populateMyTags() {
            this.userlogin.watchedtags.forEach(e => {
                this.tag = e
                this.tags.push({
                    text: this.tag,
                    tiClasses: ['ti-valid']
                })
                this.tag = ''
            })
        },
        getArticlesByTag(id) {
            this.tags = []
            this.loading = true
            setTimeout(() => {
                this.loading = false
                this.$emit('get-articles-by-tag', id)
            }, 1000)
        },
        getGeneralDetail(id) {
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
            <div v-if="loading" id="loading" style="margin: 0 auto;" class="d-flex justify-content-center">
                <img src="https://thumbs.gfycat.com/LameDifferentBalloonfish-small.gif">
            </div>
            <div v-else>
                <h2 class="kumpakata-font">Watched Tags</h2>
                <p class="ml-5 kumpakata-font">These articles are suggested by tags being watched by you.</p>
                <template>
                    <div class="mb-3">
                        <vue-tags-input
                        v-model="tag"
                        :tags="tags"
                        @tags-changed="newTags => tags = newTags"
                        />
                    </div>
                </template>
                <hr class="col-9 ml-1" style="max-height: 745px;">
                <div v-for="article in articleswatchedbyme">
                    <article-list-card @get-article-detail="getGeneralDetail" @get-articles-by-tag="getArticlesByTag" :articledata="article"></article-list-card>
                </div>
            </div>
        </div>
    `
})