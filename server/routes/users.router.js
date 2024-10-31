const Router = require('express');
const authMiddleware = require('../middlewares/auth.middleware');
const usersController = require('../controllers/users.controller');

const router = new Router();

router.get('/top-10', authMiddleware, usersController.getTopUsers);

module.exports = router;