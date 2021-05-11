const userController = require('../controllers/userController');

module.exports = (server) => {
    server.post('/user/register', userController.userRegister);
    server.post('/user/login', userController.userLogin);
}