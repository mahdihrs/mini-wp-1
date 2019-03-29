const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { encrypt } = require('../helpers/bcryptjs')

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        validate: [{
            validator: function (v) {
                return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(v)
            },
              msg: "Incorrect email format"
            }, {
              isAsync: true,
              validator: function(v, cb) {
                User.findOne({
                    email: v
                })
                .then(user => {
                    if(user && user._id.toString() != this._id.toString()) {
                      cb(false)
                    } else {
                      cb(true)
                    }
                })
                .catch( (err) => {
                    throw err
                })
              },
              message: "Email is already been used"
        }]
    },
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        minlength: 6,
        required: true
    },
    watchedTags: {
        type: Array
    },
})

userSchema.pre('save', function(next) {
    this.password = encrypt(this.password)
    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User