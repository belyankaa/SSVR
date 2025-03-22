const ApiError = require("../error/ApiError");
const User = require("../models/User");
const Event = require("../models/Event");
const SeanceUtils = require("../utils/seance.utils");
const uuid = require('uuid');
const path = require('path');
const fs = require('fs');

class EventController {
    unExistingEvent = 'Такого мероприятия не существует';

    getAll = async (req, res, next) => {
        try {
            const events = await Event.findAll();

            //todo придумать как отслеживать текущее место, скорее всего вручную

            return res.json(events);
        } catch (e) {
            return next(ApiError.badRequest(e.message))
        }
    }

    getOne = async (req, res, next) => {
        try {
            const {id} = req.params;

            const event = await Event.findOne({where: {id}});

            if (!event) return next(ApiError.badRequest(this.unExistingEvent));

            const result = {
                ...event.dataValues,
                userInfo: await this.getEventUserInfo(event.userId)
            };

            return res.json(result);
        } catch (e) {
            return next(ApiError.badRequest(e.message))
        }
    }

    getEventUserInfo = async (userId) => {
        const user = await User.findOne({where: {id: userId}});

        return {
            id: user.id,
            photo: user.photo,
            username: user.username
        };
    }

    create = async (req, res, next) => {
        try {
            const sesssion = await SeanceUtils.check(req, req.headers['user-agent']);
            if (!sesssion) return next(ApiError.forbidden('Ошибка'));

            const {title, place = '123', startDate, endDate, description} = req.body;
            const {photo} = req.files;

            if (!title || !photo) return next(ApiError.badRequest('Не хватает данных'));
            const user = await User.findOne({where: {id: sesssion.userId}});

            let photoName = `event_${uuid.v4()}.jpg`;
            await photo.mv(path.resolve(__dirname, '..', 'eventPrev', photoName));

            const event = await user.createPevent({title, place, startDate, endDate, description, photo: photoName});

            return res.json({id: event.id});
        } catch (e) {
            return next(ApiError.badRequest(e.message))
        }
    }

    delete = async (req, res, next) => {
        try {
            const sesssion = await SeanceUtils.check(req, req.headers['user-agent']);
            if (!sesssion) return next(ApiError.forbidden('Ошибка'));

            const {id} = req.params;

            const user = await User.findOne({where: {id: sesssion.userId}});
            const event = await Event.findOne({where: {id}});

            if (!event) return next(ApiError.badRequest(this.unExistingEvent));

            if (event.userId !== user.id) return next(ApiError.forbidden('Ошибка'));

            await fs.unlink(path.resolve(__dirname, '..', 'eventPrev', event.photo), (err) => {
                if (err) throw err;
            })

            await event.destroy();
            await event.save();

            return res.json({error: false});
        } catch (e) {
            return next(ApiError.badRequest(e.message))
        }
    }

    edit = async (req, res, next) => {
        try {
            const sesssion = await SeanceUtils.check(req, req.headers['user-agent']);
            if (!sesssion) return next(ApiError.forbidden('Ошибка'));

            const {id} = req.params;

            const user = await User.findOne({where: {id: sesssion.userId}});
            const event = await Event.findOne({where: {id}});

            if (!event) return next(ApiError.badRequest('Такого мероприятияе не существует'));

            if (event.userId !== user.id) return next(ApiError.forbidden('Ошибка'));

            // await fs.unlink(path.resolve(__dirname, '..', 'eventPrev', event.photo), (err) => {
            //     if (err) throw err;
            // })
            //
            // await event.destroy();
            // await event.save();

            //todo функцоналл изменения, думаю его можно сделать после frontend части

            return res.json({error: false});
        } catch (e) {
            return next(ApiError.badRequest(e.message))
        }
    }
}

module.exports = new EventController();