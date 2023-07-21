// import db configurations
const dbConfig = require("../config/db.config");
// import sequelize module
const Sequelize = require("sequelize");
const sequelize_me = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD,
    
    {
        host: dbConfig.HOST,
        dialect: dbConfig.dialect,
        pool: {
            max: dbConfig.pool.max,
            min: dbConfig.pool.min,
            aquire: dbConfig.pool.aquire,
            idle: dbConfig.pool.idle
        }
    }
);

const db ={};


db.Sequelize = Sequelize;
db.sequelize_me = sequelize_me;
// import students model
db.students = require("./student.model.js")(sequelize_me,Sequelize);
// import staff model
db.staff = require("./staff.model.js")(sequelize_me,Sequelize);

module.exports =db;
