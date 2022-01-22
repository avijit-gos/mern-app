import React from "react";
import { Switch, Route } from "react-router-dom";
import Register from "../Register/Register";
import LogIn from "../Login/Login";
import Home from "../Home/Form";
import Post from "../Home/Post";
import PageNotFound from "../PageNotFound/PageNotFound";
function Main() {
  return (
    <div>
      <Switch>
        <Route path="/" exact component={() => <Register />} />
        <Route path="/login" exact component={() => <LogIn />} />
        <Route path="/home" exact component={() => <Home />} />
        <Route path="/post" exact component={() => <Post />} />
        <Route component={PageNotFound} />
      </Switch>
    </div>
  );
}

export default Main;
