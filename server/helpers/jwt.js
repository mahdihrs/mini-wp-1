require('dotenv').config()
const jwt = require('jsonwebtoken');

function generate(user) {
    const token = jwt.sign({ 
            id: user._id,
            email: user.email 
        },
        process.env.JWT_SECRET
    );
    return token
}

function decode(token) {
    let verifying = jwt.verify(token, process.env.JWT_SECRET);
    return verifying
}

module.exports = { generate, decode }