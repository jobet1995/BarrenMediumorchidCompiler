const express = require("express");
const util = require("./util");
const authorize = require("./middleware/authorize");
const system = require("./controllers/SystemController.js");
const authen = require("./controllers/LoginController.js");
const userAccount = require("./controllers/UserAccountController.js");
const school = require("./controllers/SchoolController.js");
const student = require("./controllers/StudentController.js");

module.exports = express
  .Router()
  .post("/login", authen.login)
  .get("/logout", authen.logout)
  .post("/resetPassword", authen.resetPassword)
  .get("/changePassword/:token", authen.getChangePassword)
  .post("/changePassword/:token", authen.changePassword)
  .get("/user", authen.user)
  .get("/profile", system.profile)
  .post("/updateProfile", system.updateProfile)
  .get("/stack", system.stack)
  .use(
    "/userAccounts",
    authorize("ADMIN"),
    express
      .Router()
      .get("/", userAccount.index)
      .post("/", userAccount.create)
      .get("/create", userAccount.getCreate)
      .get("/:id", userAccount.get)
      .get("/:id/edit", userAccount.edit)
      .put("/:id", userAccount.update)
      .get("/:id/delete", userAccount.getDelete)
      .delete("/:id", userAccount.delete),
  )
  .use(
    "/schools",
    authorize("ADMIN,USER"),
    express
      .Router()
      .get("/", school.index)
      .post("/", school.create)
      .get("/create", school.getCreate)
      .get("/:schoolId", school.get)
      .get("/:schoolId/edit", school.edit)
      .put("/:schoolId", school.update)
      .get("/:schoolId/delete", school.getDelete)
      .delete("/:schoolId", school.delete),
  )
  .use(
    "/students",
    authorize("ADMIN,USER"),
    express
      .Router()
      .get("/", student.index)
      .post("/", student.create)
      .get("/create", student.getCreate)
      .get("/:studentId", student.get)
      .get("/:studentId/edit", student.edit)
      .put("/:studentId", student.update)
      .get("/:studentId/delete", student.getDelete)
      .delete("/:studentId", student.delete),
  );
