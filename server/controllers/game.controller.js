const LootItem = require('../models/LootItem');

class GameController {
    async getLootHistory(req, res) {
        try {
            const lootHistory = await LootItem.find()
                .sort({ created: -1 })
                .populate('user', 'username')
                .select('id name type user');

            const formattedLootHistory = lootHistory.map(item => ({
                id: item._id,
                name: item.name,
                type: item.type,
                username: item.user ? item.user.username : 'Unknown'
            }));

            return res.status(200).json({
                status: 'ok',
                data: formattedLootHistory
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

module.exports = new GameController();