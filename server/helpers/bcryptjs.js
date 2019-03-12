const bcrypt = require('bcryptjs')

function encrypt(password) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt)
    return hash
}

function decrypt(input, password) {
    const decrypting = bcrypt.compareSync(input, password);
    return decrypting 
}

module.exports = { encrypt, decrypt }