Vue.component('full-article-general', {
    props: ['articledata'],
    methods: {
        dateFormat(date) {
            return new Date(date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'})
        },
        whatsappUrl(title, content, img) {
            if (img.length === 0) {            
                return `https://api.whatsapp.com/send?text=${title}%0D%0A%0D%0A${content}`
            } else {
                return `https://api.whatsapp.com/send?text=${title}%0D%0A%0D%0A${this.generateUrl(img)}%0D%0A%0D%0A${content}`
            }
        },
        generateUrl(url) {
            return url.split(' ').join('%20')
        }
    },
    template: `
        <div class="container">   
            <h1>{{ articledata.title }}</h1>
            <p>Author: {{ articledata.author.name }}</p>
            <div class="mb-2">Share: <a :href="whatsappUrl(articledata.title, articledata.content, articledata.image)" target="_blank"><img src="https://img.icons8.com/color/48/000000/whatsapp.png" height="30px"></a> </div>
            Created At: {{ dateFormat(articledata.created_at) }}
            <hr>
            <p v-html="articledata.content"></p>
            <hr>
            Tags:
            <span v-for="tag in articledata.tags"><a href="#" class="p-2 mx-2 my-2 no-underline-anchor-tag" style="max-height: 30px;">{{tag.name}}</a></span>
        </div>
    `
})