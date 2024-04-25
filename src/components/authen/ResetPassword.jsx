import React, { useState, useEffect } from "react";
import http from "../../http";

export default function ResetPassword(props) {
  const [user, setUser] = useState({});
  const [result, setResult] = useState({});

  function onChange(e) {
    let data = { ...user };
    data[e.target.name.toLowerCase()] = e.target.value;
    setUser(data);
  }

  function resetPassword(e) {
    e.preventDefault();
    http
      .post("/resetPassword", user)
      .then((response) => {
        setResult({ success: true });
      })
      .catch((e) => {
        setResult({ success: false, message: e.response.data.message });
      });
  }
  return (
    <div className="container">
      <div className="center-container">
        <div className="card-box">
          <div className="card card-width">
            <div className="card-content">
              <span className="card-title">Reset Password</span>
              <i className="login fa fa-user-circle"></i>
              <form method="post" onSubmit={resetPassword}>
                <div className="row">
                  <div className="col s12">
                    <label htmlFor="user_account_email">Email</label>
                    <input
                      id="user_account_email"
                      name="email"
                      onChange={onChange}
                      value={user.email || ""}
                      type="email"
                      required
                      maxLength="50"
                    />
                  </div>
                  <div className="col s12">
                    <button className="btn-small grey fit">
                      Reset Password
                    </button>
                  </div>
                </div>
              </form>
              {result.success && (
                <span className="green-text">
                  A reset password link has been sent to your email
                </span>
              )}
              {result.error && (
                <span className="red-text">Email not found!</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
