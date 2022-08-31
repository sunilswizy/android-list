const { Sequelize, DataTypes } = require('sequelize')
const sequelize = require('../connection')

const User = sequelize.define('users', {
    user_id: {
        type: DataTypes.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    userName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
});

module.exports = User;

