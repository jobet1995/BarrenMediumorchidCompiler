import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Service from "./Service";
import Util from "../../util";

export default function UserAccountEdit(props) {
  const [userAccount, setUserAccount] = useState({});
  const [userAccountUserRoles, setUserAccountUserRoles] = useState([]);
  const [roles, setRoles] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    get().finally(() => {
      Util.initView(true);
    });
  }, [props.match.params.id]);

  function get() {
    return Service.edit(props.match.params.id).then((response) => {
      setUserAccount(response.data.userAccount);
      setUserAccountUserRoles(response.data.userAccountUserRoles);
      setRoles(response.data.roles);
    });
  }

  function edit(e) {
    e.preventDefault();
    if (!Util.validateForm()) {
      return;
    }
    userAccount.role_id = Array.from(
      document.querySelectorAll('[name="role_id"]:checked'),
    ).map((e) => e.value);
    Service.edit(props.match.params.id, userAccount)
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
      <form method="post" onSubmit={edit}>
        <div className="row">
          <div className="col m6 l4">
            <label htmlFor="user_account_id">Id</label>
            <input
              readOnly
              id="user_account_id"
              name="id"
              onChange={onChange}
              value={userAccount.id || ""}
              type="number"
              required
            />
            {errors.id && <span className="red-text">{errors.id}</span>}
          </div>
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
            <label htmlFor="user_account_password">Password</label>
            <input
              id="user_account_password"
              name="password"
              onChange={onChange}
              value={userAccount.password || ""}
              type="password"
              placeholder="New password"
              maxLength="100"
            />
            {errors.password && (
              <span className="red-text">{errors.password}</span>
            )}
          </div>
          <div className="col m6 l4">
            <label htmlFor="user_account_password2">Confirm password</label>
            <input
              data-match="user_account_password"
              id="user_account_password2"
              name="password2"
              type="password"
              placeholder="New password"
              maxLength="100"
            />
            {errors.password && (
              <span className="red-text">{errors.password}</span>
            )}
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
                    defaultChecked={userAccountUserRoles.some(
                      (e) => e.role_id == role.id,
                    )}
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
