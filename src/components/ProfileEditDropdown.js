import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { useHistory } from "react-router";
import styles from "../styles/MoreDropdown.module.css";

import { ReactComponent as MoreIcon } from '../assets/icon-meatball.svg';
import { ReactComponent as EditIcon } from '../assets/icon-edit.svg';


const MeatballMenu = React.forwardRef(({ onClick }, ref) => (
    <div
        ref={ref}
        onClick={(e) => {
            e.preventDefault();
            onClick(e);
        }} >
        <MoreIcon />
    </div>
));

export function ProfileEditDropdown({ id }) {
    const history = useHistory();
    return (
        <Dropdown className={`ml-auto ${styles.Absolute}`} drop="left">
            <Dropdown.Toggle as={MeatballMenu} />
            <Dropdown.Menu>
                <Dropdown.Item
                    className={styles.DropdownItem}
                    onClick={() => history.push(`/profiles/${id}/edit`)}
                    aria-label="edit-profile"
                >
                    <EditIcon /> Edit Profile
                </Dropdown.Item>
                <Dropdown.Item
                    className={styles.DropdownItem}
                    onClick={() => history.push(`/profiles/${id}/edit/username`)}
                    aria-label="edit-username"
                >
                    <EditIcon /> Edit Username
                </Dropdown.Item>
                <Dropdown.Item
                    className={styles.DropdownItem}
                    onClick={() => history.push(`/profiles/${id}/edit/password`)}
                    aria-label="edit-password"
                >
                    <EditIcon /> Edit Password
                </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
}