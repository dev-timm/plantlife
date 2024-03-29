import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import styles from "../styles/MoreDropdown.module.css";

import { ReactComponent as MoreIcon } from '../assets/icon-meatball.svg';
import { ReactComponent as EditIcon } from '../assets/icon-edit.svg';
import { ReactComponent as DeleteIcon } from '../assets/icon-delete.svg';

// The forwardRef is important!!
// Dropdown needs access to the DOM node in order to position the Menu
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

export const MoreDropdown = ({ handleEdit, handleDelete }) => {
    return (
        <Dropdown className="ml-2" drop="left">
            <Dropdown.Toggle as={MeatballMenu} />

            <Dropdown.Menu popperConfig={{ strategy: "fixed" }}>
                <Dropdown.Item className={styles.DropdownItem}
                    onClick={handleEdit}
                    aria-label="edit"
                >
                    <EditIcon /> Edit</Dropdown.Item>
                <Dropdown.Item
                    className={styles.DropdownItem}
                    onClick={handleDelete}
                    aria-label="delete"
                >
                    <DeleteIcon /> Delete</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
};
