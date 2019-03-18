Vue.component('side-bar', {
    data() {
        return {

        }
    },
    methods: {
        getMyArticles() {
            this.$emit('get-me-articles')
        },
        toWatchedTags() {
            this.$emit('my-watched-tags')
        }
    },
    template: `
    <div id="sideMenu" class="mr-3 ml-0 px-4 py-3 border">
        <p id="sub-title">Functional Buttons</p>
        <a href="#" class="side-button no-underline-anchor-tag" @click="toWatchedTags"><img src="https://img.icons8.com/wired/48/000000/google-sites.png" height="25px" alt="" class="pb-1"> Watched Tags</a><br>
        <a href="#" class="side-button no-underline-anchor-tag" @click="getMyArticles"><img src="https://img.icons8.com/wired/64/000000/note.png" height="25px" alt="" class="pb-1"> My Articles</a><br>
        <a href="#" class="side-button no-underline-anchor-tag"><img src="https://img.icons8.com/wired/64/000000/imac.png" height="25px" class="pb-1"> View Site</a><br>
        <a href="#" class="side-button no-underline-anchor-tag"><img src="https://img.icons8.com/wired/64/000000/bar-chart.png" height="25px" class="pb-1"> Stats</a><br>
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
    `
})