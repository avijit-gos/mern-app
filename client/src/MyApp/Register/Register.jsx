import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "./Register.css";
import Google from "./Google";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [changeInput, setChangeInput] = useState(false);

  const history = useHistory();

  const SignUp = (e) => {
    e.preventDefault();
    console.log({ email, password });
    const userInfo = { email, password };
    setDisabled(true);
    axios
      .post("http://localhost:3010/signup", userInfo)
      .then((res) => {
        if (res.status === 200) {
          console.log(res);
          setDisabled(false);
          setEmail("");
          setPassword("");
          history.push("/login");
        }
      })
      .catch((err) => {
        setChangeInput(true);
        setDisabled(false);
      });
  };

  const redirectToLogIn = () => {
    history.push("/login");
  };

  return (
    <div className="signup_container">
      <div className="signup_header">SignUp</div>
      <div className="signup_form_box">
        <form className="signup_form" onSubmit={SignUp}>
          <label>Enter Email</label>
          <br />
          <input
            type="email"
            name="email"
            placeholder="Enter your Email"
            className={changeInput ? "input_field_error" : "input_field"}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required={true}
          />
          <br />
          <label>Enter Password</label>
          <br />
          <input
            type="password"
            name="password"
            placeholder="Enter your Password"
            className={changeInput ? "input_field_error" : "input_field"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required={true}
          />
          <ul>
            <li>
              <label>
                Password should have atleast one uppercase, one lowercase and
                one special character
              </label>
            </li>
            <li>
              <label>Password should have atleast 8 characters</label>
            </li>
          </ul>
          <div className="redirect_login">
            <p className="text" onClick={redirectToLogIn}>
              Already have account?
            </p>
          </div>
          <div className="btn_signup">
            <button className="signup" disabled={disabled}>
              SignUp
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
