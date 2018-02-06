import React from 'react';

const Header = () => (
  <div className="container">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css" />
    <link rel="stylesheet" href="./css/Header.css" />
    <link href="https://fonts.googleapis.com/css?family=Lobster|Pacifico" rel="stylesheet" />
    <div className="navbar-header head">
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
      <a className="navbar-brand special-text" href="#">
        RateUF
      </a>
      <div id="navbar" className="collapse navbar-collapse head-not-head">
        <ul className="nav navbar-nav">
          <li>
            <a className="head-contents" href="#/professor">
              Professor
              <div className="ant-dropdown">
                <ul>
                  <li>
                    <a href="#">Find Professor</a>
                  </li>
                  <li>
                    <a href="#">Rate Professor</a>
                  </li>
                </ul>
              </div>
            </a>
          </li>
          <li>
            <a className="head-contents" href="#">
              Class
              <div className="ant-dropdown">
                <ul>
                  <li>
                    <a href="#">Find Class</a>
                  </li>
                  <li>
                    <a href="#">Rate Class</a>
                  </li>
                </ul>
              </div>
            </a>
          </li>
          <li>
            <a className="head-contents" href="#">
              Degree Outline
              <div className="ant-dropdown">
                <ul>
                  <li>
                    <a href="#">CSC</a>
                  </li>
                  <li>
                    <a href="#">CSE</a>
                  </li>
                  <li>
                    <a href="#">CE</a>
                  </li>
                  <li>
                    <a href="#">DAS</a>
                  </li>
                  <li>
                    <a href="#">EE</a>
                  </li>
                  <li>
                    <a href="#">MATH</a>
                  </li>
                </ul>
              </div>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
);

export default Header;
