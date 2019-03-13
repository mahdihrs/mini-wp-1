const router = require('express').Router()
const articleController = require('../controllers/articleController')
const middleware = require('../middlewares/image')
const isLogin = require('../middlewares/isLogin')
const isAuthor = require('../middlewares/Authorization')

router.get('/', articleController.allArticles)
router.post('/', isLogin, articleController.addArticle)
router.get('/getArticles', isLogin, articleController.getMyArticles)
router.post('/generate-tags', isLogin, middleware.multer.single('image'), middleware.sendUploadToGCS, articleController.autoGenerateTags)

// router.patch('/put-to-my-favorites', isLogin, articleController.putArticleToMyFavorites)
router.get('/:id', articleController.getArticle)
router.put('/:id', isLogin, isAuthor, articleController.editArticle)
router.delete('/:id', isLogin, isAuthor, articleController.removeArticle)

module.exports = router