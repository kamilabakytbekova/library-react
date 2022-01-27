import React, { useContext } from "react";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthProvider";
import Search from "../Search/Search";

const Navibar = () => {
  const { user, handleLogOut } = useContext(AuthContext);

  return user ? (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/">Library</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav" className="custom-navbar">
          <Nav></Nav>
          <Nav>
            <Search />
          </Nav>
          <Nav>
            <Nav.Link>
              <Link
                style={{ textDecoration: "none", color: "black" }}
                to="/myBooks"
              >
                Мои книги
              </Link>
            </Nav.Link>
            <NavDropdown title={user.displayName} id="basic-nav-dropdown">
              <NavDropdown.Item>
                <button onClick={handleLogOut}>Выйти</button>
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  ) : (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/">Library</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav" className="custom-navbar">
          <Nav></Nav>
          <Nav>
            <Search />
          </Nav>
          <Nav>
            <Link to={"/signIn"}>
              <button className="available button">Войти</button>
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navibar;
