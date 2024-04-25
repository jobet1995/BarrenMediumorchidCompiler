import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Service from "../Service";
import Util from "../../util";

export default function UserAccountDelete(props) {
  const [userAccount, setUserAccount] = useState({});
  const [userAccountUserRoles, setUserAccountUserRoles] = useState([]);

  useEffect(() => {
    get().finally(() => {
      Util.initView(true);
    });
  }, [props.match.params.id]);

  function get() {
    return Service.delete(props.match.params.id).then((response) => {
      setUserAccount(response.data.userAccount);
      setUserAccountUserRoles(response.data.userAccountUserRoles);
    });
  }

  function remove(e) {
    e.preventDefault();
    Service.delete(props.match.params.id, userAccount)
      .then(() => {
        props.history.push(Util.getRef("/userAccount"));
      })
      .catch((e) => {
        alert(e.response.data.message);
      });
  }

  return (
    <div className="container">
      <form method="post" onSubmit={remove}>
        <div className="row">
          <div className="col m6 l4">
            <label htmlFor="user_account_id">Id</label>
            <input
              readOnly
              id="user_account_id"
              name="id"
              value={userAccount.id || ""}
              type="number"
              required
            />
          </div>
          <div className="col m6 l4">
            <label htmlFor="user_account_name">Name</label>
            <input
              readOnly
              id="user_account_name"
              name="name"
              value={userAccount.name || ""}
              required
              maxLength="50"
            />
          </div>
          <div className="col m6 l4">
            <label htmlFor="user_account_email">Email</label>
            <input
              readOnly
              id="user_account_email"
              name="email"
              value={userAccount.email || ""}
              type="email"
              required
              maxLength="50"
            />
          </div>
          <div className="col m6 l4">
            <label>
              <input
                readOnly
                id="user_account_active"
                name="active"
                className="filled-in"
                type="checkbox"
                value="1"
                checked={userAccount.active || ""}
              />
              <span>Active</span>
            </label>
          </div>
          <div className="col s12">
            <h5>Roles</h5>
            <table className="striped highlight">
              <thead>
                <tr>
                  <th>Role Name</th>
                </tr>
              </thead>
              <tbody>
                {userAccountUserRoles.map((userAccountUserRole, index) => (
                  <tr key={index}>
                    <td>{userAccountUserRole.role_name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="col s12">
            <Link className="btn-small grey" to={Util.getRef("/userAccount")}>
              Cancel
            </Link>
            <button className="btn-small red">Delete</button>
          </div>
        </div>
      </form>
    </div>
  );
}
