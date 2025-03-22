const {Model, DataTypes} = require("sequelize");
const db = require("../db");
const UserSeance = require("./UserSeance");
const User = require("./User");

class Seance extends Model {}

Seance.init({
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        userAgent: {type: DataTypes.STRING},
    },
    {
        sequelize: db,
        modelName: 'Seance',
    });


//Юзер и Сеанс
User.belongsToMany(Seance, {as: 'seances', foreignKey: 'userId', through: UserSeance, otherKey: 'sessionId'});
Seance.belongsToMany(User, {as : 'users', foreignKey: 'sessionId', through: UserSeance, otherKey: 'userId'});

module.exports = Seance;
