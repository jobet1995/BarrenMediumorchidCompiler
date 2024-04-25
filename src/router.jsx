import React, { Suspense, lazy } from "react";
import { Switch, Route } from "react-router-dom";
import Login from "./components/authen/Login";
import Logout from "./components/authen/Logout";
import ResetPassword from "./components/authen/ResetPassword";
import ChangePassword from "./components/authen/ChangePassword";

export default function AppRoute(props) {
  return (
    <Suspense fallback={""}>
      <Switch>
        <Route
          path="/login"
          component={(p) => (
            <Login {...p} user={props.user} setUser={props.setUser} />
          )}
        />
        <Route
          path="/logout"
          component={(p) => <Logout {...p} setUser={props.setUser} />}
        />
        <Route path="/resetPassword" component={ResetPassword} />
        <Route path="/changePassword/:token" component={ChangePassword} />
        <Route path="/" component={Default} exact />
        <Route path="/home" component={Home} />
        <Route path="/profile" component={Profile} />
        <Route
          path="/userAccount"
          component={lazy(() => import("./components/userAccount/Index"))}
          exact
        />
        <Route
          path="/userAccount/create"
          component={lazy(() => import("./components/userAccount/Create"))}
          exact
        />
        <Route
          path="/userAccount/:id/"
          component={lazy(() => import("./components/userAccount/Detail"))}
          exact
        />
        <Route
          path="/userAccount/edit/:id/"
          component={lazy(() => import("./components/userAccount/Edit"))}
          exact
        />
        <Route
          path="/userAccount/delete/:id/"
          component={lazy(() => import("./components/userAccount/Delete"))}
          exact
        />
      </Switch>
    </Suspense>
  );
}
