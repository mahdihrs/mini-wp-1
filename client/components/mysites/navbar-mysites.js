Vue.component('navbar-mysites', {
    data() {
        return {
            keyword: ''
        }
    },
    watch: {
        keyword(v) {
            console.log(v)
            this.searchArticle(v)
        }
    },
    methods: {
        toHomepage() {
            this.$emit('to-homepage')
        },
        tempToWritePost() {
            this.$emit('to-write-post')
        },
        searchArticle(value) {
            this.$emit('search-article', value)
        },
        getMyArticles() {
            this.$emit('get-me-articles')
        },
    },
    template: `
    <div>
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark" style="max-height: 75px;">
            <!-- <a class="mx-3 collapsed" data-toggle="collapse" href="#" role="button" aria-expanded="false" aria-controls="collapseExample" style="height: 30px;">
                <h4 style="color: yellow;" class="mb-0"><i class="fas fa-ellipsis-h"></i></h4>
            </a> -->
            <a class="navbar-brand" href="#"><i style="font-size: 2em;" class="fas fa-signature" @click="toHomepage"></i></a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor02" aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
        
            <div class="collapse navbar-collapse col-10" id="navbarColor02">
                <input class="form-control mr-sm-2 hw-100 col-10" type="text" placeholder="Search" v-model="keyword">
            </div>
            <div href=""><i class="fas fa-bell" style="font-size: 1.5em;"></i></div>
            <button class="ml-3" @click="tempToWritePost">Write</button>
        </nav>
        <div id="sideMenuH" class="mr-3 px-4 py-3 border col-1.5 collapse" style="max-width: 200px; position: absolute; max-height: 700px; overflow-y: auto;">
            <p id="sub-title">Functional Buttons</p>
            <a href="#" style="color: red !important;" class="side-button" ><img src="https://img.icons8.com/wired/48/000000/google-sites.png" height="25px" alt="" class="pb-1"> General</a><br>
            <a href="#" style="color: red !important;" class="side-button" ><img src="https://img.icons8.com/wired/64/000000/note.png" height="25px" alt="" class="pb-1" @click="getMyArticles"> My Articles</a><br>
            <a href="#" class="side-button"><img src="https://img.icons8.com/wired/64/000000/imac.png" height="25px" class="pb-1"> View Site</a><br>
            <a href="#" class="side-button"><img src="https://img.icons8.com/wired/64/000000/bar-chart.png" height="25px" class="pb-1"> Stats</a><br>
            <br>
            <p id="sub-title">Manage</p>
            <a class="side-button"><img src="https://img.icons8.com/wired/64/000000/activity-feed.png" height="25px" class="pb-1"> Activity</a><br>
            <a class="side-button"><img src="https://img.icons8.com/wired/64/000000/realtime-protection.png" height="25px" class="pb-1"> Plan</a><br>
            <a class="side-button"><img src="https://img.icons8.com/wired/64/000000/play.png" height="25px" alt="" class="pb-1"> Media</a><br>
            <a class="side-button"><img src="https://img.icons8.com/wired/64/000000/comments.png" height="25px" alt="" class="pb-1"> Comments</a><br>
            <a class="side-button" ><img src="https://img.icons8.com/wired/64/000000/zoom-in.png" height="25px" alt="" class="pb-1"> Search</a><br> <!-- v-on:click="searchBar = true; blogPost = false;" -->
            <a class="side-button"><img src="https://img.icons8.com/wired/64/000000/plugin.png" height="25px" class="pb-1"> Plugins</a><br>
            <a class="side-button">Import</a><br>
            <br>
            <p id="sub-title">Personalize</p>
            <a class="side-button">Customize</a><br>
            <br>
            <p id="sub-title">Configure</p>
            <a class="side-button">Sharing</a><br>
            <a class="side-button">People</a><br>
            <a class="side-button">Domains</a><br>
            <a class="side-button">Settings</a><br>
            <br>
            <p id="sub-title">Add New Site</a></p><br>
        </div>
    </div>
    `
})

{/* <button class="btn btn-secondary my-2 my-sm-0" type="submit">Search</button> */}
{/* <form class="form-inline my-2 my-lg-0 col-12 ml-5"> */}
{/* </form> */}