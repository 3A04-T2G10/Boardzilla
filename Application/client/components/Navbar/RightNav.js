import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { push } from "connected-react-router";
import { useSelector, useDispatch } from "react-redux";
import { attemptLogout } from "_thunks/auth";
import R from "ramda";
import styled from "styled-components";

const Ul = styled.ul`
  list-style: none;
  display: flex;
  flex-flow: row nowrap;
  z-index: 19;
  text-align: center;
  font-weight: bold;

  li {
    color: #f7f7f7;
    padding: 16px 20px;
    cursor: pointer;
  }
  li:hover {
    text-decoration: underline;
  }
  .active {
    background: hsl(348, 100%, 61%);
  }
  a {
    height: 40px;
    margin: auto 10px;
  }
  .disabled-link {
    pointer-events: none; //This makes it not clickable
  }
  @media only screen and (max-width: 768px) {
    flex-flow: column nowrap;
    background-color: #292b2c;
    position: fixed;
    transform: ${({ open }) => (open ? "translateX(0)" : "translateX(100%)")};
    top: 0;
    right: 0;
    width: 300px;

    padding-top: 3.5rem;
    transition: transform 0.3s ease-in-out;

    li {
      border-top: solid 2px #f7f7f7;
    }
    a {
      width: 50%;
      margin: 10px auto;
    }
  }
`;

export default function RightNav({ open, setOpen, pathname }) {
  const dispatch = useDispatch();
  const { user } = useSelector(R.pick(["user"]));
  const [auth, setAuth] = useState(!R.isEmpty(user));

  const logout = () => dispatch(attemptLogout()).catch(R.identity);

  useEffect(() => {
    setAuth(!R.isEmpty(user));
  }, [user.username]);

  // const isHome =
  //   pathname.length === 5
  //     ? pathname === "/home"
  //     : R.slice(0, 6, pathname) === "/home/";

  // const isTodo = (pathname.length === 5)
  //   ? pathname === '/todo'
  //   : R.slice(0, 6, pathname) === '/todo/';

  // const isSettings =
  //   pathname.length === 9
  //     ? pathname === "/settings"
  //     : R.slice(0, 10, pathname) === "/settings/";

  // const isS = (pathname.length === 5)
  //   ? pathname === '/todo'
  //   : R.slice(0, 6, pathname) === '/todo/';
  return (
    <Ul open={open} style={{ cursor: `${!user ? "not-allowed" : "pointer"}` }}>
      <li
        // className={`${isStickies ? "active" : ""}`}
        onClick={() => dispatch(push(auth ? "/stickies" : "/"))}>
        Stickies
      </li>

      <li
        // className={`${isStickies ? "active" : ""}`}
        onClick={() => dispatch(push(auth ? "/stock" : "/"))}>
        Stock
      </li>

      <li
        // className={`${isStickies ? "active" : ""}`}
        onClick={() => dispatch(push(auth ? "/weather" : "/"))}>
        Weather
      </li>

      <li
        // className={`${isStickies ? "active" : ""}`}
        onClick={() => dispatch(push(auth ? "/news" : "/"))}>
        News
      </li>

      <li
        // className={`${isStickies ? "active" : ""}`}
        onClick={() => dispatch(push(auth ? "/calendar" : "/"))}>
        Calendar
      </li>

      <li
        // className={`${isStickies ? "active" : ""}`}
        onClick={() => dispatch(push("/"))}>
        Home
      </li>
      {/*
      <li
        // className={`${display === "cases" && user ? "active" : ""} ${
        //   !user ? "disabled-link" : ""
        // }`}
        onClick={() => {
          // move("cases");
          setOpen(!open);
        }}
      >
        Cases
      </li>
      <li
        // className={`${display === "payments" && user ? "active" : ""} ${
        //   !user ? "disabled-link" : ""
        // }`}
        onClick={() => {
          // move("payments");
          setOpen(!open);
        }}
      >
        Payments
      </li> */}
      {!auth && (
        <>
          <a
            className="button is-info is-light"
            onClick={() => {
              dispatch(push("/login"));
              setOpen(!open);
            }}>
            Login
          </a>
          <a
            className="button is-info"
            onClick={() => {
              dispatch(push("/register"));
              setOpen(!open);
            }}>
            Sign Up
          </a>
        </>
      )}
      {auth && (
        <a
          onClick={logout}
          onKeyPress={logout}
          className="button is-info is-light">
          Log out
        </a>
      )}
    </Ul>
  );
}

RightNav.propTypes = {
  pathname: PropTypes.string.isRequired,
};
