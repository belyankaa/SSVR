const jwt = require('jsonwebtoken');
const Seance = require('../models/Seance');
const User = require('../models/User');
const ErrorUtils = require("./error.utils");

class SeanceUtils {
    constructor() {
    }

    static isDateExpired(date) {
        //todo set 30 days
        const expiredTime = 1000 * 60 * 30;
        // Сейчас стоит час переделать на дни
        // Нужно поменять еще в контролере пользователя
        // * 24 * process.env.TOKEN_TIME_ALIVE

        const createTime = new Date(date).getTime()
        return createTime + expiredTime < new Date().getTime()
    }

    static findExpiredSessions(sessions) {
        let result = [];
        sessions.forEach(item => {
            if (this.isDateExpired(item.createdAt)) {
                 result.push(item.id);
            }
        })

        return result;
    }

    static generateSessionKey(userId, username, userAgent, time) {
        return jwt.sign({userId, username, userAgent, time}, process.env.TOKEN_SECRET_KEY, {expiresIn: '30d'});
    }

    /**
     * Метод для проверки токена и сессии на ее валидность
     * @param req
     * @param userAgent
     */
    static async check(req, userAgent) {
        try {
            const token = req.cookies['seance'];
            const data = jwt.verify(token, process.env.TOKEN_SECRET_KEY);

            if (!data) return null;

            const user = await User.findOne({where: {id: data.userId}});
            if (!user) return ErrorUtils.newError();

            if (user.username !== data.username) return ErrorUtils.newError();

            const seance = await user.getSeances({where: {userAgent: data.userAgent, createdAt: data.time}});
            if (!seance || seance.length < 1) return ErrorUtils.newError();

            const expired = this.isDateExpired(seance[0].createdAt);
            if (expired) return ErrorUtils.newError();

            return {userId: user.id};
        } catch (e) {
            //удаляем сеанс если есть
            const token = req.cookies['seance'];
            const data = jwt.verify(token, process.env.TOKEN_SECRET_KEY);

            if (!data) return null;

            const user = await User.findOne({where: {id: data.userId}});
            if (!user) return null;

            if (user.username !== data.username) return null;

            const seance = await user.getSeances({where: {userAgent: data.userAgent, createdAt: data.time}});
            if (seance && seance.length > 0) {
                seance[0].destroy();
                seance[0].save();
            }
            return null;
        }

    }
}

module.exports = SeanceUtils;