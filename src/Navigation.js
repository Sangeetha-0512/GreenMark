import React from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

function CommonNavbar() {
  const navigate = useNavigate();

  return (
    <Navbar bg="light" expand="lg" className="shadow-sm">
      <Container>
        <Navbar.Brand
          onClick={() => navigate("/home")}
          className="fw-bold text-success"
          style={{ cursor: "pointer" }}
        >
          🌱 GREENMARK
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="nav" />
        <Navbar.Collapse id="nav" className="justify-content-end">
          <Nav>
            <Nav.Link as={Link} to="/About">
              About GreenMark
            </Nav.Link>
            <Nav.Link as={Link} to="/register">
              Register New Sapling
            </Nav.Link>
            <Nav.Link as={Link} to="/login">
              Login / Signup
            </Nav.Link>
            <Nav.Link as={Link} to="/profile">
              Profile
            </Nav.Link>
            <Nav.Link as={Link} to="/SupportUs">
              Support Us
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default CommonNavbar;
