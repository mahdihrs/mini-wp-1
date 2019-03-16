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
        toDetailArticle(id) {

        },
        cardContentMethod() {
            // return this.cardObj.content.substring(0, 50)
            this.contentParsed = this.cardObj.content.substring(0, 50)
        },
    },
    computed: {
        cardContent() {
            // return this.cardObj.content.substring(0, 50)
            this.contentParsed = this.cardObj.content.substring(0, 50)
        },
        newCreatedDate() {

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
            <div class="card-body">
                <h5 class="card-title">{{ cardObj.title }}</h5>
                <p class="card-text" v-html="contentParsed"></p>
            </div>
        </div>
    </div>
    `
})