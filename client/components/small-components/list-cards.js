Vue.component('list-cards', {
    props: ['cardObj'],
    created() {
        this.checkImage()
    },
    data() {
        return {
            image: true
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
        dateFormat(date) {
            return new Date(date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'})
        }
    },
    computed: {
        cardContent() {
            return this.cardObj.content.substring(0, 25)
        }
    },
    template: `
    <div class="card mb-3" style="max-width: 430px !important; max-height: 101px">
        <div class="row no-gutters" style="max-height: 101px">
            <div class="col-md-4">
                <!-- <img src="https://proxy.duckduckgo.com/iu/?u=http%3A%2F%2Fd2jv9003bew7ag.cloudfront.net%2Fuploads%2FMarcel-Duchamp-LHOOQ-1919.jpg&f=1" class="card-img-top card-img" alt="..." height="100px"> -->
                <img v-if="image" :src="cardObj.image" class="card-img-top card-img" alt="..." height="100px" >
                <img v-else style="max-height:90px;" src="../../assets/no_image_available.png" class="card-img-top card-img" alt="..." height="100px" >
            </div>
            <div class="col-md-8 col-12" style="max-height: 101px">
                <div class="card-body py-1 px-1" style="max-height: 101px" @click="toDetailArticle">
                    <a href="#" class="card-text no-underline-anchor-tag blacked"><h5 class="my-0 card-title no-underline-anchor-tag blacked">{{ cardObj.title }}</h5></a>
                    <a href="#" class="card-text no-underline-anchor-tag blacked" v-html="cardContent"></a> <br>
                    <!-- <p href="#" class="card-text no-underline-anchor-tag blacked"><small class="text-muted">Last updated 3 mins ago</small></a> -->
                    <small>Created At: {{ dateFormat(cardObj.created_at) }}</small></div>
                </div>
            </div>
        </div>
    </div>
    `
})