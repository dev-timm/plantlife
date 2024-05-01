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

function PostEditForm() {
    const [errors, setErrors] = useState({});

    const [postData, setPostData] = useState({
        title: "",
        content: "",
        post_image: "",
    });
    const { title, content, post_image } = postData;

    const imageInput = useRef(null);
    const history = useHistory();
    const { id } = useParams();

    useEffect(() => {
        const handleMount = async () => {
            try {
                const { data } = await axiosReq.get(`/posts/${id}/`);
                const { title, content, post_image, is_owner } = data;

                is_owner ? setPostData({ title, content, post_image }) : history.push("/");
            } catch (err) {
                // console.log(err)
            }
        };

        handleMount();
    }, [history, id]);

    const handleChange = (event) => {
        setPostData({
            ...postData,
            [event.target.name]: event.target.value,
        });
    };

    const handleChangeImage = (event) => {
        if (event.target.files.length) {
            URL.revokeObjectURL(post_image);
            setPostData({
                ...postData,
                post_image: URL.createObjectURL(event.target.files[0])
            });
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();

        formData.append("title", title);
        formData.append("content", content);

        if (imageInput?.current?.files[0]) {
            formData.append("post_image", imageInput.current.files[0]);
        }

        try {
            await axiosReq.put(`/posts/${id}/`, formData);
            history.push(`/posts/${id}`);
        } catch (err) {
            // console.log(err);
            if (err.response?.status !== 401) {
                setErrors(err.response?.data);
            }
        }
    };

    const textFields = (
        <div>
            <Form.Group>
                <Form.Label className={styles.Label} htmlFor="edit-post-title">Title</Form.Label>
                <Form.Control className={styles.Input} type="text" name="title" id="edit-post-title" value={title} onChange={handleChange} />
            </Form.Group>
            {errors?.title?.map((message, idx) => (
                <Alert variant="warning" key={idx}>{message}</Alert>
            ))}

            <Form.Group>
                <Form.Label className={styles.Label} htmlFor="edit-post-content">Content</Form.Label>
                <Form.Control className={styles.Input} as="textarea" rows={6} name="content" id="edit-post-content" value={content} onChange={handleChange} />
            </Form.Group>
            {errors?.content?.map((message, idx) => (
                <Alert variant="warning" key={idx}>
                    {message}
                </Alert>
            ))}


            <Button className={`${btnStyles.Button} ${btnStyles.Primary} float-right ml-2 `} type="submit">
                Update Post
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
                                        <Image className={appStyles.Image} src={post_image} alt="photo" rounded />
                                    </figure>
                                    <div>
                                        <Form.Label className={`${btnStyles.Button} ${btnStyles.Primary} btn`} htmlFor="image-upload">
                                            Change Image
                                        </Form.Label>
                                    </div>
                            <Form.File id="image-upload" accept="image/*" onChange={handleChangeImage} ref={imageInput} />

                        </Form.Group>
                        {errors?.post_image?.map((message, idx) => (
                            <Alert variant="warning" key={idx}>{message}</Alert>
                        ))}

                        <div>{textFields}</div>
                    </Container>
                </Col>
            </Row>
        </Form>
    );
}

export default PostEditForm;