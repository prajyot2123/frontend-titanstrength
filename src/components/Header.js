import React from "react";
import { Navbar, Nav } from "react-bootstrap";
// cant use <a> in react, instead, use <link> from react router dom
import { Link, useLocation } from "react-router-dom";
import Auth from "../utils/auth"
import heart from "../assets/images/heart.png"

export default function Header() {

  const loggedIn = Auth.loggedIn();
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const isLoginPage = location.pathname === '/login';
  const isSignupPage = location.pathname === '/signup';


  return (
    <Navbar
      collapseOnSelect
      expand="sm"
      variant="dark"
      bg={loggedIn && !isHomePage ? "dark" : null}
      className={`header-shell ${isHomePage ? "header-hero" : ""}`}
    >
      {loggedIn ? (
        <>
          <Navbar.Brand as={Link} to="/" className="brand brand-logged header-brand d-flex align-items-center">
            <span className="brand-mark">
              <img alt="heart" src={heart} className="heart-icon" />
            </span>
            FitTrack
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
            <Nav className="header-actions">
              <Nav.Link
                as={Link}
                to="/exercise"
                eventKey="1"
                className={`nav-pill ${location.pathname.startsWith("/exercise") ? "active" : ""}`}
              >
                Exercise
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/history"
                eventKey="2"
                className={`nav-pill ${location.pathname.startsWith("/history") ? "active" : ""}`}
              >
                History
              </Nav.Link>
              <Nav.Link onClick={Auth.logout} className="nav-pill nav-ghost">
                Logout
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </>
      ) : (
        <Navbar.Brand
          as={Link}
          to="/"
          className={`brand brand-new header-brand mx-auto d-flex align-items-center
          ${isLoginPage || isSignupPage ? "brand-text" : null}`}
        >
          <span className="brand-mark">
            <img alt="heart" src={heart} className="heart-icon" />
          </span>
          FitTrack
        </Navbar.Brand>
      )}
    </Navbar>
  );
}
