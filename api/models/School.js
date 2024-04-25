const Sequelize = require("sequelize");
const { db } = require("../db");

module.exports = db.define("School", {
  school_id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  schoolType: Sequelize.STRING,
  location: Sequelize.STRING,
});
