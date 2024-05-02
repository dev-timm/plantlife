import React from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import styles from '../../styles/Profile.module.css';
import Avatar from "../../components/Avatar";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

export const Profile = (props) => {
    const { profile, imageSize = 48 } = props;
    const { id, profile_image, owner } = profile;

    return (
        <Row noGutters className={`${styles.Divider} align-items-center pb-4 pt-4`}>
            <Col sm={1} xs={2}>
                <Link className="align-self-center" to={`/profiles/${id}`}>
                    <Avatar src={profile_image} height={imageSize} />
                </Link>
            </Col>
            <Col sm={8} xs={7} className="pl-2">
                <p className={styles.ProfileName}>{owner}</p>
            </Col>
            <Col sm={3} xs={3} className="text-right">
                <Link to={`/profiles/${id}`}>View Profile</Link>
            </Col>
        </Row>
    );
};