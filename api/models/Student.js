const Sequelize = require("sequelize");
const { db } = require("../db");

module.exports = db.define("Student", {
  student_id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: Sequelize.STRING,
  birthDate: Sequelize.DATEONLY,
  schoolId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});
