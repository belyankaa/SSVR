const User = require('../models/User');
const Seance = require('../models/Seance');
const ApiError = require('../error/ApiError');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SeanceUtils = require("../utils/seance.utils");
const browserEnv =  require('browser-env');
browserEnv(['navigator']);

class HouseController {

    async signUp(req, res, next) {
        try {
            const {username, password, firstName, lastName, birthDay} = req.body;
            if (!username || !password || !firstName || !lastName || !birthDay) {
                return next(ApiError.internal('Не хватает данных'));
            }

            const existingUser = await User.findOne({where: {username}});

            if (existingUser) {
                return next(ApiError.internal('Такой username уже зарегистрирован'));
            }

            const hashPassword = await bcrypt.hash(password, 5);

            const newUser = await User.create({
                username,
                password: hashPassword,
                firstName,
                lastName,
                birthDay
            });

            return res.json({id: newUser.id});
        } catch (e) {
            return next(ApiError.badRequest(e.message))
        }
    }

    async signIn(req, res, next) {
        try {
            const {username, password} = req.body;
            if (!username || !password) next(ApiError.internal('Нужны поля username и password'));

            const notExistMessage = 'Неверное имя пользователя или пароль';

            const existingUser = await User.findOne({where: {username}});
            if (!existingUser) return next(ApiError.internal(notExistMessage));

            const comparePassword = bcrypt.compareSync(password, existingUser.password);
            if (!comparePassword) return next(ApiError.internal(notExistMessage));

            const newSeance = await existingUser.createSeance({
                userAgent: req.headers['user-agent'],
            });

            const token = SeanceUtils.generateSessionKey(existingUser.id, existingUser.username,
                req.headers['user-agent'], newSeance.createdAt);

            //todo fix interval to 30 days
            res.cookie('seance', token,
                {expires: new Date(Date.now() + 1000 * 60 * 30), httpOnly: true, secure: true});

            const expiredSeances = SeanceUtils.findExpiredSessions(await existingUser.getSeances());

            await Seance.destroy({where: {id: expiredSeances}})

            return res.json({...existingUser.dataValues, password: null});
        } catch (e) {
            return next(ApiError.badRequest(e.message))
        }
    }

    async logout(req, res, next) {
        try {
            const {id} = req.params;

            const result = await SeanceUtils.check(req, req.headers['user-agent']);
//todo доделать
            return res.json({error: false});
        } catch (e) {
            return next(ApiError.badRequest(e.message));
        }
    }

    async isUserNameAvailable(req, res, next) {
        try {
            const {username} = req.body;

            let existingUser = null;

            if (username) existingUser = await User.findOne({where: {username}});
            else return next(ApiError.internal('Нужно поле username'));

            if (existingUser) return next(ApiError.internal('Имя пользователя уже занято'));

            return res.json({error: false});
        } catch (e) {
            return next(ApiError.badRequest(e.message));
        }
    }

    async currentUser(req, res, next) {
        try {
            const {username} = req.body;

            const user = await User.findOne({where: {username}});

            if (!user) return next(ApiError.forbidden('Ошибка'));

            const access = await SeanceUtils.check(req, req.headers['user-agent']);
            if (!access) return next(ApiError.forbidden('Ошибка'));

            return res.json({error: false});
        } catch (e) {
            return next(ApiError.forbidden(e.message));
        }
    }
}

module.exports = new HouseController();