import React, { useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import styles from "../../styles/Advertisement.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";

import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Card, Media } from "react-bootstrap";
import { Link } from "react-router-dom";
import Avatar from "../../components/Avatar";
import Button from "react-bootstrap/Button";

import { axiosRes } from "../../api/axiosDefaults";
import { MoreDropdown } from "../../components/MoreDropdown";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Modal from 'react-bootstrap/Modal';

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
    const [deleteModalShow, setDeleteModalShow] = useState(false);
    const history = useHistory();

    const handleEdit = () => {
        history.push(`/advertisements/${id}/edit`);
    };

    const handleDelete = async () => {
        try {
            await axiosRes.delete(`/advertisements/${id}/`);
            history.goBack();
        } catch (err) {
            // console.log(err);
        }
    };

    function DeleteModal(props) {
        return (
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Delete Advertisement
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="mt-2">
                    <h5>Delete "{title}"</h5>
                    <p>
                        Are you sure you want to delete this advertisement? This action can't be undone!
                    </p>
                    <Button className={`${btnStyles.Button} ${btnStyles.Primary} float-right ml-2`} onClick={handleDelete} >
                        Delete
                    </Button>
                    <Button className={`${btnStyles.Button} ${btnStyles.Secondary} float-right ml-2`} onClick={() => setDeleteModalShow(false)}>Cancel</Button>
                </Modal.Body>
            </Modal>
        );
    };

    return (
        <Card className={styles.Advertisement}>
            <Card.Body className="px-0">
                <Media className="align-items-center justify-content-between">
                    <Link to={`/profiles/${profile_id}`} className="d-flex align-items-center">
                        <Avatar src={profile_image} height={48} />
                        <div className="ml-2">
                            {owner} <br />
                            <span className={styles.Updated}> {updated_on}</span>
                        </div>
                    </Link>
                    <div className="d-flex align-items-center">
                        {is_owner && (
                            <MoreDropdown
                                handleEdit={handleEdit}
                                handleDeleteModal={() => setDeleteModalShow(true)}
                            />
                        )}
                    </div>
                    <DeleteModal
                        show={deleteModalShow}
                        onHide={() => setDeleteModalShow(false)}
                    />
                </Media>
            </Card.Body>
            <Card.Body className="px-0">
                {title && <Card.Title className="mb-5">{title}</Card.Title>}
                <Row className="mb-3">
                    <Col className="mb-3">
                        <h6>Plant Type</h6>
                        {plant_type && <Card.Text>{plant_type}</Card.Text>}
                    </Col>
                    <Col className="mb-3">
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
                        <h6>Additional Notes</h6>
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
}

export default Advertisement;