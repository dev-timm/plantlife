import React, { useState, useEffect, useRef } from "react";
import { useHistory, useParams } from "react-router-dom";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";

import { axiosReq } from "../../api/axiosDefaults";
import {
    useCurrentUser,
    useSetCurrentUser,
} from "../../contexts/CurrentUserContext";

import styles from "../../styles/Form.module.css";
import btnStyles from "../../styles/Button.module.css";
import appStyles from "../../App.module.css";

const ProfileEditForm = () => {
    const currentUser = useCurrentUser();
    const setCurrentUser = useSetCurrentUser();
    const { id } = useParams();
    const history = useHistory();
    const imageFile = useRef();

    const [profileData, setProfileData] = useState({
        name: "",
        bio: "",
        profile_image: "",
    });
    const { name, bio, profile_image } = profileData;

    const [errors, setErrors] = useState({});

    useEffect(() => {
        const handleMount = async () => {
            if (currentUser?.profile_id?.toString() === id) {
                try {
                    const { data } = await axiosReq.get(`/profiles/${id}/`);
                    const { name, bio, profile_image } = data;
                    setProfileData({ name, bio, profile_image });
                } catch (err) {
                    console.log(err);
                    history.push("/");
                }
            } else {
                history.push("/");
            }
        };

        handleMount();
    }, [currentUser, history, id]);

    const handleChange = (event) => {
        setProfileData({
            ...profileData,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("name", name);
        formData.append("bio", bio);

        if (imageFile?.current?.files[0]) {
            formData.append("profile_image", imageFile?.current?.files[0]);
        }

        try {
            const { data } = await axiosReq.put(`/profiles/${id}/`, formData);
            setCurrentUser((currentUser) => ({
                ...currentUser,
                profile_image: data.image,
            }));
            history.goBack();
        } catch (err) {
            console.log(err);
            setErrors(err.response?.data);
        }
    };

    const textFields = (
        <>
            <Form.Group>
                <Form.Label className={styles.Label}>Bio</Form.Label>
                <Form.Control className={styles.Input} as="textarea" value={bio} onChange={handleChange} name="bio" rows={7} />
            </Form.Group>
            {errors?.bio?.map((message, idx) => (
                <Alert variant="warning" key={idx}>
                    {message}
                </Alert>
            ))}

            <Button className={`${btnStyles.Button} ${btnStyles.Primary} float-right ml-2 `} type="submit">
                Update Profile
            </Button>
            <Button
                className={`${btnStyles.Button} ${btnStyles.Secondary} float-right`}
                onClick={() => history.goBack()}>
                Cancel
            </Button>
        </>
    );

    return (
        <Form onSubmit={handleSubmit}>
            <Row className={styles.Row}>
                <Col className="my-auto">
                    <Container className={`${appStyles.Card} ${styles.Container} d-flex flex-column`}>
                        <Form.Group className="text-center">
                            {profile_image && (
                                <figure>
                                    <Image src={profile_image} fluid />
                                </figure>
                            )}
                            <div>
                                <Form.Label
                                    className={`${btnStyles.Button} ${btnStyles.Blue} btn my-auto`}
                                    htmlFor="image-upload"
                                >
                                    Change the image
                                </Form.Label>
                            </div>
                            <Form.File id="image-upload" ref={imageFile} accept="image/*"
                                onChange={(e) => {
                                    if (e.target.files.length) {
                                        setProfileData({
                                            ...profileData,
                                            profile_image: URL.createObjectURL(e.target.files[0]),
                                        });
                                    }
                                }}
                            />
                        </Form.Group>
                        {errors?.profile_image?.map((message, idx) => (
                            <Alert variant="warning" key={idx}>{message}</Alert>
                        ))}
                        <div>{textFields}</div>
                    </Container>
                </Col>
            </Row>
        </Form>
    );
};

export default ProfileEditForm;