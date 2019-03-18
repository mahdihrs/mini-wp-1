Vue.component('article-detail', {
    props: ['fullarticle'],
    data() {
        return {
            seeFullDetailArticle: true,
            editArticle: false,
            doneEditingButton: false,
            title: '',
            content: '',
            tag: '',
            tags: [],
            file: '',
            image: '',
            loading: false
        }
    },
    computed: {
        tagName() {
            this.tags.map(e => e.name)
        }
    },
    components: {
        wysiwyg: vueWysiwyg.default.component
    },
    methods: {
        editFullArticle() {
            this.seeFullDetailArticle = false
            this.editArticle = true
            this.doneEditingButton = true
            this.populateData()
        },
        fullArticle() {
            this.seeFullDetailArticle = true
            this.editArticle = false
            this.doneEditingButton = false
        },
        populateData() {
            console.log(this.fullarticle._id)
            this.tags = []
            server({
                url: `/articles/${this.fullarticle._id}`,
                method: 'get',
                headers: {
                    access_token: localStorage.getItem('token')
                }                
            })
            .then(({data}) => {
                console.log(data)
                this.title = data.title
                this.content = data.content
                this.image = data.image
                // this.tags = data.tags
                data.tags.forEach(tag => {
                    this.tags.push(tag.name)
                })
            })
            .catch(err => {
                console.error(err)
            })
        },
        deletePost() {
            this.loading = true
            swal({
                    title: "Are you sure?",
                    text: "Once deleted, you will not be able to recover this article!",
                    icon: "warning",
                    buttons: true,
                    dangerMode: true,
                })
                .then((willDelete) => {
                    if (willDelete) {
                        return server({
                            url: `/articles/${this.fullarticle._id}`,
                            method: 'delete',
                            headers: {
                                access_token: localStorage.getItem('token')
                            }
                        })
                        .then(() => {
                            this.loading = false
                            this.backToMySites()
                            swal("Your post has been deleted!", {
                                icon: "success",
                            });
                        })
                    } 
                })
                .catch(err => {
                    console.error(err)
                })
        },
        backToMySitesGetArticlesWatchedAndGetAllArticles() {
            this.$emit('back-to-my-sites')
        },
        updateData() {
            this.loading = true
            let tagsToUpdate = []
            this.tags.forEach(e => {
                tagsToUpdate.push({
                    text: e,
                    tiClasses: ['ti-valid']
                })                    
            })
            let readyToUpdate = {
                title: this.title,
                content: this.content,
                image: this.image,
                tags: this.tags
            }
            server({
                url: `/articles/${this.fullarticle._id}`,
                method: 'put',
                headers: {
                    access_token: localStorage.getItem('token')
                },
                data: readyToUpdate
            })
            .then(updated => {
                this.backToMySitesGetArticlesWatchedAndGetAllArticles()
                swal("Success!", "Your article has been successfully edited!", "success");
                setTimeout(() => {
                    this.loading = false
                }, 2500)
            })
            .catch(err => {
                console.error(err)
            })                    
        },
        getFile(e) {
            this.file = ''
            this.image = ''
            this.tags = []
            this.tag = ''
            this.file = e.target.files[0]

            let getImageTags = new FormData()
            getImageTags.append("image", this.file)
            server({
                url: `/articles/generate-tags`,
                method: 'post',
                headers: {
                    access_token: localStorage.getItem('token')
                },
                data: getImageTags
            })
            .then(({data}) => {
                if (data) {
                    CreatingArticleSucceed.fire({
                        type: 'success',
                        title: 'You can use or remove this "Auto-Generate Tags" feature.^^'
                    })
                    data.labels.forEach(e => {
                        this.tag = e
                        this.tags.push({
                            text: this.tag,
                            tiClasses: ['ti-valid']
                        })
                        this.tag = ''
                    })
                    this.image = data.image
                }
            })
            .catch(err => {
                console.log(err)
            })
        },
    },
    template: `
    <div class="my-5 col-12">
        <div v-if="loading" id="loading" style="margin: 0 auto;" class="d-flex justify-content-center">
            <img src="https://thumbs.gfycat.com/LameDifferentBalloonfish-small.gif">
        </div>
        <div v-else>
            <!-- see full article -->
            <div class="card text-center">
                <!-- navbar -->
                <div class="card-header d-flex">
                    <div class="d-flex">
                            <div>
                                <a class="nav-link active" href="#" @click="fullArticle">Article</a>
                            </div>
                            <div>
                                <a class="nav-link" href="#" @click="editFullArticle">Edit</a>
                            </div>
                            <div>
                                <a class="nav-link" style="color:red;" href="#" v-on:click="deletePost">Delete</a>
                            </div>
                    </div>
                    <div class="d-flex justify-content-end vw-100" v-if="doneEditingButton">
                        <ul class="nav nav-tabs card-header-tabs">
                            <li><a class="nav-link justify-content-end" href="#" @click="updateData">Done Editing</a></li>
                        </ul>
                    </div>
                </div>
                <!-- full detail article -->
                <div class="card-body" v-if="seeFullDetailArticle">
                    <h3 class="card-title">{{ fullarticle.title }}</h3>
                    <p>{{fullarticle.image}}</p>
                    <img :src="fullarticle.image" alt="" width="70%" class="my-4">
                    <div style="text-align: center;">
                        Tags: <span v-for="tag in fullarticle.tags"><a href="#" class="p-2 mx-2 my-2 no-underline-anchor-tag" style="max-height: 30px;">{{tag.name}}</a></span>
                    </div>
                    <p class="card-text" v-html="fullarticle.content"></p>
                </div>
                <!-- edit article -->
                <div v-if="editArticle">
                    <div id="form-edit-article" class="col-11 container mx-3 my-3">
                        <!-- <form id="edit-post" method="post"> -->
                            <input type="text" placeholder="Title" class="container" height="100px" style="font-size: 20pt;" v-model="title">
                            <div class="my-3">
                                <img :src="image" >
                            </div>
                            <div style="position:relative;" class="my-3">
                                <input type="file" name="myFile">
                                <!-- <a class='btn btn-primary' href='javascript:;'> -->
                                <!-- Choose File -->
                                <input type="file" style='position:absolute;z-index:2;top:0;left:0;filter: alpha(opacity=0);-ms-filter:"progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";opacity:0;background-color:transparent;color:transparent;' name="file_source" size="40" @change="getFile">
                                </a>
                                <span class='label label-info' id="upload-file-info"></span>
                            </div>
                            <template>
                                <div class="mb-3">
                                    <vue-tags-input
                                    v-model="tag"
                                    :tags="tags"
                                    @tags-changed="newTags => tags = newTags"
                                    />
                                </div>
                            </template>
                            <div>
                                <wysiwyg v-model="content" />
                            </div>
                        <!-- </form> -->
                    </div>  
                </div>
            </div>
        </div>
    </div>
    `
})