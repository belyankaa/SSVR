const { Model, DataTypes } = require("sequelize");
const db = require('../db');

class User extends Model {}

User.init({
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        username: {type: DataTypes.STRING, unique: false},
        firstName: {type: DataTypes.STRING, unique: false},
        lastName: {type: DataTypes.STRING, unique: false},
        birthDay: {type: DataTypes.STRING, unique: false},
        email: {type: DataTypes.STRING, allowNull: true, default: null},
        phone: {type: DataTypes.STRING, allowNull: true, default: null},
        password: {type: DataTypes.STRING, allowNull: false},
        role: {type: DataTypes.STRING, defaultValue: 'USER'},
        photo: {type: DataTypes.TEXT, default: null}
    },
    {
        sequelize: db,
        modelName: 'User',
    });

module.exports = User;