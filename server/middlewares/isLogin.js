const { decode } = require('../helpers/jwt')

function isLogin(req, res, next) {
    if (!req.headers.access_token) {
        res
            .status(400)
            .json({
                message: `Token must be included`
            })
    } else {
        try {
            let decoding = decode(req.headers.access_token)
            req.decoded = decoding
            next()
        } catch(err) {
            console.log(err)
            res
                .status(401)
                .json({
                    message: `Unauthorized access`,
                    err: err
                })
        }
    }
}

module.exports = isLogin