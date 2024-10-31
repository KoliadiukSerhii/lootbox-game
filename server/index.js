const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
const cors = require('cors');

const wsUtils = require('./utils/utils.websockets');
const authRouter = require('./routes/auth.router');
const usersRouter = require('./routes/users.router');
const gameRouter = require('./routes/game.router');

const app = express();
const WSServer = require('express-ws')(app);
const aWss = WSServer.getWss();
const PORT = config.get('port') || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRouter);
app.use('/api/users', usersRouter);
app.use('/api/game', gameRouter);

app.ws('/', (ws, req) => {
    ws.on('message', async (msg) => {
        msg = JSON.parse(msg);
        switch (msg.method) {
            case 'connection':
                wsUtils.connect(aWss, ws, msg);
                break;
            case 'leave':
                wsUtils.leave(aWss, ws, msg);
                break;
            case 'update':
                wsUtils.update(aWss, ws, msg);
                break;
            case 'addChest':
                wsUtils.addChest(aWss, ws, msg);
                break;
        }
    })
});

const init = async () => {
    try {
        await mongoose.connect(config.get('mongoURL'), {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        app.listen(PORT, () => console.log('Server started on port', PORT));
    } catch (error) {
        console.log('Failed to initialize application', error);
    }
}

init();