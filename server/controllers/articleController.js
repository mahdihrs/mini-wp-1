const Article = require('../models/article')
const Tag = require('../models/tag')

class Controller {
    static allArticles(req, res) {
        let search = {}
        if (req.query.search) {
            search = { title: new RegExp(`.*${req.query.search}.*`, `i`) }
        }
        Article.find(search).sort([
            ['created_at', 'descending']
        ]).populate('author')
        .then(articles => {
            res
                .status(200)
                .json({
                    msg: `Fetching all articles`,
                    data: articles
                })
        })
        .catch(err => {
            res
                .status(500)
                .json({
                    msg: `Internal server error`,
                    err: err
                })
        })
    }

    static addArticle(req, res) {
        let tag = []
        let id = req.decoded.id
        let data = JSON.parse(req.body.data)
        tag = data.tag.split(' ')
        let addArticle = {
            title: data.title,
            content: data.content,
            tags: tag,
            author: id
        }
        if (req.file) {
            addArticle.imgUrl = req.file.cloudStoragePublicUrl
        }
        Article.create(addArticle)
        .then(newArticle => {
            res
                .status(201)
                .json({
                    msg: `Creating an article success`,
                    data: newArticle
                })
        })
        .catch(err => {
            res
                .status(500)
                .json({
                    msg: `Internal server error`,
                    err: err
                })
        })
    }

    static getArticle(req, res) {
        Article.findById(req.params.id).populate('author')
        .then(article => {
            res
                .status(201)
                .json({
                    msg: `Fetch the article`,
                    data: article
                })
        })
        .catch(err => {
            res
                .status(500)
                .json({
                    msg: `Internal server error`,
                    err: err
                })
        })
    }

    static editArticle(req, res) {
        let filter = ['title', 'content']
        let filtered = {}
        for (const key in req.body) {
            let findFilter = filter.includes(key)
            if (findFilter) filtered[key] = req.body[key]
        }
        Article.findByIdAndUpdate(req.params.id, filtered, { new: true })
        .then(updated => {
            res
                .status(200)
                .json({
                    msg: `Article successfully been updated`,
                    data: updated
                })
        })
    }

    static removeArticle(req, res) {
        Article.findByIdAndDelete(req.params.id)
        .then(deleted => {
            res
                .status(200)
                .json({
                    msg: `Successfully delete the article`,
                    data: deleted
                })
        })
        .catch(err => {
            console.log(err)
            res
                .status(500)
                .json({
                    msg: `Internal server error`,
                    err: err
                })        
        })
    }

    static getMyArticles(req, res) {
        Article.find({
            author: req.decoded.id
        }).sort([
            ['created_at', 'descending']
        ])
        .then(articles => {
            res
                .status(200)
                .json(articles)
        })
        .catch(err => {
            res
                .status(500)
                .json({
                    msg: `Internal server error`,
                    err: err
                }) 
        })
    }

    static findTag(req, res) {
        let regex = new RegExp(req.query.search, 'i')

        Article.find({
                tags: { 
                    $in: [regex]
                }
        //   $or: [
        //     { 
        //         title: { 
        //             $in: [regex]
        //         }
        //     }, {
        //         content: { 
        //             $in: [regex]
        //         }
        //     }, { 
        //         description: { 
        //             $in: [regex]
        //         }
        //     }, { 
        //         tags: { 
        //             $in: [regex]
        //         }
        //     },
        //   ]
        })
        .then(data=> {
            console.log(data)
            res
                .status(200)
                .json(data)
        })
        .catch(err => {
            res
                .status(500)
                .json({
                    msg: `Internal server error`,
                    err: err
                })
        })
      }
}

module.exports = Controller