const server = axios.create({
    baseURL: `http://localhost:3000`
})

const serverUrl = `http://localhost:3000`

const app = new Vue({
    el: '#app',
    created() {
        this.verify()
        this.getArticles()
    },
    components: {

    },
    data: {
        isLogin: false,
        userLogin: {},
        allArticles: [],
        myArticles: [],
        articlesWatchedByMeThroughTags: [],
        //homepage
        signUpForm: false,
        headers: true,
        navbarHomepage: true,
        // mysites
        mysites: true,
        navbarMySites: false,
        myArticlesState: false,
        articleDetail: {},
        sidebar: true,
        fullArticleState: false,
        watchedTagsList: false,
        // explore section
        exploreSection: false,
        registerFormFromExplore: false,
        // navbarExplore: false,
        // post article
        writePost: false,
        navbarWritePost: false,
        //search results
        searchResults: [],
    },
    computed: {
        allArticlesForExplore() {
            let articlesForExplore = this.allArticles.splice(0, 5)
            return articlesForExplore
        }
    },
    methods: {
        //NAVIGATIONS
        verify() {
            if (!localStorage.getItem('token')) {
                this.isLogin = false
                this.homepage()
            } else {
                this.isLogin = true
                this.toMySites()
                this.getArticlesByMyWatchedTags()
            }
        },
        homepage() {
            this.signUpForm = false
            this.headers = true
            this.navbarHomepage = true
            this.navbarMySites = false
            this.writePost = false
            this.navbarWritePost = false
            this.exploreSection = false
            this.registerFormFromExplore = false
            this.myArticlesState = false
            this.fullArticleState = false
            this.sidebar = false
            this.mysites = false
            this.watchedTagsList = false
        },
        toExplore() {
            this.signUpForm = false
            this.headers = false
            this.exploreSection = true
            this.registerFormFromExplore = true
        },
        toRegisterForm() {
            this.headers = false
            this.signUpForm = true
            this.registerFormFromExplore = false
            this.exploreSection = false
        },
        setUserLogin(payload) {
            this.userLogin = payload
            this.isLogin = true
            setTimeout(() => {
                this.toMySites()
            }, 1000)
        },
        toMySites() {
            this.signUpForm = false
            this.headers = false
            this.navbarMySites = true
            this.navbarHomepage = false
            this.writePost = false
            this.navbarWritePost = false
            this.myArticlesState = true
            this.mysites = true
            this.sidebar = true
            this.myArticlesState = true
        },
        toWritePost() {
            this.signUpForm = false
            this.headers = false
            this.navbarMySites = false
            this.navbarHomepage = false
            this.writePost = true
            this.navbarWritePost = true
            this.myArticlesState = false
            // this.mysites = false
            this.watchedTagsList = false
        },
        toMyArticles() {
            this.myArticlesState = true
            this.fullArticleState = false
            this.watchedTagsList = false
        },
        toMyWatchList() {
            this.myArticlesState = false
            this.fullArticleState = false
            this.watchedTagsList = true
        },
        //TALKING TO SERVER
        getMyArticles() {
            server({
                url: `/articles/get-articles`,
                method: 'get',
                headers: {
                    access_token: localStorage.getItem('token')
                }
            })
            .then(({data}) => {
                this.myArticles = data
            })
            .catch(err => {
                console.log(err)
            })
        },
        getArticles() {
            server({
                url: `/articles`,
                method: 'get',
            })
            .then(({data}) => {
                this.allArticles = data
            })
            .catch(err => {
                console.log(err)
            })
        },
        searchArticle(payload) {
            server({
                url: `/articles/?search=${payload}`,
                method: 'get',
            })
            .then(({data}) => {
                this.searchResults = data
            })
            .catch(err => {
                console.log(err)
            })
        },
        getFullDetailArticle(id) {
            server({
                url: `/articles/${id}`,
                method: 'get',
                headers: {
                    access_token: localStorage.getItem('token')
                }
            })
            .then(({data}) => {
                this.articleDetail = data.data
                this.myArticlesState = false
                this.fullArticleState = true
            })
            .catch(err => {
                console.log(err)
            })
        },
        getArticlesByMyWatchedTags() {
            server({
                url: `/my-articles-based-on-watched-tags`,
                method: 'get',
                headers: {
                    access_token: localStorage.getItem('token')
                }
            })
            .then(({data}) => {
                this.articlesWatchedByMeThroughTags = data
            })
            .catch(err => {
                console.log(err)
            })
        }
    }
})