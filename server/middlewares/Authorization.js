const Article = require('../models/article')

function isAuthor(req, res, next) {
    Article.findById(req.params.id)
    .then(article => {
        if (req.decoded.id != article.author) {
            res
                .status(401)
                .json({
                    msg: `Unauthorized access`
                })
        } else {
            next()
        }
    })
    .catch(err => {
        res
            .status(401)
            .json({
                msg: `Unauthorized access`,
                err: err
            })
    })

}

module.exports = isAuthor