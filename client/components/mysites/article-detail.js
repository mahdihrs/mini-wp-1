Vue.component('article-detail', {
    props: ['fullarticle'],
    data() {
        return {
            seeFullDetailArticle: true,
            editArticle: false,
            doneEditingButton: false,
            title: '',
            content: '',
            file: ''
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
            server({
                url: `/articles/${this.fullarticle._id}`,
                method: 'get',
                headers: {
                    access_token: localStorage.getItem('token')
                }                
            })
            .then(article => {
                // console.log(article.data)
                this.title = article.data.data.title
                this.content = article.data.data.content
            })
            .catch(err => {
                console.error(err)
            })
        },
        deletePost() {
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
                            swal("Your post has been deleted!", {
                                icon: "success",
                            });
                            this.backToMySites()
                        })
                    } 
                })
                .catch(err => {
                    console.error(err)
                })
        },
        backToMySites() {
            this.$emit('back-to-my-sites')
        },
        updateData() {
            server({
                url: `/articles/${this.fullarticle._id}`,
                method: 'put',
                headers: {
                    access_token: localStorage.getItem('token')
                }
            })
            .then(updated => {
                swal("Success!", "Your article has been successfully edited!", "success");
                this.backToMySites()
            })
            .catch(err => {
                console.error(err)
            })                    
        }
    },
    template: `
    <div class="my-5 col-12">
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
                <img :src="fullarticle.image" alt="" width="70%" class="my-4"/>
                <p class="card-text" v-html="fullarticle.content"></p>
            </div>
            <!-- edit article -->
            <div v-if="editArticle">
                <div id="form-edit-article" class="col-11 container mx-3 my-3">
                    <form id="edit-post" method="post">
                        <input type="text" placeholder="Title" class="container" height="100px" style="font-size: 20pt;" v-model="title">
                    </form>
                    <div>
                        <wysiwyg v-model="content" />
                    </div>
                </div>  
            </div>
        </div>
    </div>
    `
})