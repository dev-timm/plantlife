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
import useClickOutsideToggle from "../hooks/useClickOutsideToggle";
import { removeTokenTimestamp } from "../utils/utils";

const NavBar = () => {
    const currentUser = useCurrentUser();
    const setCurrentUser = useSetCurrentUser();

    const { expanded, setExpanded, ref } = useClickOutsideToggle();

    const handleSignOut = async () => {
        try {
            await axios.post("dj-rest-auth/logout/");
            setCurrentUser(null);
            removeTokenTimestamp();
        } catch (err) {
            console.log(err);
        }
    };

    const loggedIn = <>
        <Nav className="mr-auto">
            <NavLink exact className={styles.NavLink} activeClassName={styles.Active} to="/">Home</NavLink>
            <NavLink className={styles.NavLink} activeClassName={styles.Active} to="/feed">
                Feed
            </NavLink>
            <NavLink className={styles.NavLink} activeClassName={styles.Active} to="/bookmarked">
                Bookmarks
            </NavLink>
            <NavLink className={styles.NavLink} activeClassName={styles.Active} to="/profiles">
                Plant Lovers
            </NavLink>
        </Nav>
        <Nav>
            <NavLink className={styles.NavLink} to="/" onClick={handleSignOut}>
                Sign Out
            </NavLink>
            <NavLink className={styles.NavLink} activeClassName={styles.Active} to="/posts/create">
                <Button className={`${btnStyles.Button} ${btnStyles.Primary}`}>Add a Post</Button>
            </NavLink>
            <NavLink className={styles.NavLink} to={`/profiles/${currentUser?.profile_id}`} onClick={() => { }}>
                <Avatar src={currentUser?.profile_image} height={40} />
            </NavLink>
        </Nav>
    </>;
    const loggedOut = (
        <>
            <Nav className="ml-auto">
                <NavLink className={styles.NavLink} activeClassName={styles.Active} to="/signin">
                    <Button className={`${btnStyles.Button} ${btnStyles.Primary}`}>Sign In</Button>
                </NavLink>
                <NavLink className={styles.NavLink} activeClassName={styles.Active} to="/signup">
                    <Button className={`${btnStyles.Button} ${btnStyles.Secondary}`}>Sign Up</Button>
                </NavLink>
            </Nav>
        </>
    )

    return <Navbar expanded={expanded} className={styles.NavBar} collapseOnSelect expand="md" fixed="top">
        <Container>
            <NavLink to="/">
                <Navbar.Brand>
                    <img src={logo} alt="logo" height="32" />
                </Navbar.Brand>
            </NavLink>
            <Navbar.Toggle ref={ref} onClick={() => setExpanded(!expanded)} aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav" className="text-left">
                {currentUser ? loggedIn : loggedOut}
            </Navbar.Collapse>
        </Container>
    </Navbar>
};

export default NavBar