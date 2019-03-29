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
        articlesFindByTag: [],
        tagNameToFindArticles: '',
        oAuthSignUpData: {},
        showFullArticleGeneralData: {},
        //homepage
        signUpForm: false,
        headers: true,
        navbarHomepage: true,
        fullArticleGeneralExplore: false,
        // mysites
        mysites: true,
        fullArticleGeneral: false,
        navbarMySites: false,
        myArticlesState: false,
        articleDetail: {},
        sidebar: true,
        fullArticleState: false,
        watchedTagsList: false,
        findArticlesByTagState: false,
        directToLogin: false,
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
    watch: {
        // searchResults(v) {
        //     console.log(v)
        // }
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
                this.populateUserInfo()
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
            this.directToLogin = false
            this.fullArticleGeneral = false
            this.fullArticleGeneralExplore = false
        },
        toExplore() {
            this.signUpForm = false
            this.headers = false
            this.exploreSection = true
            this.registerFormFromExplore = true
            this.fullArticleGeneral = false
            this.fullArticleGeneralExplore = false
        },
        toLoginForm() {
            this.headers = false
            this.signUpForm = true
            this.registerFormFromExplore = false
            this.exploreSection = false
            this.directToLogin = true
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
        toFullArticleFromExplore() {
            this.signUpForm = false
            this.headers = false
            this.navbarHomepage = true
            this.navbarMySites = false
            this.writePost = false
            this.navbarWritePost = false
            this.exploreSection = false
            this.registerFormFromExplore = false
            this.myArticlesState = false
            this.fullArticleState = false
            this.sidebar = false
            this.mysites = true
            this.watchedTagsList = false
            this.directToLogin = false
            this.fullArticleGeneral = false
            this.fullArticleGeneral = false
            this.fullArticleGeneralExplore = true
        },
        toFullArticleGeneral() {
            this.signUpForm = false
            this.headers = false
            this.navbarHomepage = false
            this.navbarMySites = true
            this.writePost = false
            this.navbarWritePost = false
            this.exploreSection = false
            this.registerFormFromExplore = false
            this.myArticlesState = false
            this.fullArticleState = false
            this.sidebar = false
            this.mysites = true
            this.watchedTagsList = false
            this.directToLogin = false
            this.fullArticleGeneral = false
            this.fullArticleGeneral = true
            this.fullArticleGeneralExplore = false
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
            this.fullArticleState = false
        },
        toWritePost() {
            this.signUpForm = false
            this.headers = false
            this.navbarMySites = false
            this.navbarHomepage = false
            this.writePost = true
            this.navbarWritePost = true
            this.myArticlesState = false
            this.mysites = false
            this.watchedTagsList = false
        },
        toMyArticles() {
            this.myArticlesState = true
            this.fullArticleState = false
            this.watchedTagsList = false
            this.findArticlesByTagState = false
        },
        toMyWatchList() {
            this.myArticlesState = false
            this.fullArticleState = false
            this.watchedTagsList = true
            this.findArticlesByTagState = false
        },
        toFindByTag() {
            this.myArticlesState = false
            this.fullArticleState = false
            this.watchedTagsList = false
            this.findArticlesByTagState = true
        },
        toMySitesGetAllArticles() {
            this.getMyArticles()
            this.getArticlesByMyWatchedTags()
            this.findArticlesByTag()
            setTimeout(() => {
                this.toMySites()
            }, 2000)
        },
        fullArticleFromExplore(payload) {
            this.showFullArticleGeneralData = payload
            // setTimeout(() => {
            //     this.toFullArticleGeneral()
            // }, 2500)
            this.toFullArticleFromExplore()
        },
        setArticleData(payload) {
            // console.log(payload)
            this.showFullArticleGeneralData = payload
            setTimeout(() => {
                this.toFullArticleGeneral()
            }, 2500)
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
                if (payload.length === 0) {
                    this.searchResults = []
                } else {
                    this.searchResults = data
                }
            })
            .catch(err => {
                console.log(err)
            })
        },
        getFullDetailArticle(payload) {
            let checkKey = payload.split(',')
            if (checkKey.length === 2) {
                payload = checkKey[0]
            } 
            
            server({
                url: `/articles/${payload}`,
                method: 'get',
                headers: {
                    access_token: localStorage.getItem('token')
                }
            })
            .then(({data}) => {
                console.log(data)
                // console.log(checkKey)
                this.articleDetail = data
                if (checkKey.length === 2) {
                    this.toMySites()
                    this.fullArticleGeneralExplore = false
                }
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
        },
        populateUserInfo(payload) {
            this.userLogin = {}
            server({
                url: `/get-user-info`, 
                method: 'get',
                headers: {
                    access_token: localStorage.getItem('token')
                }
            })
            .then(({data}) => {
                if (payload) {
                    this.getArticlesByMyWatchedTags()
                }
                this.userLogin = {
                    id: data._id,
                    name: data.name,
                    watchedtags: data.watchedTags
                }
            })
            .catch(err => {
                console.log(err)
            })
        },
        findArticlesByTag(id) {

            server({
                url: `/articles/find-by-tags/${id}`,
                method: 'get',
            })
            .then(({data}) => {
                this.toFindByTag()
                this.articlesFindByTag = data.articles
                this.tagNameToFindArticles = data.tag
            })
            .catch(err => {
                console.log(err)
            })
        },
        logout() {
            signOut()
            // localStorage.removeItem('token')
            this.homepage()
        }
    }
})

function onSignIn(googleUser) {
    if(localStorage.getItem('token')) {
        swal('You are already logged in')
    }
    
    const id_token = googleUser.getAuthResponse().id_token;
    server({
        url: `/login`,
        method: 'post',
        data: {
            token: id_token
        }
    })
    .then(({data}) => {
        if (data.token) {
            localStorage.setItem('token', data.token)
            app.isLogin = true
            app.toMySites()
        } else {
            app.oAuthSignUpData = {
                name: data.name,
                email: data.email
            }
            setTimeout(() => {
                app.toRegisterForm()
            }, 2000)
        }
    })
    .catch(err => {
        console.log(err)
    })
}

function signOut() {
    if (gapi.auth2) {
        const auth2 = gapi.auth2.getAuthInstance();
        auth2.signOut()
        .then(function () {
            app.oAuthSignUpData = {} 
            localStorage.removeItem('token')
            localStorage.removeItem('id')
            app.isLogin = false
            app.homepage()
            swal('You signed out successfully.')
        });
    } else {
        localStorage.removeItem('token')
        localStorage.removeItem('id')
        app.isLogin = false
        app.homepage()
        swal('You signed out successfully.')        
    }
}