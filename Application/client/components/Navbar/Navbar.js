import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Burger from "./Burger";

const Nav = styled.nav`
  width: 100%;

  height: 55px;
  background: #292b2c;
  color: #f7f7f7;
  box-sizing: border-box;
  padding: 0 50px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  position: relative;

  .logo {
    position: absolute;
    left: 0;
    padding: 50px;
  }
`;

export default function Navbar({ pathname }) {
  return (
    <Nav>
      <div className="logo">
        <a href="#">
          {/* <img src="logo.png" width="183" height="20" alt="logo"/> */}
        </a>
      </div>
      <Burger pathname={pathname} />
    </Nav>
  );
}

Navbar.propTypes = {
  pathname: PropTypes.string.isRequired,
};
