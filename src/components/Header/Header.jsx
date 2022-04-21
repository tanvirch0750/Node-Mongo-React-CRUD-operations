import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  return (
    <header>
      <Link to="/">Home</Link>
      <Link to="/user/add">Add user</Link>
    </header>
  );
};

export default Header;
