
const {Sequelize,DataTypes} = require('sequelize');

const dbConnection = require('../config/dbConfig');

const user = dbConnection.define('user',{
    id :{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    name :{
        type:DataTypes.STRING,
        allowNull:false
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false
    }
})

module.exports = user