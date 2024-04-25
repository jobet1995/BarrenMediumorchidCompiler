import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Service from "./Service";
import Util from "../../util";

export default function UserAccountCreate(props) {
  const [userAccount, setUserAccount] = useState({});
  const [roles, setRoles] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    get().finally(() => {
      Util.initView(true);
    });
  }, []);

  function get() {
    return Service.create().then((response) => {
      setRoles(response.data.roles);
    });
  }

  function create(e) {
    e.preventDefault();
    userAccount.role_id = Array.from(
      document.querySelectorAll('[name="role_id"]:checked'),
    ).map((e) => e.value);
    Service.create(userAccount)
      .then(() => {
        props.history.push(Util.getRef("/userAccount"));
      })
      .catch((e) => {
        if (e.response.data.errors) {
          setErrors(e.response.data.errors);
        } else {
          alert(e.response.data.message);
        }
      });
  }

  function onChange(e) {
    let data = { ...userAccount };
    data[e.target.name] =
      e.target.type == "checkbox" ? e.target.checked : e.target.value;
    setUserAccount(data);
  }
  return (
    <div className="container">
      <form method="post" onSubmit={create}>
        <div className="row">
          <div className="col m6 l4">
            <label htmlFor="user_account_name">Name</label>
            <input
              id="user_account_name"
              name="name"
              onChange={onChange}
              value={userAccount.name || ""}
              required
              maxLength="50"
            />
            {errors.name && <span className="red-text">{errors.name}</span>}
          </div>
          <div className="col m6 l4">
            <label htmlFor="user_account_email">Email</label>
            <input
              id="user_account_email"
              name="email"
              onChange={onChange}
              value={userAccount.email || ""}
              type="email"
              required
              maxLength="50"
            />
            {errors.email && <span className="red-text">{errors.email}</span>}
          </div>
          <div className="col m6 l4">
            <label>
              <input
                id="user_account_active"
                name="active"
                className="filled-in"
                type="checkbox"
                onChange={onChange}
                value="1"
                checked={userAccount.active || ""}
              />
              <span>Active</span>
            </label>
            {errors.active && <span className="red-text">{errors.active}</span>}
          </div>
          <div className="col s12">
            <h5></h5>
            <label>Roles</label>
            {roles.map((role, index) => (
              <div key={index}>
                <label>
                  <input
                    id={`user_role_role_id${role.id}`}
                    name="role_id"
                    type="checkbox"
                    className="filled-in"
                    value={role.id}
                  />
                  <span>{role.name}</span>
                </label>
              </div>
            ))}
          </div>
          <div className="col s12">
            <Link className="btn-small grey" to={Util.getRef("/userAccount")}>
              Cancel
            </Link>
            <button className="btn-small">Submit</button>
          </div>
        </div>
      </form>
    </div>
  );
}
