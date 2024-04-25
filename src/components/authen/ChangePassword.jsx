import React, { useState, useEffect } from "react";
import util from "../../util";
import http from "../../http";

export default function changePassword(props) {
  const [user, setUser] = useState({});
  const [result, setResult] = useState({});
  let { history } = props;

  useEffect(() => {
    http.get("/changePassword/" + props.match.params.token, user).catch((e) => {
      alert("Token not Found");
      history.push("/login");
    });
  }, [history]);

  function onChange(e) {
    let data = { ...user };
    data[e.target.name.toLowerCase()] = e.target.value;
    setUser(data);
  }

  function changePassword(e) {
    e.preventDefault();
    if (!Util.validatePassword()) {
      return;
    }
    http
      .post("/changePassword" + props.match.params.token, user)
      .then((response) => {
        setResult({ success: true });
      })
      .catch((e) => {
        setResult({ error: true, message: e.response.data.message });
      });
  }
  return (
    <div className="container">
      <div className="center-container">
        <div className="card-box">
          <div className="card card-width">
            <div className="card-content">
              <span className="card-title">Change Password</span>
              <i className="login fa fa-user-circle"></i>
              <form method="post" onSubmit={changePassword}>
                <div className="row">
                  <div className="col s12">
                    <label htmlFor="user_account_password">Password</label>
                    <input
                      id="user_account_password"
                      name="password"
                      onChange={onChange}
                      value={user.password || ""}
                      type="password"
                      required
                      maxLength="100"
                    />
                  </div>
                  <div className="col s12">
                    <label htmlFor="user_account_password2">
                      Confirm password
                    </label>
                    <input
                      data-match="user_account_password"
                      id="user_account_password2"
                      name="password2"
                      type="password"
                      required
                      maxLength="100"
                    />
                  </div>
                  <div className="col s12">
                    <button className="btn-small grey fit">
                      Change Password
                    </button>
                  </div>
                </div>
              </form>
              {result.success && (
                <span className="green-text">Change password done</span>
              )}
              {result.error && (
                <span className="red-text">Token not found!</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
