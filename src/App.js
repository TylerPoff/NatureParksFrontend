import { useState, useEffect, useCallback } from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import { Navbar, Nav } from "react-bootstrap";

import './App.css';

function App() {
  return (
    <div className="App">
      <Navbar className="nav" expand="lg" sticky="top" variant="dark">
        <Container className="container-fluid">
          <div className="nav-link-group">
            <Nav.Link as={Link} to="/parks" className="nav-link">
              Parks
            </Nav.Link>
            <Nav.Link as={Link} to="/trips" className="nav-link">
              My Trips
            </Nav.Link>
          </div>
          <Navbar.Brand href="/">
            <img src="" alt="park logo" className="parks-logo"/>
          </Navbar.Brand>
          <div className="nav-link-group">
            <Nav.Link as={Link} to="/lists" className="nav-link">
              Bucketlist
            </Nav.Link>
            <Nav.Link as={Link} to="/login" className="nav-link">
              Login
            </Nav.Link>
          </div>
        </Container>
      </Navbar>
    </div>
  )
}

export default App;
