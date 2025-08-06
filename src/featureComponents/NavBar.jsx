import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav>
      <div className="container d-flex justify-content-between align-items-center">
        <div className="col-sm-2">
          <Link to="main">Main</Link>
        </div>
        <div className="col-sm-2">
          <Link to="fav">Favourites</Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
