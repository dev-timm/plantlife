import React, { useEffect, useRef, useState } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

import styles from "../../styles/Form.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";
import { Alert, Image } from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import { axiosReq } from "../../api/axiosDefaults";

function AdvertisementEditForm() {
    const [errors, setErrors] = useState({});

    const [advertisementData, setAdvertisementData] = useState({
        title: "",
        plant_type: "",
        availability: "",
        price: "",
        contact: "",
        content: "",
        ad_image: "",
    });
    const { title, plant_type, price, availability, contact, content, ad_image } = advertisementData;

    const imageInput = useRef(null);
    const history = useHistory();
    const { id } = useParams();

    useEffect(() => {
        const handleMount = async () => {
            try {
                const { data } = await axiosReq.get(`/advertisements/${id}/`);
                const { title, plant_type, price, availability, contact, content, ad_image, is_owner } = data;

                is_owner ? setAdvertisementData({ title, plant_type, price, availability, contact, content, ad_image }) : history.push("/");
            } catch (err) {
                // console.log(err)
            }
        };

        handleMount();
    }, [history, id]);

    const handleChange = (event) => {
        setAdvertisementData({
            ...advertisementData,
            [event.target.name]: event.target.value,
        });
    };

    const handleChangeImage = (event) => {
        if (event.target.files.length) {
            URL.revokeObjectURL(ad_image);
            setAdvertisementData({
                ...advertisementData,
                ad_image: URL.createObjectURL(event.target.files[0])
            });
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();

        formData.append("title", title);
        formData.append("plant_type", plant_type);
        formData.append("price", price);
        formData.append("availability", availability);
        formData.append("contact", contact);
        formData.append("content", content);

        if (imageInput?.current?.files[0]) {
            formData.append("ad_image", imageInput.current.files[0]);
        }

        try {
            await axiosReq.put(`/advertisements/${id}/`, formData);
            history.push(`/advertisements/${id}`);
        } catch (err) {
            // console.log(err);
            if (err.response?.status !== 401) {
                setErrors(err.response?.data);
            }
        }
    };

    const availabilityText = availability.replaceAll('_', ' ');

    const textFields = (
        <div>
            <Form.Group>
                <Form.Label className={styles.Label} htmlFor="edit-ad-title">Title</Form.Label>
                <Form.Control className={styles.Input} type="text" id="edit-ad-title" name="title" value={title} onChange={handleChange} />
            </Form.Group>
            {errors?.title?.map((message, idx) => (
                <Alert variant="warning" key={idx}>{message}</Alert>
            ))}

            <Form.Group>
                <Form.Label className={styles.Label} htmlFor="edit-ad-type">Plant Type</Form.Label>
                <Form.Control className={styles.Input} type="text" id="edit-ad-type" name="plant_type" value={plant_type} onChange={handleChange} />
            </Form.Group>
            {errors?.plant_type?.map((message, idx) => (
                <Alert variant="warning" key={idx}>{message}</Alert>
            ))}

            <Form.Group>
                <Form.Label className={styles.Label} htmlFor="edit-ad-price">Price</Form.Label>
                <Form.Control className={styles.Input} type="text" id="edit-ad-price" name="price" value={price} onChange={handleChange} />
            </Form.Group>
            {errors?.price?.map((message, idx) => (
                <Alert variant="warning" key={idx}>{message}</Alert>
            ))}

            <Form.Label className={styles.Label} htmlFor="edit-ad-availability">Availability</Form.Label>
            <Form.Control as="select" className={`${styles.Input} text-capitalize`} defaultValue="default" id="edit-ad-availability" name="availability" onChange={handleChange}>
                <option value="default" disabled>Current Status: {availabilityText}</option>
                <option value="available">Available</option>
                <option value="reserved">Reserved</option>
                <option value="not_available">Not Available</option>
            </Form.Control>
            {errors?.availability?.map((message, idx) => (
                <Alert variant="warning" key={idx}>{message}</Alert>
            ))}

            <Form.Group>
                <Form.Label className={styles.Label} htmlFor="edit-ad-contact">Contact</Form.Label>
                <Form.Control className={styles.Input} type="text" id="edit-ad-contact" name="contact" value={contact} onChange={handleChange} />
            </Form.Group>
            {errors?.contact?.map((message, idx) => (
                <Alert variant="warning" key={idx}>{message}</Alert>
            ))}

            <Form.Group>
                <Form.Label className={styles.Label} htmlFor="edit-ad-content">Content</Form.Label>
                <Form.Control className={styles.Input} as="textarea" rows={6} id="edit-ad-content" name="content" value={content} onChange={handleChange} />
            </Form.Group>
            {errors?.content?.map((message, idx) => (
                <Alert variant="warning" key={idx}>
                    {message}
                </Alert>
            ))}


            <Button className={`${btnStyles.Button} ${btnStyles.Primary} float-right ml-2 `} type="submit">
                Update Advertisement
            </Button>
            <Button
                className={`${btnStyles.Button} ${btnStyles.Secondary} float-right`} onClick={() => history.goBack()}>
                Cancel
            </Button>
        </div>
    );

    return (
        <Form onSubmit={handleSubmit}>
            <Row className={`${styles.Row} mt-4`}>
                <Col className="my-auto">
                    <Container className={`${appStyles.Card} ${styles.Container} d-flex flex-column`}>
                        <Form.Group className="text-center">
                            <figure>
                                <Image className={appStyles.Image} src={ad_image} alt="photo" rounded />
                            </figure>
                            <div>
                                <Form.Label className={`${btnStyles.Button} ${btnStyles.Primary} btn`} htmlFor="image-upload">
                                    Change Image
                                </Form.Label>
                            </div>
                            <Form.File id="image-upload" accept="image/*" onChange={handleChangeImage} ref={imageInput} />

                        </Form.Group>
                        {errors?.ad_image?.map((message, idx) => (
                            <Alert variant="warning" key={idx}>{message}</Alert>
                        ))}

                        <div>{textFields}</div>
                    </Container>
                </Col>
            </Row>
        </Form>
    );
}

export default AdvertisementEditForm;