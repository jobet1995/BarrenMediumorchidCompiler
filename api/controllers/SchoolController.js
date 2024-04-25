const { knex, db } = require("../db");
const util = require("../util");
const School = require("../models/School");

exports.index = (req, res, next) => {
  let page = req.query.page || 1;
  let size = req.query.size || 10;
  let sort = req.query.sort || "School.school_id";
  let sortDirection = req.query.sort
    ? req.query.desc
      ? "desc"
      : "asc"
    : "asc";
  let column = req.query.sc;
  let query = knex("School")
    .select("School.school_id", "School.schoolType", "School.location")
    .orderBy(sort, sortDirection);
  let columns = query._statements.find((e) => e.grouping == "columns").value;
  if (util.isInvalidSearch(columns, column)) {
    return res.sendStatus(403);
  }
  if (req.query.sw) {
    let search = req.query.sw;
    let operator = util.getOperator(req.query.so);
    if (operator == "like") {
      search = `%${search}%`;
    }
    query.where(column, operator, search);
  }
  let sqlCount = query
    .clone()
    .clearSelect()
    .clearOrder()
    .count('* as "count"')
    .toString();
  let sqlQuery = query
    .offset((page - 1) * size)
    .limit(size)
    .toString();
  Promise.all([
    db.query(sqlCount, { type: "SELECT", plain: true }),
    db.query(sqlQuery, { type: "SELECT" }),
  ])
    .then(([count, schools]) => {
      let last = Math.ceil(count.count / size);
      res.send({ schools, last });
    })
    .catch(next);
};

exports.getCreate = (req, res, next) => {
  res.end();
};

exports.create = (req, res, next) => {
  let school = util.parseData(School, { ...req.body });
  School.create(school)
    .then(() => {
      res.end();
    })
    .catch(next);
};

exports.get = (req, res, next) => {
  let sqlSchool = knex("School")
    .select("School.school_id", "School.schoolType", "School.location")
    .where("School.school_id", req.params.schoolId)
    .toString();
  db.query(sqlSchool, { type: "SELECT", plain: true })
    .then((school) => {
      res.send({ school });
    })
    .catch(next);
};

exports.edit = (req, res, next) => {
  let sqlSchool = knex("School")
    .select("School.school_id", "School.schoolType", "School.location")
    .where("School.school_id", req.params.schoolId)
    .toString();
  db.query(sqlSchool, { type: "SELECT", plain: true })
    .then((school) => {
      res.send({ school });
    })
    .catch(next);
};

exports.update = (req, res, next) => {
  let school = util.parseData(School, { ...req.body });
  School.update(school, { where: { school_id: req.params.schoolId } })
    .then(() => {
      res.end();
    })
    .catch(next);
};

exports.getDelete = (req, res, next) => {
  let sqlSchool = knex("School")
    .select("School.school_id", "School.schoolType", "School.location")
    .where("School.school_id", req.params.schoolId)
    .toString();
  db.query(sqlSchool, { type: "SELECT", plain: true })
    .then((school) => {
      res.send({ school });
    })
    .catch(next);
};

exports.delete = (req, res, next) => {
  School.destroy({ where: { school_id: req.params.schoolId } })
    .then(() => {
      res.end();
    })
    .catch(next);
};
