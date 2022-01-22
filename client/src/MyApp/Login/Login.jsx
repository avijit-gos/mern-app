import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "../Register/Register.css";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [changeInput, setChangeInput] = useState(false);

  const history = useHistory();

  const SignIn = (e) => {
    e.preventDefault();
    setDisabled(true);
    axios
      .post("http://localhost:3010/signin", { email, password })
      .then((res) => {
        console.log(res.data);
        if (res.status === 200) {
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("logged", res.data.logged);
          localStorage.setItem("userId", res.data.userId);
          if (localStorage.getItem("logged")) {
            history.push("/home");
          } else {
            history.push("/");
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const signUp = () => {
    history.push("/");
  };

  return (
    <div className="signup_container">
      <div className="signup_header">SignIn</div>
      <div className="signup_form_box">
        <form className="signup_form" onSubmit={SignIn}>
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
          <div className="btn_signup">
            <button className="signup" disabled={disabled}>
              SignIn
            </button>
            <button className="signin" onClick={signUp}>
              {" "}
              SignUp
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
