const {Model, DataTypes} = require("sequelize");
const db = require('../db');
const User = require("./User");


class Event extends Model {}

Event.init({
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        title: {type: DataTypes.STRING, allowNull: false},
        crowd: {type: DataTypes.INTEGER, allowNull: true},
        place: {type: DataTypes.STRING, allowNull: false},
        startDate: {type: DataTypes.DECIMAL, allowNull: false},
        endDate: {type: DataTypes.DECIMAL, allowNull: true, default: null},
        photo: {type: DataTypes.TEXT, allowNull: false},
        description: {type: DataTypes.TEXT, allowNull: false},
    },
    {
        sequelize: db,
        modelName: 'Event',
    });

User.hasMany(Event, {as: 'pevents', foreignKey: 'userId'});

module.exports = Event;