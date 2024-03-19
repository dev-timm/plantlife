import React from "react";
import { Navbar, Container, Nav } from 'react-bootstrap';
import logo from '../assets/logo.svg';
import Button from 'react-bootstrap/Button'
import btnStyles from "../styles/Button.module.css";
import styles from '../styles/NavBar.module.css';
import { NavLink } from 'react-router-dom';

const NavBar = () => {
    return <Navbar className={styles.NavBar} collapseOnSelect expand="md" fixed="top">
        <Container>
            <NavLink to="/">
                <Navbar.Brand>
                    <img src={logo} alt="logo" height="32" />
                </Navbar.Brand>
            </NavLink>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav" className="text-left">
                <Nav className="mr-auto">
                    <NavLink exact className={styles.NavLink} activeClassName={styles.Active} to="/">Home</NavLink>
                </Nav>
                <Nav>
                    <NavLink className={styles.NavLink} activeClassName={styles.Active} to="/signin"><Button className={`${btnStyles.Button} ${btnStyles.Primary}`}>Sign In</Button></NavLink>
                    <NavLink className={styles.NavLink} activeClassName={styles.Active} to="/signup"><Button className={`${btnStyles.Button} ${btnStyles.Secondary}`}>Sign Up</Button></NavLink>
                </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>
};

export default NavBar