Vue.component('highlight-cards', {
    props: ['cardObj'],
    created() {
        this.checkImage()
        this.cardContentMethod()
    },
    data() {
        return {
            image: true,
            contentParsed: ''
        }
    },
    methods: {
        checkImage() {
            if (this.cardObj.image.length === 0) {
                this.image = false
            }
        },  
        toDetailArticle() {
            this.$emit('to-detail-article', this.cardObj._id)
        },
        cardContentMethod() {
            this.contentParsed = this.cardObj.content.substring(0, 50)
        },
        dateFormat(date) {
            return new Date(date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'})
        }
    },
    computed: {
        cardContent() {
            // return this.cardObj.content.substring(0, 50)
            this.contentParsed = this.cardObj.content.substring(0, 50)
        }
    },
    template: `
    <div class="row">
        <div class="col-2" >
        </div>
        <div class="card" style="width: 20rem;">
            <!-- <img src="https://proxy.duckduckgo.com/iu/?u=http%3A%2F%2Fd2jv9003bew7ag.cloudfront.net%2Fuploads%2FMarcel-Duchamp-LHOOQ-1919.jpg&f=1" class="card-img-top" alt="..."> -->
            <img v-if="image" :src="cardObj.image" class="card-img-top" alt="...">
            <img v-else src="../../assets/no_image_available.png" class="card-img-top" alt="...">
            <div class="card-body" @click="toDetailArticle">
                <a href="#" class="no-underline-anchor-tag blacked"><h5 class="card-title">{{ cardObj.title }}</h5></a>
                <a href="#" class="no-underline-anchor-tag blacked"><p class="card-text" v-html="contentParsed"></p></a>
                <small>Created At: {{ dateFormat(cardObj.created_at) }}</small></div>
            </div>
    </div>
    `
})