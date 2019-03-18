Vue.component('find-by-tag', {
    props: ['articles', 'tagname'],
    template: `
        <div>
            <h2>Articles Found By Tag "{{ tagname }}"</h2>
            <div v-for="article in articles">
                <article-list-card :articledata="article"></article-list-card>
            </div>
        </div>
    `
})