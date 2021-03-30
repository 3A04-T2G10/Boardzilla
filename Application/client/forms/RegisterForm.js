import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import R from "ramda";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons/faCheck";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons/faExclamationTriangle";

import useKeyPress from "_hooks/useKeyPress";
import { postCheckUsername } from "_api/CheckUsers";
import {
  validateUsername,
  validatePassword,
  validatePasswordMatch,
} from "_utils/validation";
import { attemptRegister } from "_thunks/auth";

export default function RegisterForm() {
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [usernameMessage, setUsernameMessage] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [confirmMessage, setConfirmMessage] = useState("");
  const [usernameAvailable, setUsernameAvailable] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(false);

  const checkPassword = (newUsername, newPassword) => {
    const { valid, message } = validatePassword(newUsername, newPassword);

    setPasswordValid(valid);
    setPasswordMessage(message);
  };

  const checkPasswordMatch = (password, confirmPassword) => {
    const { valid, message } = validatePasswordMatch(password, confirmPassword);

    setPasswordMatch(valid);
    setConfirmMessage(message);
  };
  const checkUsername = (newUsername) => {
    const { valid, message } = validateUsername(newUsername);

    if (valid) {
      setUsernameMessage("Checking username...");
      setUsernameAvailable(false);

      postCheckUsername(newUsername)
        .then((res) => {
          setUsernameAvailable(res.available);
          setUsernameMessage(res.message);
        })
        .catch(R.identity);
    } else {
      setUsernameAvailable(valid);
      setUsernameMessage(message);
    }
  };

  const updateUsername = (newUserName) => {
    setUsername(newUserName);
    checkPassword(newUserName, password);
  };

  const handleUsernameChange = (e) => {
    updateUsername(e.target.value);
    checkUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    checkPassword(username, e.target.value);
    checkPasswordMatch(e.target.value, confirmPassword);
  };
  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    checkPasswordMatch(password, e.target.value);
  };

  const register = () => {
    if (usernameAvailable && passwordValid) {
      const newUser = {
        username,
        password,
      };

      dispatch(attemptRegister(newUser)).catch(R.identity);
    }
  };

  useKeyPress("Enter", register);

  return (
    <div className="register box">
      <h1 className="has-text-centered has-text-weight-semibold is-size-3">
        Sign Up
      </h1>
      <hr className="separator" />
      <p className="has-space-below">
        Already a member?&nbsp;
        <Link to="/login">Login</Link>
      </p>
      <div className="field">
        <label className="label" htmlFor="username">
          Username
        </label>
        <div className="control has-icons-right">
          <input
            className={`input ${
              username
                ? usernameAvailable
                  ? "is-success"
                  : "is-danger"
                : undefined
            }`}
            id="username"
            placeholder="Username"
            value={username}
            onChange={handleUsernameChange}
          />
          {username && (
            <span
              className={`icon is-small is-right ${
                usernameAvailable ? "has-text-success" : "has-text-danger"
              }`}
            >
              <FontAwesomeIcon
                icon={usernameAvailable ? faCheck : faExclamationTriangle}
              />
            </span>
          )}
        </div>
        {username && (
          <p
            className={`help ${usernameAvailable ? "is-success" : "is-danger"}`}
          >
            {usernameMessage}
          </p>
        )}
      </div>
      <div className="field">
        <label className="label" htmlFor="password">
          Password
        </label>
        <div className="control has-icons-right">
          <input
            className={`input ${
              password
                ? passwordValid
                  ? "is-success"
                  : "is-danger"
                : undefined
            }`}
            id="password"
            placeholder="Password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
          {password && (
            <span
              className={`icon is-small is-right ${
                passwordValid ? "has-text-success" : "has-text-danger"
              }`}
            >
              <FontAwesomeIcon
                icon={passwordValid ? faCheck : faExclamationTriangle}
              />
            </span>
          )}
        </div>
        {password && (
          <p
            className={`help ${
              passwordValid ? "has-text-success" : "has-text-danger"
            }`}
          >
            {passwordMessage}
          </p>
        )}
      </div>
      <div className="field">
        <label className="label" htmlFor="confirmPassword">
          Confirm Password
        </label>
        <div className="control has-icons-right">
          <input
            className={`input ${
              confirmPassword
                ? passwordMatch
                  ? "is-success"
                  : "is-danger"
                : undefined
            }`}
            id="confirmPassword"
            placeholder="Password"
            type="password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
          />
          {confirmPassword && (
            <span
              className={`icon is-small is-right ${
                passwordMatch ? "has-text-success" : "has-text-danger"
              }`}
            >
              <FontAwesomeIcon
                icon={passwordMatch ? faCheck : faExclamationTriangle}
              />
            </span>
          )}
        </div>
        {confirmPassword && (
          <p
            className={`help ${
              passwordMatch ? "has-text-success" : "has-text-danger"
            }`}
          >
            {confirmMessage}
          </p>
        )}
      </div>
      <hr className="separator" />
      <div className="has-text-right">
        <button
          className="button is-info"
          color="success"
          onClick={register}
          disabled={!passwordValid || !usernameAvailable || !passwordMatch}
        >
          Create Account
        </button>
      </div>
    </div>
  );
}
