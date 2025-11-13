/**
 * Author: Cameron Crosby
 * Date: 11/11/2025
 * File: Header.jsx
 * Description: create a common page header
 */

import { NavLink } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
import { useAuth } from "../services/useAuth.jsx";

//This component creates a React-Bootstrap navbar. https://react-bootstrap.github.io/components/navbar/
const Header = () => {
  const { isAuthed, user } = useAuth();
  const className = ({ isActive }) =>
    isActive ? "nav-link active" : "nav-link";
  return (
    <>
      <Navbar variant="dark" expand="sm" className="navbar-custom">
        <Container>
          <NavLink to="/">
            <Navbar.Brand>FreshMart</Navbar.Brand>
          </NavLink>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <NavLink to="/" className={className}>
                Home
              </NavLink>
              <div className="nav-separator">|</div>
              <NavLink to="/groceries" className={className}>
                Groceries
              </NavLink>
              <div className="nav-separator">|</div>
              {isAuthed ? (
                <NavLink to="/signout" className={className}>
                  Sign Out
                </NavLink>
              ) : (
                <NavLink to="/signin" className={className}>
                  Sign In/Up
                </NavLink>
              )}
            </Nav>
            {isAuthed && user ? (
              <div className="navbar-name">Welcome {user.name}!</div>
            ) : (
              ""
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
