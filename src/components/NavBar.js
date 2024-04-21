import React from "react";
import { useEffect, useState } from "react";
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


import Dropdown from "react-bootstrap/Dropdown";

const NavBar = () => {
    const currentUser = useCurrentUser();
    const setCurrentUser = useSetCurrentUser();

    const { expanded, setExpanded, ref } = useClickOutsideToggle();

    const NavBarProfile = React.forwardRef(({ onClick }, ref) => (
        <div
            ref={ref}
            onClick={(e) => {
                e.preventDefault();
                onClick(e);
            }} >
            <Avatar src={currentUser?.profile_image} height={40} />
        </div>
    ));

    const handleSignOut = async () => {
        try {
            await axios.post("dj-rest-auth/logout/");
            setCurrentUser(null);
            removeTokenTimestamp();
        } catch (err) {
            console.log(err);
        }
    };

    const [width, setWidth] = useState(0)

    useEffect(() => {
        const handleResize = () => setWidth(window.innerWidth)
        window.addEventListener("resize", handleResize)
        handleResize()

        return () => {
            window.removeEventListener("resize", handleResize)
        }
    }, [setWidth])

    console.log(width)


    const loggedIn = <>
        <Nav className="mr-auto">
            <NavLink className={styles.NavLink} activeClassName={styles.Active} to="/feed">
                Feed
            </NavLink>
            <NavLink className={styles.NavLink} activeClassName={styles.Active} to="/bookmarked">
                Bookmarks
            </NavLink>
            <NavLink className={styles.NavLink} activeClassName={styles.Active} to="/profiles">
                Plant Lovers
            </NavLink>
            <NavLink className={styles.NavLink} activeClassName={styles.Active} to="/advertisements">
                Marketplace
            </NavLink>
        </Nav>

        {width > 991 ? (
            <>
                <Dropdown className="py-2">
                    <Dropdown.Toggle className={`${btnStyles.Button} ${btnStyles.Primary} mr-4`} id="dropdown-basic">
                        Plant a ...
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item className={styles.DropdownItem} href="/posts/create">Post</Dropdown.Item>
                        <Dropdown.Item className={styles.DropdownItem} href="/advertisements/create">Advertisement</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                <Dropdown className={`${styles.ProfileDropDown} py-2`}>
                    <Dropdown.Toggle as={NavBarProfile} />
                    <Dropdown.Menu popperConfig={{ strategy: "fixed" }}>
                        <Dropdown.Item className={styles.DropdownItem} href={`/profiles/${currentUser?.profile_id}`} aria-label="View Profile">
                            View Profile</Dropdown.Item>
                        <Dropdown.Item className={styles.DropdownItem} onClick={handleSignOut} aria-label="Signout">
                            Sign Out</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </>
        ) : (
            <>
                <div className="mt-5">
                    <NavLink className={`${btnStyles.Button} ${btnStyles.Primary} mr-2`} to="/posts/create">Plant Post</NavLink>
                    <NavLink className={`${btnStyles.Button} ${btnStyles.Secondary}`} to="/advertisements/create">Plant Advertisement</NavLink>
                </div>
                <div className="mt-3">
                    <NavLink className={`${styles.NavLink} d-block`} activeClassName={styles.Active} to={`/profiles/${currentUser?.profile_id}`}>
                        View profile
                    </NavLink>
                    <NavLink className={`${styles.NavLink} d-block`} to="/" onClick={handleSignOut}>
                        Sign out
                    </NavLink>
                </div>
            </>
        )}

    </>;
    const loggedOut = (
        <>
            <Nav className="ml-auto">
                <NavLink className={styles.NavLink} activeClassName={styles.Active} to="/signin">
                    <Button className={`${btnStyles.Button} ${btnStyles.Primary}`}>Sign In</Button>
                </NavLink>
                <NavLink className={styles.NavLink} activeClassName={styles.Active} to="/signup">
                    <Button className={`${btnStyles.Button} ${btnStyles.Secondary}  mt-2`}>Sign Up</Button>
                </NavLink>
            </Nav>
        </>
    )

    return <Navbar expanded={expanded} className={styles.NavBar} collapseOnSelect expand="lg" fixed="top">
        <Container>
            <NavLink to="/">
                <Navbar.Brand>
                    <img src={logo} alt="logo" height="32" />
                </Navbar.Brand>
            </NavLink>
            <Navbar.Toggle ref={ref} onClick={() => { setExpanded(!expanded) }} aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav" className="text-left">
                {currentUser ? loggedIn : loggedOut}
            </Navbar.Collapse>
        </Container>
    </Navbar>
};

export default NavBar