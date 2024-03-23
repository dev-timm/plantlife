import React, { useState } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

import Upload from "../../assets/upload.svg";

import styles from "../../styles/PostCreateEditForm.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";
import Asset from "../../components/Asset";
import { Image } from "react-bootstrap";

function PostCreateForm() {
const [postData, setPostData] = useState({
        title: "",
        content: "",
        image: "",
    });
    const { title, content, image } = postData;

    const handleChange = (event) => {
        setPostData({
            ...postData,
            [event.target.name]: event.target.value,
        });
    };

    const handleChangeImage = (event) => {
        if (event.target.files.length) {
            URL.revokeObjectURL(image);
            setPostData({
                ...postData,
                image: URL.createObjectURL(event.target.files[0])
            });
        }
    };

    const textFields = (
        <div>
            <Form.Group>
                <Form.Label className={styles.Label}>Title</Form.Label>
                <Form.Control className={styles.Input} type="text" name="title" value={title} onChange={handleChange} />
            </Form.Group>
            <Form.Group>
                <Form.Label className={styles.Label}>Content</Form.Label>
                <Form.Control className={styles.Input} as="textarea" rows={6} name="content" value={content} onChange={handleChange} />
            </Form.Group>

            <Button className={`${btnStyles.Button} ${btnStyles.Primary} float-right ml-2 `} type="submit">
                create
            </Button>
            <Button
                className={`${btnStyles.Button} ${btnStyles.Secondary} float-right`} onClick={() => { }}>
                cancel
            </Button>
        </div>
    );

    return (
        <Form>
            <Row className={styles.Row}>
                <Col className="my-auto">
                    <Container className={`${appStyles.Card} ${styles.Container} d-flex flex-column`}>
                        <Form.Group className="text-center">
                            {image ? (
                                <>
                                    <figure>
                                        <Image className={appStyles.Image} src={image} rounded />
                                    </figure>
                                    <div>
                                        <Form.Label className={`${btnStyles.Button} ${btnStyles.Primary} btn`} htmlFor="image-upload">
                                            Change Image
                                        </Form.Label>
                                    </div>
                                </>
                            ) : (
                                <Form.Label className="d-flex justify-content-center upload-area" htmlFor="image-upload">
                                    <Asset src={Upload} message="Upload Image" />
                                </Form.Label>
                            )}

                            <Form.File id="image-upload" accept="image/*" onChange={handleChangeImage} />

                        </Form.Group>
                        <div>{textFields}</div>
                    </Container>
                </Col>
            </Row>
        </Form>
    );
}

export default PostCreateForm;