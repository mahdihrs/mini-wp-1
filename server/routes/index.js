const express = require('express');
const router = express.Router();
const articles = require('./articles')
const users = require('./users')

router.use('/articles', articles)
router.use('/', users)

module.exports = router;