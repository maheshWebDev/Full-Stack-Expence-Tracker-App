const {Sequelize,DataTypes} = require('sequelize');

const dbConnection = require('../config/dbConfig');

const Expence = dbConnection.define('expence',{
    id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        primaryKey:true,
        autoIncrement:true
    },
    expenceName :{
        type:DataTypes.STRING,
        allowNull:false
    },
    amount:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    description :{
        type:DataTypes.STRING,
        allowNull:false

    }
})

module.exports = Expence;