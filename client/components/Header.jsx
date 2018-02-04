import React from 'react';

const Header = () => (
  <div className="container">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css" />
    <div className="navbar-header">
      <button
        type="button"
        className="navbar-toggle collapsed"
        data-toggle="collapse"
        data-target="#navbar"
        aria-expanded="false"
        aria-controls="navbar"
      >
        <span className="sr-only">Toggle navigation</span>
        <span className="icon-bar" />
        <span className="icon-bar" />
        <span className="icon-bar" />
      </button>
      <a
        className="navbar-brand"
        href="#"
        styles="color:#ffffff;"
        styles="font-family: Arial, Geneva, Helvetica, sans-serif;"
      >
        RateUF
      </a>
      <div id="navbar" className="collapse navbar-collapse">
        <ul className="nav navbar-nav" styles="color:#fff;">
          <li styles="color:#ffffff;">
            <a href="#/professor">Professor</a>
          </li>
          <li styles="color:#ffffff;">
            <a href="#">Class</a>
          </li>
          <li styles="color:#ffffff;">
            <a href="#">Degree Outline</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
);

export default Header;
