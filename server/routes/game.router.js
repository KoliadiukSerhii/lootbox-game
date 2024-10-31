const Router = require('express');

const authMiddleware = require('../middlewares/auth.middleware');
const gameController = require('../controllers/game.controller');

const router = new Router();

router.get('/loot-history', authMiddleware, gameController.getLootHistory);

module.exports = router;