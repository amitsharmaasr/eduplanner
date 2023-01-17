
const { Sequelize } = require('sequelize');
const sequelize = new Sequelize("edu_planner", "root", "", {
            host: "localhost",
            dialect: "mysql",
        });
 module.exports = sequelize ;
