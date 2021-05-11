const postController = require('../controllers/postController');
const jwtMiddleware = require('../middlewares/jwtMiddleware');

module.exports = (server) => {
    server.route('/posts')
        .get(jwtMiddleware.verifyToken, postController.listAllPosts)
        .post(jwtMiddleware.verifyTokenAdmin, postController.createAPost);

    server.route('/posts/:id_post') // req.params.id_post
        .all(jwtMiddleware.verifyTokenAdmin)
        .get(postController.getAPost)
        .put(postController.updateAPost)
        .delete(postController.deleteAPost);
}