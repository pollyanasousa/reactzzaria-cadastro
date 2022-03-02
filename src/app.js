import React, { Suspense, lazy, useEffect, useState } from "react";
import { Route, Switch, useLocation } from "react-router-dom";
import { LinearProgress } from "@material-ui/core";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import { Redirect } from "react-router";
import { HOME, LOGIN } from "./routes";
import useAuth from "./hooks/auth";
// eslint-disable-next-line
import FirebaseApp from "./services/firebase";

const MainPage = lazy(() => import("./pages/main/main"));
const Login = lazy(() => import("./pages/login/login"));

function App() {
  const location = useLocation();
  const { userInfo, setUserInfo, logout } = useAuth();
  const [didCheckUserIn, setDidCheckUserIn] = useState(false);
  const { isUserLoggedIn } = userInfo;

  useEffect(() => {
    onAuthStateChanged(getAuth(), (user) => {
      setUserInfo({
        isUserLoggedIn: !!user,
        user: user && {
          ...user,
          firstName: user.displayName.split(" ")[0],
        },
      });
      setDidCheckUserIn(true);
    });
  }, [setUserInfo]);

  useEffect(() => {
    window.logout = logout;
  }, [logout]);

  if (!didCheckUserIn) {
    return <LinearProgress />;
  }

  if (isUserLoggedIn && location.pathname === LOGIN) {
    return <Redirect to={HOME} />;
  }

  if (!isUserLoggedIn && location.pathname !== LOGIN) {
    return <Redirect to={LOGIN} />;
  }

  return (
    <Suspense fallback={<LinearProgress />}>
      <Switch>
        <Route path={LOGIN} component={Login} />
        <Route component={MainPage} />
      </Switch>
    </Suspense>
  );
}

export default App;
