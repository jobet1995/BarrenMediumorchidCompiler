import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Service from "./Service";
import util from "../../util";

export default function UserAccountDetail(props) {
  const [userAccount, setUserAccount] = useState({});
  const [userAccountRoles, setUserAccountRoles] = useState([]);

  useEffect(() => {
    get().finally(() => {
      util.initView(true);
    });
  }, [props.match.params.id]);

  function get() {
    return Service.get(props.match.params.id).then((response) => {
      setUserAccount(response.data.userAccount);
      setUserAccountRoles(response.data.userAccountRoles);
    });
  }

  return (
    <div className="container">
      <form method="post">
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
              Back
            </Link>
            <Link
              className="btn-small"
              to={`/userAccount/edit/${userAccount.id}?ref=${encodeURIComponent(Util.getRef("/userAccount"))}`}
            >
              Edit
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}
