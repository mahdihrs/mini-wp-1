Vue.component('watched-tags', {
    props: ['articleswatchedbyme', 'userlogin'],
    created() {
        this.populateMyTags()
    },
    data() {
        return {
            tag: "",
            tags: []
        }
    },
    components: {
        vueTagsInput: vueTagsInput.default
    },
    methods: {
        populateMyTags() {
            // console.log(this.userlogin)
            this.userlogin.watchedtags.forEach(e => {
                this.tag = e
                this.tags.push({
                    text: this.tag,
                    tiClasses: ['ti-valid']
                })
                this.tag = ''
            })
        }
    },   
    template: `
        <div>
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
            <article-list-card :articledata="articleswatchedbyme"></article-list-card>
        </div>
    `
})