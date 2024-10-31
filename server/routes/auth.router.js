const Router = require('express');
const { check } = require('express-validator');
const { patterns } = require('../utils/utils.patterns');
const authMiddleware = require('../middlewares/auth.middleware');

const authController = require('../controllers/auth.controller');
const router = new Router();

router.get('/', authMiddleware, authController.auth);

router.post('/registration', [
        check('username')
            .trim()
            .matches(patterns.username)
            .withMessage('Username is incorrect'),
        check('password')
            .trim()
            .matches(patterns.password)
            .withMessage('Password is incorrect')
    ], authController.registration);

router.post('/login', [
        check('username')
            .trim()
            .matches(patterns.username)
            .withMessage('Username is incorrect'),
        check('password')
            .trim()
            .matches(patterns.password)
            .withMessage('Password is incorrect')
    ], authController.login);

module.exports = router;