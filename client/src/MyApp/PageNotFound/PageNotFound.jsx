import React from "react";
import { useHistory } from "react-router-dom";

function PageNotFound() {
  const history = useHistory();
  const redirectLogin = () => {
    history.push("/login");
  };
  return (
    <div>
      <h1>Error 404! Page not found</h1>
      <button onClick={redirectLogin}>Return to Login page</button>
    </div>
  );
}

export default PageNotFound;
