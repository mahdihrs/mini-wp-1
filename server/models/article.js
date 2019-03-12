const mongoose = require('mongoose')
const Schema = mongoose.Schema

const articleSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    imgUrl: {
        type: String
    },
    tags: {
        type: Array,
        default: []     
    },
    created_at: {
        type: Date,
        default: new Date
    },
    favorites: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
})

const Article = mongoose.model('Article', articleSchema)

module.exports = Article