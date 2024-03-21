import React from "react";
import { Navbar, Container, Nav } from 'react-bootstrap';
import logo from '../assets/logo.svg';
import Button from 'react-bootstrap/Button'
import btnStyles from "../styles/Button.module.css";
import styles from '../styles/NavBar.module.css';
import { NavLink } from 'react-router-dom';
import { useCurrentUser, useSetCurrentUser } from "../contexts/CurrentUserContext";
import Avatar from "./Avatar";
import axios from "axios";

const NavBar = () => {
    const currentUser = useCurrentUser();
    const setCurrentUser = useSetCurrentUser();

    const handleSignOut = async () => {
        try {
            await axios.post("dj-rest-auth/logout/");
            setCurrentUser(null);
        } catch (err) {
            console.log(err);
        }
    };

    const loggedIn = <>
        <nav className="mr-auto">
            <NavLink exact className={styles.NavLink} activeClassName={styles.Active} to="/">Home</NavLink>
            <NavLink className={styles.NavLink} activeClassName={styles.Active} to="/saved">
                Saved Posts
            </NavLink>
            <NavLink className={styles.NavLink} activeClassName={styles.Active} to="/users">
                Plant Lovers
            </NavLink>
        </nav>
        <nav>
            <NavLink className={styles.NavLink} to="/" onClick={handleSignOut}>
                Sign Out
            </NavLink>
            <NavLink className={styles.NavLink} activeClassName={styles.Active} to="/posts/create">
                <Button className={`${btnStyles.Button} ${btnStyles.Primary}`}>Add a Post</Button>
            </NavLink>
            <NavLink className={styles.NavLink} to={`/profiles/${currentUser?.profile_id}`} onClick={() => { }}>
                <Avatar src={currentUser?.profile_image} height={40} />
            </NavLink>
        </nav>
    </>;
    const loggedOut = (
        <>
            <nav className="ml-auto">
                <NavLink className={styles.NavLink} activeClassName={styles.Active} to="/signin">
                    <Button className={`${btnStyles.Button} ${btnStyles.Primary}`}>Sign In</Button>
                </NavLink>
                <NavLink className={styles.NavLink} activeClassName={styles.Active} to="/signup">
                    <Button className={`${btnStyles.Button} ${btnStyles.Secondary}`}>Sign Up</Button>
                </NavLink>
            </nav>
        </>
    )

    return <Navbar className={styles.NavBar} collapseOnSelect expand="md" fixed="top">
        <Container>
            <NavLink to="/">
                <Navbar.Brand>
                    <img src={logo} alt="logo" height="32" />
                </Navbar.Brand>
            </NavLink>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav" className="text-left">
                {currentUser ? loggedIn : loggedOut}
            </Navbar.Collapse>
        </Container>
    </Navbar>
};

export default NavBar