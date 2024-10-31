const User = require('../models/User');
const LootItem = require('../models/LootItem');

const PLAYGROUND_SIZE = 9;

const lootItems = [
    { name: 'Phoenix Feather', type: 'legendary', chance: 0.05 },
    { name: 'Dragon Scale', type: 'legendary', chance: 0.05 },
    { name: 'Elven Bow', type: 'epic', chance: 0.1 },
    { name: 'Dwarven Axe', type: 'epic', chance: 0.1 },
    { name: 'Mage\'s Staff', type: 'epic', chance: 0.1 },
    { name: 'Healing Potion', type: 'rare', chance: 0.2 },
    { name: 'Mana Potion', type: 'rare', chance: 0.2 },
    { name: 'Iron Sword', type: 'rare', chance: 0.2 },
    { name: 'Steel Shield', type: 'rare', chance: 0.2 },
    { name: 'Common Armor', type: 'common', chance: 0.3 },
    { name: 'Wooden Shield', type: 'common', chance: 0.3 },
    { name: 'Health Potion', type: 'common', chance: 0.3 },
    { name: 'Leather Boots', type: 'common', chance: 0.3 },
    { name: 'Steel Helmet', type: 'common', chance: 0.3 },
    { name: 'Common Sword', type: 'common', chance: 0.3 }
];

class wsUtils {
    constructor() {
        this.lastChestId = null;
        this.onlineUsers = [];
        this.openedChests = [];
        this.chests = this.generateLootArray(PLAYGROUND_SIZE);
    }

    setChests(chests) {
        this.chests = chests;
    }

    getChests() {
        return this.chests;
    }

    connect(aWss, ws, msg) {
        this.onlineUsers.push(msg.username);

        msg.onlineUsers = this.onlineUsers;

        this._broadcastConnection(aWss, ws, msg);
    }

    leave(aWss, ws, msg) {
        msg.onlineUsers = this.onlineUsers.filter((name) => name !== msg.username);

        this._broadcastConnection(aWss, ws, msg);
    }

    update(aWss, ws, msg) {
        this._broadcastConnection(aWss, ws, msg);
    }

    async addChest(aWss, ws, msg) {
        try {
            const chest = msg.chest;
            const userId = msg.userId;

            if (chest.id === this.lastChestId) return;
            
            const user = await User.findOne({ _id: userId });

            if (!user) return;

            this.lastChestId = chest.id;

            const lootItem = new LootItem({ name: chest.name, type: chest.type, chance: chest.chance, user: userId });

            await lootItem.save();

            await User.updateOne(
                { _id: userId },
                { $inc: { winsCount: 1 } }
            );

            const topUsers = await User.find()
                            .sort({ winsCount: -1 })
                            .limit(10);

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

            this.openedChests.push(chest.id);
            msg.currentUserPoints = user.winsCount + 1;
            msg.topUsers = topUsers;
            msg.formattedLootHistory = formattedLootHistory;

            if (this.openedChests.length === PLAYGROUND_SIZE) {
                setTimeout(() => {
                    const newChests = this.generateLootArray();

                    this.openedChests = [];
                    this.lastChestId = null;
                    this.setChests(newChests);

                    const msg = {
                        method: 'update',
                        chests: newChests,
                        openedChests: []
                    }

                    aWss.clients.forEach(client => {
                        if (client.readyState === client.OPEN) {
                            client.send(JSON.stringify(msg));
                        }
                    });
                }, 120000); // 2min
            }
        } catch (error) {
            console.log('Error adding new chest', error);
        } finally {
            this._broadcastConnection(aWss, ws, msg);
        }
    }

    _broadcastConnection(aWss, ws, msg) {
        msg.chests = this.chests;
        msg.openedChests = this.openedChests;

        aWss.clients.forEach(client => {
            client.send(JSON.stringify(msg));
        });
    }

    generateLootArray = () => {
        const lootArray = [];
        const totalChances = lootItems.reduce((acc, item) => acc + item.chance, 0);
    
        for (let i = 0; i < PLAYGROUND_SIZE; i++) {
            const randomNum = Math.random() * totalChances;
            let cumulativeChance = 0;
    
            for (const item of lootItems) {
                cumulativeChance += item.chance;
    
                if (randomNum < cumulativeChance) {
                    lootArray.push({
                        id: lootArray.length + 1,
                        ...item
                    });
    
                    break;
                }
            }
        }
    
        return lootArray;
    }
}

module.exports = new wsUtils();
