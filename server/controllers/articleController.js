const Article = require('../models/article')
const Tag = require('../models/tag')
const { autoGenerateTags } = require('../helpers/google-vision')

class Controller {
    static allArticles(req, res) {
        let search = {}
        if (req.query.search) {
            search = { title: new RegExp(`.*${req.query.search}.*`, `i`) }
        }
        Article.find(search).sort([
            ['created_at', 'descending']
        ]).populate('author').populate('tags')
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
        let data = req.body
        let promises = []
        let readyToPutTag = [] //tag yang udah ada dan gaperlu di-create lagi
        data.tags = data.tags.map(e => e.text)
        data.tags.forEach(tag => {
            promises.push(
                Tag.findOne({
                    name: tag
                })
            )
        })
        Promise.all(promises)
        .then(tags => {
            readyToPutTag = tags.filter(e => e !== null)
            if (readyToPutTag.length > 0) {
                readyToPutTag.forEach(tg => {
                    let index = data.tags.findIndex(e => e === tg.name)
                    data.tags.splice(index, 1)
                })
            }
            readyToPutTag = readyToPutTag.map(e => e._id)
            let creatingTag = []
            data.tags.forEach(tag => {
                creatingTag.push(
                    Tag.create({
                        name: tag
                    })
                )
            })
            return Promise.all(creatingTag)
        })
        .then(createdTags => {
            let createArticle = {
                title: data.title,
                content: data.content,
                author: req.decoded.id,
                tags: createdTags,
                image: data.image
            }

            createArticle.tags = createArticle.tags.map(e => e._id).concat(readyToPutTag)
            Article.create(createArticle)
            .then(newArticle => {
                res
                    .status(200)
                    .json({
                        msg: 'Article has been successfully created',
                        newArticle
                    })                
            })
        })
        .catch(err => {
            console.log(err)
            res
                .status(500)
                .json({
                    msg: `internal server error`,
                    err: err
                })
        })
    }

    static getArticle(req, res) {
        Article
            .findById(req.params.id)
            .populate('author')
            .populate('tags')
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

    static autoGenerateTags(req, res) {
        autoGenerateTags(req.file.cloudStoragePublicUrl)
        .then(labels => {
            console.log(labels)
            res 
                .status(200)
                .json({
                    labels,
                    image: req.file.cloudStoragePublicUrl
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