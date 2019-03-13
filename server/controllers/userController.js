require('dotenv').config()
// const app = require('express')()
const User = require('../models/user')
const Tag = require('../models/tag')
const Article = require('../models/article')
const { generate } = require('../helpers/jwt')
const { decrypt } = require('../helpers/bcryptjs')
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client('670497221809-rdt56lmo9f29ca1rfp8k3svm39q6gscd.apps.googleusercontent.com')//(process.env.CLIENT_ID);

class Controller {
    static register(req, res) {
        User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            watchedTags: req.body.watchedTags.map(e => e.text)
        })
        .then(newUser => {
            let token = generate(newUser)
            res
                .status(201)
                .json({
                    msg: `New user has been added`,
                    user: newUser,
                    id: newUser.id,
                    name: newUser.name,
                    token
                })
        })
        .catch(err => {
            let modelValidation = []
            if (err.errors.username) modelValidation.push(err.errors.username.properties.message)//'username '
            if (err.errors.name) modelValidation.push(err.errors.name.properties.message)
            if (err.errors.email) modelValidation.push(err.errors.email.properties.message)//'email '
            if (err.errors.password) modelValidation.push(err.errors.password.properties.message)//'password '
            if (modelValidation.length > 0) {
                res
                    .status(400)
                    .json({
                        msg: `Bad Request`,
                        modelValidation
                    })
            } else {
                res
                    .status(500)
                    .json({
                        msg: `Internal Server Error`,
                        err: err
                    })
            }
        })
    }

    static login(req, res) {
        let userData;
        if (!req.body.token) {
            return User.findOne({
                email: req.body.email
            })
            .then(user => {
                if (!user) {
                    res
                        .status(422)
                        .json({
                            msg: `Invalid email/password`,
                            failedOn: `email`
                        })
                } else {
                    let passwordChecking = decrypt(req.body.password, user.password)
                    if (!passwordChecking) {
                        res
                            .status(422)
                            .json({
                                msg: `Invalid email/password`,
                                failedOn: `email`
                            })
                    } else {
                        let token = generate(user)
                        res.json({
                            id: user._id,
                            name: user.name,
                            token
                        })
                    }
                }
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
        } else {
            client.verifyIdToken({
                idToken: req.body.token,
                audience: '670497221809-rdt56lmo9f29ca1rfp8k3svm39q6gscd.apps.googleusercontent.com'
            })
            .then(ticket => {
                const payload = ticket.getPayload()
                userData = payload
                return User.findOne({
                    email: payload.email
                })
            })
            .then(user => {
                if (!user) {
                    return User.create({
                        email: userData.email,
                        password: '000000'
                    })
                    .then(newUser => {
                        let token = generate(newUser)
                        res
                            .status(200)
                            .json({
                                token: token
                            })
                    })
                } else {
                    let token = generate(user)
                    res
                        .status(200)
                        .json(token)
                }
            })
            .catch(err => {
                console.log(err)
                res
                    .status(500)
                    .json({
                        msg: `Internal Server Error`,
                        err: err
                    })
            })
        }
    }

    //cari user buat dapetin field watchedTags
    //cari tagId dari user's watched tags
    //abis itu di loop terus di find article yang punya tags dengan tagId tsb
    static seeWatchedTags(req, res) {
        let articlesSuggestions = []
        User
            .findById(req.decoded.id)
            .then(user => {
                // console.log(user)
                let findTag = []
                user.watchedTags.forEach(wT => {
                    findTag.push(
                        Tag
                            .findOne({
                                name: wT
                            })

                    )
                })
                return Promise.all(findTag)
            })
            .then(found => {
                let noNull = found.filter(e => e !== null)
                let idFiltered = noNull.map(id => id._id)
                let findArticles = []
                idFiltered.forEach(tag => {
                    findArticles.push(
                        Article
                            .find({
                                tags: tag
                            })
                    )
                })
                return Promise.all(findArticles)
            })
            .then(articles => {
                articles.forEach(art => {
                    articlesSuggestions = articlesSuggestions.concat(art)
                })
                console.log(articlesSuggestions)
            })
            .catch(err => {
                console.log(err)
                res
                    .status(500)
                    .json({
                        msg: `Internal server error`,
                        err
                    })
            })
    }
}

module.exports = Controller