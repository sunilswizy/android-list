const sequelize = require('../connection');
const { Sequelize, DataTypes } = require('sequelize');
const User =  require('./User');

const Product = sequelize.define('products', {
    product_id: {
        type: DataTypes.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    productName: {
        type: DataTypes.STRING,
        allowNull:false,
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull:false,
    },
    category: {
        type: DataTypes.STRING,
        allowNull:false,
    },
    date: {
        type: DataTypes.DATE,
        allowNull:false,
    },
    description: {
        type: DataTypes.STRING
    },
    comment: {
        type: DataTypes.STRING
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
    deletedAt: Sequelize.DATE,
})

Product.belongsTo(User, { foreignKey: 'user_id' });

module.exports = Product;