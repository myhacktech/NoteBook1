import React, { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";

function Login(props) {
  const location = useLocation();
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [load, setLoad] = useState(false); // for loading spinner
  let history = useNavigate();

  const onchange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleClick = async () => {
    setLoad(true);
    const response = await fetch("api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    setLoad(false);
    // console.log(json);
    if (json.success) {
      localStorage.setItem("token", json.authtoken);
      history("/");
      props.showAlert("Logged in successfully", "success");
    } else {
      props.showAlert("Invalid Credentials", "danger");
    }
  };

  return (
    <div>
      <div className="text-center my-4">
        <h1>NOTEBOOK</h1>
        <p>
          <b>Your notes on cloud ☁️</b>
        </p>
      </div>

      <div className="container my-5">
        <p className="text-center">
          <i>Login to continue using Notebook 😊 </i>
        </p>
        <div className="mb-3 ">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            onChange={onchange}
            id="email"
            name="email"
            placeholder="guest@gmail.com"
          />
        </div>

        <div className="mb-3 ">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            onChange={onchange}
            id="password"
            name="password"
            placeholder="guest123"
          />
        </div>
      </div>
      <div className="text-center">
        {!load ? (
          <button className="btn btn-primary" onClick={handleClick}>
            Login
          </button>
        ) : (
          <button className="btn btn-primary" type="button" disabled>
            <span
              className="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            ></span>
            Loading...
          </button>
        )}
      </div>
      <br />
      <p className="text-center last-para">
        Don't have an account?{" "}
        <Link
          to="/signup"
          className={`nav-link ${
            location.pathname === "/signup" ? "active" : ""
          }`}
        >
          SignUp
        </Link>{" "}
      </p>
    </div>
  );
}

export default Login;
