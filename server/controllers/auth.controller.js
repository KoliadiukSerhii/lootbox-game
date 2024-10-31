const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

const User = require('../models/User');

class AuthController {
    async registration(req, res) {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(422).json({
                    status: 'error',
                    errors: errors.mapped()
                });
            }

            const { username, password } = req.body;

            const duplicateUser = await User.findOne({ username });

            if (duplicateUser) {
                return res.status(409).json({
                    status: 'error',
                    message: `User with username '${username}' already exist`
                });
            }

            const hashPassword = await bcrypt.hash(password, 8);

            const user = new User({ username: username, password: hashPassword });

            await user.save();

            const token = jwt.sign({ id: user.id }, config.get('secretKey'), { expiresIn: '1h' });

            return res.status(200).json({
                status: 'ok',
                token,
                user: {
                    id: user.id,
                    username: user.username,
                    winsCount: user.winsCount
                }
            });
        } catch (error) {
            console.error('Request processing error', error);

            return res.status(500).json({
                status: 'error',
                message: 'Internal server error'
            });
        }
    }

    async login(req, res) {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(422).json({
                    status: 'error',
                    errors: errors.mapped()
                });
            }

            const { username, password } = req.body;

            const user = await User.findOne({ username });

            if (!user) {
                return res.status(404).json({
                    status: 'error',
                    message: `User with username '${username}' not found`
                });
            }

            const isPasswordValid = bcrypt.compareSync(password, user.password);

            if (!isPasswordValid) {
                return res.status(401).json({
                    status: 'error',
                    message: 'Password is incorrect'
                });
            }

            const token = jwt.sign({ id: user.id }, config.get('secretKey'), { expiresIn: '1h' });

            return res.status(200).json({
                status: 'ok',
                token,
                user: {
                    id: user.id,
                    username: user.username,
                    winsCount: user.winsCount
                }
            });
        } catch (error) {
            console.error('Request processing error', error);

            return res.status(500).json({
                status: 'error',
                message: 'Internal server error'
            });
        }
    }

    async auth(req, res) {
        try {
            const user = await User.findOne({ _id: req.user.id });

            const token = jwt.sign({ id: user.id }, config.get('secretKey'), { expiresIn: '1h' });

            return res.status(200).json({
                status: 'ok',
                token,
                user: {
                    id: user.id,
                    username: user.username,
                    winsCount: user.winsCount
                }
            })
        } catch (error) {
            console.error('Request processing error', error);

            return res.status(500).json({
                status: 'error',
                message: 'Internal server error'
            });
        }
    }
}

module.exports = new AuthController();