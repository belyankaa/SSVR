const {Model, DataTypes} = require("sequelize");
const db = require('../db');

class UserSeance extends Model {
}

UserSeance.init({
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    },
    {
        timestamps: false,
        sequelize: db,
        modelName: 'UserSeance',
    });

module.exports = UserSeance;