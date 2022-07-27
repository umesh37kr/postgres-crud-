const Sequelize = require('sequelize')
const db = require('../config/connection')

const student = db.define('customer', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    first_name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    last_name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email:{
        type: Sequelize.STRING,
        allowNull: false
    },
    mobile:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    gender:{
        type: Sequelize.STRING
    },
    age: {
        type: Sequelize.INTEGER,
        // allowNull: false
    },
    address: {
        type: Sequelize.STRING,
        // allowNull: false
    },
    city:{
        type: Sequelize.STRING
    },
    postal_code:{
        type: Sequelize.INTEGER
    }
},
{tableName: "customer"}
)

module.exports = student;