import React from "react";
import GoogleLogin from "react-google-login";
import { useHistory } from "react-router-dom";
import axios from "axios";

function Google() {
  const history = useHistory();
  const responseGoogle = (response) => {
    console.log(response);
    const email = response.profileObj.email;
    const userId = response.googleId;
    localStorage.setItem("token", response.tokenId);
    axios
      .post("http://localhost:3010/signup/google", { email, userId })
      .then((res) => {
        console.log(res);
        localStorage.setItem("userId", res.data.userId);
        history.push("/home");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <GoogleLogin
        clientId="138655110319-53vq1kbr0g00sen0jl7euhltddfflujk.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={"single_host_origin"}
      />
    </div>
  );
}

export default Google;
