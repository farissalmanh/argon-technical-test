
const SequelizeAuto = require("sequelize-auto");
const Sequelize = require("sequelize");
const sequelize = new Sequelize('argon', 'root', 'root', {

 host: 'localhost',
 port: '3306',
 dialect: 'mariadb'
});

const options = {
    host: "localhost",
    dialect: "mariadb",
    directory: "./models", // where to write files
    port: "3306",
    caseModel: "c", // convert snake_case column names to camelCase field names: user_id -> userId
    caseFile: "c", // file names created for each model use camelCase.js not snake_case.js
    singularize: true, // convert plural table names to singular model names
    additional: {
    timestamps: false, // ...options added to each model
},
};

const auto = new SequelizeAuto(sequelize, "root", "root", options);
auto.run();