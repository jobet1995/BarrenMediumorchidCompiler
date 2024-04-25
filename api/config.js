module.exports = {
  app: {
    url: "http://localhost:5173",
    name: "SChool",
  },
  smtp: {
    host: "smtp.mailgun.org",
    port: "587",
    user: "",
    password: "",
  },
  mail: {
    sender: "admin@example.com",
    welcome:
      "Welcome to {app_name},\n\nYour user has been created. The login information:\nLogin URL: {app_url}/#/login\nUser Name: {user}\n\nPlease click the link below to set your password.\n{app_url}/#/changePassword/{token}\n\nBest Regards,\nAdministrator",
    reset:
      "Dear User,\n\nYou recently requested to reset the password for your {app_name} account. Please click the link below to proceed.\n{app_url}/#/changePassword/{token}\n\nBest Regards,\nAdministrator",
  },
  db: {
    host: "127.0.0.1",
    port: 3306,
    user: "root",
    password: "",
    database: "testdb",
    dialect: "mysql",
  },
  menu: [
    { title: "School", path: "school", roles: "ADMIN,USER", show: true },
    { title: "Student", path: "student", roles: "ADMIN,USER", show: true },
    { title: "User Account", path: "userAccount", roles: "ADMIN", show: true },
  ],
  jwtSecret: "b0WciedNJvFCqFRbB2A1QhZoCDnutAOen5g1FEDO0HsLTwGINp04GXh2OXVpTqQL",
};
