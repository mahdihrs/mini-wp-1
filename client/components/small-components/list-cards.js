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
        toDetailArticle(id) {

        }
    },
    computed: {
        cardContent() {
            return this.cardObj.content.substring(0, 25)
        },
        newCreatedDate() {

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
                <div class="card-body py-1 px-1" style="max-height: 101px">
                    <h5 class="my-0 card-title">{{ cardObj.title }}</h5>
                    <p class="card-text" v-html="cardContent"></p>
                    <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                </div>
            </div>
        </div>
    </div>
    `
})