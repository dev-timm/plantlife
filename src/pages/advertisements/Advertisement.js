import React from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import styles from "../../styles/Advertisement.module.css";
import appStyles from "../../App.module.css";

import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Card, Media } from "react-bootstrap";
import { Link } from "react-router-dom";
import Avatar from "../../components/Avatar";

import { axiosRes } from "../../api/axiosDefaults";
import { MoreDropdown } from "../../components/MoreDropdown";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Advertisement = (props) => {
    const {
        id,
        owner,
        profile_id,
        profile_image,
        title,
        plant_type,
        price,
        availability,
        contact,
        content,
        ad_image,
        updated_on,
    } = props;

    const currentUser = useCurrentUser();
    const is_owner = currentUser?.username === owner;
    const history = useHistory();

    const handleEdit = () => {
        history.push(`/advertisements/${id}/edit`)
    }

    const handleDelete = async () => {
        try {
            await axiosRes.delete(`/advertisements/${id}/`);
            history.goBack();
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <Card className={styles.Advertisement}>
            <Card.Body className="px-0">
                <Media className="align-items-center justify-content-between">
                    <Link to={`/profiles/${profile_id}`}>
                        <Avatar src={profile_image} height={48} />
                        {owner}
                    </Link>
                    <div className="d-flex align-items-center">
                        <span className="mr-3">{updated_on}</span>
                        {is_owner && (
                            <MoreDropdown
                                handleEdit={handleEdit}
                                handleDelete={handleDelete}
                            />
                        )}
                    </div>
                </Media>
            </Card.Body>
            <Card.Body className="px-0">
                {title && <Card.Title className="mb-5">{title}</Card.Title>}
                <Row className="mb-3">
                    <Col>
                        <h6>Plant Type</h6>
                        {plant_type && <Card.Text>{plant_type}</Card.Text>}
                    </Col>
                    <Col>
                        <h6>Price</h6>
                        {price && <Card.Text>{price}</Card.Text>}
                    </Col>
                    <Col>
                        <h6>Availability</h6>
                        {availability === "available" ? (
                            <Card.Text className={styles.Available}>Available</Card.Text>
                            ) : (
                                availability === "reserved" ? (
                                    <Card.Text className={styles.Reserved}>Reserved</Card.Text>
                                ) : (
                                    <Card.Text className={styles.Unavailable}>Not Available</Card.Text>
                                )
                            )
                        }
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col>
                        <h6>Contact</h6>
                        {contact && <Card.Text>{contact}</Card.Text>}
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <h6>Addiotnal Notes</h6>
                        {content && <Card.Text>{content}</Card.Text>}
                    </Col>
                </Row>
            </Card.Body>
            <Card.Body className="px-0">
                <Link to={`/advertisements/${id}`}>
                    <Card.Img className={appStyles.Image} src={ad_image} alt={title} />
                </Link>
            </Card.Body>
        </Card>
    );
};

export default Advertisement;