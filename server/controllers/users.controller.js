const User = require('../models/User');

class UsersController {
    async getTopUsers(req, res) {
        try {
            const topUsers = await User.find()
                            .sort({ winsCount: -1 })
                            .limit(10);

            return res.status(200).json({
                status: 'ok',
                data: topUsers
            });
        } catch (error) {
            console.error('Request processing error', error);

            return res.status(500).json({
                status: 'error',
                message: 'Internal server error'
            });
        }
    }
}

module.exports = new UsersController();