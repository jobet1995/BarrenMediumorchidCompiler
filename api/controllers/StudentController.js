const { knex, db } = require("../db");
const util = require("../util");
const Student = require("../models/Student");

exports.index = (req, res, next) => {
  let page = req.query.page || 1;
  let size = req.query.size || 10;
  let sort = req.query.sort || "Student.student_id";
  let sortDirection = req.query.sort
    ? req.query.desc
      ? "desc"
      : "asc"
    : "asc";
  let column = req.query.sc;
  let query = knex("Student")
    .select(
      "Student.student_id",
      "Student.name",
      "Student.birthDate",
      "Student.schoolId",
    )
    .orderBy(sort, sortDirection);
  let columns = query._statements.find((e) => e.grouping == "columns").value;
  if (util.isInvalidSearch(columns, column)) {
    return res.sendStatus(403);
  }
  if (req.query.sw) {
    let search = req.query.sw;
    let operator = util.getOperator(req.query.so);
    if (column == "Student.birthDate") {
      search = util.formatDateStr(search);
    }
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
    .then(([count, students]) => {
      let last = Math.ceil(count.count / size);
      res.send({ students, last });
    })
    .catch(next);
};

exports.getCreate = (req, res, next) => {
  res.end();
};

exports.create = (req, res, next) => {
  let student = util.parseData(Student, { ...req.body });
  Student.create(student)
    .then(() => {
      res.end();
    })
    .catch(next);
};

exports.get = (req, res, next) => {
  let sqlStudent = knex("Student")
    .select(
      "Student.student_id",
      "Student.name",
      "Student.birthDate",
      "Student.schoolId",
    )
    .where("Student.student_id", req.params.studentId)
    .toString();
  db.query(sqlStudent, { type: "SELECT", plain: true })
    .then((student) => {
      res.send({ student });
    })
    .catch(next);
};

exports.edit = (req, res, next) => {
  let sqlStudent = knex("Student")
    .select(
      "Student.student_id",
      "Student.name",
      "Student.birthDate",
      "Student.schoolId",
    )
    .where("Student.student_id", req.params.studentId)
    .toString();
  db.query(sqlStudent, { type: "SELECT", plain: true })
    .then((student) => {
      res.send({ student });
    })
    .catch(next);
};

exports.update = (req, res, next) => {
  let student = util.parseData(Student, { ...req.body });
  Student.update(student, { where: { student_id: req.params.studentId } })
    .then(() => {
      res.end();
    })
    .catch(next);
};

exports.getDelete = (req, res, next) => {
  let sqlStudent = knex("Student")
    .select(
      "Student.student_id",
      "Student.name",
      "Student.birthDate",
      "Student.schoolId",
    )
    .where("Student.student_id", req.params.studentId)
    .toString();
  db.query(sqlStudent, { type: "SELECT", plain: true })
    .then((student) => {
      res.send({ student });
    })
    .catch(next);
};

exports.delete = (req, res, next) => {
  Student.destroy({ where: { student_id: req.params.studentId } })
    .then(() => {
      res.end();
    })
    .catch(next);
};
