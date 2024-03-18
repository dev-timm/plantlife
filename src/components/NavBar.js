import React from "react";
import { Navbar, Container, Nav } from 'react-bootstrap';
import logo from '../assets/logo.svg';
import Button from 'react-bootstrap/Button'
import styles from '../styles/NavBar.module.css';

const NavBar = () => {
    return <Navbar className={styles.NavBar} collapseOnSelect expand="md" fixed="top">
        <Container>
            <Navbar.Brand>
                <img src={logo} alt="logo" height="32" /></Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav" className="text-left">
                <Nav className="mr-auto">
                    <Nav.Link>Home</Nav.Link>
                </Nav>
                <Nav>
                    <Nav.Link><Button variant="success">Log In</Button></Nav.Link>
                    <Nav.Link><Button variant="outline-success">Sign Up</Button></Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>
};

export default NavBar