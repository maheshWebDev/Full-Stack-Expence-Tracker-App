const {Sequelize} = require('sequelize');

const dbConnection = new Sequelize('expendituredb','root','root123',{
    dialect : 'mysql',
    host : 'localhost'
})

module.exports = dbConnection;