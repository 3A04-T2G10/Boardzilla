import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import R from "ramda";

import { faUser } from "@fortawesome/free-solid-svg-icons/faUser";
import { faLock } from "@fortawesome/free-solid-svg-icons/faLock";

import useKeyPress from "_hooks/useKeyPress";
import { attemptLogin } from "_thunks/auth";
import FormInput from "_components/FormInput";

export default function LoginForm() {
  const dispatch = useDispatch();

  const [remember, setRemember] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const username = localStorage.getItem("username");
    if (username) {
      setRemember(true);
      setUsername(username);
    }
  }, []);

  const login = () => {
    const userCredentials = { username, password };

    if (remember) {
      localStorage.setItem("username", username);
    }

    dispatch(attemptLogin(userCredentials)).catch(R.identity);
  };

  useKeyPress("Enter", login);

  const rememberMe = () => {
    localStorage.removeItem("username");
    setRemember(!remember);
  };

  const updateUsername = (e) => setUsername(e.target.value);
  const updatePassword = (e) => setPassword(e.target.value);

  return (
    <div className="login box">
      <h1 className="has-text-centered has-text-weight-semibold is-size-3">
        Login
      </h1>
      <hr className="separator" />
      <div className="block">
        Not Registered Yet?&nbsp;
        <Link to="/register">Create an account.</Link>
      </div>
      <FormInput
        onChange={updateUsername}
        placeholder="Username"
        value={username}
        leftIcon={faUser}
      />
      <FormInput
        onChange={updatePassword}
        placeholder="Password"
        value={password}
        leftIcon={faLock}
        type="password"
      />
      {/* <div className="block">
        <Link to="/recovery">Forgot your password?</Link>
      </div> */}
      <hr className="separator" />
      <div className="control is-clearfix">
        <button
          className="button is-pulled-right is-info"
          color="success"
          onClick={login}
        >
          Login
        </button>
        <label className="checkbox">
          <input type="checkbox" onChange={rememberMe} checked={remember} />
          <span>&nbsp; Remember me</span>
        </label>
      </div>
    </div>
  );
}
